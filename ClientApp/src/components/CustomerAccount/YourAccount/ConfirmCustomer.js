import React, { Component } from 'react';
import App from '../../../App';

export class ConfirmCustomer extends Component {
    displayName = ConfirmCustomer.name

    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('confirmationtoken');

        super(props);
        this.state = { token: Token, confirm: false };

        console.log(this.state.token);

        fetch(App.ApisBaseUrl + '/api/Confirmation/confirmcustomer?confirmationtoken=' + this.state.token)
            .then(response => {
                console.log(response);
                localStorage.setItem('customerConfirmationMessage', response);
                if (response != 'Link expired because your account has been already confirmed. Thanks!') {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ confirmed: response, confirm: true });

                }
            });
    }

    render() {
        if (localStorage.getItem('providerConfirmationMessage') != 'Link expired because your account has been already confirmed. Thanks!') {
            return (
                this.confirmAccount()
            ) 
        }
        else {
            return (
                this.alreadyConfirmAccount()
            )
        }
    }

    confirmAccount() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="alert alert-success" role="alert">
                                        <p>Your account has been confirmed! Now you can login to your account.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    alreadyConfirmAccount() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="alert alert-danger" role="alert">
                                        <p>Link expired because your account has been already confirmed. Thanks!</p>
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


