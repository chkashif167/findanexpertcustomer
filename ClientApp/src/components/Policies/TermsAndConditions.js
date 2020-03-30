import React, { Component } from 'react';
import App from '../../App';

export class TermsAndConditions extends Component {
    displayName = TermsAndConditions.name

    constructor(props) {
        super(props);

        this.state = {
            termsandConditionContent: '',
            registered: false
        };

        fetch(App.ApisBaseUrl + '/api/Policy/getcustomertermsandconditioncontent')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ termsandConditionContent: response });
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

                                    <div dangerouslySetInnerHTML={{ __html: this.state.termsandConditionContent.termscontent }} />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}
