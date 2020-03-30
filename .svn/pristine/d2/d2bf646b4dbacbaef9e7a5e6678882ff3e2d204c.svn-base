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

        this.state = {
            categoryid: categoryid,
            serviceTypeName: servicetypename,
            servicetypeid: servicetypeid,
            addressid: 0,
            authToken: localStorage.getItem("customeraccesstoken"),
            cousedates: [],
            courseid: 0,
            remainingSeats: 0
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
        this.setState({ remainingSeats: e.target.getAttribute('rel') });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.remainingSeats > 0) {
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
                        window.location = '/course-summary/?' + btoa(encodeURIComponent('bookingid=' + data.bookingid));
                    }
                })
        }
        else {
            toastr["error"]('This date has 0 seats. Please select another date.');
        }
        
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
                                                                    <input type="radio" name="from" id={obj.courseid} className={obj.addressid} 
                                                                        rel={obj.totalseats - obj.bookedseats}
                                                                        onChange={this.handleChangeSelectDate.bind(this)} />
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
                                                                    <p className="mt-3">At: {obj.trainingcenter}</p>
                                                                    <p>Total seats: <strong>{obj.totalseats - obj.bookedseats}</strong></p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="text-center mb-3 checkoutBtn">
                                                    <button className="btn btn-lg bg-orange text-white" type="submit">Save And Continue</button>
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
