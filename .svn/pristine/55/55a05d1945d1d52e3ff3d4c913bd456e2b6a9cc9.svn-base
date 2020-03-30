import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import DropIn from "braintree-web-drop-in-react";

export class CheckOut extends React.Component {
    displayName = CheckOut.name
    instance;

    state = {
        clientToken: null,
        bookingid: 0,
        email: "",
        serviceproviderid: 0,
        amount: 0,
        paymentmethodnonce: 'fake-valid-nonce',
        firsname: '',
        surname: '',
        cardtoken: '',
        authtoken: localStorage.getItem('customeraccesstoken'),
        loading: false
    };

    //componentDidMount() {
    //    // Get a client token for authorization from your server
    //    fetch('http://expert.uksouth.cloudapp.azure.com/api/Payment/GenerateToken?authToken=' + localStorage.getItem('customeraccesstoken'))
    //        .then(response => response.json())
    //        .then(response => {
    //            this.setState({ clientToken: response });
    //        });
    //}

    checkOut() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                BookingID: this.state.bookingid,
                Email: this.state.email,
                ServiceProviderID: this.state.serviceproviderid,
                PaymentAmount: this.state.paymentamount,
                PaymentMethodNonce: this.state.paymentmethodnonce,
                Firstname: this.state.firstname,
                Surname: this.state.surname,
                cardtoken: this.state.cardtoken,
                authtoken: this.state.authtoken
            })
        };
        console.log(requestOptions);

        return fetch('http://expert.uksouth.cloudapp.azure.com/api/Payment/Checkout', requestOptions)
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
    }

    render() {

        this.state.bookingid = localStorage.getItem('bookingid');
        this.state.serviceproviderid = localStorage.getItem('bookingProviderId');
        this.state.paymentamount = localStorage.getItem('price');
        this.state.paymentdate = localStorage.getItem('bookingdate');
        this.state.paymentmethodnonce = localStorage.getItem('paymentmethodnonce');
        this.state.email = localStorage.getItem('email');
        this.state.firstname = localStorage.getItem('firstname');
        this.state.surname = localStorage.getItem('surname');
        this.state.cardtoken = localStorage.getItem("customercardtokenmakedefault");
        //alert(this.state.paymentamount + " booking id : " + this.state.bookingid);
        let contents = this.state.loading
            ? this.loadingPaymentLayout()
            : this.paymentLayout();
        return (
            <div>
                {contents}
            </div>
        );

        //if (!this.state.clientToken) {
        //    let contents = this.loadingPaymentLayout();
        //    return <div>
        //        {contents}
        //    </div>;
        //} else {
        //    let contents = this.paymentLayout();
        //    return <div>
        //        {contents}
        //    </div>;
        //}
    }

    loadingPaymentLayout() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div class="spinner-border text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }

    paymentLayout() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">
                                <h3 className="section-title pb-4"><strong>Confirm your Booking</strong></h3>
                                <button onClick={this.checkOut.bind(this)}>Pay now!</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}