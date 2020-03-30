import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import DropIn from "braintree-web-drop-in-react";
import App from '../App';

export class Payments extends React.Component{
    displayName = Payments.name
    instance;

    state = {
        clientToken: null,
        bookingid: 0,
        email : "",
        serviceproviderid:0,
        amount: 0
    };

    componentDidMount() {
        // Get a client token for authorization from your server
        fetch(App.ApisBaseUrl + '/api/Payment/GenerateToken/')
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
                Email : this.state.email,
                ServiceProviderID: this.state.serviceproviderid,
                PaymentAmount: this.state.amount
            })
        };

        return fetch(App.ApisBaseUrl + '/api/Payment/Checkout/', requestOptions);
    }

    render() {

        this.state.bookingid = 1;
        this.state.serviceproviderid = 2;
        this.state.amount = 50.00;
        this.state.email = "customer.selteq@mailinator.com";

        if (!this.state.clientToken) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        } else
        {
            return (
                <div>
                    <DropIn
                        options={{ authorization: this.state.clientToken }}
                        onInstance={instance => (this.instance = instance)}
                    />
                    <button onClick={this.booked.bind(this)}>Pay now!</button>
                </div>
             );
        }
    }
}