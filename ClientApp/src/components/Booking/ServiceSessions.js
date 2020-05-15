import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { SearchService } from '../../components/SearchService';
import { locale } from 'moment';
import App from '../../App';
import Loader from '../../assets/img/loader.gif';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';
import { ServiceAreas } from './ServiceAreas';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class ServiceSessions extends Component {
    displayName = ServiceSessions.name

    constructor() {
        super();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceType = params.get('serviceType');
        const categoryid = params.get('categoryid');
        const servicetypeid = params.get('servicetypeid');
        console.log(servicetypeid);
        const servicetypename = params.get('servicetypename');
        const inhouse = params.get('inhouse');
        const inclinic = params.get('inclinic');
        const bookingid = params.get('bookingid');
        const bookingduration = params.get('bookingduration');
        const postalcode = params.get('postalcode');
        const genderpreference = params.get('genderpreference');
        const totalprice = params.get('totalprice');
        localStorage.setItem('totalprice', totalprice);
        const hasclickedfreeconsultation = params.get('hasclickedfreeconsultation');


        var lastVisitedUrl = window.document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-0" + (current_datetime.getMonth() + 1) + "-" +
            current_datetime.getDate()

        this.state = {
            currentDate: formatted_date,
            serviceType: serviceType,
            categoryid: categoryid,
            bookingID: bookingid,
            postalcode: postalcode,
            authToken: localStorage.getItem("customeraccesstoken"),
            serviceTypeID: servicetypeid,
            servicetypename: servicetypename,
            genderpreference: genderpreference,
            inhouse: inhouse,
            inclinic: inclinic,
            bookingduration: bookingduration,
            totalprice: totalprice,
            sessionList: [],
            questionsList: [],
            sessionId: 0,
            numberOfSession: 0,
            lastVisitedPage: lastVisitedPage,
            offer: localStorage.getItem('offer'),
            studentDiscountCode: '',
            discountDetails: [],
            priceAfterDiscount: 0,
            discountlist: [],
            hasclickedfreeconsultation: hasclickedfreeconsultation
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Booking/getsessions?bookingid=' + this.state.bookingID + '&authtoken=' + this.state.authToken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ sessionList: data.sessionlist });
                console.log(this.state.sessionList);
            });

        fetch(App.ApisBaseUrlV2 + '/api/Booking/getbookingquestions?bookingid=' + this.state.bookingID + '&authtoken=' + this.state.authToken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ questionsList: data.questions.questionslist });
            });
    }

    handleChangeSelectSession(e) {

        this.setState({ sessionId: e.target.id });
        this.setState({ numberOfSession: e.target.className });

        var price = 0;
        if (e.target.getAttribute('rel') > 0) {
            price = localStorage.getItem('totalprice') * e.target.getAttribute('rel');
            this.setState({ totalprice: price });
        }
        else {
            price = localStorage.getItem('totalprice') * e.target.className;
            this.setState({ totalprice: price });
        }
    }

    handChangeDiscountCode(e) {
        this.setState({ studentDiscountCode: e.target.value });
    }

    submitDiscountCode(e) {
        e.preventDefault();
        fetch(App.ApisBaseUrlV2 + '/api/Discount/getdiscountdetail?discountcode=' + this.state.studentDiscountCode + '&authtoken=' + this.state.authToken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    if (data.detail.amount > 0 && this.state.totalprice > data.detail.amount) {
                        if (this.state.currentDate < data.detail.expirydate || this.state.currentDate == data.detail.expirydate) {
                            if (data.detail.amount < data.detail.maxlimit || data.detail.amount == data.detail.maxlimit) {
                                this.setState({ discountDetails: data.detail });
                                var applyDiscount = this.state.totalprice - data.detail.amount;
                                this.setState({ priceAfterDiscount: applyDiscount });
                            }
                            else {
                                this.setState({ discountDetails: data.detail });
                                var applyDiscount = this.state.totalprice - data.detail.maxlimit;
                                this.setState({ priceAfterDiscount: applyDiscount });
                            }
                        }
                        else {
                            toastr["error"]("This " + data.detail.description + " is expired!");
                        }
                    }
                    else {
                        toastr["error"]("Session price must be greater than " + data.detail.description + " discount amount!");
                    }
                }
                else {
                    toastr["error"](data.message);
                }
            })
    }

    handleSubmit(e) {
        //e.preventDefault();

    }

    proceedNext(e) {

        //-- Save Booking Session --//
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(this.state.bookingID),
                id: parseInt(this.state.sessionId),
                session: parseInt(this.state.numberOfSession),
                calculatedprice: this.state.priceAfterDiscount > 0 ? this.state.priceAfterDiscount : parseInt(this.state.totalprice),
                authtoken: this.state.authToken
            })
        };
        console.log(requestOptions);

        fetch(App.ApisBaseUrlV2 + '/api/Booking/savebookingsession', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    if (this.state.discountDetails != '') {
                        var finalPrice = this.state.priceAfterDiscount;
                    }
                    else {
                        var finalPrice = this.state.totalprice;
                    }
                    if (this.state.serviceType == 'hasduration') {
                        if (this.state.questionsList != null) {
                            window.location = '/questions-answers/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&bookingid=' + this.state.bookingID + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingduration=' + this.state.bookingduration + '&categoryid=' + this.state.categoryid + '&postalcode=' + this.state.postalcode +
                                '&genderpreference=' + this.state.genderpreference + '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                                '&hasquestions=' + this.state.hasquestions + '&totalprice=' + finalPrice + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                        else {
                            window.location = '/duration-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&bookingid=' + this.state.bookingID + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingduration=' + this.state.bookingduration + '&categoryid=' + this.state.categoryid + '&postalcode=' + this.state.postalcode +
                                '&genderpreference=' + this.state.genderpreference + '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                                '&hasquestions=' + this.state.hasquestions + '&totalprice=' + finalPrice + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                    }
                    else if (this.state.serviceType == 'isgeneric') {
                        if (this.state.questionsList != null) {
                            window.location = '/questions-answers/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' +
                                this.state.serviceTypeID + '&servicetypename=' + this.state.servicetypename + '&postalcode=' + this.state.postalcode +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&genderpreference=' + this.state.genderpreference +
                                '&totalprice=' + finalPrice + '&bookingid=' + this.state.bookingID + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                        else {
                            window.location = '/generic-date-time/?' + btoa(encodeURIComponent('categoryid=' + this.state.categoryid + '&servicetypeid=' +
                                this.state.serviceTypeID + '&servicetypename=' + this.state.servicetypename + '&postalcode=' + this.state.postalcode +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&genderpreference=' + this.state.genderpreference +
                                '&totalprice=' + finalPrice + '&bookingid=' + this.state.bookingID + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                    }
                    else if (this.state.serviceType == 'hasarea') {
                        if (this.state.questionsList != null) {
                            window.location = '/questions-answers/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingid=' + this.state.bookingID +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&totalprice=' +
                                finalPrice + '&bookingduration=' + this.state.bookingduration + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                        else {
                            window.location = '/areas-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingid=' + this.state.bookingID + '&totalprice=' + finalPrice +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                                '&bookingduration=' + this.state.bookingduration + '&hasclickedfreeconsultation=' + this.state.hasclickedfreeconsultation));
                        }
                    }
                }
            });


        //-- Save Booking Discount --//
        if (this.state.discountDetails != '') {
            var discountListKeysValues = {
                'discounttype': 'Discount code',
                'discount': parseInt(this.state.discountDetails.amount)
            }
            this.state.discountlist.push(discountListKeysValues);

            const bookingDiscountPrams = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingid: parseInt(this.state.bookingID),
                    discountlist: this.state.discountlist,
                    authtoken: this.state.authToken
                })
            };

            console.log(bookingDiscountPrams);

            fetch(App.ApisBaseUrlV2 + '/api/Booking/savebookingdiscount', bookingDiscountPrams)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.statuscode == 200) {

                    }
                });
        }
    }

    render() {

        console.log(this.state.inclinic);

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
                                                <p className="lead mb-0 service-name">{this.state.servicetypename}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row pb-4">
                                <div className="col-md-12">

                                    <div className="treatmentAreasTp">
                                        <p class="lead text-center pt-5 pb-3">Number of <span class="text-red">Sessions</span></p>
                                    </div>

                                    <div className="sessionsCard">

                                        <div class="card border-0">
                                            <div class="card-body">
                                                <ul class="list-group">
                                                    {this.state.sessionList.map(obj =>
                                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                                            <span><input className={obj.session} type="radio" name="sessions"
                                                                id={obj.id} rel={obj.discountedsession}
                                                                onChange={this.handleChangeSelectSession.bind(this)} />
                                                                <span className="numberOfSessions pl-5">{obj.session} Sessions</span>
                                                                <small>{obj.shortdescription}</small>
                                                            </span>
                                                            <span class="sessionPrice text-red">£
                                                                {obj.discountedsession > 0 ?
                                                                    obj.discountedsession * localStorage.getItem('totalprice')
                                                                    : obj.session * localStorage.getItem('totalprice')
                                                                }
                                                            </span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        {this.state.offer == '0' ?
                                            this.state.sessionId != '' ?
                                                <div className="col-md-12 text-center pt-5 pb-3">
                                                    <p className="mb-3">
                                                        Have a Discount Code?
                                                    </p>
                                                    <div className="reedemCode">
                                                        <span>
                                                            <input type="text" placeholder="Enter discount code" value={this.state.studentDiscountCode}
                                                                onChange={this.handChangeDiscountCode.bind(this)} />
                                                            {(this.state.studentDiscountCode != '') ?
                                                                <button className="btn bg-black text-white" type="button" onClick={this.submitDiscountCode.bind(this)}>Verify Code</button>
                                                                : <button className="btn bg-black text-white disabled" type="button">Verify Code</button>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                : ''
                                            : ''
                                        }

                                        {this.state.discountDetails != '' ?
                                            <div class="col-md-12 pt-5 notes">
                                                <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                                                    <p className="lead">Actual Price
                                                        <span className="pl-5">£{this.state.totalprice}</span>
                                                    </p>
                                                    <p className="lead">Discounted Price
                                                        <span className="pl-5">
                                                            £{this.state.priceAfterDiscount}
                                                            <small className="pl-3">
                                                                (
                                                                {this.state.discountDetails.description}
                                                                )
                                                            </small>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            : ''
                                        }


                                        <div className="text-center mb-3 checkoutBtn">
                                            {this.state.sessionId != '' ?
                                                <button className="btn btn-lg bg-orange text-white" type="submit"
                                                    onClick={this.proceedNext.bind(this)}>Next Step</button>
                                                : <button className="btn btn-lg bg-orange text-white disabled"
                                                    type="submit">Next Step</button>
                                            }
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
}
