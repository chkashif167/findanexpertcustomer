import React, { Component } from 'react';
import App from '../../App';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class DisplayCustomerConsent extends Component {
    displayName = DisplayCustomerConsent.name


    constructor(props) {
        super(props);

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerid = localStorage.getItem("customerid");
        var customeremail = localStorage.getItem("email");

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const srvtypename = params.get('srvtypename');
        const bookingid = params.get('bookingid');

        var Key = localStorage.getItem('key');
        console.log(Key);

        this.state = {
            consentContent: [],
            accepted: true,
            consentkey: '',
            bookingid: bookingid,
            authtoken: customerAccesstoken,
            added: false,
            showModal: '', modalMessage: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Policy/getconsentform?bookingid=' + this.state.bookingid + '&authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ consentContent: data });
                this.setState({ consentkey: data.consentkey });
            });
    }

    acceptConsent(bookingid, accepted, consentkey) {

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 59);
        console.log(lastVisitPage);

        var customerAccesstoken = localStorage.getItem('customeraccesstoken')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(bookingid),
                isaccepted: accepted,
                consentkey: consentkey,
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Policy/savebookingconsent', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ modalMessage: 'Consent accepted successfully', showModal: 'show' });
                }
                else if (response.statuscode == '409') {
                    toastr['info'](response.message);
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { bookingid, accepted, consentkey } = this.state;
        this.acceptConsent( bookingid, accepted, consentkey );
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/customer-bookings';
    }

    render() {
        return (
            this.customerConsent(this.state.consentContent)
        );
    }

    customerConsent(consentContent) {

        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            <div class="row coloredBox mb-5">

                                <div className="col-md-12">
                                    <div className="service-decription">
                                        <h3 className="section-title pb-2"><strong className="text-dark">Consent Form</strong></h3>
                                        <div class="serviceDec" dangerouslySetInnerHTML={{ __html: consentContent.content }} />
                                        <hr class="my-4" />
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="text-center mb-3">
                                                <button type="submit" className="btn bg-black btn-block text-white z-depth-1a">I Do Accept</button>
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
