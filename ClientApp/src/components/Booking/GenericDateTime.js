﻿import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { locale } from 'moment';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import Loader from '../../assets/img/loader.gif';
import App from '../../App';
import toastr from 'toastr';

export class GenericDateTime extends Component {
    displayName = GenericDateTime.name

    constructor() {
        super();

        var lastVisitedUrl = document.referrer;
        var urlArray = [];
        var urlArray = lastVisitedUrl.split('/');
        var genericBookingPage = urlArray[3];

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const hasclickedfreeconsultation = params.get('hasclickedfreeconsultation');
        const serviceType = params.get('serviceType');
        const categoryid = params.get('categoryid');
        const servicetypeid = params.get('servicetypeid');
        const servicetypename = params.get('servicetypename');
        const postalcode = params.get('postalcode');
        const isinhouse = params.get('inhouse');
        const isinclinic = params.get('inclinic');
        const bookingid = params.get('bookingid');
        const genderpreference = params.get('genderpreference');
        const totalprice = params.get('totalprice');
        console.log(totalprice);

        this.state = {
            serviceType: serviceType,
            lastVisitedUrl: genericBookingPage,
            serviceTypeName: servicetypename,
            categoryid: categoryid,
            servicetypeid: servicetypeid,
            postalcode: postalcode,
            inhouse: isinhouse,
            inclinic: isinclinic,
            genderPreference: genderpreference,
            totalprice: totalprice,
            bookingid: bookingid,
            authtoken: localStorage.getItem("customeraccesstoken"),
            notes: '',
            freeavailableslots: [],
            availability: true,
            availableslots: [],
            availibilityResponse: 0,
            availibilityTimeSlots: [],
            availableDate: '',
            availableTime: '',
            loader: false,
            hasclickedfreeconsultation: hasclickedfreeconsultation
        };

        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
    }

