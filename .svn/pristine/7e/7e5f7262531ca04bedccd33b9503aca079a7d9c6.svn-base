import React, { Component } from 'react';
import App from '../../App';
import officeImage1 from '../../assets/img/our_office_1.jpg';
import officeImage2 from '../../assets/img/our_office_2.jpg';
import officeImage3 from '../../assets/img/our_office_3.jpg';
import officeImage4 from '../../assets/img/our_office_4.jpg';

export class Help extends Component {
    displayName = Help.name

    constructor() {
        super();

        this.state = { allfaqs: [] };

        fetch(App.ApisBaseUrl + '/api/Policy/getfaqs')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ allfaqs: data.data });

                }
            });
    }

    render() {

        document.getElementsByTagName("META")[2].content = 'At FindanExpert we value you as our business model revolves around customer satisfaction. If you face any problem or have queries about a service, we are always here for help.';
        document.getElementsByTagName("TITLE")[0].text = 'Find an Expert Help Center, contact@findanexpert.net';

        return (
            <div>
                <section className="pt-5 pb-5 contactPage bg-lite-gray">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center font-weight-bolder pageTitle mb-3">Our <span className="text-red">Office</span></h2>
                                <p className="text-center mb-5">31-32 Eastcastle Street London W1W 8DL</p>
                            </div>
                        </div>

                        <div className="row officeImages">
                            <div className="col-md-6 mb-5">
                                <img className="w-100" src={officeImage1} alt="london office" />
                            </div>
                            <div className="col-md-6 mb-5">
                                <img className="w-100" src={officeImage2} alt="london office" />
                            </div>
                        </div>

                        <div className="row officeImages">
                            <div className="col-md-6 mb-5">
                                <img className="w-100" src={officeImage3} alt="london office" />
                            </div>
                            <div className="col-md-6 mb-5">
                                <img className="w-100" src={officeImage4} alt="london office" />
                            </div>
                        </div>

                    </div>
                </section>

                <section className="account-details section-padding helpPage">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="font-weight-bold text-capitalize">Expert help <span className="text-red">center</span></h3>
                            </div>
                        </div>

                        <div className="row text-center pt-5 pb-5 mt-5 mb-5 yes-mobile">
                            <div className="col-xs-4">
                                <a href="tel:+442070997738" className="contact_call_icon text-decoration-none"><span><i className="fas fa-phone"></i></span>
                                    <h4 class="pt-5 text-center text-dark">Call</h4>
                                </a>
                            </div>
                            <div className="col-xs-4">
                                <a href="mailto:contact@findanexpert.net" className="contact_email_icon text-decoration-none"><span><i className="far fa-envelope"></i></span>
                                    <h4 className="pt-5 text-center text-dark">Email</h4>
                                </a>
                            </div>
                            <div className="col-xs-4">
                                <a href="sms:+442070997738" className="contact_message_icon text-decoration-none"><span><i className="far fa-comment-alt"></i></span>
                                    <h4 className="pt-5 text-center text-dark">Message</h4>
                                </a>
                            </div>
                        </div>

                        <div className="row text-center pt-5 pb-5 mt-5 mb-5 no-mobile">
                            <div className="col-md-4">
                                <a href="tel:+442070997738" className="contact_call_icon text-decoration-none"><span><i className="fas fa-phone"></i></span>
                                    <h4 class="pt-5 text-center text-dark">Call</h4>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="mailto:contact@findanexpert.net" className="contact_email_icon text-decoration-none"><span><i className="far fa-envelope"></i></span>
                                    <h4 className="pt-5 text-center text-dark">Email</h4>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="sms:+442070997738" className="contact_message_icon text-decoration-none"><span><i className="far fa-comment-alt"></i></span>
                                    <h4 className="pt-5 text-center text-dark">Message</h4>
                                </a>
                            </div>
                        </div>

                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="topText">
                                    <h4><strong>Frequently Asked <span class="text-red">Questions</span></strong></h4>
                                </div>

                                <div className="accordion md-accordion faqs" id="accordionEx" role="tablist" aria-multiselectable="true">

                                    {this.state.allfaqs.map((faq, index) =>

                                        <div className="card shadow mb-5">

                                            <div className="card-header" role="tab" id={"#faq" + index}>
                                                <a data-toggle="collapse" data-target={"#faq" + index} aria-expanded="true" aria-controls="collapseOne1">
                                                    <h3 className="mb-0 text-dark">
                                                        {faq.question} <i className="fas fa-angle-down rotate-icon"></i>
                                                    </h3>
                                                </a>
                                            </div>

                                            <div id={"faq" + index} className="collapse" role="tabpanel" aria-labelledby={"faq" + index} data-parent="#accordionEx">
                                                <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                            </div>

                                        </div>

                                    )}

                                    {/*Umer => static faq code is backedup on my local pc*/}
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
