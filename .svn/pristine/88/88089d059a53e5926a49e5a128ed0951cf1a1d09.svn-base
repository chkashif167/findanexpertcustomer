import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import App from '../../App';
import toastr from 'toastr';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { paymentmethodid: '' , message: '', addPaymentMethodResponse: '', complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {

        var lastPageUrl = [];
        var lastPageUrl = document.referrer.split("/");
        console.log(lastPageUrl);
        var getLastVisitedPage = lastPageUrl[3];
        console.log(getLastVisitedPage);

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
                    postalcode: localStorage.getItem("postalcode"),
                    authtoken: localStorage.getItem('customeraccesstoken')
                })
            };

            console.log(requestOptions);

            fetch(App.ApisBaseUrl + '/api/Payment/stripeaddpaymentmethod', requestOptions)
                .then(response => {
                    console.log(response);
                    this.setState({ addPaymentMethodResponse: response.status });
                    //if (response.status == 200) {
                        return response.json();
                    //}
                })
                .then(response => {
                    console.log(response);
                    this.setState({ message: response.message, complete: true });
                    this.setState({ paymentmethodid: response.stripepaymentmethodid });

                    if (this.state.addPaymentMethodResponse == '200') {

                        localStorage.setItem("customercardtokenmakedefault", response.stripepaymentmethodid);
                        toastr["success"]("Payment added succesfully!");

                        if (getLastVisitedPage == 'booking') {
                            if (this.state.addPaymentMethodResponse == '200') {

                                const requestCardOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        customer_id: localStorage.getItem('customerid'),
                                        booking_id: localStorage.getItem('bookingid'),
                                        voucherusedamount: localStorage.getItem('voucherusedamount'),
                                        voucherremainingamount: localStorage.getItem('voucherremainingamount'),
                                        cancel: false,
                                        authtoken: localStorage.getItem('customeraccesstoken')
                                    })
                                };

                                console.log(requestCardOptions);

                                fetch(App.ApisBaseUrl + '/api/GiftVoucher/savegiftvouchercreditsusage', requestCardOptions)
                                    .then(response => {
                                        console.log(response);
                                        this.setState({ saveGiftVoucherCreditsUsageResponse: response.status });
                                        console.log(this.state.saveGiftVoucherCreditsUsageResponse);
                                        //if (this.state.saveGiftVoucherCreditsUsageResponse == 409) {
                                        //    this.setState({ modalMessage: 'You already used Voucher Credit. Please Book your Service again', showModal: 'show' });
                                        //}
                                        return response.json();
                                    })
                                    .then(response => {
                                        console.log(response);
                                        //if (localStorage.getItem('customerVoucherCredit') > 0) {

                                        //    localStorage.setItem('customerVoucherCredit', response.lastremainingbalance);
                                        //    console.log(localStorage.getItem('customerVoucherCredit'));
                                        //}
                                        //else if (this.state.saveGiftVoucherCreditsUsageResponse != 409) {

                                        const requestOptions = {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                servicename: localStorage.getItem('servicename'),
                                                stripepaymentmethodid: this.state.paymentmethodid,
                                                bookingid: localStorage.getItem('bookingid'),
                                                serviceproviderid: localStorage.getItem('bookingProviderId'),
                                                paymentamount: localStorage.getItem('servicePrice'),
                                                referral_bonus_used: false,
                                                authtoken: localStorage.getItem('customeraccesstoken'),
                                                stripecurrency: 'gbp'
                                            })
                                        };

                                        console.log(requestOptions);

                                        return fetch(App.ApisBaseUrl + '/api/Payment/stripeholdpayments', requestOptions)
                                            .then(response => {
                                                console.log(response);
                                                localStorage.setItem('paymentCheckOutStatus', response.status);
                                                return response.json()
                                            })
                                            .then(response => {
                                                console.log(response);
                                                this.setState({ response, loading: true });
                                                if (localStorage.getItem('paymentCheckOutStatus') == '200') {
                                                    window.location = '/payment-success-message';
                                                }
                                            });
                                        //}
                                    });
                            }
                        }
                        else if (getLastVisitedPage == 'gift-vouchers') {
                            window.location = 'gift-vouchers';
                        }
                        else {
                            window.location = 'your-payment-details';
                        }
                    }
                    else if (this.state.addPaymentMethodResponse == '400') {

                        toastr["error"](response.message);
                    }
                });
        }
    }

    render() {
        //if (this.state.complete) {
        //    var displayMessgae = (<div className="alert alert-success">Card information added successfully!</div>);
        //}

        return (
            <div className="checkout">
                <CardElement />
                <button className="btn bg-orange mt-4 text-white" onClick={this.submit}>Save Payment Method</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);