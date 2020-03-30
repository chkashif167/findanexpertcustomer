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

export class QuestionAnswers extends Component {
    displayName = QuestionAnswers.name

    constructor() {
        super();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceType = params.get('serviceType');
        const categoryid = params.get('categoryid');
        const servicetypeid = params.get('servicetypeid');
        const servicetypename = params.get('servicetypename');
        const inhouse = params.get('inhouse');
        const inclinic = params.get('inclinic');
        const bookingid = params.get('bookingid');
        const bookingduration = params.get('bookingduration');
        const totalprice = params.get('totalprice');
        const postalcode = params.get('postalcode');
        const hassession = params.get('hassession');
        const inclinicprice = params.get('inclinicprice');
        const inhouseprice = params.get('inhouseprice');

        var lastVisitedUrl = window.document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        this.state = {
            postalcode: postalcode,
            serviceType: serviceType,
            categoryid: categoryid,
            servicetypeid: servicetypeid,
            servicetypename: servicetypename,
            inhouse: inhouse,
            inclinic: inclinic,
            bookingduration: bookingduration,
            bookingID: bookingid,
            totalprice: totalprice,
            hassession: hassession,
            inclinicprice: inclinicprice,
            inhouseprice: inhouseprice,
            authToken: localStorage.getItem("customeraccesstoken"),
            questionsList: [],
            firstQuestion: [],
            nextQuestion: [],
            descriptionTypeQuestionId: '',
            descriptionAnwser: '',
            questionIds: [],
            answerOptions: [],
            answersList: [],
            nextStepButton: false,
            lastVisitedPage: lastVisitedPage
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Booking/getbookingquestions?bookingid=' + this.state.bookingID +
            '&authtoken=' + this.state.authToken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ questionsList: data.questions.questionslist });

