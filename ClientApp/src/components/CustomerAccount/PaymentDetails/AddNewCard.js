import * as React from 'react';
import DropIn from "braintree-web-drop-in-react";
import App from '../../../App';

export class AddNewCard extends React.Component {
    displayName = AddNewCard.name
   
    state = {
        clientToken: null,
        authtoken: localStorage.getItem('customeraccesstoken'),
        email: localStorage.getItem('email'),
        paymentmethodnonce: 'fake-valid-nonce',
        updated: false
    };

    componentDidMount() {
        // Get a client token for authorization from your server
        fetch(App.ApisBaseUrl + '/api/Payment/GenerateToken?authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({ clientToken: response });
            });
    }

    booked() {
        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 65);
        console.log(lastVisitPage);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authtoken: this.state.authtoken,
                email: this.state.email,
                paymentmethodnonce: this.state.paymentmethodnonce
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
                this.setState({ cardAdded: response, updated: true });
                if (lastVisitPage == 'http://www.findanexpert.net/your-payment-details') {
                    window.location = lastVisitedUrl;
                }
            });
    }

    render() {
       
        if (this.state.updated) {
            return (
                this.AddedcardDetails()
            );
        }
        else {
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
                                <button onClick={this.booked.bind(this)}>Add now!</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }

    AddedcardDetails() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div className="alert alert-success" role="alert">
                                    <p>You card details are added Successfully!</p>
                                </div>

                                <DropIn
                                    options={{ authorization: this.state.clientToken }}
                                    onInstance={instance => (this.instance = instance)} />
                                <button onClick={this.booked.bind(this)}>Add now!</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}