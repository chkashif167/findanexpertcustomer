import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class ActivateCustomer extends Component {
    displayName = ActivateCustomer.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('confirmationtoken');
        const ReturnUrl = params.get('returnurl');

        this.state = {
            activationcode: '', email: '', token: Token, returnurl: '', confirmed: [], resendCodeStatus: '',
            confirm: false, showModal: '', modalMessage: '', showResendBtn: false
        };
    }

    showResendCodeFeild() {
        this.setState({ showResendBtn: true });
    }

    confirmCode() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: this.state.activationcode,
            })
        };

        fetch(App.ApisBaseUrlV2 + '/api/Confirmation/customer', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ confirmed: response, confirm: true });

                if (response.statuscode == 200) {
                    setTimeout(function () {
                        window.location = "/customer-authentication";
                    }, 3000);
                    //this.setState({ modalMessage: this.state.confirmed.message, showModal: 'show' });
                }
                else {
                    //this.setState({ showResendBtn: true });
                    toastr["error"](this.state.confirmed.message);
                }
            });
    }

    resendConfirmationCode(email) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
            })
        };

        fetch(App.ApisBaseUrlV2 + '/api/Confirmation/resendconfirmationcodeV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ confirmed: data, confirm: true });
                if (data.statuscode == 200) {
                    setTimeout(function () {
                        window.location = "/activate-your-account";
                    }, 3000);
                    //this.setState({ modalMessage: data.message, showModal: 'show' });
                } else {
                    toastr["error"](data.message);
                }
            });
    }

    handleChangeActivationCode(e) {
        this.setState({ activationcode: e.target.value });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.activationcode.length < 4 || this.state.activationcode.length > 4) {
            toastr["error"]('Please enter 4 digits code.');
        }
        else {
            this.confirmCode();
        }
    }

    handleResendCode(e) {
        e.preventDefault();
        this.resendConfirmationCode();
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/customer-authentication';
    }

    render() {

        var styles = {
            padding: '0 50px 30px 50px'
        }

        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding fullHeight">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    {this.state.confirmed.statuscode == 200 ?
                                        <div class="alert alert-success" role="alert">
                                            {this.state.confirmed.message}
                                        </div>
                                        : ''
                                    }
                                </div>

                                <div className="col-md-12 signinRegisterWrap">
                                    <div className="Login" style={styles}>
                                        <div className="loginRegisterTopText">
                                            <h3>Verify your Account</h3>
                                            <p>To activate your account. Please enter your verification code below.</p>
                                        </div>
                                        {this.state.showResendBtn == true ?
                                            <form onSubmit={this.handleResendCode.bind(this)}>
                                                <div className="md-form pb-3">
                                                    <input type="email" className="form-control validate" name="email" value={this.state.email}
                                                        onChange={this.handleChangeEmail.bind(this)} placeholder="Your email" required />
                                                </div>
                                                <button className="btn bg-black text-white">Resend Code</button>
                                            </form>
                                            : <form onSubmit={this.handleSubmit.bind(this)}>

                                                <div className="md-form pb-3">
                                                    <input type="tel" className="form-control validate" name="activationcode"
                                                        values={this.state.activationcode} onChange={this.handleChangeActivationCode.bind(this)}
                                                        placeholder="Enter Code" required />
                                                </div>

                                                <div className="md-form pb-3 text-right">
                                                    <input type="button" className="btn bg-transparent p-0"
                                                        onClick={this.showResendCodeFeild.bind(this)} value="Resend code" />
                                                </div>

                                                <div className="text-center mb-3">
                                                    <button type="submit" className="btn bg-orange btn-block text-white">Verify Code</button>
                                                </div>

                                            </form>
                                        }
                                    </div>
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

    //alreadyConfirmAccount() {

    //    if (this.state.confirmed.message != '') {
    //        var displayMessage = (<div className="col-md-12">
    //            <div className="alert alert-danger confirmAccount" role="alert">
    //                <p className="text-white">{this.state.confirmed.message}</p>
    //            </div>
    //        </div>);
    //    }

    //    return (
    //        <div id="MainPageWrapper" >

    //            <section className="account-details section-padding">
    //                <div className="services-wrapper">
    //                    <div className="container">
    //                        <div className="row pb-4">

    //                            {displayMessage}

    //                            {this.state.confirmed.showlink == true ?
    //                                <div className="col-md-12 text-center pt-5">
    //                                    <form onSubmit={this.handleSubmit}>
    //                                        <button className="btn bg-orange text-white" type="submit">Resend Link</button>
    //                                    </form>
    //                                </div>
    //                                : ''
    //                            }

    //                        </div>
    //                    </div>
    //                </div>
    //            </section>

    //            <div class={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
    //                <div class="modal-dialog" role="document">
    //                    <div class="modal-content">
    //                        <div class="modal-body">

    //                            <div className="row">
    //                                <div className="col-md-12 d-flex">
    //                                    <div>
    //                                        <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
    //                                    </div>
    //                                    <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
    //                                </div>
    //                                <div className="col-md-12 text-center fs-18 p-5">
    //                                    {this.state.modalMessage}
    //                                </div>
    //                                <div className="col-md-12 text-right">
    //                                    <div className="w-100">
    //                                        <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
    //                                    </div>
    //                                </div>
    //                            </div>

    //                        </div>
    //                    </div>
    //                </div>
    //            </div>

    //        </div>
    //    );
    //}
}