                var newArray = this.state.firstQuestion.slice();
                for (var i = 0; i < this.state.questionsList.length; i++) {

                    if (i == 0) {
                        newArray.push(this.state.questionsList[i]);
                    }
                }
                this.setState({ firstQuestion: newArray });
            });
    }

    handleChangeSelectedOption(e) {

        var checkBox = document.getElementById(e.target.id);

        this.state.questionIds.push(e.target.id);

        this.state.answerOptions.push(e.target.getAttribute('rel'));

        var newArray = this.state.firstQuestion.slice();
        for (var i = 0; i < this.state.questionsList.length; i++) {

            if (this.state.questionsList[i].questionid == e.target.className) {
                newArray.pop(this.state.questionsList[i]);
                newArray.push(this.state.questionsList[i]);
                document.getElementById(e.target.id).checked = false;

                if (this.state.questionsList[i].questiontype == 'Finish') {
                    this.setState({ nextStepButton: true});
                }
            }
        }
        this.setState({ firstQuestion: newArray });

        var answersObjects = {
            'questionid': parseInt(e.target.id),
            'answer': e.target.getAttribute('rel'),
            'description': ''
        }

        this.state.answersList.push(answersObjects);
    }

    handleChangeAnwserDescription(e) {

        this.setState({ descriptionAnwser: e.target.value });
        this.setState({ descriptionTypeQuestionId: e.target.id });
    }

    sendDescription(e) {

        this.state.questionIds.push(this.state.descriptionTypeQuestionId);

        this.state.answerOptions.push(this.state.descriptionAnwser);

        if (e.target.id != '') {

            var newArray = this.state.firstQuestion.slice();
            for (var i = 0; i < this.state.questionsList.length; i++) {

                if (this.state.questionsList[i].questionid == e.target.id) {
                    newArray.pop(this.state.questionsList[i]);
                    newArray.push(this.state.questionsList[i]);
                }
            }

            this.setState({ firstQuestion: newArray });
        }
        else {

            var newArray = this.state.firstQuestion.slice();
            for (var i = 0; i < this.state.questionsList.length; i++) {

                if (this.state.questionsList[i].questiontype == 'Finish') {
                    newArray.pop(this.state.questionsList[i]);
                    newArray.push(this.state.questionsList[i]);
                    this.setState({ nextStepButton: true });
                }
            }
            this.setState({ firstQuestion: newArray });
        }

        var answersObjects = {
            'questionid': parseInt(this.state.questionIds),
            'answer': '',
            'description': this.state.descriptionAnwser
        }

        this.state.answersList.push(answersObjects);
    }

    handleSubmit(e) {

        e.preventDefault();

        const requestCardOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: parseInt(this.state.bookingID),
                answerslist: this.state.answersList,
                authtoken: this.state.authToken
            })
        };
        console.log(requestCardOptions);

        fetch(App.ApisBaseUrlV2 + '/api/Booking/savebookinganswers', requestCardOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    console.log(this.state.lastVisitedPage);
                    if (this.state.serviceType == 'hasarea') {
                        window.location = '/areas-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&bookingid=' + this.state.bookingID + '&totalprice='
                            + this.state.totalprice + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.servicetypeid + '&postalcode=' + this.state.postalcode +
                            '&servicetypename=' + this.state.servicetypename + '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic
                            + '&bookingduration=' + this.state.bookingduration));
                    }
                    else if (this.state.serviceType == 'hasduration') {
                        window.location = '/duration-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.servicetypename + '&isinclinic=' + this.state.inclinic + '&postalcode=' + this.state.postalcode +
                            '&isinhouse=' + this.state.inhouse + '&addressid=' + this.state.addressid + '&bookingduration=' + this.state.bookingduration + '&bookingid=' + 
                            this.state.bookingID + '&inclinicprice=' + this.state.inclinicprice +
                            '&inhouseprice=' + this.state.inhouseprice));
                    }
                    else if (this.state.serviceType == 'isgeneric') {
                        window.location = '/generic-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.servicetypename + '&isinclinic=' + this.state.inclinic + '&postalcode=' + this.state.postalcode +
                            '&isinhouse=' + this.state.inhouse + '&addressid=' + this.state.addressid + '&bookingid=' + this.state.bookingID));
                        if (this.state.hassession == 'true') {
                            window.location = '/service-sessions/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingID ));
                        }
                        else {
                            window.location = '/generic-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingID));window.location = '/generic-summary/?' + btoa(encodeURIComponent('bookingid=' + this.state.bookingID));
                        }
                    }
                }
            });
    }

    render() {

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
                            </div>

                            {this.state.firstQuestion.map((obj, index) =>
                                <div className="row">
                                    <div className="col-md-12 bg-lite-gray mt-4">
                                        <div className="treatmentAreasTp">
                                            <p class="lead text-center pt-3 pb-3 m-0">{obj.question}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-5">
                                        <div className="row">
                                            {obj.questiontype.toLowerCase() == 'yes-no' || obj.questiontype.toLowerCase() == 'mcq-radio' ?
                                                this.state.firstQuestion[index].optionslist.map((obj, index) =>
                                                    <div className="col-md-3 text-center">
                                                        <input className={obj.nextquestionid} type="radio" name="question"
                                                            id={obj.questionid} rel={obj.AnswerOption}
                                                            onChange={this.handleChangeSelectedOption.bind(this)} /> <span className="questionOptions pl-5">{obj.AnswerOption}</span>
                                                    </div>
                                                )
                                                : obj.questiontype.toLowerCase() == 'description' || obj.questiontype.toLowerCase() == 'yes-no-description' ?
                                                    <div className="col-md-6">
                                                        <textarea className="form-control rounded-0" id={obj.questionid} name="description" value={this.state.anwserDescription}
                                                            onChange={this.handleChangeAnwserDescription.bind(this)} rows="5"
                                                            placeholder="Write your anser......" />
                                                        <div className="text-center mb-3 checkoutBtn">
                                                            <input className="btn btn-lg bg-orange text-white" type="submit" value="Next"
                                                                id={obj.nextquestionid} onClick={this.sendDescription.bind(this)} />
                                                        </div>
                                                    </div>
                                                    : ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-5">
                                        <form onSubmit={this.handleSubmit.bind(this)} className="no-mobile">
                                            <div className="text-center ">
                                                {this.state.nextStepButton == true ?
                                                    <button className="btn btn-lg bg-orange text-white" type="submit"
                                                    >Next Step</button>
                                                    : ''
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
