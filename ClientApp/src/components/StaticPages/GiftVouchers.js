import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import banner from '../../assets/img/giftmain.png';
import App from '../../App';
import giftVoucher from '../../assets/img/giftVoucher.png';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class GiftVouchers extends Component {
    displayName = GiftVouchers.name

    constructor(props) {
        super(props);

        this.state = {
            authtoken: localStorage.getItem('customeraccesstoken'),
            voucherCode: '',
            reedemVoucher: '',
            allGiftVouchers: [],
            loading: false,
            voucherAmount: 0,
            selectedVoucherAmount: 0,
            checkoutGiftVoucherResponse: [],
            notes: '',
            showModal: '',
            modalMessage: ''
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/displaygiftvouchercardsV2?authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ allGiftVouchers: data.vouchercardlist });
            })
            .catch((error) => {
                this.state.allGiftVouchers = [];
            });

        fetch(App.ApisBaseUrlV2 + '/api/Payment/striperequestcardlistV2?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == '404') {
                    localStorage.removeItem('customercardtokenmakedefault');
                }
                else if (data.statuscode == '200') {
                    this.setState({ cardsList: data.paymentMethodList, loading: false });
                    localStorage.setItem('customercardtokenmakedefault', this.state.cardsList[0].id);
                }
            });
    }

    handleChangeVoucherCode(e) {
        this.setState({ voucherCode: e.target.value });
        localStorage.setItem('voucherCode', e.target.value);
    }

    handleReedemVoucher(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vouchercode: localStorage.getItem('voucherCode'),
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/redeemvoucherV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ modalMessage: response.message, showModal: 'show' });
                }
                else {
                    toastr["error"](response.message);
                }
            });
    }

    handleChangeReceiverEmail(e) {

        this.setState({ receiver_email: e.target.value });
        localStorage.setItem('receiver_email', e.target.value);
    }

    handleChangeVoucherAmount(e) {

        this.state.voucherAmount.push(e.target.value);
        localStorage.setItem('voucherAmount', e.target.value);
    }

    handleChangeNotes(e) {

        this.setState({ notes: e.target.value });
    }

    getDetails(e) {

        if (localStorage.getItem("customercardtokenmakedefault") == null) {
            window.location = '/payment';
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Firstname: localStorage.getItem('firstname'),
                    Surname: localStorage.getItem('lastname'),
                    PaymentAmount: parseInt(this.state.voucherAmount),
                    paymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                    receiver_email: this.state.receiver_email,
                    AuthToken: this.state.authtoken,
                    currency: 'gbp',
                    notes: this.state.notes
                })
            };

            console.log(requestOptions);

            return fetch(App.ApisBaseUrlV2 + '/api/Payment/stripegiftvoucherholdpaymentV2', requestOptions)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    if (data.statuscode == 200) {

                        this.setState({ modalMessage: "Thank You! voucher purchased successfully!", showModal: 'show' });
                    }
                    else if (data.statuscode == 400) {

                        toastr["error"](data.message);
                    }
                });
        }
    }

    getVoucherAmount(e) {
        if (localStorage.getItem('isprofilecompleted') == 'false') {
            toastr["error"]('Please complete your profile first.');
        }
        else {
            this.setState({ voucherAmount: e.target.id });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const { voucherAmount } = this.state;
        this.getDetails(voucherAmount);
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null })
        window.location = '/gift-vouchers';
    }

    render() {

        var bg = {
            background: 'url(' + giftVoucher + ')',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '250px',
            padding: '60px 0 150px 0'
        }

        return (
            <div>

                <section class="giftvoucher section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 text-center">
                                    <img src={banner} class="img-fluid " alt="gift-voucher" />
                                </div>
                                <div class="col-md-6 ">
                                    <div class="gift-card">
                                        <h3 class="font-weight-bold"><span class="text-danger">Gift</span> Card</h3>
                                        <p>
                                            Take the stress out of choosing the perfect gift. Send an Instant Expert gift card to <strong>
                                                anyone, anytime for any service</strong>. Gifts can be personalised with a message and sent
                                            instantly by email or text. Don't worry about last minute forgetfulness,<strong>the birthday,
                                            the anniversary, mothers day........</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="giftvoucher section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">
                                {this.state.allGiftVouchers.map(gifts =>
                                    <div class="col-md-4 mb-4 giftVoucherWrapper">

                                        <div className="content" style={bg} >
                                            <div class="voucherContent">
                                                <p class="card-text mb-0 amount">£ <span><strong>{gifts}</strong></span></p>
                                                <div className="btnWrap">
                                                    {localStorage.getItem('isprofilecompleted') == 'false' ?
                                                        <button className="btn btn-default bg-black text-white" 
                                                            onClick={this.getVoucherAmount.bind(this)}>Purchase Now</button>
                                                        : <button className="btn btn-default bg-black text-white" data-toggle="modal"
                                                            data-target="#giftsVoucherModal" id={gifts}
                                                            onClick={this.getVoucherAmount.bind(this)}>Purchase Now</button>
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-md-12">

                                    <div class="modal fade" id="giftsVoucherModal" tabindex="-1" role="dialog" aria-labelledby="giftsVoucherModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <div className="voucherDialogHeading">
                                                        <h3 class="modal-title text-center">Purchase Card</h3>
                                                    </div>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <form onSubmit={this.handleSubmit.bind(this)} >
                                                    <div class="modal-body">
                                                        <div className="md-form pb-3">
                                                            <input type="text" className="form-control validate" name="sender_email"
                                                                values={this.state.receiver_email} onChange={this.handleChangeReceiverEmail.bind(this)}
                                                                placeholder="Enter Email of referee..." required />
                                                            <textarea class="form-control border-0" rows="5" placeholder="Please enter a message for you beloved one..."
                                                                values={this.state.notes} onChange={this.handleChangeNotes.bind(this)} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                        <button type="submit" class="btn bg-black text-white"
                                                        >Purchase</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mb-4">
                                    {localStorage.getItem("customeraccesstoken") != null ?
                                        <form class="text-center border border-light p-5 reedeemVoucher" onSubmit={this.handleReedemVoucher.bind(this)}>

                                            <p className="m-0">Have a Gift Card</p>
                                            <p className="m-0"><strong>Please reeedem your Gift Card.</strong></p>

                                            <input type="text" className="form-control mb-4" placeholder="Enter your gift voucher code"
                                                value={this.state.voucherCode} onChange={this.handleChangeVoucherCode.bind(this)} required />
                                            <button class="btn bg-black btn-block text-white" type="submit">Reedem Code</button>

                                        </form>
                                        : <form class="text-center border border-light p-5 reedeemVoucher" onSubmit={this.handleReedemVoucher.bind(this)}>

                                            <p className="m-0">Have a Gift Card</p>
                                            <p className="m-0"><strong>Please reeedem your Gift Card.</strong></p>

                                            <input type="text" className="form-control mb-4" placeholder="Enter your gift voucher code"
                                                disabled />
                                            <a href="/customer-authentication" class="btn bg-black btn-block text-white" type="submit">
                                                Please login
                                            </a>

                                        </form>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="giftVoucherJustDecide section-padding">
                    <div class="services-wrapper">
                        <div class="container-fluid">

                            <div class="col-md-12">
                                <h3 class="text-center"> Just decide:</h3>
                                <ul class="text-center">
                                    <li>
                                        How much you want to spend
                                    </li>
                                    <li>
                                        When you want the lucky person to get it
                                    </li>
                                    <li>
                                        Who you want to send it to
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="giftvoucherjustdecide bg-pink section-padding">
                    <div class="services-wrapper">
                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <p>
                                        With our services your special person will have an experience to remember forever.
                                        Let us take care of everything and<br />
                                        provide an amazing service for your loved one.
                                        You can choose from a massive range of services.
                                    </p>
                                    <span> Buying online is</span>
                                    <p class="text-danger">
                                        <strong>Quick, Easy, Safe and Convenient.</strong>
                                    </p>
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