    handleChangeBookingDate(date) {

        this.setState({ bookingdate: date });

        var dateArray = [];
        var dateArray = date.split("-");
        var month = dateArray[0];
        var date = dateArray[1];
        var year = dateArray[2];

        var dateFormatted = year + '-' + date + '-' + month;
        localStorage.setItem('bookingdate', dateFormatted);

        if (this.state.bookingtime != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    handleChangeBookingTime(e) {

        const format = 'HH:mm';

        var getHours = new Date("2000-01-01 " + e.format(format)).getHours();
        var getMinutes = new Date("2000-01-01 " + e.format(format)).getMinutes();
        var timeFarmated = getHours + ':' + getMinutes;

        this.setState({ bookingtime: timeFarmated });
        localStorage.setItem('bookingTime', timeFarmated);

        if (this.state.bookingdate != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    checkServiceProviderAvailability() {

        if (this.state.isinclinic == 'true') {
            var inclinicVal = true;
            var inhouseVal = false;
        }
        else {
            var inclinicVal = false;
            var inhouseVal = true;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                servicetypeid: parseInt(this.state.servicetypeid),
                bookingduration: 30,
                bookingtime: localStorage.getItem('bookingTime'),
                categoryid: parseInt(this.state.categoryid),
                bookingdate: localStorage.getItem('bookingdate'),
                postalcode: this.state.postalcode,
                genderpreference: this.state.genderPreference,
                inhouse: inhouseVal,
                inclinic: inclinicVal,
                authtoken: this.state.authtoken
            })
        };

        console.log(requestOptions);

        fetch(App.ApisBaseUrlV2 + '/api/Provider/checkavailability', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ loader: false });
                this.setState({ freeavailableslots: data.freeavailableslots });
                this.setState({ availibilityResponse: data.statuscode });
                if (data.statuscode == 200) {
                    if (data.freeavailableslots.availability == true && data.freeavailableslots.availableslots == null
                        || data.freeavailableslots.availability == false && data.freeavailableslots.availableslots != null) {
                        this.setState({ availability: data.freeavailableslots.availability });
                        this.setState({ availableslots: data.freeavailableslots.availableslots });
                    }
                    else {
                        toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
                    }
                }
                else if (data.statuscode == 404) {
                    toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
                }
            });
    }

    getAvailabilitySlots() {

        var providerId = parseInt(localStorage.getItem('providerid'));

        fetch(App.ApisBaseUrlV2 + '/api/Provider/getavailabilityslots?providerid=' + providerId +
            '&bookingDuration=30' + '&bookingTime=' + localStorage.getItem('bookingTime') +
            '&bookingDate=' + localStorage.getItem('bookingdate') + '&authtoken=' + this.state.authtoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ loader: false });
                this.setState({ freeavailableslots: data.freeavailableslots });
                this.setState({ availibilityResponse: data.statuscode });
                if (data.statuscode == 200) {
                    if (data.available == true && data.availableSlots == null
                        || data.available == false && data.availableSlots != null) {
                        this.setState({ availability: data.available });
                        this.setState({ availableslots: data.availableSlots });
                    }
                    else {
                        toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
                    }
                }
                else if (data.statuscode == 404) {
                    toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
                }
            });
    }

    handleChangeAvailableDate(e) {

        this.setState({ availableDate: e.target.value });
        var providerAvaialibility = this.state.availableslots.filter(obj => obj.availableDate == e.target.value);
        if (providerAvaialibility.length > 0) {
            this.setState({ availibilityTimeSlots: providerAvaialibility[0].availableSlots.map(obj => obj.availableFrom) });
        }

        var dateArray = [];
        var dateArray = e.target.value.split("/");
        var month = dateArray[0];
        var date = dateArray[1];
        var year = dateArray[2];

        if (month.length == 1 && date.length > 1) {
            var dateFormatted = year + '-0' + month + '-' + date;
        }
        else if (month.length > 1 && date.length == 1) {
            var dateFormatted = year + '-' + month + '-0' + date;
        }
        else if (month.length == 1 && date.length == 1) {
            var dateFormatted = year + '-0' + month + '-0' + date;
        }
        else {
            var dateFormatted = year + '-' + month + '-' + date;
        }

        this.setState({ bookingdate: dateFormatted });
        localStorage.setItem('bookingdate', dateFormatted);
    }

    handleChangeAvailableTime(e) {
        this.setState({ availableTime: e.target.value });

        var selectedSlot = e.target.value;
        var timeFormatted = selectedSlot.slice(0, 5);

        this.setState({ bookingtime: selectedSlot });
        console.log(this.state.bookingtime);
        localStorage.setItem('bookingTime', e.target.value);
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    saveGenericBookingDateTime(bookingid, bookingdate, bookingtime, notes, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(this.state.bookingid),
                bookingdate: localStorage.getItem('bookingdate'),
                bookingtime: bookingtime,
                notes: notes,
                authtoken: authtoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Booking/savegenericbookingdatetime', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    window.location = '/generic-summary/?' + btoa(encodeURIComponent('bookingid=' + data.bookingid
                        + '&totalprice=' + this.state.totalprice + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                }
                else {
                    toastr['error'](data.message);
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.availibilityResponse == 200) {
            if (this.state.availableslots != '' && this.state.availableslots != null) {
                const { bookingid, bookingdate, bookingtime, notes, authtoken } = this.state;
                this.saveGenericBookingDateTime(bookingid, bookingdate, bookingtime, notes, authtoken);
            }
            else if (this.state.freeavailableslots.availability == false && this.state.freeavailableslots.availableSlots == null) {
                toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
            }
            else if (this.state.availability == true) {
                const { bookingid, bookingdate, bookingtime, notes, authtoken } = this.state;
                this.saveGenericBookingDateTime(bookingid, bookingdate, bookingtime, notes, authtoken);
            }
        }
        else {
            toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
        }
    }

    render() {


        var todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

        var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
        var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
        var diff = todayTimeStamp - oneDayTimeStamp;
        var yesterdayDate = new Date(diff);

        return (
            <div id="MainPageWrapper">

                {this.state.loader == true ?
                    <div className="bookingPageLoader"><img src={Loader} /></div>
                    : ''
                }

                <section className="bookingPage account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-gray p-2">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name text-white">{this.state.serviceTypeName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit.bind(this)} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">
                                            <label class="col-form-label pb-4 pl-3">I want my service on</label>

                                            {this.state.availability == false && this.state.availableslots != null ?
                                                <div className="col-md-12 cardWrapWithShadow availibitySlots">
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Date</label>
                                                            <select className="form-control" value={this.state.availableDate}
                                                                onChange={this.handleChangeAvailableDate.bind(this)} required>
                                                                <option value="">Select an option</option>
                                                                {this.state.availableslots.map((slot, index) =>
                                                                    <option name={index} value={slot.availableDate} id={index}>
                                                                        {slot.availableDate.replace(/-/g, '-')}
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Time</label>

                                                            <div class="">
                                                                <select className="form-control" value={this.state.availableTime}
                                                                    onChange={this.handleChangeAvailableTime.bind(this)} required>
                                                                    <option value="">Select an option</option>
                                                                    {this.state.availibilityTimeSlots.map((slots1) =>
                                                                        <option value={slots1}>{slots1}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <div className="col-md-12 dateTimeWrap">
                                                    <div className="col-md-12 cardWrapWithShadow">
                                                        <div className="col-md-6 pt-3">
                                                            <div class="form-group">
                                                                <label class="form-label">Book a Date</label>
                                                                <div class="">
                                                                    <ModernDatepicker
                                                                        className="form-control"
                                                                        date={this.state.bookingdate}
                                                                        format={'DD-MM-YYYY'}
                                                                        showBorder
                                                                        onChange={(date) => this.handleChangeBookingDate(date)}
                                                                        minDate={yesterdayDate}
                                                                        placeholder={'Please select date'} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 pt-3">
                                                            <div class="form-group">
                                                                <label class="form-label">Book a Time</label>

                                                                <div class="">
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        defaultValue={this.state.bookingtime}
                                                                        onChange={this.handleChangeBookingTime.bind(this)}
                                                                        //format={format}
                                                                        inputReadOnly
                                                                        minuteStep={15}
                                                                        placeholder={'Please select time'}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            <div className="col-md-12 pt-5 notes">
                                                <label class="col-form-label pb-4">Notes for my service provider</label>
                                                <div className="col-md-12 cardWrapWithShadow">
                                                    <div className="md-form">
                                                        <textarea className="form-control rounded-0" name="address"
                                                            value={this.state.notes} onChange={this.handleChangeNotes.bind(this)} rows="1"
                                                            placeholder="Add Booking Notes......" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3 checkoutBtn">
                                                    {this.state.bookingdate != '' && this.state.bookingtime != '' ?
                                                        <button className="btn btn-lg bg-orange text-white"
                                                            type="submit">Next Page</button>
                                                        : <button className="btn btn-lg bg-orange text-white"
                                                            disabled>Next Page</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
