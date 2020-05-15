import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { locale } from 'moment';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import toastr from 'toastr';
import Loader from '../../assets/img/loader.gif';
import App from '../../App';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class AreasSummary extends Component {
    displayName = AreasSummary.name

    constructor() {
        super();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const bookingid = params.get('bookingid');
        const totalprice = params.get('totalprice');
        const hasclickedfreeconsultation = params.get('hasclickedfreeconsultation');
        console.log(totalprice);

        this.state = {
            bookingid: bookingid,
            totalprice: totalprice,
            isfreeconsultation: localStorage.getItem('isfreeconsultation'),
            authtoken: localStorage.getItem("customeraccesstoken"),
            summaryDetail: [],
            areaList: [],
            discountlist: [],
            summaryPriceTags: [],
            cardsList: [],
            actualPrice: 0,
            voucherAmount: 0,
            isVoucherUsed: false,
            afterVoucherApplied: 0,
            usedamount: 0,
            remainingamount: 0,
            referralbonus: localStorage.getItem('referralbonus'),
            isReferralBonusUsed: false,
            finalPrice: 0,
            showCardsModal: '',
            showModal: '',
            modalMessage: '',
            loader: false,
            disabledbtn: false,
            hasclickedfreeconsultation: hasclickedfreeconsultation,
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Booking/getareabookingsummary?bookingid=' + this.state.bookingid + '&authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ summaryDetail: data.summary });
                    this.setState({ areaList: data.summary.arealist });
                    this.setState({ discountlist: data.summary.discountlist });
                    this.setState({ summaryPriceTags: data.summary.summarypricetags });

                    if (this.state.referralbonus > '0') {
                        if (this.state.summaryDetail.sessionprice > 0 && this.state.summaryDetail.sessionprice > 30) {
                            var applyReferral = this.state.summaryDetail.sessionprice - this.state.referralbonus;
                            this.setState({ finalPrice: applyReferral });
                            this.setState({ isReferralBonusUsed: true });
                        }
                        else if (this.state.totalprice > '0' && this.state.totalprice > '30') {
                            var applyReferral = this.state.totalprice - this.state.referralbonus;
                            this.setState({ finalPrice: applyReferral });
                            this.setState({ isReferralBonusUsed: true });
                        }
                        else {
                            this.setState({ finalPrice: this.state.totalPrice });
                            if (this.state.hasclickedfreeconsultation == "false") {
                                toastr['info']('Total amount should be greater than 30 to qualify for Referral Bonus!');
                            }

                        }
                    }
                    else {
                        if (this.state.summaryDetail.sessionprice > 0) {
                            this.setState({ finalPrice: this.state.summaryDetail.sessionprice });
                        }
                        else {
                            this.setState({ finalPrice: this.state.totalprice });
                        }
                    }

                    if (this.state.summaryDetail.questionstotalamount != 0) {
                        var addExtraCharges = this.state.finalPrice + this.state.summaryDetail.questionstotalamount;
                        this.setState({ finalPrice: addExtraCharges });
                    }
                }
            });

        fetch(App.ApisBaseUrlV2 + '/api/Payment/striperequestcardlistV2?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
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

    calculateActualPrice() {
        this.state.actualPrice = 0;
        for (var i = 0; i < this.state.areaList.length; i++) {
            this.state.actualPrice += parseInt(this.state.areaList[i].price);
        }
    }

    handleChangeUseVoucher(e) {
        console.log(e.target.id);
        if (e.target.id == 'yes') {
            this.setState({ isVoucherUsed: true });
            //if (this.state.summaryDetail.selectedsession != 0) {
            //    if (this.state.summaryDetail.sessionprice > this.state.voucherAmount) {
            //        var calculation = this.state.summaryDetail.sessionprice - this.state.voucherAmount;
            //        this.setState({ afterVoucherApplied: calculation });
            //        this.setState({ usedamount: this.state.voucherAmount });
            //        this.setState({ remainingamount: 0 });
            //    }
            //    else {
            //        var calculation = this.state.voucherAmount - this.state.summaryDetail.sessionprice;
            //        this.setState({ afterVoucherApplied: calculation });
            //        this.setState({ usedamount: this.state.summaryDetail.sessionprice });
            //        this.setState({ remainingamount: calculation });
            //    }
            //}
            //else {
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
            //}
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
                        authtoken: this.state.authtoken
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
                        paymentamount: this.state.isVoucherUsed == true ? this.state.afterVoucherApplied : this.state.summaryDetail.selectedsession != 0 ? this.state.summaryDetail.sessionprice : this.state.summaryDetail.price,
                        referral_bonus_used: this.state.isVoucherUsed == true ? true : false,
                        authtoken: this.state.authtoken
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
                                        authtoken: this.state.authtoken
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
                            authtoken: this.state.authtoken
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
                            paymentamount: this.state.isVoucherUsed == true ? this.state.afterVoucherApplied : this.state.finalPrice,
                            referral_bonus_used: this.state.isReferralBonusUsed,
                            authtoken: this.state.authtoken
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
                                            authtoken: this.state.authtoken
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


        this.calculateActualPrice();
        console.log(this.state.voucherAmount);
        console.log(this.state.afterVoucherApplied);

        return (
            <div id="MainPageWrapper">

                <section className="bookingPage account-details pb-4">
                    <div className="services-wrapper">
                        <div className="bookingPageTpRwWrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row bookingPageTpRw cardWrapWithShadow bg-half-white">
                                            <div className="col-md-6">
                                                <p className="lead mb-0 service-name">{this.state.summaryDetail.servicetypename}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row pb-4 pt-5">
                                <div className="col-md-6 offset-md-3">
                                    <div className="pageTitle text-center">
                                        <h4>Booking <span className="text-red">Summary</span></h4>
                                    </div>

                                    <form onSubmit={this.handleSubmit.bind(this)} className="bookingPageForm">

                                        <div class="card bookingSummaryCard">

                                            <div class="card-body">
                                                <div class="r-box__item flex flex-justify">
                                                    <h4> <i class="fas fa-calendar-minus calendarFa mr-1"></i> Date</h4>
                                                    <p>
                                                        {this.state.summaryDetail.bookingdate}
                                                    </p>
                                                </div>
                                                <div class="r-box__item flex flex-justify">
                                                    <h4><i class="far fa-clock timeFa mr-1"></i> Time</h4>
                                                    <p>
                                                        {this.state.summaryDetail.bookingtime}
                                                    </p>
                                                </div>
                                                {this.state.hasclickedfreeconsultation == "false" ?
                                                    <div>
                                                        <div class="r-box__item flex flex-justify">
                                                            <h4>No. of Sessions</h4>
                                                            <p>
                                                                {this.state.summaryDetail.selectedsession}
                                                            </p>
                                                        </div>
                                                        <div class="r-box__item flex flex-justify">
                                                            <h4> <i class="fas fa-pound-sign poundFa mr-2"> </i>Actual Price</h4>
                                                            <p>
                                                                {this.state.actualPrice}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    : ""
                                                }


                                            </div>
                                        </div>
                                        {this.state.hasclickedfreeconsultation == "false" ?
                                            <div class="card bookingSummaryCard">

                                                <div class="card-body">
                                                    {this.state.areaList.map(obj =>
                                                        <div class="r-box__item flex flex-justify">
                                                            <h4>{obj.areaname}</h4>
                                                            <p>{obj.price}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div> : ''
                                        }

                                        {this.state.hasclickedfreeconsultation == "false" ?
                                            <div class="card bookingSummaryCard">
                                                <div class="card-body">
                                                    {this.state.discountlist.map(obj =>
                                                        <div>
                                                            <div class="r-box__item flex flex-justify">
                                                                <h4>Discounted Type</h4>
                                                                <p>
                                                                    {obj.discounttype}
                                                                </p>
                                                            </div>
                                                            <div class="r-box__item flex flex-justify">
                                                                <h4>Discounted Amount</h4>
                                                                <p>
                                                                    {obj.amount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div> : ''}




                                        {this.state.hasclickedfreeconsultation == "false" ?
                                            this.state.referralbonus > '0' ?
                                                <div class="card bookingSummaryCard">
                                                    <div class="card-body">
                                                        <h4 className="title pt-4">Referral Bonus</h4>
                                                        <div class="r-box__item flex flex-justify">
                                                            <h4>Referral Bonus Amount</h4>
                                                            <p>
                                                                {this.state.referralbonus == "null" ? "0" : this.state.referralbonus}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                : ''
                                            : ''
                                        }

                                        {this.state.summaryPriceTags != '' ?
                                            <div class="card bookingSummaryCard">
                                                <div class="card-body">
                                                    {this.state.summaryPriceTags != '' ?
                                                        <h4 className="title pt-4">Extra Charges</h4>
                                                        : ''
                                                    }
                                                    {this.state.summaryPriceTags != '' ?
                                                        this.state.summaryPriceTags.map(obj =>
                                                            <div>
                                                                <div class="r-box__item flex flex-justify">
                                                                    <h4>Discounted Type</h4>
                                                                    <p>
                                                                        {obj.pricetag}
                                                                    </p>
                                                                </div>
                                                                <div class="r-box__item flex flex-justify">
                                                                    <h4>Discounted Amount</h4>
                                                                    <p>
                                                                        {obj.price}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                        : ''
                                                    }
                                                </div>
                                            </div>
                                            : ''
                                        }

                                        <div class="card bookingSummaryCard">
                                            <div class="card-body">
                                                <div class="r-box__item flex flex-justify">
                                                    <h4> <i class="fas fa-map-marker-alt mapFa mr-1"></i>Location</h4>
                                                    <p>{this.state.summaryDetail.address}</p>
                                                </div>

                                                {this.state.isfreeconsultation == 'false' ?
                                                    this.state.voucherAmount != 0 ?
                                                        this.state.finalPrice > this.state.voucherAmount ?
                                                            <div>
                                                                <div class="r-box__item flex flex-justify">
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
                                                                <p class="pt-4">Would you like to use your voucher</p>
                                                                <div class="form-check d-inline p-0">
                                                                    <input type="radio" id="yes" name="options"
                                                                        onChange={this.handleChangeUseVoucher.bind(this)} />
                                                                    <label class="form-check-label" for="yes">
                                                                        <p className="lead">
                                                                            yes
                                                                        </p>
                                                                    </label>
                                                                </div>
                                                                <div class="form-check d-inline">
                                                                    <input type="radio" id="no" name="options"
                                                                        onChange={this.handleChangeUseVoucher.bind(this)} />
                                                                    <label class="form-check-label" for="no">
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

                                                {this.state.isfreeconsultation == 'true' ?
                                                    ''
                                                    : <div class="r-box__item flex flex-justify pt-5">
                                                        <h3>Total Amount</h3>
                                                        <p>
                                                            £ {this.state.isVoucherUsed == true ?
                                                                this.state.afterVoucherApplied
                                                                : this.state.finalPrice
                                                            }
                                                        </p>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className="text-center mb-3 checkoutBtn">
                                            <button disabled={this.state.disabledbtn} className="btn btn-xl bg-orange text-white" type="submit">
                                                {this.state.hasclickedfreeconsultation == "false" ? "Checkout" : "Confirm"}
                                            </button>
                                        </div>

                                        <div class={"modal fade " + this.state.showCardsModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
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
                                                            <div className="col-md-12 d-flex">
                                                                <p className="lead lead mt-4 mb-3">
                                                                    {this.state.modalMessage}
                                                                </p>
                                                            </div>

                                                            {this.state.cardsList.map((obj, index) =>
                                                                <div className="col-md-12 d-flex mb-4">
                                                                    <div className="cardWrapWithShadow durationList">
                                                                        <div class="form-check checkoutPageCardList">
                                                                            <input type="radio" name="exampleRadios" id={index} value={obj.id}
                                                                                onClick={this.selectCard.bind(this)} />
                                                                            <label class="form-check-label" for={index}>
                                                                                <h5><strong>Card No:</strong> **** **** **** {obj.card.last4}</h5>
                                                                                <p><strong>Expiry Date:</strong> {obj.card.expMonth} / {obj.card.expYear}</p>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="col-md-12 text-right">
                                                                <div className="w-100">
                                                                    <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleCardListModal.bind(this)}>OK</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
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
