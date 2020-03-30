import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loudSpeaker from '../../assets/img/loud.png';
import social1 from '../../assets/img/facebook.png';
import social2 from '../../assets/img/watsapp.png';
import social3 from '../../assets/img/twitter.png';
import social4 from '../../assets/img/insta.png';
import social5 from '../../assets/img/linkdin.png';
import social6 from '../../assets/img/share.png';
import App from '../../App';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class FiftyPercentSale extends Component {
    displayName = FiftyPercentSale.name

    constructor() {
        super();

        this.state = {
            referrar_email: '',
            referree_email: '',
            send: false,
            showModal: '',
            modalMessage: '',
        };

        this.handleChangeReferreeEmail = this.handleChangeReferreeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }


    sendReferrel(referrar_email, referree_email) {
        document.getElementById("inviteBtn").disabled = true;
        var referrar_email = localStorage.getItem("email");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                referrar_email: referrar_email,
                referree_email: referree_email,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Referral/sendreferralcode', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                //toastr["success"](response.referral_message);
                this.setState({ referree_email: '' }) //empty email field after email is sent
                if (response != null) {
                    this.setState({ showModal: 'show', modalMessage: response.referral_message });
                    this.setState({ referralSent: response, send: true });

                }

            });
    }

    handleChangeReferreeEmail(e) {
        this.setState({ referree_email: e.target.value });

    }

    handleSubmit(e) {
        e.preventDefault();
        const { referrar_email, referree_email } = this.state;
        this.sendReferrel(referrar_email, referree_email);
    }


    handleModal(e) {
        e.preventDefault();
        document.getElementById("inviteBtn").disabled = false;
        this.setState({ showModal: null })
    }


    render() {
        var bg = {
            background: '#eee',
            borderRadius: '5px'
        }
        var rgb = {
            background: '-webkit-linear-gradient(180deg,#41151d 0%,#ce2235 100%)'
        }

        document.getElementsByTagName("META")[2].content = 'Now offering 50% Discount exclusively on all services valid till 31-Dec-2019. Please visit us: findanexpert.net';
        document.getElementsByTagName("TITLE")[0].text = '50% Off Sale, Off White Sale, Off White Women Sale';

        var saleForm = (
            <div class="col-md-6">
                <form class="text-center p-5" style={bg} onSubmit={this.handleSubmit}>

                    <h4 class="font-weight-bold mb-4 mt-0">Recommend a Friend Now!</h4>
                    <input type="email" class="form-control mb-4" placeholder="Email" value={this.state.referree_email}
                        onChange={this.handleChangeReferreeEmail} required />
                    <button id="inviteBtn" class="btn btn-danger btn-block mb-2" type="submit" style={rgb}>Send</button>

                    <h5>Or</h5>
                    <h5> Recommend a Friend with</h5>
                    <div class="d-flex justify-content-center">

                        <div class="p-2">
                            <a href="https://www.facebook.com/FindnExpert/" target="_blank">
                                <img src={social1} class="img-fluid" alt="facebook" />
                            </a>
                        </div>
                        
                        <div class="p-2">
                            <a href="https://twitter.com/findnexpert" target="_blank">
                                <img src={social3} class="img-fluid" alt="twitter" />
                            </a>
                        </div>
                        <div class="p-2">
                            <a href="https://www.instagram.com/findnexpert/" target="_blank">
                                <img src={social4} class="img-fluid" alt="instagram" />
                            </a>
                        </div>
                        <div class="p-2">
                            <a href="https://www.linkedin.com/company/findanexpert/?viewAsMember=true" target="_blank">
                                <img src={social5} class="img-fluid" alt="linkedin" />
                            </a>
                        </div>
                    
                    </div>

                </form>

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
            var saleNoForm = (
                <div class="col-md-6 bg-pink terms">
                    <div className="p-5 text-center">
                        <h4 className="mt-5 pt-5">Please Login to Recommend your friend!</h4>
                        <div className="mt-5 pt-5 mb-5">
                            <a href="/customer-authentication" class="btn btn-danger btn-lg mb-2 w-50" style={rgb}>Sign In</a>
                        </div>
                        <div className="d-flex justify-content-center">

                            <div class="p-2">
                                <a href="https://www.facebook.com/FindnExpert/" target="_blank">
                                    <img src={social1} class="img-fluid" alt="facebook" />
                                </a>
                            </div>

                            <div class="p-2">
                                <a href="https://twitter.com/findnexpert" target="_blank">
                                    <img src={social3} class="img-fluid" alt="twitter" />
                                </a>
                            </div>
                            <div class="p-2">
                                <a href="https://www.instagram.com/findnexpert/" target="_blank">
                                    <img src={social4} class="img-fluid" alt="instagram" />
                                </a>
                            </div>
                            <div class="p-2">
                                <a href="https://www.linkedin.com/company/findanexpert/?viewAsMember=true" target="_blank">
                                    <img src={social5} class="img-fluid" alt="linkedin" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            );

        return (
            <div>

                <section className="section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h4 className="text-red font-weight-bold">Recommend a Friend today & receive 50% off any service!</h4>
                                    <p>
                                        If you love our services why not recommend Expert to Friends and Family. As a thank you we'll give both you and your friend 50% off any service. There's no limit to the amount of people you can refer or the amount of discounts you can earn, so get started today!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="fiftyPercentSaleRecommedFriend section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div class="col-md-6">
                                    <img src={loudSpeaker} class="img-fluid" alt="Responsive image" />
                                </div>

                                
                                    {localStorage.getItem("customerid")? saleForm: saleNoForm }
                                    

                                

                            </div>

                        </div>
                    </div>
                </section>

                <section className="fiftyPercentSaleBoxes section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div className="row">

                                <div class="col-md-6">
                                    <div className="bg-pink">
                                        <h5 class="font-weight-bold">How do I claim my credit?</h5>
                                        <ul>
                                            <li>
                                                As soon as your friend has placed their
                                                first order using our App, you will be eligible for
                                                your 50% discount.
                                            </li>
                                            <li>
                                                Just book any service you wish and 50% 
                                                discount will be automatically applied to your order.
                                            </li>
                                            <li>
                                                It's as simple as that.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div className="bg-pink terms">
                                        <h5 class="font-weight-bold">What are the terms and conditions?</h5>
                                        <ul>
                                            <li>
                                                We reserve the right to change the conditions without any notice.
                                                The friend you recommend must be a new client.
                                            </li>
                                            <li>
                                                The Discount cannot be exchanged for cash
                                            </li>
                                            <li>
                                                One year Expiry
                                            </li>
                                            <li>
                                                There's no limit to the number of friends you recommend
                                            </li>
                                        </ul>
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
