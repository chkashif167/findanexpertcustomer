import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';
import { Link } from 'react-router-dom';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class CustomerPaymentDetails extends Component {
    displayName = CustomerPaymentDetails.name

    constructor(props) {
        super(props);
        this.state = { apiResponse: '', allCards: [], cardsList: [], loading: true };

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        console.log(localStorage.getItem("customercardtokenmakedefault"));
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Payment/striperequestcardlistV2?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ apiResponse: data.statuscode });
                if (this.state.apiResponse == '404') {
                    localStorage.removeItem('customercardtokenmakedefault');
                }
                else if (this.state.apiResponse == '200') {
                    this.setState({ allCards: data.paymentMethodList, loading: false });
                    localStorage.setItem('customercardtokenmakedefault', this.state.allCards[0].id);
                }
            });
    }

    getCardToken(e) {
        localStorage.setItem('customercardtoken', e.target.id);
    }

    handleSubmit(e) {
        e.preventDefault();

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customercardtoken = localStorage.getItem("customercardtoken");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentmethodid: customercardtoken,
                authtoken: customerAccesstoken
            })
        };

        return fetch(App.ApisBaseUrlV2 + '/api/Payment/striperemovepaymentcardV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.statuscode == 200) {
                    window.location = '/your-payment-details';
                }
            });
    }

    getCardToken4Default(e) {
        localStorage.setItem('customercardtokenmakedefault', e.target.id);
    }

    handleMakeDefault(e) {
        e.preventDefault();
        //alert(localStorage.getItem("serviceproviderserviceid"));

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customercardtoken = localStorage.getItem("customercardtokenmakedefault");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: customerEmail,
                authtoken: customerAccesstoken,
                cardtoken: customercardtoken,
                paymentmethodnonce: "fake-valid-nonce",
                makedefault: true
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Payment/addpaymentmethod', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    //this.setState({ cardRemoveMsg: response.message });
                    //console.log(this.state.cardRemoveMsg);
                    //alert('You just made this Card default!');
                    window.location = '/your-payment-details';
                }
            });
    }

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        return (
            this.getCustomerCards(this.state.allCards)
        );
    }

    getCustomerCards(allCards) {
        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">

                                    <div className="row mb-5">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn bg-black text-white float-right">
                                                <a href="/payment" className="text-white">Add New Card Details</a>
                                            </button>
                                        </div>
                                    </div>

                                    {this.state.apiResponse == '200' ?
                                        allCards.map(cards =>
                                            <div className="row pb-4">
                                                <div className="col-md-6 mb-4">
                                                    <div className="card colored-card">
                                                        <div className="card-body d-flex flex-row profileBox">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-8">
                                                                        <div className="mr-5">
                                                                            <h5 className="card-title"><strong>Card No:</strong> **** **** **** {cards.card.last4}</h5>
                                                                            <p className="card-text"><strong>Expiry Date:</strong> {cards.card.expMonth} / {cards.card.expYear}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4 text-right pt-5">
                                                                        <input type="submit" className="btn text-white bg-orange" value="Remove" data-toggle="modal" data-target="#deletecard"
                                                                            id={cards.id} onClick={this.getCardToken} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal fade" id="deletecard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog st-mw-30" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12 d-flex">
                                                                            <div>
                                                                                <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                                                            </div>
                                                                            <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                                                        </div>
                                                                        <div className="col-md-12 text-center fs-18 p-5">
                                                                            Are you sure you want to Delete this Card?
                                                                            </div>
                                                                        <div className="col-md-12 d-flex text-right">
                                                                            <form className="pt-3 w-100 paymentDeleteCardModal" onSubmit={this.handleSubmit}>
                                                                                <button type="submit" className="st_sp_l_btn btn text-white bg-orange" name="remove"
                                                                                >Remove</button>
                                                                            </form>
                                                                            <Link to="" className="btn bg-black text-white mt-3 ml-3" data-dismiss="modal">Cancel</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : <div className="row pb-4">
                                            <div className="col-md-12">
                                                <p className="profileBox">No card details to show.</p>
                                            </div>
                                        </div>
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>

        );
    }

    noCustomerCards() {
        localStorage.removeItem('customercardtokenmakedefault');
        console.log(localStorage.getItem("customercardtokenmakedefault"));
        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">

                                    <div className="row pb-4">

                                        <div className="col-md-12 mb-5">
                                            {this.state.getAddressApiResponse == 200 ?
                                                <button type="submit" className="btn bg-black text-white float-right">
                                                    <a href="/payment" className="text-white">Add New Card Details</a>
                                                </button>
                                                : <button type="submit" className="btn bg-black text-white float-right">
                                                    <a href="/add-address" className="text-white">Add New Card Details</a>
                                                </button>
                                            }
                                        </div>

                                        <div className="col-md-12">
                                            <p className="profileBox">No card details to show.</p>
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