import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class BookServiceAgain extends Component {
    displayName = BookServiceAgain.name

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

        localStorage.setItem('isrebooking', params.get('isrebooking'));
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
            original_price: 0,
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

        fetch('http://expert.uksouth.cloudapp.azure.com/api/CustomerProfile/getallcustomeraddress?customerId=' + customerID + '&authToken=' + customerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.address);
                this.setState({ allAddress: data.address, loading: false });
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

        return fetch('http://expert.uksouth.cloudapp.azure.com/api/ServiceType/getservicetypeprice', requestOptions)
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
        return fetch('http://expert.uksouth.cloudapp.azure.com/api/Booking/saveexpertbooking', requestOptions)
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

                    //alert(response.serviceproviderid);
                    if (localStorage.getItem("customercardtokenmakedefault") == '') {
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
            let tst = this.state.price / 2;
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
        this.DoBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, addressid, bookingpreference, genderpreference, notes, serviceproviderid, authtoken);
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
            let contents = this.state.submitTime ? this.noBookingPreferencesValues(this.state.addDatetime) :
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

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="booking-tp-rw">

                                    <h3 className="section-title pb-2"><strong>Booking Details</strong></h3>
                                    <h4>Service Name: {servicetypename}</h4>
                                    <h4>Service Provider: {serviceProvider}</h4>
                                    <h4>Service Duration: {bookinghours}</h4>

                                </div>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="col-md-12">

                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Date</label>
                                            <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                onChange={this.handleChangeBookingDate} required />
                                        </div>

                                        <div>
                                            <div className="md-form">
                                                <label>Booking Time</label>
                                                <select className="form-control" value={this.state.bookingtime}
                                                    onChange={this.handleChangeBookingTime}>
                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                </select>
                                            </div>
                                        </div>

                                        <hr />

                                        <h3 className="section-title pb-2"><strong>Your Addresses</strong></h3>

                                        <div className="col-md-12 pt-5 pb-5 py-5 px-5 mb-5 bordered-block">
                                            {this.state.allAddress.map(adr =>
                                                <div className="row" key={adr.addressID}>
                                                    <div className="col-md-2 radio-btn-wrapper">
                                                        <div className="radio booking-radio-btn">
                                                            <label>
                                                                <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                    onChange={this.handleChangeAddressCheck} required />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <p className="booking-address"> {adr.address}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="section-title pb-2"><strong>Booking Preferences</strong></h3>

                                        <div className="md-form pb-3">
                                            <select className="form-control" value={this.state.genderpreference}
                                                onChange={this.handleChangeGenderPreference} >
                                                <option value="male" selected>Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                        <div className="md-form pb-3">
                                            <select className="form-control" value={this.state.bookingpreference}
                                                onChange={this.handleChangeBookingPreference} >
                                                <option value="single" selected>single</option>
                                                <option value="couple">Couple</option>
                                                <option value="back-to-back">Back to Back</option>
                                            </select>
                                        </div>
                                        <div className="pb-3">
                                            <h4>Service Price</h4>
                                            <p>0.00</p>
                                        </div>

                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Notes</label>
                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Add Booking Notes" />
                                        </div>

                                        <div className="text-center mb-3">
                                            <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
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

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">

                                <h3 className="section-title pb-2"><strong>Booking Details</strong></h3>
                                <h4>Service Name: {servicetypename}</h4>
                                <h4>Service Provider: {serviceProvider}</h4>
                                <h4>Service Duration: {bookinghours}</h4>

                                <form onSubmit={this.handleSubmit}>

                                    <h3 className="section-title pb-2"><strong>Your Addresses</strong></h3>

                                    <div className="col-md-12 pt-5 pb-5 py-5 px-5 bordered-block">
                                        {this.state.allAddress.map(adr =>
                                            <div className="row">
                                                <div className="col-md-2 radio-btn-wrapper">
                                                    <div className="radio booking-radio-btn">
                                                        <label>
                                                            <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                onChange={this.handleChangeAddressCheck} />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className="booking-address"> {adr.address}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-12 pt-5">

                                        <div className="md-form pb-3">
                                            <label>Booking Date</label>
                                            <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                onChange={this.handleChangeBookingDate} required />
                                        </div>

                                        <div>
                                            <div className="md-form pb-5">
                                                <label>Booking Time</label>
                                                <select className="form-control" value={this.state.bookingtime}
                                                    onChange={this.handleChangeBookingTime}>
                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                </select>
                                            </div>
                                            <div className="pb-3">
                                                <h4>Service Price</h4>
                                                <p>0.00</p>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Notes</label>
                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Add Booking Notes" />
                                        </div>

                                        <div className="text-center mb-3">
                                            <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
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

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">

                                <h3 className="section-title pb-2"><strong>Booking Details</strong></h3>
                                <h4>Service Name: {servicetypename}</h4>
                                <h4>Service Provider: {serviceProvider}</h4>
                                <h4>Service Duration: {bookinghours}</h4>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="col-md-12">

                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Date</label>
                                            <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                onChange={this.handleChangeBookingDate} required />
                                        </div>

                                        <div>
                                            <div className="md-form pb-5">
                                                <label>Booking Time</label>
                                                <select className="form-control" value={this.state.bookingtime}
                                                    onChange={this.handleChangeBookingTime} required>
                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                </select>
                                            </div>

                                        </div>

                                        <hr />

                                        <h3 className="section-title pb-2"><strong>Your Addresses</strong></h3>

                                        <div className="col-md-12 pt-5 pb-5 py-5 px-5 mb-5 bordered-block">
                                            {this.state.allAddress.map(adr =>
                                                <div className="row" key={adr.addressID}>
                                                    <div className="col-md-2 radio-btn-wrapper">
                                                        <div className="radio booking-radio-btn">
                                                            <label>
                                                                <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                    onChange={this.handleChangeAddressCheck} required />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <p className="booking-address"> {adr.address}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="section-title pb-2"><strong>Booking Preferences</strong></h3>

                                        <div className="md-form pb-3">
                                            <select className="form-control" value={this.state.genderpreference}
                                                onChange={this.handleChangeGenderPreference} >
                                                <option value="male" selected>Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                        <div className="md-form pb-3">
                                            <select className="custom-select my-1 mr-sm-2" value={this.state.bookingpreference}
                                                onChange={this.handleChangeBookingPreference} >
                                                <option value="0" selected>Single</option>
                                                <option value="1">Couple</option>
                                                <option value="2">Back-to-Back</option>
                                            </select>
                                        </div>
                                        <div className="pb-3">
                                            <h4>Service Price</h4>
                                            <p>{this.state.price} ({addDatetime.price_description})</p>
                                        </div>

                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Notes</label>
                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Add Booking Notes" />
                                        </div>

                                        <div className="text-center mb-3">
                                            <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
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

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">

                                <h3 className="section-title pb-2"><strong>Booking Details</strong></h3>
                                <h4>Service Name: {servicetypename}</h4>
                                <h4>Service Provider: {serviceProvider}</h4>
                                <h4>Service Duration: {bookinghours}</h4>

                                <form onSubmit={this.handleSubmit}>

                                    <h3 className="section-title pb-2"><strong>Your Addresses</strong></h3>

                                    <div className="col-md-12 pt-5 pb-5 py-5 px-5 bordered-block">
                                        {this.state.allAddress.map(adr =>
                                            <div className="row">
                                                <div className="col-md-2 radio-btn-wrapper">
                                                    <div className="radio booking-radio-btn">
                                                        <label>
                                                            <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                onChange={this.handleChangeAddressCheck} />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <p className="booking-address"> {adr.address}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-12 pt-5">

                                        <div className="md-form pb-3">
                                            <label>Booking Date</label>
                                            <input type="date" className="form-control" name="bookingDate" value={this.state.bookingdate}
                                                onChange={this.handleChangeBookingDate} required />
                                        </div>

                                        <div>
                                            <div className="md-form pb-5">
                                                <label>Booking Time</label>
                                                <select className="form-control" value={this.state.bookingtime}
                                                    onChange={this.handleChangeBookingTime} required>
                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                </select>
                                            </div>
                                            <div className="pb-3">
                                                <h4>Service Price</h4>
                                                <p>{addDatetime.price} ({addDatetime.price_description})</p>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="md-form pb-3">
                                            <label>Booking Notes</label>
                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Add Booking Notes" />
                                        </div>

                                        <div className="text-center mb-3">
                                            <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
