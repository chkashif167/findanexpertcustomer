import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import App from '../../App';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}


export class EditCustomerBooking extends Component {
    displayName = EditCustomerBooking.name

    constructor() {
        super();

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerID = localStorage.getItem('customerid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const bookingid = params.get('bookingid');
        const bookingDate = params.get('bookingdate');
        localStorage.setItem('bookingdate', bookingDate);
        const bookingTime = params.get('bookingtime');
        const bookingduration = params.get('bookingduration');
        const bookingNotes = params.get('bookingNotes');
        const servicetypename = params.get('servicetypename');
        const providerid = params.get('providerid');

        var todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

        var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
        var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
        var diff = todayTimeStamp - oneDayTimeStamp;
        var yesterdayDate = new Date(diff);
        var currentTime = moment();

        this.state = {
            availableSlotAvailibility: true,
            availableSlots: [],
            availibilityTimeSlots: [],
            availibilityResponse: 0,
            bookingid: bookingid,
            yesterdayDate: yesterdayDate,
            bookingdate: bookingDate,
            bookingtime: currentTime,
            currentDate: '',
            currentDateSlot: '',
            bookingduration: bookingduration,
            notes: bookingNotes,
            authtoken: customerAccesstoken,
            servicetypename: servicetypename,
            providerid: providerid,
            showModal: '',
            modalMessage: '',
        };

        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
        this.handleChangeCurrentDateSlot = this.handleChangeCurrentDateSlot.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkAvailibility() {

        fetch(App.ApisBaseUrlV2 + '/api/Provider/getavailabilityslots?serviceproviderId=' + this.state.providerid +
            '&bookingDate=' + localStorage.getItem('bookingdate') + '&bookingTime=' + localStorage.getItem('bookingTime')
            + '&bookingDuration=' + this.state.bookingduration + '&authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ availibilityResponse: data.statuscode });
                if (data.statuscode == 200) {
                    if (data.available == true && data.availableSlots == null
                        || data.available == false && data.availableSlots != null) {
                        this.setState({ availableSlotAvailibility: data.available });
                        this.setState({ availableSlots: data.availableSlots });
                    }
                }
                else if (data.statuscode == 404) {
                    toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
                }
            });
    }

    handleChangeBookingTime(e) {

        const format = 'HH:mm';
        var getHours = new Date("2000-01-01 " + e.format(format)).getHours();
        var getMinutes = new Date("2000-01-01 " + e.format(format)).getMinutes();
        var timeFarmated = getHours + ':' + getMinutes;
        console.log(timeFarmated);

        this.setState({ bookingtime: timeFarmated });
        localStorage.setItem('bookingTime', timeFarmated);
        console.log(localStorage.getItem('bookingTime'));
        
        this.checkAvailibility();
    }

    handleChangeCurrentDate(e) {
        this.setState({ currentDate: e.target.value });
        alert(this.state.currentDate);
        var providerAvaialibility = this.state.availableSlots.filter(obj => obj.availableDate == e.target.value);
        if (providerAvaialibility.length > 0) {
            this.setState({ availibilityTimeSlots: providerAvaialibility[0].availableSlots.map(obj => obj.availableFrom) });
        }
    }

    handleChangeCurrentDateSlot(e) {
        this.setState({ currentDateSlot: e.target.value });
    }

    handleChangeBookingDate(date) {

        this.setState({ bookingdate: date });

        console.log(this.state.bookingdate);
        localStorage.setItem('bookingdate', date);

        this.checkAvailibility();
    }


    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    editBooking(bookingid, bookingdate, bookingtime, bookingduration, notes, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: bookingid,
                bookingdate: bookingdate,
                bookingtime: bookingtime,
                bookingduration: bookingduration,
                notes: notes,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/editbooking', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ editbooking: response.message, updated: true });
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.availibilityResponse == 200) {
            if (this.state.availableslots != '' && this.state.availableslots != null) {
                const { bookingid, bookingdate, bookingtime, bookingduration, notes, authtoken } = this.state;
                this.editBooking(bookingid, bookingdate, bookingtime, bookingduration, notes, authtoken);
            }
            else if (this.state.availability == false && this.state.availableSlots == null) {
                toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
            }
            else if (this.state.availability == true) {
                const { bookingid, bookingdate, bookingtime, bookingduration, notes, authtoken } = this.state;
                this.editBooking(bookingid, bookingdate, bookingtime, bookingduration, notes, authtoken);
            }
        }
        else {
            toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
        }
    }

