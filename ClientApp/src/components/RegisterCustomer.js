import React, { Component } from 'react';
import App from '../App';
import loader from '../assets/img/loader.gif';
import toastr from 'toastr';
import headerporfileicon from '../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class RegisterCustomer extends Component {
    displayName = RegisterCustomer.name

    constructor(props) {
        super(props);

        var lastVisitedUrl = document.referrer;

        this.state = {
            allAddresses: [],
            email: '', password: '', confirmpassword: '',
            privacyPolicyContent: '', termsandConditionContent: '', uservisitedlink: lastVisitedUrl,
            registerationMessage: '', registered: false, showModal: '', modalMessage: ''
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Policy/getcustomertermsandconditioncontent')
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.statuscode == 200) {
                    this.setState({ termsandConditionContent: response });
                }
            });

        fetch(App.ApisBaseUrlV2 + '/api/Policy/getcustomerprivacypolicycontent')
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.statuscode == 200) {
                    this.setState({ privacyPolicyContent: response });
                }
            });
    }

    Register(email, password) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const referraltoken = params.get('referraltoken');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: email,
                Password: password,
                deviceid: 'web',
                devicename: "web",
                macaddress: "123",
                istermsaccepted: true,
                isprivacyaccepted: true
                //uservisitedlink: this.state.uservisitedlink
            })
        };

        console.log(requestOptions);

        if (this.state.address == '') {
            toastr["error"]("Please Select Address");
        }
        else {
            return fetch(App.ApisBaseUrlV2 + '/api/SignUp/customersignup', requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    if (response.statuscode == 400 || response.statuscode == 404 || response.statuscode == 409) {
                        toastr["error"](response.message);
                    }
                    else if (response.statuscode == 200) {
                        this.setState({ registeredCustomer: response, registered: true });
                        this.setState({ modalMessage: response.message, showModal: 'show' });

                        if (referraltoken != '') {
                            fetch(App.ApisBaseUrl + '/api/Referral/savereference?referraltoken=referraltoken')
                                .then(response => {
                                    if (referraltoken != '') {
                                        return response.json();
                                    }
                                })
                                .then(response => {
                                    //console.log(response);
                                });
                        }
                    }
                });
        }

    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeConfirmPassowrd(e) {
        this.setState({ confirmpassword: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.password.length < 8) {
            toastr["error"]('Please enter at least 8 characters password');
        }
        else if (this.state.password != this.state.confirmpassword) {
            toastr["error"]("Passwords do not match!");
        }
        else {
            const { email, password } = this.state;
            this.Register(email, password);
        }
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/activate-your-account';
    }

    render() {
        //let contents = this.state.registered
        //    ? this.renderCustomerProfile(this.state.registeredCustomer)
        //    : this.renderRegisterCustomerScreen();
        return (
            this.renderRegisterCustomerScreen()
        );
    }

    renderRegisterCustomerScreen() {

        return (
            <div className="Register">

                <div className="loginRegisterTopText">
                    <h3>New to Findanexpert.net?</h3>
                </div>

                {this.state.termsNotCheck}
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className="md-form pb-3">
                        <input type="email" name="email" className="form-control validate" placeholder="Email Address" value={this.state.email}
                            onChange={this.handleChangeEmail.bind(this)} required></input>
                    </div>

                    <div className="md-form pb-3">
                        <input type="password" name="password" className="form-control validate" placeholder="Password" value={this.state.password}
                            onChange={this.handleChangePassword.bind(this)} required></input>
                    </div>

                    <div className="md-form pb-3">
                        <input type="password" name="confirmPassword" className="form-control validate" placeholder="Confirm Password" value={this.state.confirmpassword}
                            onChange={this.handleChangeConfirmPassowrd.bind(this)} required></input>
                    </div>

                    <div className="form-row termsConditionsWrap pb-3">
                        <div className="col-md-6 col-sm-12">
                            <input type="checkbox" id="customerTermsCheck" required />
                            <label class="form-check-label" for="customerTermsCheck">
                                <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                    className="blue-text ml-2" data-toggle="modal" data-target="#terms">
                                    Terms & Conditions</a>
                                </p>
                            </label>

                            <div class="modal fade" id="terms" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Terms and Conditions</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.termsandConditionContent.termscontent }} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <input type="checkbox" id="customerPrivacyCheck" required />
                            <label class="form-check-label" for="customerPrivacyCheck">
                                <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                    className="blue-text ml-2" data-toggle="modal" data-target="#privacy">
                                    Privacy Policy</a>
                                </p>
                            </label>
                            <div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Privacy Policy</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.privacyPolicyContent.policycontent }} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a">Sign Up</button>
                    </div>
                </form>

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
