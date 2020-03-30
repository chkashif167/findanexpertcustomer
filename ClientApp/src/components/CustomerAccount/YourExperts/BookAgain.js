import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import App from '../../../App';

export class BookAgain extends Component {
    displayName = BookAgain.name

    constructor() {
        super();

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerID = localStorage.getItem('customerid');
        var customerEmail = localStorage.getItem('email');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceid = params.get('serviceid');
        const servicename = params.get('servicename');
        localStorage.setItem('servicename', params.get('servicename'));

        const servicetypeid = params.get('servicetypeid');
        const servicetypename = params.get('servicetypename');
        

        const bookinghours = params.get('bookinghours');
        const serviceProvider = params.get('serviceProvider');
        const bookingProviderId = params.get('serviceproviderid');
        console.log(bookingProviderId);

        localStorage.setItem('isrebooking', 'true');
        console.log(localStorage.getItem('isrebooking'));

        if (localStorage.getItem('servicename') == 'Massage') {
            var BookingPreference = 'single';
            var GenderPreference = 'male';
        } else {
            var BookingPreference = 'na';
            var GenderPreference = 'na';
        }

        this.state = {
            allAddress: [],
            price: 0,            
            original_price : 0,
            loading: true,
            shown: true,
            customerid: customerID,
            customeremail: customerEmail,
            serviceid: serviceid,
            servicetypeid: servicetypeid,
            serviceproviderid: bookingProviderId,
            bookingdate: new Date(),
            bookingtime: '',
            bookinghours: bookinghours,
            postalcode: '',
            addressid: '',
            bookingpreference: BookingPreference,
            genderpreference: GenderPreference,
            notes: '',
            authtoken: customerAccesstoken,
            booked: false,
            addresscheck: [],
            submitTime: false
        };

        this.ToggleSingle = this.ToggleSingle.bind(this);
        this.Togglecouple = this.Togglecouple.bind(this);

        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeAddressCheck = this.handleChangeAddressCheck.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleChangeBookingPreference = this.handleChangeBookingPreference.bind(this);
        this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/CustomerProfile/getallcustomeraddress?customerId=' + customerID + '&authToken=' + customerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.address);
                this.setState({ allAddress: data.address, loading: false });
            });

        //-- Request Card Info --//
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);


        fetch(App.ApisBaseUrl + '/api/Payment/requestcardinfo', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                console.log(data.error);
                this.setState({ allCards: data, loading: false });
                console.log(this.state.allCards.length);
                if (this.state.allCards.length == 0) {
                    localStorage.removeItem('customercardtokenmakedefault');
                }
            });
    }


    onTimeChange(time) {
        this.setState({ time });
    }

    ToggleSingle() {
        this.setState({
            shown: !this.state.shown
        });
    }
    Togglecouple() {
        this.setState({
            shown: !this.state.shown
        });
    }

    AddBookingTimeDate(bookingtimeVal) {
        var servicetypeID = localStorage.getItem('servicetypeid');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Bookingtime: bookingtimeVal,
                servicetypeid: servicetypeID
            })
        };

        return fetch(App.ApisBaseUrl + '/api/ServiceType/getservicetypeprice', requestOptions)
            .then(response => {
                //console.log(response.json());
                return response.json();
            })
            .then(response => {
                if (response != null) {
                    //alert(response.price);
                    localStorage.setItem('servicePrice', response.price);
                    this.setState({ addDatetime: response, submitTime: true });
                    this.setState({ price: response.price });
                    this.setState({ original_price: response.price });
                    localStorage.setItem('price', response.price);
                    console.log(this.state.addDatetime);
                }
                else {
                    this.setState({ addDatetime: null, submitTime: false });
                }
            });
    }

    handleChangeBookingTime(e) {
        this.setState({ bookingtime: e.target.value });
        //const { bookingtime } = this.state;
        this.AddBookingTimeDate(e.target.value);
        localStorage.setItem('bookingTime', e.target.value);
    }

    DoBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, addressid, bookingpreference, genderpreference, notes, serviceproviderid, authtoken) {
        //alert(genderpreference);

        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerid: customerid,
                customeremail: customeremail,
                serviceid: serviceid,
                servicetypeid: servicetypeid,
                bookingdate: bookingdate,
                bookingtime: bookingtime,
                bookinghours: bookinghours,
                addressid: addressid,
                bookingpreference: bookingpreference,
                genderpreference: genderpreference,
                notes: notes,
                serviceproviderid: serviceproviderid,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);
        return fetch(App.ApisBaseUrl + '/api/Booking/saveexpertbooking', requestOptions)
            .then(response => {
                console.log(response);
                localStorage.setItem('saveexpertbookingStatus', response.status);
                if (response.status == '200') {
                    return response.json()
                }
                else {
                    alert('Service provider not available at that time.');
                }
            })
            .then(response => {
                console.log(response);
                if (localStorage.getItem('saveexpertbookingStatus') == '200') {
                    localStorage.setItem('bookingid', response.bookingid);
                    localStorage.setItem('bookingProviderId', response.serviceproviderid);
                    localStorage.setItem('bookingdate', bookingdate);
                    console.log(localStorage.getItem('bookingdate'));
                    localStorage.setItem('paymentmethodnonce', 'fake-valid-nonce');

                    this.setState({ bookings: response, booked: true });

                    if (localStorage.getItem("customercardtokenmakedefault") == null) {
                        window.location = '/payment';
                    } else {
                        window.location = '/checkout';
                    }
                }
            });
    }

    handleChangeAddressCheck(e) {
        this.setState({ addresscheck: e.target.id });
        localStorage.setItem('addressid', e.target.id);
        this.setState({ addresscheck: e.target.className });
        localStorage.setItem('postalcode', e.target.className);
        //alert(e.target.id);
        //alert(e.target.className);
    }

    handleChangeBookingDate(e) {
        this.setState({ bookingdate: e.target.value });
    }

    handleChangeBookingPreference(e) {
        this.setState({ bookingpreference: e.target.value });
        if (e.target.value == '1' || e.target.value == '2') {
            let tst = this.state.original_price;
            this.setState({ price: tst * 2 });
            localStorage.setItem('price', tst * 2);
        } else {
            let tst = this.state.price/2;
            this.setState({ price: tst });
            localStorage.setItem('price', tst);
        }
    }

    handleChangeGenderPreference(e) {
        this.setState({ genderpreference: e.target.value });
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, addressid, bookingpreference, genderpreference, notes, serviceproviderid, authtoken } = this.state;
        //alert(genderpreference);
        this.DoBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, addressid, bookingpreference, genderpreference, notes, serviceproviderid, authtoken ); 
    }

    render() {
        if (localStorage.getItem('servicename') == 'Massage') {
            let contents = this.state.submitTime
                ? this.yesBookingPreferencesValues(this.state.addDatetime)
                : this.yesBookingPreferences();
            return <div>
                {contents}
            </div>;
        } else {
            let contents = this.state.submitTime ? this.noBookingPreferencesValues(this.state.addDatetime):            
            this.noBookingPreferences();
            return <div>
                {contents}
            </div>;
        }        
    }

    yesBookingPreferences() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('servicetypename');
        const serviceProvider = params.get('serviceProvider');
        const bookinghours = params.get('bookinghours');

        return (

            <div id="MainPageWrapper">

                <section class="sub-header box-show-bottom p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong></strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Booking Details</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="lead mb-0 duration">{bookinghours} Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                            onChange={this.handleChangeBookingDate} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Time</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingtime}
                                                            onChange={this.handleChangeBookingTime}>
                                                            <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Booking Preferences</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Gender</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.genderpreference}
                                                            onChange={this.handleChangeGenderPreference} >
                                                            <option value="na">Please Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="na">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Status</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingpreference}
                                                            onChange={this.handleChangeBookingPreference} >
                                                            <option value="single" selected>single</option>
                                                            <option value="couple">Couple</option>
                                                            <option value="back-to-back">Back to Back</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Your Addresses</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                {this.state.allAddress.map(adr =>
                                                    <div class="form-check">
                                                        <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                            onChange={this.handleChangeAddressCheck} required />
                                                        <label class="form-check-label">
                                                            <p className="lead">{adr.address}</p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Service Price</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                <p>0.00</p>
                                            </div>
                                        </div>

                                        <div className="row p-4">
                                            <div className="col-md-12">
                                                <div className="md-form">
                                                    <label className="lead">Booking Notes</label>
                                                    <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 p-0">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
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

    noBookingPreferences() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('servicetypename');
        const serviceProvider = params.get('serviceProvider');
        const bookinghours = params.get('bookinghours');

        return (

            <div id="MainPageWrapper">

                <section class="sub-header box-show-bottom p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong></strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Booking Details</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="lead mb-0 duration">{bookinghours} Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                            onChange={this.handleChangeBookingDate} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Time</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingtime}
                                                            onChange={this.handleChangeBookingTime}>
                                                            <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Your Addresses</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                {this.state.allAddress.map(adr =>
                                                    <div class="form-check">
                                                        <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                            onChange={this.handleChangeAddressCheck} required />
                                                        <label class="form-check-label">
                                                            <p className="lead">{adr.address}</p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Service Price</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                <p>0.00</p>
                                            </div>
                                        </div>

                                        <div className="row p-4">
                                            <div className="col-md-12">
                                                <div className="md-form">
                                                    <label className="lead">Booking Notes</label>
                                                    <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 p-0">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
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


    yesBookingPreferencesValues(addDatetime) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('servicetypename');
        const serviceProvider = params.get('serviceProvider');
        const bookinghours = params.get('bookinghours');

        return (

            <div id="MainPageWrapper">

                <section class="sub-header box-show-bottom p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong></strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Booking Details</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="lead mb-0 duration">{bookinghours} Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                            onChange={this.handleChangeBookingDate} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Time</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingtime}
                                                            onChange={this.handleChangeBookingTime}>
                                                            <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Booking Preferences</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Gender</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.genderpreference}
                                                            onChange={this.handleChangeGenderPreference} >
                                                            <option value="na">Please Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="na">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Status</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingpreference}
                                                            onChange={this.handleChangeBookingPreference} >
                                                            <option value="single" selected>single</option>
                                                            <option value="couple">Couple</option>
                                                            <option value="back-to-back">Back to Back</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Your Addresses</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                {this.state.allAddress.map(adr =>
                                                    <div class="form-check">
                                                        <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                            onChange={this.handleChangeAddressCheck} required />
                                                        <label class="form-check-label">
                                                            <p className="lead">{adr.address}</p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Service Price</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                <p><span className="lead text-red">{this.state.price}</span> ({addDatetime.price_description})</p>
                                            </div>
                                        </div>

                                        <div className="row p-4">
                                            <div className="col-md-12">
                                                <div className="md-form">
                                                    <label className="lead">Booking Notes</label>
                                                    <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 p-0">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
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

    noBookingPreferencesValues(addDatetime) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('servicetypename');
        const serviceProvider = params.get('serviceProvider');
        const bookinghours = params.get('bookinghours');

        return (

            <div id="MainPageWrapper">

                <section class="sub-header box-show-bottom p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong></strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Booking Details</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="lead mb-0 duration">{bookinghours} Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row p-5">
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Date</label>
                                                    <div class="col-sm-9">
                                                        <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                            onChange={this.handleChangeBookingDate} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pt-3">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Booking Time</label>
                                                    <div class="col-sm-9">
                                                        <select className="form-control" value={this.state.bookingtime}
                                                            onChange={this.handleChangeBookingTime}>
                                                            <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Your Addresses</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                {this.state.allAddress.map(adr =>
                                                    <div class="form-check">
                                                        <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                            onChange={this.handleChangeAddressCheck} required />
                                                        <label class="form-check-label">
                                                            <p className="lead">{adr.address}</p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row bookingPageTpRw bg-half-white p-4">
                                            <div className="col-md-12">
                                                <p className="lead mb-0 service-name"><strong>Service Price</strong></p>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 pt-3">
                                                <p><span className="lead text-red"> {addDatetime.price}</span>({addDatetime.price_description})</p>
                                            </div>
                                        </div>

                                        <div className="row p-4">
                                            <div className="col-md-12">
                                                <div className="md-form">
                                                    <label className="lead">Booking Notes</label>
                                                    <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-5">
                                            <div className="col-md-12 p-0">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
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
