import React, { Component } from 'react';
import { SidebarLinks } from './SidebarLinks';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class ChangePassword extends Component {
    displayName = ChangePassword.name

    constructor(props) {
        super(props);
        var customerEmail = localStorage.getItem('email');
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        this.state = {
            email: customerEmail, password: '', newpassword: '', confirmpassword: '', authtoken: customerAccesstoken, update: false, showModal: '', modalMessage: ''
        };

        console.log(this.state.accesstoken);

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UpdatePassword(password, newpassword, confirmpassword, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json-patch+json'
            },
            body: JSON.stringify({
                oldpassword: password,
                newpassword: confirmpassword,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Customer/changepasswordV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ showModal: 'show', modalMessage: 'Your Password has been updated!' });
                }
                else {
                    toastr['error'](data.message);
                }
            });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeNewPassword(e) {
        this.setState({ newpassword: e.target.value });
    }

    handleChangeConfirmPassword(e) {
        this.setState({ confirmpassword: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password, newpassword, confirmpassword } = this.state;
        if (this.state.newpassword != this.state.confirmpassword) {
            toastr['error']('New and confirm password do not match!');
        }
        if (this.state.newpassword.length < 8) {
            toastr['error']('Please enter atleast 8 characters!');
        }
        else {
            this.UpdatePassword(password, newpassword, confirmpassword);
        }
        
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null })
        window.location = '/profile';
    }

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        if (localStorage.getItem('customerPasswordUpdateStatus') == '200') {
            let contents = this.state.update
                ? this.PasswordUpdated(this.state.Updated)
                : this.PasswordUpdate();
            return <div>
                {contents}
            </div>;
        }
        else {
            let contents = this.state.update
                ? this.wrongePassword()
                : this.PasswordUpdate();
            return <div>
                {contents}
            </div>;
        }
    }

    PasswordUpdate() {
        return (
            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">
                                    
                                    <form onSubmit={this.handleSubmit}>
                                       
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
                                        </div>

                                    </form>
                                </div>
                            </div>

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
                    </div>
                </section>

            </div>
        );
    }

    wrongePassword(newpassword, confirmpassword) {
        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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

    passwordMismatch() {
        return (
            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-9 pt-4 pb-4">
                                    <div className="alert alert-danger">
                                        Password do not match.
                                    </div>
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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

    PasswordUpdated() {
        return (
            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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
}