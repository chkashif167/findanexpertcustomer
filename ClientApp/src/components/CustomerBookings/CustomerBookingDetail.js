import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class CustomerBookingDetail extends Component {
    displayName = CustomerBookingDetail.name


    constructor(props) {
        super(props);
        var customerid = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        
        const bookingid = params.get('bookingid');
        const bookingdate = params.get('bookingdate');
        const bookingtime = params.get('bookingtime');
        const servicetypename = params.get('servicetype');
        const bookingNotes = params.get('bookingnotes');
        const serviceprovider = params.get('serviceprovider');
        const serviceproviderid = params.get('serviceproviderid');
        const isconsentaccepted = params.get('isconsentaccepted');
        
        this.state = {
            customerid: customerid,
            bookingid: bookingid,
            serviceid: '0',
            servicetypeid: '0',
            bookingconfirmed: false,
            bookingdate: bookingdate,
            bookingtime: bookingtime,
            iscancelled: true,
            notes: '',
            serviceproviderid: serviceproviderid,
            isconsentaccepted: isconsentaccepted,
            authtoken: customerAccesstoken,
            updated: false,
            showModal: '',
            modalMessage: '',
        };

        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    cancelBooking(bookingid, notes, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(bookingid),
                notes: notes,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Booking/cancelbookingV2', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log(response);
                this.setState({ cancelbooking: response, updated: true });
                if (response.statuscode == 200) {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            bookingid: parseInt(bookingid),
                            authtoken: authtoken
                        })
                    };
                    console.log(requestOptions);

                    return fetch(App.ApisBaseUrlV2 + '/api/Payment/stripecaptureamountforcancelbookingV2', requestOptions)
                        .then(response => {
                            return response.json()
                        })
                        .then(response => {
                            console.log(response);
                            if (response.statuscode == 200) {
                                this.setState({ modalMessage: "Your booking has been cancelled.", showModal: 'show' });
                            }
                            else {
                                toastr["error"](response.message);
                            }
                        });
                }
            });
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/customer-bookings';
    }

    handleSubmit(e) {
        e.preventDefault();
        const { bookingid, notes, authtoken } = this.state;
        this.cancelBooking(bookingid, notes, authtoken );
    }

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const bookingdate = params.get('bookingdate');
        const bookingid = params.get('bookingid');
        const servicename = params.get('servicename');
        const servicetypename = params.get('servicetype');
        const bookingNotes = params.get('bookingnotes');
        const serviceprovider = params.get('serviceprovider');

        return (
            <div id="MainPageWrapper">
                <SidebarLinks />

                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            <div class="row coloredBox mb-5">

                                <div className="col-md-12">
                                    <div className="service-decription">
                                        <h3 className="section-title pb-2"><strong className="text-dark">Service:</strong> <span className="text-gray">{servicetypename}</span></h3>
                                        <h3 className="section-title pb-2"><strong className="text-dark">Service Provider:</strong> <span className="text-gray">{serviceprovider}</span></h3>
                                        {bookingNotes != null ?
                                            <p>
                                                <strong>Notes:</strong> {bookingNotes}
                                            </p>
                                            : <p>
                                                <strong>Notes:</strong> You have added no notes
                                            </p>
                                        }
                                        <p>
                                            <strong>Date:</strong> {bookingdate.slice('0', 10)}
                                        </p>

                                        <hr class="my-4" />
                                        {this.state.isconsentaccepted == 'false' ?
                                            <a className="btn btn-large bg-orange text-white float-right" href={'/customer-consent/?' +
                                                btoa(encodeURIComponent('bookingid=' + bookingid))}>Consent Form</a>
                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row pb-4 coloredBox mb-5 pt-4">

                                <div className="col-md-12">
                                    <div>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

                                                <div className="card">

                                                    <div className="card-header" role="tab" id="headingOne1">
                                                        <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                                                            aria-controls="collapseOne1">
                                                            <h3 className="mb-0">
                                                                Want to Cancel this Booking? <i className="fas fa-angle-down rotate-icon"></i>
                                                            </h3>
                                                        </a>
                                                    </div>

                                                    <div id="collapseOne1" className="collapse" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                                        <div className="card-body">
                                                            <div className="md-form pb-3">
                                                                <label>Reasons</label>
                                                                <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Tell us why you are cancelling this Booking"
                                                                    required />
                                                            </div>
                                                            <div className="text-right mb-3">
                                                                <button className="btn btn-lg bg-orange text-white" type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

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
                </section>
            </div>
        );
    }
}


