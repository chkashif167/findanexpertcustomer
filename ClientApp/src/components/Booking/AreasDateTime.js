import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { locale } from 'moment';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import Loader from '../../assets/img/loader.gif';
import App from '../../App';
import toastr from 'toastr';

export class AreasDateTime extends Component {
    displayName = AreasDateTime.name

    constructor() {
        super();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceType = params.get('serviceType');
        const categoryid = params.get('categoryid');
        const servicetypeid = params.get('servicetypeid');
        console.log(servicetypeid);
        const servicetypename = params.get('servicetypename');
        const inhouse = params.get('inhouse');
        const inclinic = params.get('inclinic');
        const bookingid = params.get('bookingid');
        const bookingduration = params.get('bookingduration');
        const totalprice = params.get('totalprice');
        const isfreeconsultation = params.get('isfreeconsultation');
        const hasclickedfreeconsultation = params.get('hasclickedfreeconsultation');


        this.state = {
            serviceType: serviceType,
            categoryid: categoryid,
            servicetypeid: servicetypeid,
            servicetypename: servicetypename,
            bookingduration: bookingduration,
            postalcode: '',
            bookingid: bookingid,
            totalprice: totalprice,
            isfreeconsultation: isfreeconsultation,
            authtoken: localStorage.getItem("customeraccesstoken"),
            allAddress: [],
            inClinicAddressList: [],
            inClinicAddress: [],
            genderpreference: 0,
            genderPreferenceList: [],
            addressid: 0,
            inhouse: inhouse,
            inclinic: inclinic,
            inHouse: '',
            inClinic: '',
            bookingdate: '',
            bookingtime: '',
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
        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
    }

    componentDidMount() {

        fetch(App.ApisBaseUrlV2 + '/api/Address/getcustomeraddresses?authtoken=' + this.state.authtoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ allAddress: data.addresslist });
                console.log(this.state.allAddress);
                this.setState({ inClinicAddressList: data.clinicaddresslist });
                console.log(this.state.inClinicAddressList);
            });
    }

    handleChangeGenderPreference(e) {
        var checkBox = document.getElementById(e.target.id);
        this.setState({ genderpreference: e.target.value });
        localStorage.setItem('gendpreference', e.target.value);

        if (checkBox.checked == true) {
            this.state.genderPreferenceList.push(e.target.value);
        }
        else if (checkBox.checked == false) {
            let index = this.state.genderPreferenceList.indexOf(e.target.value);
            this.state.genderPreferenceList.splice(index, 1);
        }

        if (this.state.addressid != '' && this.state.bookingdate != '' && this.state.bookingtime != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    getInclinicAddress(e) {

        if (localStorage.getItem('InClininc') == 'true') {

            var showCustomerAddress = (
                <div class="col-sm-9 bookingPageAddressWrap">
                    {this.state.inClinicAddressList.map(adr =>
                        <div class="form-check bookingPageAddress">
                            <input type="radio" className={adr.postalcode} id={adr.addressid} name="inclinicAddress"
                                onChange={this.handleChangeAddressCheck.bind(this)} required />
                            <label class="form-check-label" for={adr.addressid}>
                                <p className="lead">
                                    {adr.address.split(',').map(function (item, key) {
                                        return (
                                            <span key={key}>
                                                {item}
                                                <br />
                                            </span>
                                        )
                                    })}
                                </p>
                            </label>
                            <p className="postalCode m-0 pt-4 text-uppercase text-dark">{adr.postalcode}</p>
                        </div>
                    )}
                </div>
            );

            this.setState({ inClinicAddress: showCustomerAddress });
        }
        else if (localStorage.getItem('InHouse') == 'true') {

            var showCustomerAddress = (
                <div class="col-sm-9 bookingPageAddressWrap">
                    {this.state.allAddress != null ?
                        this.state.allAddress.map(adr =>
                            <div class="form-check bookingPageAddress">
                                <input type="radio" className={adr.postalcode} id={adr.addressid} name="rdoNewAddress"
                                    onChange={this.handleChangeAddressCheck.bind(this)} required />
                                <label class="form-check-label" for={adr.addressid}>
                                    <p className="lead">
                                        {adr.address.split('\n').map(function (item, key) {
                                            return (
                                                <span key={key}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}
                                    </p>
                                </label>
                                <p className="postalCode m-0 pt-4 text-uppercase text-dark">{adr.postalcode}</p>
                            </div>
                        )
                        : <p>You have no address. Please add address.</p>
                    }
                </div>
            );

            this.setState({ inClinicAddress: showCustomerAddress });
        }
    }

    handleChangeInclinic(e) {

        this.setState({ inClinic: e.target.name });
        localStorage.setItem('InClininc', e.target.name);
        localStorage.removeItem('InHouse');

        this.getInclinicAddress();


        if (localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderpreference != '' : this.state.genderpreference == ''
            && this.state.addressid != '' && this.state.bookingdate != '' && this.state.bookingtime != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    handleChangeInhouse(e) {

        this.setState({ inHouse: e.target.name });
        localStorage.setItem('InHouse', e.target.name);
        localStorage.removeItem('InClininc');

        this.getInclinicAddress();

        if (localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderpreference != '' : this.state.genderpreference == ''
            && this.state.addressid != '' && this.state.bookingdate != '' && this.state.bookingtime != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    handleChangeAddressCheck(e) {

        this.setState({ addressid: e.target.id });
        this.setState({ postalcode: e.target.className });

        if (localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderpreference != '' : this.state.genderpreference == ''
            && this.state.bookingdate != '' && this.state.bookingtime != '') {
            if (localStorage.getItem('providerid') != null) {
                this.getAvailabilitySlots();
            }
            else {
                this.checkServiceProviderAvailability();
            }
            this.setState({ loader: true });
        }
    }

    handleAddNewAddress(e) {
        var bookingPageUrl = window.location.href;
        localStorage.setItem('bookingUrlIfUserAddNewAddress', bookingPageUrl);
        window.location = '/add-address';
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

        if (localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderpreference != '' : this.state.genderpreference == ''
            && this.state.addressid != '' && this.state.bookingtime != '') {
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

        if (localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderpreference != '' : this.state.genderpreference == ''
            && this.state.addressid != '' && this.state.bookingdate != '') {
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

        if (this.state.inhouse == 'true' && this.state.inclinic == 'false' || this.state.inhouse == 'false' && this.state.inclinic == 'true') {
            if (this.state.inhouse == 'true') {
                var inhouseVal = this.state.inhouse;
                var inclinicVal = false;
            }
            else if (this.state.inclinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (this.state.inhouse == 'true' && this.state.inclinic == 'true' || this.state.inclinic == 'false' && this.state.inhouse == 'false') {
            if (localStorage.getItem('InClininc') != null) {
                var inclinicVal = true;
                var inhouseVal = false;
            }
            else {
                var inclinicVal = false;
                var inhouseVal = true;
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                servicetypeid: parseInt(this.state.servicetypeid),
                bookingduration: parseInt(this.state.bookingduration),
                bookingtime: localStorage.getItem('bookingTime'),
                categoryid: parseInt(this.state.categoryid),
                bookingdate: localStorage.getItem('bookingdate'),
                postalcode: this.state.postalcode,
                genderpreference: localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderPreferenceList.length == 1 ? this.state.genderpreference : 'both' : 'both',
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
        var bookingDuration = parseInt(this.state.bookingduration);

        fetch(App.ApisBaseUrlV2 + '/api/Provider/getavailabilityslots?providerid=' + providerId +
            '&bookingDuration=' + bookingDuration + '&bookingTime=' + localStorage.getItem('bookingTime') +
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

    /*----------------------
     Booking APIS
    ------------------------*/
    saveBookingDateTime(bookingid, addressid, genderpreference, location, bookingdate, bookingtime, notes, authtoken) {

        if (this.state.inhouse == 'true' && this.state.inclinic == 'false' || this.state.inhouse == 'false' && this.state.inclinic == 'true') {
            if (this.state.inhouse == 'true') {
                var location = 'inhouse';
            }
            else if (this.state.inclinic == 'true') {
                var location = 'inclinic';
            }
        }
        else if (this.state.inhouse == 'true' && this.state.inclinic == 'true' || this.state.inclinic == 'false' && this.state.inhouse == 'false') {
            if (localStorage.getItem('InClininc') != null) {
                var location = 'inclinic';
            }
            else {
                var location = 'inhouse';
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(bookingid),
                addressid: parseInt(addressid),
                genderpreference: localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderPreferenceList.length == 1 ? this.state.genderpreference : 'both' : 'both',
                location: location,
                bookingdate: localStorage.getItem('bookingdate'),
                bookingtime: bookingtime,
                notes: notes,
                authtoken: authtoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Booking/savebookingdatetime', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    if (this.state.isfreeconsultation == 'true') {
                        window.location = '/areas-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingid +
                            '&totalprice=' + this.state.totalprice + '&isfreeconsultation=' + this.state.isfreeconsultation + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                    }
                    else {
                        window.location = '/areas-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingid +
                            '&totalprice=' + this.state.totalprice + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                    }
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.availibilityResponse == 200) {
            if (this.state.availableslots != '' && this.state.availableslots != null) {
                const { bookingid, addressid, genderpreference, location, bookingdate, bookingtime, notes, authtoken } = this.state;
                this.saveBookingDateTime(bookingid, addressid, genderpreference, location, bookingdate, bookingtime, notes, authtoken);
            }
            else if (this.state.freeavailableslots.availability == false && this.state.freeavailableslots.availableSlots == null) {
                toastr["error"]('Unfortunately no service provider available at ' + localStorage.getItem('bookingdate') + '.Please choose an alternative Date & Time.');
            }
            else if (this.state.availability == true) {
                const { bookingid, addressid, genderpreference, location, bookingdate, bookingtime, notes, authtoken } = this.state;
                this.saveBookingDateTime(bookingid, addressid, genderpreference, location, bookingdate, bookingtime, notes, authtoken);
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

        /*-----Show Inhouse, Inclinic addresses------*/
        if (this.state.inclinic == 'true' & this.state.inhouse == 'true' || this.state.inclinic == 'false' & this.state.inhouse == 'false') {

            var incliniceInhouseItems = (
                <div className="col-md-12 pt-3 inclinicInhouseMainCol">
                    <div className="col-md-6 pl-0 inclinicInhouseCol">
                        <label class="col-form-label pb-4">I want the service at</label>
                        <div className="cardWrapWithShadow inclinicInhouseWrapper">
                            <div class="form-group row">
                                <div class="col-sm-4 inclinicInhouse">
                                    <div class="form-check">
                                        <input type="radio" name="true" id="0" value={this.state.inHouse}
                                            onChange={this.handleChangeInhouse.bind(this)} required />
                                        <label class="form-check-label" for="0">
                                            <p className="font-weight-normal">My place</p>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4 inclinicInhouse">
                                    <div class="form-check">
                                        <input type="radio" name="true" id="1" value={this.state.inClinic}
                                            onChange={this.handleChangeInclinic.bind(this)} required />
                                        <label class="form-check-label" for="1">
                                            <p className="font-weight-normal">Expert center</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            var showAddresses = ((this.state.inClinicAddressList.length == 0) ?
                <div class="col-sm-9 bookingPageAddressWrap">
                    {this.state.allAddress != null ?
                        this.state.allAddress.map(adr =>
                            <div class="form-check bookingPageAddress">
                                <input type="radio" className={adr.postalcode} id={adr.addressid} name="rdoNewAddress"
                                    onChange={this.handleChangeAddressCheck.bind(this)} required />
                                <label class="form-check-label" for={adr.addressid}>
                                    <p className="lead">
                                        {adr.address.split('\n').map(function (item, key) {
                                            return (
                                                <span key={key}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}
                                    </p>
                                </label>
                                <p className="postalCode m-0 pt-4 text-uppercase text-dark">{adr.postalcode}</p>
                            </div>
                        )
                        : <p>You have no address. Please add address.</p>
                    }
                </div>
                : this.state.inClinicAddress
            );
        }
        else if (this.state.inclinic == 'true') {

            var showAddresses = (
                <div class="col-sm-9 bookingPageAddressWrap">
                    {this.state.inClinicAddressList.map(adr =>
                        <div class="form-check bookingPageAddress">
                            <input type="radio" className={adr.postalcode} id={adr.addressid} name="rdoNewAddress"
                                onChange={this.handleChangeAddressCheck.bind(this)} required />
                            <label class="form-check-label" for={adr.addressid}>
                                <p className="lead">
                                    {adr.address.split(',').map(function (item, key) {
                                        return (
                                            <span key={key}>
                                                {item}
                                                <br />
                                            </span>
                                        )
                                    })}
                                </p>
                            </label>
                            <p className="postalCode m-0 pt-4 text-uppercase text-dark">{adr.postalcode}</p>
                        </div>
                    )}
                </div>
            );
        }
        else if (this.state.inhouse == 'true') {

            var showAddresses = (
                <div class="col-sm-9 bookingPageAddressWrap">
                    {this.state.allAddress != null ?
                        this.state.allAddress.map(adr =>
                            <div class="form-check bookingPageAddress">
                                <input type="radio" className={adr.postalcode} id={adr.addressid} name="rdoNewAddress"
                                    onChange={this.handleChangeAddressCheck.bind(this)} required />
                                <label class="form-check-label" for={adr.addressid}>
                                    <p className="lead">
                                        {adr.address.split('\n').map(function (item, key) {
                                            return (
                                                <span key={key}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}
                                    </p>
                                </label>
                                <p className="postalCode m-0 pt-4 text-uppercase text-dark">{adr.postalcode}</p>
                            </div>
                        )
                        : <p>You have no address. Please add address.</p>
                    }
                </div>
            );
        }

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
                                            <p className="lead mb-0 service-name text-white">{this.state.servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit.bind(this)} className="bookingPageForm">

                                        {localStorage.getItem('requiredgenderpreference') == 'true' ?
                                            <div className="row pt-4 pb-4">
                                                <div className="col-md-12 genderPreferenceWrap">
                                                    <label class="col-form-label pb-4">I want my Service Provider to be</label>
                                                    <div className="cardWrapWithShadow genderPreferences">
                                                        <div class="form-group row m-0">

                                                            <div class="col-sm-4 pl-0 m-0">
                                                                <div class="form-check pl-3">
                                                                    <input type="checkbox" name="genderPreference" id="genderPreference1" value="male"
                                                                        onChange={this.handleChangeGenderPreference.bind(this)} />
                                                                    <label class="form-check-label" for="genderPreference1">
                                                                        <p className="font-weight-normal">Male</p>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="checkbox" name="genderPreference" id="genderPreference2" value="female"
                                                                        onChange={this.handleChangeGenderPreference.bind(this)} />
                                                                    <label class="form-check-label" for="genderPreference2">
                                                                        <p className="font-weight-normal">Female</p>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                        }

                                        <div className="row pt-4 pb-4">

                                            {incliniceInhouseItems}

                                            <div className="col-md-12 pt-5 addressesWraper">
                                                {(this.state.inHouse != '' && localStorage.getItem('InHouse') != null) ?
                                                    <label class="addressLabel col-form-label pb-4">Send my Expert to</label>
                                                    : <label class="addressLabel col-form-label pb-4">Service venue will be</label>
                                                }

                                                {this.state.inclinic == 'true' && this.state.inhouse == 'false' ?
                                                    ''
                                                    : <div class=" text-right pb-4 addressTitle">
                                                        <a class="btn btn-transparent text-dark" onClick={this.handleAddNewAddress.bind(this)}>
                                                            <i class="fas fa-plus text-red pr-2"></i> Add new address
                                                        </a>
                                                    </div>
                                                }

                                                <div className="cardWrapWithShadow">
                                                    <div class="form-group row">
                                                        {showAddresses}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row pt-4 pb-4">
                                            <label class="col-form-label pb-4 pl-3 iWantMyServiceOn">I want my service on</label>
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
                                                                        onChange={this.handleChangeBookingTime}
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
                                                    {this.state.bookingdate != '' && this.state.bookingtime != ''
                                                        && this.state.addresscheck != '' ?
                                                        <button className="btn btn-lg bg-orange text-white"
                                                            type="submit">Next Step</button>
                                                        : ''
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
