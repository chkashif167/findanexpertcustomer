import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';
import $ from 'jquery';
import 'bootstrap';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class Referral extends Component {
    displayName = Referral.name

    constructor() {
        super();

        this.state = {
            receiver_email: '',
            showModal: '',
            modalMessage: '',
        };
    }

    sendReferrel(receiver_email) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                receiver_email: receiver_email,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Referral/sendreferralcodeV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ showModal: 'show', modalMessage: response.message });
                }
            });
    }

    handleChangeReceiverEmail(e) {
        this.setState({ receiver_email: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { receiver_email } = this.state;
        this.sendReferrel(receiver_email);
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window = '/';
    }

    render() {
        return (

            <section id="referral" className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">

                        <div className="row pb-4">

                            <div className="col-md-12 referralTop">
                                <h3 className="text-red text-center">Recommend a Friend today and recieve 50% off any service!</h3>
                                <p>
                                    If you love our services, why not recommend Expert to Friends and Family!
                                    As a thank you, we'll give you and your friend 50% off on any service.
                                    There's no limit to the number of people you can refer or the amount of discounts
                                    you can earn, so get started today!
                                </p>
                            </div>

                            <div className="col-md-6 offset-md-3 sendReferral">

                                <div className="card p-5">

                                    <h1 className="section-title pb-5"><strong>Refer Friends. <span className="text-red">Get Rewards!</span></strong></h1>

                                    <form onSubmit={this.handleSubmit.bind(this)}>

                                        <div className="form-group">
                                            {/*<label for="exampleForm2">Add email address</label>*/}
                                            <input type="text" id="exampleForm2" className="form-control" placeholder="Email Address" value={this.state.receiver_email}
                                                onChange={this.handleChangeReceiverEmail.bind(this)} required />
                                        </div>

                                        <button id="inviteBtn" type="submit" className="btn bg-orange btn-block text-white btn-lg">Invite Friends</button>
                                    </form>

                                </div>

                            </div>

                        </div>

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
                </div>
            </section>
        );
    }
}