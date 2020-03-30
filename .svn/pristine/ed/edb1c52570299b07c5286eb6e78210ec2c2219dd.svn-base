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
        const totalprice = params.get('totalprice');
        localStorage.setItem('totalprice', totalprice);
        const inhouseprice = params.get('inhouseprice');
        const inclinicprice = params.get('inclinicprice');

        var lastVisitedUrl = window.document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        this.state = {
            serviceType: serviceType,
            categoryid: categoryid,
            bookingID: bookingid,
            authToken: localStorage.getItem("customeraccesstoken"),
            serviceTypeID: servicetypeid,
            servicetypename: servicetypename,
            inhouse: inhouse,
            inclinic: inclinic,
            inclinicprice: inclinicprice,
            inhouseprice: inhouseprice,
            bookingduration: bookingduration,
            totalprice: totalprice,
            sessionList: [],
            questionsList: [],
            sessionId: 0,
            numberOfSession: 0,
            lastVisitedPage: lastVisitedPage
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

        if (e.target.getAttribute('rel') > 0) {
            var price = this.state.totalprice * e.target.getAttribute('rel');
            this.setState({ totalprice: price });
        }
        else {
            var price = this.state.totalprice * e.target.className;
            this.setState({ totalprice: price });
        }
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
                calculatedprice: parseInt(this.state.totalprice),
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
                    if (this.state.serviceType == 'hasduration') {
                        window.location = '/duration-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingID));
                    }
                    else if (this.state.serviceType == 'isgeneric') {
                        window.location = '/generic-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingID));
                    }
                    else if (this.state.serviceType == 'hasarea') {
                        if (this.state.questionsList != null) {
                            window.location = '/questions-answers/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingid=' + this.state.bookingID +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&totalprice=' +
                                this.state.totalprice + '&bookingduration=' + this.state.bookingduration));
                        }
                        else {
                            window.location = '/areas-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.serviceTypeID +
                                '&servicetypename=' + this.state.servicetypename + '&bookingid=' + this.state.bookingID + '&totalprice=' + this.state.totalprice +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                                '&bookingduration=' + this.state.bookingduration));
                        }
                    }
                }
            });
    }

    render() {

        console.log(this.state.inclinic);

        return (
            <div id="MainPageWrapper">

                <section className="bookingPage account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-gray p-2">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name text-white">{this.state.servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

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
                                                                    onChange={this.handleChangeSelectSession.bind(this)} /> <span className="numberOfSessions pl-5">{obj.session} Sessions</span><small>{obj.shortdescription}</small></span>
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

                                            <div className="text-center mb-3 checkoutBtn">
                                            <button className="btn btn-lg bg-orange text-white" type="submit"
                                                onClick={this.proceedNext.bind(this)}>Next Step</button>
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
