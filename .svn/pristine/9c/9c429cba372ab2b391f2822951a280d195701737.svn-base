import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import App from '../../App';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

class AddNewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentmethodid: '', message: '', addPaymentMethodResponse: '', complete: false,
            postalcode: '',
            apiResponse: '',
            showModal: '',
            modalMessage: ''
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Address/getcustomeraddresses?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ getAddressApiResponse: data.statuscode });
            })
    }

    async submit(ev) {

        let { token } = await this.props.stripe.createToken({ name: "Name" });

        if (token == undefined) {
            toastr["error"]("Invalid card details");
        }
        else {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stripetoken: token.id,
                    firstname: localStorage.getItem("firstname"),
                    surname: localStorage.getItem("surname"),
                    postalcode: this.state.getAddressApiResponse == 200 ? localStorage.getItem("postalcode") : this.state.postalcode,
                    authtoken: localStorage.getItem('customeraccesstoken')
                })
            };

            console.log(requestOptions);

            fetch(App.ApisBaseUrlV2 + '/api/Payment/addstripepaymentcardV2', requestOptions)
                .then(response => {
                    console.log(response);
                    this.setState({ addPaymentMethodResponse: response.status });
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    this.setState({ message: response.message, complete: true });

                    if (response.statuscode == 200) {

                        localStorage.setItem("customercardtokenmakedefault", response.stripePaymentMethodId);
                        console.log(console.log(localStorage.getItem("customercardtokenmakedefault")));
                        this.setState({ modalMessage: "Payment added succesfully!", showModal: 'show' });
                    }
                    else if (response.statuscode == 400) {

                        toastr["error"](response.message);
                    }
                });
        }
    }

    handleChangePostalCode(e) {

        this.setState({ postalcode: e.target.value });
    }

    handleModal(e) {
        e.preventDefault();

        var lastPageUrl = [];
        var lastPageUrl = document.referrer.split("/");
        var getLastVisitedPage = lastPageUrl[3];

        this.setState({ showModal: null });
        if (getLastVisitedPage == 'duration-summary' || getLastVisitedPage == 'generic-summary' ||
            getLastVisitedPage == 'course-summary' || getLastVisitedPage == 'areas-summary') {

            window.location = document.referrer;
        }
        else if (getLastVisitedPage == 'gift-vouchers') {
            window.location = 'gift-vouchers';
        }
        else {
            window.location = 'your-payment-details';
        }
    }

    render() {

        return (
            <div className="checkout">
                <CardElement />
                {this.state.getAddressApiResponse == 200 ?
                    ''
                    : <div className="form-row pt-3">
                        <div class="col-md-3">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode.bind(this)} required />
                        </div>
                    </div>
                }
                <button className="btn bg-orange mt-4 text-white" onClick={this.submit.bind(this)}>Save Payment Method</button>

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
        );
    }
}

export default injectStripe(AddNewCard);