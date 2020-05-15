import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class CustomerForgotPassword extends Component {
    displayName = CustomerForgotPassword.name

    constructor(props) {
        super(props);
        this.state = {
            forgorpasswordresponse: '', email: '', password: '', submitted: false,
            showModal: '', modalMessage: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetPassword(email, password) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Reset/customerforgetpasswordv2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ forgorpasswordresponse: response.statuscode });
                if (response.statuscode == 200) {
                    this.setState({ emailSent: response, submitted: true });
                    if (this.state.forgorpasswordresponse == 200) {
                        this.setState({ showModal: 'show', modalMessage: response.message });
                    }
                }
                else {
                    toastr['error'](response.message);
                }
            });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.resetPassword(email, password);
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/update-password';
    }

    render() {
        if (this.state.forgorpasswordresponse == '200') {
            let contents = this.state.submitted
                ? this.forgotPasswordSent(this.state.emailSent)
                : this.forgotPassword();
            return <div>
                {contents}
            </div>;
        }
        else {
            let contents = this.state.submitted
                ? this.emailNotExist()
                : this.forgotPassword();
            return <div>
                {contents}
            </div>;
        }
    }

    forgotPassword() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-right mb-4">
                                            <button id="forget_btn" type="submit" className="btn bg-orange text-white">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    forgotPasswordSent(emailSent) {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-right mb-4">
                                            <button id="forget_btn" type="submit" className="btn bg-orange text-white">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <div class={"modal fade " + this.state.showModal} id="fiftyPercentSaleModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
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

    emailNotExist() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    
                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-right mb-4">
                                            <button id="forget_btn" type="submit" className="btn bg-orange text-white">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

}


