import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';
import officeImage1 from '../../assets/img/our_office_1.jpg';
import officeImage2 from '../../assets/img/our_office_2.jpg';
import officeImage3 from '../../assets/img/our_office_3.jpg';
import officeImage4 from '../../assets/img/our_office_4.jpg';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class ContactUs extends Component {
    displayName = ContactUs.name

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            sendEmail: '',
            showModal: '',
            modalMessage: ''
        };
    }

    sendContactEmail(name, email, subject, message) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
            })
        };

        return fetch(App.ApisBaseUrlV2 + '/api/Email/contactus_email', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ modalMessage: 'Your message has been sent successfully.', showModal: 'show' });
                }
                else {
                    toastr["error"](response.message);
                }
            });
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangeSubject(e) {
        this.setState({ subject: e.target.value });
    }

    handleChangeMessage(e) {
        this.setState({ message: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, subject, message} = this.state;
        this.sendContactEmail( name, email, subject, message );
    }

    handleModal(e) {
        e.preventDefault();
        this.state.showModal = null;
        window.location = "/contact-us";
    }

    render() {

        document.getElementsByTagName("META")[2].content = 'Our clinics offer relaxing, welcoming and comfortable environment. Find an Expert is a services provider that uses the aid of technology to connect service providers with customers.';
        document.getElementsByTagName("TITLE")[0].text = 'Contact Us - Find an Expert';

        /*Facebook open graphy meta tags*/
        document.getElementsByTagName("META")[3].content = 'Contact Us - Find an Expert';
        document.getElementsByTagName("META")[4].content = 'website';
        document.getElementsByTagName("META")[5].content = 'https://expert-tst.findanexpert.net/contact-us';
        document.getElementsByTagName("META")[6].content = 'https://expert-tst.findanexpert.net/static/media/web_banner1.dc222d46.png';
        document.getElementsByTagName("META")[7].content = 'expert is the name of innovation in London, UK. The Expert App is the only platform you can book any service and book the right person for the right job.';
        document.getElementsByTagName("META")[8].content = 'findanexpert';

        /*Twitter card meta tags*/
        document.getElementsByTagName("META")[9].content = 'summary_large_image';
        document.getElementsByTagName("META")[10].content = 'findanexpert';
        document.getElementsByTagName("META")[11].content = 'findanexpert';
        document.getElementsByTagName("META")[12].content = 'Contact Us - Find an Expert';
        document.getElementsByTagName("META")[13].content = 'Our clinics offer relaxing, welcoming and comfortable environment. Find an Expert is a services provider that uses the aid of technology to connect service providers with customers.';
        document.getElementsByTagName("META")[14].content = 'https://expert-tst.findanexpert.net/static/media/web_banner1.dc222d46.png';

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

                <section className="pt-5 pb-5 contactPage">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center font-weight-bolder pageTitle">Contact <span className="text-red">Us</span></h2>
                            </div>
                        </div>

                        <div className="row no-mobile">
                            <div className="col-md-8 offset-md-2">
                                <div className="row text-center pt-5 pb-5 no-mobile">
                                    <div className="col-md-4">
                                        <a href="tel:+442070997738" className="contact_call_icon">
                                            <span>
                                                <i class="fas fa-phone"></i>
                                            </span>
                                            <h4 className="pt-5 text-center text-dark">Call</h4>
                                        </a>
                                    </div>
                                    <div className="col-md-4">
                                        <a href="mailto:contact@findanexpert.net" className="contact_email_icon">
                                            <span>
                                                <i class="far fa-envelope"></i>
                                            </span>
                                            <h4 className="pt-5 text-center text-dark">Email</h4>
                                        </a>
                                    </div>
                                    <div className="col-md-4">
                                        <a href="sms:tel:02070997738" className="contact_message_icon">
                                            <span>
                                                <i class="far fa-comment-alt"></i>
                                            </span>
                                            <h4 className="pt-5 text-center text-dark">Message</h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row text-center pt-5 pb-5 yes-mobile">
                            <div className="col-xs-4">
                                <a href="tel:+442070997738" className="contact_call_icon">
                                    <span>
                                        <i class="fas fa-phone"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Call</h4>
                                </a>
                            </div>
                            <div className="col-xs-4">
                                <a href="mailto:contact@findanexpert.net" className="contact_email_icon">
                                    <span>
                                        <i class="far fa-envelope"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Email</h4>
                                </a>
                            </div>
                            <div className="col-xs-4">
                                <a href="sms:tel:02070997738" className="contact_message_icon">
                                    <span>
                                        <i class="far fa-comment-alt"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Message</h4>
                                </a>
                            </div>
                        </div>

                        <div className="row yes-mobile">
                            <div className="col-md-10 offset-md-1 mb-5 mt-5">
                                <div className="p-5 shadow">
                                    <h2 className="pb-5 font-weight-bolder text-center">Get In <span className="text-red">Touch!</span></h2>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Your Name" className="form-control"
                                                value={this.state.name} onChange={this.handleChangeName.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Your Email" className="form-control"
                                                value={this.state.email} onChange={this.handleChangeEmail.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="subject" placeholder="Your Subject" className="form-control"
                                                value={this.state.subject} onChange={this.handleChangeSubject.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" className="form-control" placeholder="Your Message..." cols="5" rows="5"
                                                value={this.state.message} onChange={this.handleChangeMessage.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn bg-orange btn-block text-white btnround">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row no-mobile">
                            <div className="col-md-8 offset-md-2">
                                <div className="p-5 shadow">
                                    <h2 className="pb-5 font-weight-bolder text-center">Get In <span className="text-red">Touch!</span></h2>
                                    <form onSubmit={this.handleSubmit.bind(this)} className="pl-5 pr-5 ml-5 mr-5">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Your Name" className="form-control"
                                                value={this.state.name} onChange={this.handleChangeName.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Your Email" className="form-control"
                                                value={this.state.email} onChange={this.handleChangeEmail.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="subject" placeholder="Your Subject" className="form-control"
                                                value={this.state.subject} onChange={this.handleChangeSubject.bind(this)} required />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" className="form-control" placeholder="Your Message..." cols="5" rows="5"
                                                value={this.state.message} onChange={this.handleChangeMessage.bind(this)} required />
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="submit" className="btn bg-orange text-white btnround">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <div class={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">

                                <div className="row">
                                    <div className="col-md-12 d-flex">
                                        <div>
                                            <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                        </div>
                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                    </div>
                                    <div className="col-md-12 text-center fs-18 p-5">
                                        {this.state.modalMessage}
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <div className="w-100">
                                            <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}