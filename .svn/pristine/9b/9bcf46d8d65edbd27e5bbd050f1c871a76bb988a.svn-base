import React, { Component } from 'react';
import App from '../../App';

export class SaveReferral extends Component {
    displayName = SaveReferral.name

    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('referraltoken');

        super(props);
        this.state = { token: Token, confirm: false };

        console.log(this.state.token);

        fetch(App.ApisBaseUrl + '/api/Referral/savereference?referraltoken=' + this.state.token + '&authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                if (this.state.token != '') {
                    return response.json();
                }
                else {
                    alert('Incorrect Token');
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
        let contents = this.state.confirm
            ? this.ReferralReceived()
            : <p><em>Loading...</em></p>;
        return <div>
            {contents}
        </div>;
    }

    ReferralReceived() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="alert alert-success" role="alert">
                                        <p>Congratulations! Your referral has been confirm.</p>
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

    