    handleModal(e) {
        e.preventDefault();
        window.location = '/customer-bookings';
    }

    render() {

        if (this.state.updated) {
            if (this.state.editbooking == 'The new time that you have selected falls under peak hours and the service is charged at a higher price at this time. Please cancel this service and rebook at your new time.') {

                var displayMessage = (<div className="alert alert-success" role="alert">
                    <p>{this.state.editbooking}</p>
                </div>);
            }
            else {

                var displayMessage = (<div className="alert alert-success" role="alert">
                    <p>You have Successfully updated your booking!</p>
                </div>);
            }
        }

        return (
            <div id="MainPageWrapper">
                <SidebarLinks />
                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            <div class="row coloredBox mb-5">

                                <div className="col-md-12">
                                    {displayMessage}
                                    <div className="booking-tp-rw">
                                        <h3 className="section-title pb-2"><strong>Edit Your Booking Details</strong></h3>

                                        <div className="pb-3">
                                            <h4>Service Name: {this.state.servicetypename}</h4>
                                        </div>
                                    </div>

                                    <form onSubmit={this.handleSubmit} className="editBookingForm">

                                        { this.state.availableSlotAvailibility == false && this.state.availableSlots != null ?
                                            <div className="text-center">
                                                <p>Unfortunately we are fully booked today. Please choose an alternative Date & Time from the list below.</p>
                                                <div class="form-row">
                                                    <div class="col mb-4">
                                                        <select className="form-control" value={this.state.currentDate}
                                                            onChange={this.handleChangeCurrentDate} required>
                                                            <option value="">Select an option</option>
                                                            {this.state.availableSlots.map((slot, index) =>
                                                                <option name={index} value={slot.availableDate} id={index}>{slot.availableDate}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div class="col mb-4">
                                                        <select className="form-control" value={this.state.currentDateSlot}
                                                            onChange={this.handleChangeCurrentDateSlot} required>
                                                            <option value="">Select an option</option>
                                                            {this.state.availibilityTimeSlots.map((slot1) =>
                                                                <option value={slot1}>{slot1}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div>
                                                <div className="md-form pb-3">
                                                    <label>Booking Date</label>
                                                    <ModernDatepicker
                                                        date={this.state.bookingdate}
                                                        format={'YYYY-MM-DD'}
                                                        showBorder
                                                        onChange={(date) => this.handleChangeBookingDate(date)}
                                                        minDate={this.state.yesterdayDate}
                                                        placeholder={'Select a date'} />
                                                </div>
                                                <div className="md-form pb-5">
                                                    <label className="pr-3">Booking Time</label>
                                                    <TimePicker
                                                        showSecond={false}
                                                        defaultValue={this.state.bookingtime}
                                                        onChange={this.handleChangeBookingTime}
                                                        //format={format}
                                                        inputReadOnly
                                                    />
                                                </div>
                                            </div>
                                        }

                                        <div className="md-form pb-5">
                                            <label className="lead">Booking Notes</label>
                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                        </div>

                                        <div className="text-center mb-3">
                                            <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                        </div>
                                        
                                    </form>
                                </div>

                                <div class={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">

                                                <div className="row">
                                                    <div className="col-md-12 d-flex">
                                                        <div>
                                                            <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                                        </div>
                                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                                    </div>
                                                    <div className="col-md-12 text-center fs-18 p-5">
                                                        {this.state.modalMessage}
                                                    </div>
                                                    <div className="col-md-12 text-right">
                                                        <div className="w-100">
                                                            <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
