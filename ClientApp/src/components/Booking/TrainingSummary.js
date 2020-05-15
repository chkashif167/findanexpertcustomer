import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class TrainingSummary extends Component {
    displayName = TrainingSummary.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const bookingid = params.get('bookingid');
        const totalPrice = params.get('totalPrice');

        this.state = {
            serviceTypeName: localStorage.getItem('servicetypename'),
            bookingid: bookingid,
            totalPrice: totalPrice,
            authToken: localStorage.getItem("customeraccesstoken"),
            summaryDetail: [],
            cardsList: [],
            voucherAmount: 0,
            isVoucherUsed: false,
            afterVoucherApplied: 0,
            usedamount: 0,
            remainingamount: 0,
            referralbonus: localStorage.getItem('referralbonus'),
            offer: localStorage.getItem('offer'),
            isReferralBonusUsed: false,
            finalPrice: 0,
            showCardsModal: '',
            showModal: '',
            modalMessage: '',
            loader: false,
            disabledbtn: false
        };
    }

    componentDidMount() {

        fetch(App.ApisBaseUrlV2 + '/api/Booking/gettrainingbookingsummary?bookingid=' + this.state.bookingid + '&authToken=' + this.state.authToken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ summaryDetail: data.summary });
                console.log(this.state.summaryDetail);

                if (this.state.referralbonus > '0') {
                    if (this.state.totalPrice > 0 && this.state.totalPrice > 30) {
                        var applyReferral = this.state.totalPrice - this.state.referralbonus;
                        this.setState({ finalPrice: applyReferral });
                        this.setState({ isReferralBonusUsed: true });
                    }
                    else {
                        this.setState({ finalPrice: this.state.totalPrice });
                        toastr['info']('Total amount should be greater than 30 to qualify for Referral Bonus!');
                    }
                }
                else {
                    this.setState({ finalPrice: this.state.totalPrice });
                }
            });

        fetch(App.ApisBaseUrlV2 + '/api/Payment/striperequestcardlistV2?authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == '404') {
                    localStorage.removeItem('customercardtokenmakedefault');
                }
                else if (data.statuscode == '200') {
                    this.setState({ cardsList: data.paymentMethodList, loading: false });
                    localStorage.setItem('customercardtokenmakedefault', this.state.cardsList[0].id);
                }
            });

        fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/customergiftvouchercreditsV2?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == 200) {
                    this.setState({ voucherAmount: data.credithistorylist[0].remainingamount });
                }
            })
            .catch((error) => {
                this.state.customerVoucherCredit = [];
            });
    }

    handleChangeUseVoucher(e) {
        console.log(e.target.id);
        if (e.target.id == 'yes') {
            this.setState({ isVoucherUsed: true });
            if (this.state.finalPrice > this.state.voucherAmount) {
                var calculation = this.state.finalPrice - this.state.voucherAmount;
                this.setState({ afterVoucherApplied: calculation });
                this.setState({ usedamount: this.state.voucherAmount });
                this.setState({ remainingamount: 0 });
            }
            else {
                var calculation = this.state.voucherAmount - this.state.finalPrice;
                this.setState({ afterVoucherApplied: calculation });
                this.setState({ usedamount: this.state.finalPrice });
                this.setState({ remainingamount: calculation });
            }
        }
        else {
            this.setState({ isVoucherUsed: false });
        }

        console.log(this.state.afterVoucherApplied);
    }

    selectCard(e) {
        localStorage.setItem('customercardtokenmakedefault', e.target.value);
    }

    handleCardListModal(e) {
        this.setState({ showCardsModal: '' });
        this.setState({ loader: true });

        if (this.state.isVoucherUsed == true) {
            const requestedParams = {
                method: 'POST',
                headers: { 'content-Type': 'application/JSON' },
                body: JSON.stringify({
                    bookingid: parseInt(this.state.bookingid),
                    usedamount: this.state.usedamount,
                    remainingamount: this.state.remainingamount,
                    cancel: false,
                    authtoken: this.state.authtoken
                })
            };
            console.log(requestedParams);

            fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/savegiftvouchercreditsusageV2', requestedParams)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
        }

        if (this.state.isfreeconsultation == 'true') {
            if (localStorage.getItem('providerid') != null) {
                const requestedParams = {
                    method: 'POST',
                    headers: { 'content-Type': 'application/JSON' },
                    body: JSON.stringify({
                        bookingid: parseInt(this.state.bookingid),
                        providerid: parseInt(localStorage.getItem('providerid')),
                        authtoken: this.state.authtoken
                    })
                };
                console.log(requestedParams);

                fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveexpertinbooking', requestedParams)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.statuscode == 200 || data.statuscode == 300) {
                            this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                        }
                        else if (data.statuscode == 404) {
                            toastr["error"](data.message);
                        }
                    })
            }
            else {
                const requestedParams = {
                    method: 'POST',
                    headers: { 'content-Type': 'application/JSON' },
                    body: JSON.stringify({
                        bookingid: parseInt(this.state.bookingid),
                        authToken: this.state.authToken
                    })
                };

                fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveproviderinbooking', requestedParams)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.statuscode == 200 || data.statuscode == 300) {
                            this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                        }
                        else if (data.statuscode == 404) {
                            toastr["error"](data.message);
                        }
                    })
            }
        }
        else {
            if (localStorage.getItem("customercardtokenmakedefault") == null) {
                window.location = '/payment/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingid +
                    '&totalprice=' + this.state.totalprice));
            }
            else {


                const requestedParameters = {
                    method: 'POST',
                    headers: { 'content-Type': 'application/JSON' },
                    body: JSON.stringify({
                        stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                        bookingid: parseInt(this.state.bookingid),
                        serviceproviderid: 0,
                        currency: "gbp",
                        paymentamount: this.state.isVoucherUsed == true ? this.state.afterVoucherApplied : this.state.summaryDetail.price,
                        referral_bonus_used: this.state.isVoucherUsed == true ? true : false,
                        authToken: this.state.authToken
                    })
                };
                console.log(requestedParameters);

                fetch(App.ApisBaseUrlV2 + '/api/Payment/stripeholdpaymentV2', requestedParameters)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if (data.statuscode == 200) {
                            if (localStorage.getItem('providerid') != null) {
                                const requestedParams = {
                                    method: 'POST',
                                    headers: { 'content-Type': 'application/JSON' },
                                    body: JSON.stringify({
                                        bookingid: parseInt(this.state.bookingid),
                                        providerid: parseInt(localStorage.getItem('providerid')),
                                        authtoken: this.state.authtoken
                                    })
                                };
                                console.log(requestedParams);

                                fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveexpertinbooking', requestedParams)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        console.log(data);
                                        if (data.statuscode == 200 || data.statuscode == 300) {
                                            this.setState({ loader: false });
                                            this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                                        }
                                        else {
                                            toastr["error"](data.message);
                                        }
                                    })
                            }
                            else {
                                const requestedParams = {
                                    method: 'POST',
                                    headers: { 'content-Type': 'application/JSON' },
                                    body: JSON.stringify({
                                        bookingid: parseInt(this.state.bookingid),
                                        authToken: this.state.authToken
                                    })
                                };

                                fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveproviderinbooking', requestedParams)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        console.log(data);
                                        if (data.statuscode == 200 || data.statuscode == 300) {
                                            this.setState({ loader: false });
                                            this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                                        }
                                        else {
                                            toastr["error"](data.message);
                                        }
                                    })
                            }
                        }
                        else {
                            toastr["error"](data.message);
                        }
                    })
            }
        }
    }

    handleSubmit(e) {
        this.setState({ disabledbtn: true })
        e.preventDefault();

        if (this.state.cardsList.length > 1) {
            this.setState({ modalMessage: 'Please select an option', showCardsModal: 'show' });
        }
        else {
            if (this.state.isVoucherUsed == true) {
                const requestedParams = {
                    method: 'POST',
                    headers: { 'content-Type': 'application/JSON' },
                    body: JSON.stringify({
                        bookingid: parseInt(this.state.bookingid),
                        usedamount: this.state.usedamount,
                        remainingamount: this.state.remainingamount,
                        cancel: false,
                        authToken: this.state.authToken
                    })
                };
                console.log(requestedParams);

                fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/savegiftvouchercreditsusageV2', requestedParams)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                    })
            }
            if (localStorage.getItem('providerid') != null) {
                const requestedParams = {
                    method: 'POST',
                    headers: { 'content-Type': 'application/JSON' },
                    body: JSON.stringify({
                        bookingid: parseInt(this.state.bookingid),
                        providerid: parseInt(localStorage.getItem('providerid')),
                        authToken: this.state.authToken
                    })
                };
                console.log(requestedParams);

                fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveexpertinbooking', requestedParams)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.statuscode == 200 || data.statuscode == 300) {
                            if (localStorage.getItem("customercardtokenmakedefault") == null) {
                                window.location = '/payment/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingid +
                                    '&totalprice=' + this.state.totalprice));
                            }
                            else {
                                const requestedParameters = {
                                    method: 'POST',
                                    headers: { 'content-Type': 'application/JSON' },
                                    body: JSON.stringify({
                                        stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                                        bookingid: parseInt(this.state.bookingid),
                                        serviceproviderid: 0,
                                        currency: "gbp",
                                        paymentamount: this.state.isVoucherUsed == true ? this.state.afterVoucherApplied : this.state.summaryDetail.selectedsession != 0 ? this.state.summaryDetail.sessionprice : this.state.actualPrice,
                                        referral_bonus_used: false,
                                        authToken: this.state.authToken
                                    })
                                };
                                console.log(requestedParameters);

                                fetch(App.ApisBaseUrlV2 + '/api/Payment/stripeholdpaymentV2', requestedParameters)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        if (data.statuscode == 200) {
                                            this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                                        }
                                        else {
                                            toastr["error"](data.message);
                                        }
                                    })
                            }
                        }
                        else if (data.statuscode == 404) {
                            toastr["error"](data.message);
                        }
                    })
            }
            else {
                if (localStorage.getItem("customercardtokenmakedefault") == null) {
                    window.location = '/payment/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingid +
                        '&totalprice=' + this.state.totalprice));
                }
                else {
                    const requestedParameters = {
                        method: 'POST',
                        headers: { 'content-Type': 'application/JSON' },
                        body: JSON.stringify({
                            stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                            bookingid: parseInt(this.state.bookingid),
                            serviceproviderid: 0,
                            currency: "gbp",
                            paymentamount: this.state.isVoucherUsed == true ? this.state.afterVoucherApplied : this.state.summaryDetail.price,
                            referral_bonus_used: this.state.isReferralBonusUsed,
                            authToken: this.state.authToken
                        })
                    };
                    console.log(requestedParameters);

                    fetch(App.ApisBaseUrlV2 + '/api/Payment/stripeholdpaymentV2', requestedParameters)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            if (data.statuscode == 200) {
                                if (localStorage.getItem('providerid') != null) {
                                    const requestedParams = {
                                        method: 'POST',
                                        headers: { 'content-Type': 'application/JSON' },
                                        body: JSON.stringify({
                                            bookingid: parseInt(this.state.bookingid),
                                            providerid: parseInt(localStorage.getItem('providerid')),
                                            authToken: this.state.authToken
                                        })
                                    };
                                    console.log(requestedParams);

                                    fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveexpertinbooking', requestedParams)
                                        .then(response => {
                                            return response.json();
                                        })
                                        .then(data => {
                                            console.log(data);
                                            if (data.statuscode == 200 || data.statuscode == 300) {
                                                this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                                            }
                                            else {
                                                toastr["error"](data.message);
                                            }
                                        })
                                }
                                else {
                                    const requestedParams = {
                                        method: 'POST',
                                        headers: { 'content-Type': 'application/JSON' },
                                        body: JSON.stringify({
                                            bookingid: parseInt(this.state.bookingid),
                                            authToken: this.state.authToken
                                        })
                                    };

                                    fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/saveproviderinbooking', requestedParams)
                                        .then(response => {
                                            return response.json();
                                        })
                                        .then(data => {
                                            console.log(data);
                                            if (data.statuscode == 200 || data.statuscode == 300) {
                                                this.setState({ modalMessage: 'Thank you for your booking with Expert. Your booking is now being matched to one of our Expert professionals. You will receive a notification and email shortly.', showModal: 'show' });
                                            }
                                            else {
                                                toastr["error"](data.message);
                                            }
                                        })
                                }
                            }
                            else {
                                toastr["error"](data.message);
                            }
                        })
                }
            }
        }
    }

    handleModal(e) {
        e.preventDefault();
        localStorage.removeItem('bookingId');
        window.location = '/';
    }

    render() {

        return (

            <div id="MainPageWrapper" className="trainingSummary">

                <section className="bookingPage account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-gray p-2">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name text-white">{this.state.serviceTypeName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 offset-md-3">

                                    <form onSubmit={this.handleSubmit.bind(this)} className="bookingPageForm">

                                        <div className="card bookingSummaryCard">
                                            <div className="card-header">
                                                <h4><strong>Summary</strong></h4>
                                            </div>

                                            <div className="card-body">
                                                <h4 className="title">Price</h4>
                                                <div className="r-box__item flex flex-justify actuallPrice">
                                                    <h4> <i class="fas fa-pound-sign poundFa mr-1"> </i>Actual price</h4>
                                                    <p>
                                                        £ {this.state.summaryDetail.price}
                                                    </p>
                                                </div>

                                                <h4 className="title pt-4">Dates</h4>
                                                <div className="r-box__item flex flex-justify ">
                                                    <h4 className="startdatesIcon">  <i class="fas fa-calendar-minus calendarFa mr-1"></i>Start Date</h4>
                                                    <p>
                                                        {this.state.summaryDetail.startdate}
                                                    </p>
                                                </div>
                                                <div className="r-box__item flex flex-justify">
                                                    <h4 className="endtdatesIcon"> <i class="fas fa-calendar-minus calendarFa mr-1"> </i>End Date</h4>
                                                    <p>
                                                        {this.state.summaryDetail.enddate}
                                                    </p>
                                                </div>
                                                <div className="r-box__item flex flex-justify dayIconWrapper">
                                                    <h4 className="dayIcon"><i class="fas fa-file-alt detailFa mr-1"></i>Day</h4>
                                                    <p>
                                                        {this.state.summaryDetail.detail}
                                                    </p>
                                                </div>

                                                {this.state.summaryDetail.discount != 0 ?
                                                    <div>
                                                        <h4 className="title pt-4">Discounts Applied</h4>
                                                        <div>
                                                            <div className="r-box__item flex flex-justify">
                                                                <h4>Discounted Type</h4>
                                                                <p>
                                                                    {this.state.summaryDetail.discounttype}
                                                                </p>
                                                            </div>
                                                            <div className="r-box__item flex flex-justify">
                                                                <h4>Discounted Amount</h4>
                                                                <p>
                                                                    {this.state.summaryDetail.discount}
                                                                    <span>
                                                                        {this.state.summaryDetail.discounttype == 'Offer' ?
                                                                            '%'
                                                                            : ''
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }


                                                {this.state.referralbonus > '0' ?
                                                    <div>
                                                        <h4 className="title pt-4">Referral Bonus</h4>
                                                        <div className="r-box__item flex flex-justify">
                                                            <h4>Discounted Type</h4>
                                                            <p>
                                                                Referral Bonus
                                                            </p>
                                                        </div>
                                                        <div className="r-box__item flex flex-justify">
                                                            <h4>Discounted Amount</h4>
                                                            <p>
                                                                {this.state.referralbonus}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }

                                                {this.state.isfreeconsultation == 'false' ?
                                                    this.state.voucherAmount != 0 ?
                                                        this.state.finalPrice > this.state.voucherAmount ?
                                                            <div>
                                                                <h4 className="title pt-4">Voucher</h4>
                                                                <div className="r-box__item flex flex-justify">
                                                                    <h4>Voucher Amount</h4>
                                                                    <p>
                                                                        {this.state.voucherAmount}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            : ''
                                                        : ''
                                                    : ''
                                                }

                                                {this.state.isfreeconsultation == 'false' ?
                                                    this.state.voucherAmount != 0 ?
                                                        this.state.finalPrice > this.state.voucherAmount ?
                                                            <div>
                                                                <p className="pt-4">Would you like to use your voucher</p>
                                                                <div className="form-check d-inline p-0">
                                                                    <input type="radio" id="yes" name="options"
                                                                        onChange={this.handleChangeUseVoucher.bind(this)} />
                                                                    <label className="form-check-label" for="yes">
                                                                        <p className="lead">
                                                                            yes
                                                                        </p>
                                                                    </label>
                                                                </div>
                                                                <div className="form-check d-inline">
                                                                    <input type="radio" id="no" name="options"
                                                                        onChange={this.handleChangeUseVoucher.bind(this)} />
                                                                    <label className="form-check-label" for="no">
                                                                        <p className="lead">
                                                                            no
                                                                        </p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            : ''
                                                        : ''
                                                    : ''
                                                }

                                                <h4 className="title pt-4 ">  Address</h4>
                                                <div className="r-box__item flex flex-justify">
                                                    <h4 className="addressIcon"> <i class="fas fa-address-card addressFa mr=1"></i> {this.state.summaryDetail.trainingcenter}</h4>
                                                </div>

                                                <div className="r-box__item flex flex-justify pt-5">
                                                    <h3 className="totalAmmounIcon"> <i class="fas fa-pound-sign poundFa mr-1"> </i>Total Amount</h3>
                                                    <p>
                                                        £ {this.state.isVoucherUsed == true ?
                                                            this.state.afterVoucherApplied
                                                            : this.state.finalPrice
                                                        }
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="text-center mb-3 checkoutBtn">
                                            <button disabled={this.state.disabledbtn} className="btn btn-lg bg-orange text-white" type="submit">Checkout</button>
                                        </div>

                                        <div className={"modal fade " + this.state.showCardsModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body">

                                                        <div className="row">
                                                            <div className="col-md-12 d-flex">
                                                                <div>
                                                                    <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                                                </div>
                                                                <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                                            </div>
                                                            <div className="col-md-12 d-flex">
                                                                <p className="lead lead mt-4 mb-3">
                                                                    {this.state.modalMessage}
                                                                </p>
                                                            </div>

                                                            {this.state.cardsList.map((obj, index) =>
                                                                <div className="col-md-12 d-flex mb-4">
                                                                    <div className="cardWrapWithShadow durationList">
                                                                        <div className="form-check checkoutPageCardList">
                                                                            <input type="radio" name="exampleRadios" id={index} value={obj.id}
                                                                                onClick={this.selectCard.bind(this)} />
                                                                            <label className="form-check-label" for={index}>
                                                                                <h5><strong>Card No:</strong> **** **** **** {obj.card.last4}</h5>
                                                                                <p><strong>Expiry Date:</strong> {obj.card.expMonth} / {obj.card.expYear}</p>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="col-md-12 text-right">
                                                                <div className="w-100">
                                                                    <a id="okBtn" className="btn bg-black text-white float-right ml-3" onClick={this.handleCardListModal.bind(this)}>OK</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body">

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
                                                                    <a id="okBtn" className="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}
