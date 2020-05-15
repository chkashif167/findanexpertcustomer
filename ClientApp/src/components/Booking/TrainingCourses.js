import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';

export class TrainingCourses extends Component {
    displayName = TrainingCourses.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const categoryid = params.get('categoryid');
        const servicetypeid = params.get('servicetypeid');
        const servicetypename = params.get('servicetypename');
        localStorage.setItem('servicetypename', servicetypename);
        const referralbonus = params.get('referralbonus');
        localStorage.setItem('referralbonus', referralbonus);
        const offer = params.get('offer');
        localStorage.setItem('offer', offer);

        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-0" + (current_datetime.getMonth() + 1) + "-" +
            current_datetime.getDate()

        this.state = {
            currentDate: formatted_date,
            categoryid: categoryid,
            serviceTypeName: servicetypename,
            servicetypeid: servicetypeid,
            addressid: 0,
            authToken: localStorage.getItem("customeraccesstoken"),
            cousedates: [],
            courseid: 0,
            coursePrice: 0,
            offer: localStorage.getItem('offer'),
            studentDiscountCode: '',
            discountDetails: [],
            priceAfterDiscount: 0,
            discountlist: []
        };
    }

    componentDidMount() {

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/gettrainingtypedetail?servicetypeid=' + this.state.servicetypeid)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ cousedates: data.course.coursedates });
            });
    }

    handleChangeSelectDate(e) {

        this.setState({ courseid: e.target.id });
        this.setState({ addressid: e.target.className });
        this.setState({ coursePrice: e.target.getAttribute('rel') });
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
                    if (data.detail.amount > 0 && this.state.coursePrice > data.detail.amount) {
                        if (this.state.currentDate < data.detail.expirydate || this.state.currentDate == data.detail.expirydate) {
                            if (data.detail.amount < data.detail.maxlimit || data.detail.amount == data.detail.maxlimit) {
                                this.setState({ discountDetails: data.detail });
                                var applyDiscount = this.state.coursePrice - data.detail.amount;
                                this.setState({ priceAfterDiscount: applyDiscount });
                            }
                            else {
                                this.setState({ discountDetails: data.detail });
                                var applyDiscount = this.state.coursePrice - data.detail.maxlimit;
                                this.setState({ priceAfterDiscount: applyDiscount });
                            }
                        }
                        else {
                            toastr["error"]("This " + data.detail.description + " is expired!");
                        }
                    }
                    else {
                        toastr["error"]("Course price must be greater than " + data.detail.description + " discount amount!");
                    }
                }
                else {
                    toastr["error"](data.message);
                }
            })
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestedParameters = {
            method: 'POST',
            headers: { 'content-Type': 'application/JSON' },
            body: JSON.stringify({
                bookingid: localStorage.getItem('bookingId') == null ? 0 : parseInt(localStorage.getItem('bookingId')),
                categoryid: parseInt(this.state.categoryid),
                servicetypeid: parseInt(this.state.servicetypeid),
                addressid: parseInt(this.state.addressid),
                courseid: parseInt(this.state.courseid),
                deviceplatform: "web",
                devicename: "web",
                authtoken: this.state.authToken
            })
        };

        console.log(requestedParameters);

        fetch(App.ApisBaseUrlV2 + '/api/Booking/dotrainingbooking', requestedParameters)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    localStorage.setItem('bookingId', data.bookingid);

                    //-- Save Booking Discount --//
                    if (this.state.offer > '0') {
                        var discountListKeysValues = {
                            'discounttype': 'Offer',
                            'discount': parseInt(this.state.offer)
                        }
                        this.state.discountlist.push(discountListKeysValues);
                    }
                    else if (this.state.discountDetails != '') {
                        var discountListKeysValues = {
                            'discounttype': 'Discount code',
                            'discount': parseInt(this.state.discountDetails.amount)
                        }
                        this.state.discountlist.push(discountListKeysValues);
                    }

                    if (this.state.offer > '0' || this.state.discountDetails != '') {
                        const bookingDiscountPrams = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                bookingid: parseInt(data.bookingid),
                                discountlist: this.state.discountlist,
                                authtoken: this.state.authToken
                            })
                        };

                        console.log(bookingDiscountPrams);

                        fetch(App.ApisBaseUrlV2 + '/api/Booking/savebookingdiscount', bookingDiscountPrams)
                            .then(response => {
                                return response.json();
                            })
                            .then(response => {
                                console.log(response);

                            });
                    }

                    if (this.state.offer > '0') {
                        var offerPercentage = this.state.coursePrice - this.state.offer * this.state.coursePrice / 100;
                        window.location = '/course-summary/?' + btoa(encodeURIComponent('bookingid=' + data.bookingid +
                            '&totalPrice=' + offerPercentage));
                    }
                    else if (this.state.discountDetails != '') {
                        window.location = '/course-summary/?' + btoa(encodeURIComponent('bookingid=' + data.bookingid +
                            '&totalPrice=' + this.state.priceAfterDiscount));
                    }
                    else {
                        window.location = '/course-summary/?' + btoa(encodeURIComponent('bookingid=' + data.bookingid +
                            '&totalPrice=' + this.state.coursePrice));
                    }
                }
            })

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
                                            <p className="lead mb-0 service-name text-white">{this.state.serviceTypeName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit.bind(this)} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            <div className="col-md-12 genderPreferenceWrap">
                                                <label class="col-form-label pb-4">Select Dates</label>
                                                <div className="genderPreferences">

                                                    {this.state.cousedates.map(obj =>
                                                        <div class="form-group row mb-4">

                                                            <div class="col-sm-8">
                                                                <div className="selectCourseRadio">
                                                                    {obj.totalseats - obj.bookedseats > 0 ?
                                                                        <input type="radio" name="from" id={obj.courseid} className={obj.addressid}
                                                                            rel={obj.price}
                                                                            onChange={this.handleChangeSelectDate.bind(this)} />
                                                                        : <input type="radio" name="from" id={obj.courseid} className={obj.addressid}
                                                                            rel={obj.price}
                                                                            disabled />
                                                                    }

                                                                </div>
                                                                <div className="cardWrapWithShadow d-inline-block">
                                                                    <div className="selectCourseFields">
                                                                        <div className="selectCourseField">
                                                                            <label class="form-check-label" for="from">
                                                                                <p className="font-weight-normal">From</p>
                                                                            </label>
                                                                            <input type="text" value={obj.fromdate} />
                                                                        </div>
                                                                        <div className="selectCourseField ml-3">
                                                                            <label class="form-check-label" for="to">
                                                                                <p className="font-weight-normal">To</p>
                                                                            </label>
                                                                            <input type="text" value={obj.todate} />
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-3">At: <strong>{obj.trainingcenter}</strong></p>
                                                                    <p>Price: <strong>{obj.price}</strong></p>
                                                                    <p>Total seats: <strong>{obj.totalseats - obj.bookedseats}</strong></p>
                                                                    <p>Details: <strong>{obj.details}</strong></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {this.state.offer == '0' ?
                                                        this.state.courseid != '' ?
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

                                                    {this.state.courseid != '' ?
                                                        this.state.discountDetails != '' ?
                                                            <div class="col-md-12 pt-5 notes">
                                                                <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                                                                    <p className="lead">Actual Price
                                                                        <span className="pl-5">£{this.state.coursePrice}</span>
                                                                    </p>
                                                                    <p className="lead">Discounted Price
                                                                        <span className="pl-5">
                                                                            £{this.state.priceAfterDiscount}
                                                                            <small className="pl-3">
                                                                                ({this.state.discountDetails.description})
                                                                            </small>
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            : this.state.offer > '0' ?
                                                                <div class="col-md-12 pt-5 notes">
                                                                    <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                                                                        <p className="lead">Actual Price
                                                                            <span className="pl-5">£{this.state.coursePrice}</span>
                                                                        </p>
                                                                        <p className="lead">Discounted Price
                                                                                <span className="pl-5">
                                                                                £{Math.round(this.state.coursePrice - this.state.offer * this.state.coursePrice / 100)}
                                                                                <small className="pl-3">
                                                                                    ({this.state.offer}% offer discount applied)
                                                                                    </small>
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                : ''
                                                        : ''
                                                    }

                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.state.courseid != '' ?
                                                    <div className="text-center mb-3 checkoutBtn">
                                                        <button className="btn btn-lg bg-orange text-white" type="submit">Save And Continue</button>
                                                    </div>
                                                    : <div className="text-center mb-3 checkoutBtn">
                                                        <button className="btn btn-lg bg-orange text-white" disabled>Save And Continue</button>
                                                    </div>
                                                }
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
