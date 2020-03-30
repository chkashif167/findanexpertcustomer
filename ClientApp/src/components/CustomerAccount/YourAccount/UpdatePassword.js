import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class CustomerUpdatePassword extends Component {
    displayName = CustomerUpdatePassword.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('token');
        
        this.state = {
            checkresetpasswordcodeResponse: '', resetcode: '', password: '', customerupdatepassresponse: '',
            email: '', showResendBtn: false, resendCodeStatus: '', confirmPassword: '', update: false, submitCodeButtonId: '', showModal: '', showMessage: ''
        };

        this.handleChangeResetcode = this.handleChangeResetcode.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleCodeSubmit = this.handleCodeSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    }

    sendResetCode() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                resetcode: this.state.resetcode
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Reset/checkresetpasswordcodeV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ checkresetpasswordcodeResponse: data.statuscode });
                if (data.statuscode == 200) {
                    this.setState({ showModal: 'show', showMessage: data.message });
                }
                else {
                    this.setState({ showResendBtn: true });
                    toastr['error'](data.message);
                }
            });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    resendConfirmationCode(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
            })
        };

        fetch(App.ApisBaseUrlV2 + '/api/Reset/resendforgetpasswordcode', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ confirmed: data, confirm: true });
                if (data.statuscode == 200) {
                    toastr["success"](data.message);
                    setTimeout(function () {
                        window.location = "/activate-your-account";
                    }, 1000);
                    //this.setState({ modalMessage: data.message, showModal: 'show' });
                } else {
                    toastr["error"](data.message);
                }
            });
    }

    updatePassword(resetcode, password) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                resetcode: resetcode,
                newpassword: password
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Reset/resetpasswordV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ customerupdatepassresponse: data.statuscode });
                if (data.statuscode == 200) {
                    this.setState({ showModal: 'show', showMessage: data.message });
                }
                else {
                    toastr['error'](data.message);
                }
            });
    }

    handleChangeResetcode(e) {
        this.setState({ resetcode: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    handleCodeSubmit(e) {
        e.preventDefault();
        const { resetcode } = this.state;
        this.sendResetCode(this.state.resetcode);
    }

    handlePasswordSubmit(e) {
        e.preventDefault();
        const { resetcode, password } = this.state;
        if (this.state.password == this.state.confirmPassword) {
            this.updatePassword(resetcode, password);
        } else {
            toastr['error']('Passwords do not match!');
        }
    }

    handleModalBtn(e) {
        this.setState({ showModal: '' });
        if (this.state.customerupdatepassresponse == 200) {
            window.location = '/customer-authentication';
        }
    }

    render() {
        let contents = this.state.update
            ? this.forgotPasswordSent(this.state.updated)
            : this.forgotPassword();
        return <div>
            {contents}
        </div>;
    }

    forgotPassword() {

        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    {(this.state.checkresetpasswordcodeResponse == '200') ?
                                        <form onSubmit={this.handlePasswordSubmit} className="signinRegisterWrap p-5">
                                            <div className="md-form pb-3 text-center">
                                                <h3>Change Password</h3>
                                            </div>
                                            <div className="md-form pb-4">
                                                <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter new password" required />
                                            </div>

                                            <div className="md-form pb-4">
                                                <input type="password" className="form-control validate" name="confirmpassword" value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} placeholder="Confirm new password" required />
                                            </div>
                                            <div className="text-center mb-4">
                                                <button type="submit" className="btn bg-orange text-white btn-block"
                                                    onClick={this.submiPassword}>Update</button>
                                            </div>
                                        </form>
                                        : this.state.showResendBtn == true ?
                                            <form onSubmit={this.resendConfirmationCode.bind(this)} className="signinRegisterWrap p-5">
                                                <div className="md-form pb-3">
                                                    <input type="email" className="form-control validate" name="email" value={this.state.email}
                                                        onChange={this.handleChangeEmail.bind(this)} placeholder="Your email" required />
                                                </div>
                                                <button className="btn bg-black text-white">Resend Code</button>
                                            </form>
                                            : <form onSubmit={this.handleCodeSubmit} className="signinRegisterWrap p-5">
                                                <div className="md-form pb-3 text-center">
                                                    <h3>Change Password</h3>
                                                </div>

                                                <div className="md-form pb-4">
                                                    <input type="number" className="form-control validate" name="resetcode" value={this.state.resetcode} onChange={this.handleChangeResetcode} placeholder="Enter code" required />
                                                </div>
                                                <div className="text-center mb-4">
                                                    <button id="sendCode" type="submit" className="btn bg-orange text-white btn-block"
                                                        onClick={this.submitResetCode}>Update</button>
                                                </div>
                                            </form>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div class={"modal fade " + this.state.showModal} id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
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
                                        {this.state.showMessage}
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <div className="w-100">
                                            <a class="btn bg-black text-white float-right ml-3" onClick={this.handleModalBtn.bind(this)}>OK</a>
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

    forgotPasswordSent(update) {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Change Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="number" className="form-control validate" name="resetcode" values={this.state.resetcode} onChange={this.handleChangeResetcode} placeholder="Enter code" required />
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="password" className="form-control validate" name="password" values={this.state.password} onChange={this.handleChangePassword} placeholder="Enter new password" required />
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="password" className="form-control validate" name="confirmpassword" values={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} placeholder="Confirm new password" required />
                                        </div>

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange btn-block text-white">Update</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div class={"modal fade " + this.state.showModal} id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
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
                                        {this.state.showMessage}
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <div className="w-100">
                                            <a class="btn bg-black text-white float-right ml-3" onClick={this.handleModalBtn.bind(this)}>OK</a>
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

