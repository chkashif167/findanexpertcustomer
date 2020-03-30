import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import DropIn from "braintree-web-drop-in-react";
import App from '../../App';

export class CheckoutPayment extends React.Component {
    displayName = CheckoutPayment.name
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
        authtoken: localStorage.getItem('customeraccesstoken')
    };

    componentDidMount() {
        // Get a client token for authorization from your server
        fetch(App.ApisBaseUrl + '/api/Payment/GenerateToken?authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => response.json())
            .then(response => {
                this.setState({ clientToken: response });
            });
    }

    booked() {
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
                authtoken: this.state.authtoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Payment/Checkout', requestOptions)
            .then(response => {
                console.log(response);
                localStorage.setItem('checkOutStatus', response.status);
                return response.json()
            })
            .then(response => {
                console.log(response);
                if (localStorage.getItem('checkOutStatus') == '200') {
                    window.location = '/payment-success-message';
                }
            });
    }

    render() {

        this.state.bookingid = localStorage.getItem('bookingid');
        this.state.serviceproviderid = localStorage.getItem('bookingProviderId');
        this.state.paymentamount = localStorage.getItem('servicePrice');
        this.state.paymentdate = localStorage.getItem('bookingdate');
        this.state.paymentmethodnonce = localStorage.getItem('paymentmethodnonce');
        this.state.email = localStorage.getItem('email');
        this.state.firstname = localStorage.getItem('firstname');
        this.state.surname = localStorage.getItem('surname');
        //alert(this.state.paymentamount + " booking id : " + this.state.bookingid);
        if (!this.state.clientToken) {
            let contents = this.loadingPaymentLayout();
            return <div>
                {contents}
            </div>;
        } else {
            let contents = this.paymentLayout();
            return <div>
                {contents}
            </div>;
        }
    }

    loadingPaymentLayout() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <h1>Loading...</h1>

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

                                <DropIn
                                    options={{ authorization: this.state.clientToken }}
                                    onInstance={instance => (this.instance = instance)} />
                                <button onClick={this.booked.bind(this)}>Pay now!</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}