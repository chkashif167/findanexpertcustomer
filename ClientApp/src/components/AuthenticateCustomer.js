import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import loader from '../assets/img/loader.gif';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import headerporfileicon from '../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class AuthenticateCustomer extends Component {
    displayName = AuthenticateCustomer.name

    constructor(props) {

        var lastVisitedUrl = window.document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        super(props);
        this.state = {
            email: '', password: '', allAddresses: [],
            authenticatedCustomer: [], submitted: false,
            returnURL: lastVisitedPage, lastVisitedUrl: lastVisitedUrl, showModal: '', modalMessage: '',
        };
    }

    login(email, password) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                deviceid: "web",
                deviceplatform: "web"
            })
        };

        return fetch(App.ApisBaseUrlV2 + '/api/SignIn/customersignin', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                var str = response.message;
                var str_pos = str.indexOf("activate");
                var str_pos1 = str.indexOf("email");
                var str_pos2 = str.indexOf("confirmed");

                if (response.statuscode == 404 || response.statuscode == 400) {

                    if (str_pos > -1 && str_pos1 > -1 || str_pos2 > -1 && str_pos1 > -1) {
                        this.setState({ modalMessage: response.message, showModal: 'show' });
                    }
                    else {
                        toastr["error"](response.message);
                    }
                }
                else if (response.statuscode == 409) {

                    if (str_pos > -1 && str_pos1 > -1 || str_pos2 > -1 && str_pos1 > -1) {
                        this.setState({ modalMessage: response.message, showModal: 'show' });
                    }
                    else {
                        toastr["error"](response.message);
                    }
                }
                else if (response.statuscode == 200) {

                    this.setState({ authenticatedCustomer: response, submitted: true });
                    localStorage.setItem("customeraccesstoken", response.authtoken);
                    localStorage.setItem("firstname", response.firstname);
                    localStorage.setItem("lastname", response.lastname);
                    localStorage.setItem("gender", response.gender);
                    localStorage.setItem("genderpreference", response.genderpreference);
                    localStorage.setItem("mobile", response.mobile);
                    localStorage.setItem("dob", response.dob);
                    localStorage.setItem("email", email);
                    localStorage.setItem("isprofilecompleted", response.isprofilecompleted);

                    var lastVisitedUrl = window.document.referrer;
                    var lastVisitedUrlArray = [];
                    var lastVisitedUrlArray = lastVisitedUrl.split("/");
                    var lastVisitedPage = lastVisitedUrlArray[3];

                    //if (response.isprofilecompleted == false) {
                    //    window.location = '/edit-profile';
                    //}
                    if (lastVisitedPage == '/services') {
                        window.location = lastVisitedUrl;
                    }
                    else {
                        window.location = '/';
                    }
                }
            });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.password.length < 8) {
            toastr["error"]('Please enter atleast 8 characters.');
        }
        else {
            const { email, password } = this.state;
            this.login(email, password);
        }
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/activate-your-account';
    }

    render() {
        let contents = this.state.submitted
            ? <div className="loginLoader"><img src={loader} /></div>
            : this.renderSignInScreen();
        return <div>
            {contents}
        </div>;
    }

    renderSignInScreen() {

        return (
            <div>
                <div className="Login">

                    <div className="loginRegisterTopText">
                        <h3>Already have an Account?</h3>
                        <p>Welcome back! please sign in</p>
                    </div>

                    <form onSubmit={this.handleSubmit.bind(this)}>

                        <div className="md-form pb-3">
                            <input type="text" className="form-control validate" name="username" values={this.state.email}
                                onChange={this.handleChangeEmail.bind(this)} placeholder="Email Address" required />
                        </div>

                        <div className="md-form pb-3">
                            <input type="password" className="form-control validate" name="password" value={this.state.password}
                                onChange={this.handleChangePassword.bind(this)} placeholder="Password" required />
                        </div>

                        <div className="md-form pb-3">
                            <p className="font-small blue-text d-flex justify-content-end">
                                <Link to="/forgot-password-link" className="blue-text">Forgot Password?</Link>
                            </p>
                        </div>

                        <div className="text-center mb-3">
                            <button type="submit" className="btn bg-orange btn-block text-white">Sign In</button>
                        </div>

                    </form>
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
        );

    }
}