import React, { Component } from 'react';
import App from '../../App';

export class PrivacyPolicy extends Component {
    displayName = PrivacyPolicy.name

    constructor(props) {
        super(props);

        this.state = {
            privacyPolicyContent: '',
            registered: false
        };

        fetch(App.ApisBaseUrl + '/api/Policy/getcustomerprivacypolicycontent')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ privacyPolicyContent: response });
                }
            });
    }

    render() {
        return (
            
            <section className="account-details section-padding bg-half-white">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <h3 className="section-title pb-4"><strong>Privacy Policy</strong></h3>

                                <div className="topText">

                                    <div dangerouslySetInnerHTML={{ __html: this.state.privacyPolicyContent.policycontent }} />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}
