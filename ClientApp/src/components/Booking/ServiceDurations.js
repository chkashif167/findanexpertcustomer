import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';

export class ServiceDurations extends Component {
    displayName = ServiceDurations.name
     
    constructor(props) {
        super(props);

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
        const hasquestions = params.get('hasquestions');
        const hassession = params.get('hassession');
        const isfreeconsultation = params.get('isfreeconsultation');
        const requiredgenderpreference = params.get('requiredgenderpreference');
        localStorage.setItem('requiredgenderpreference', requiredgenderpreference);

        this.state = {
            serviceType: serviceType,
            serviceTypeName: servicetypename,
            categoryid: categoryid,
            servicetypeid: servicetypeid,
            inclinic: inclinic,
            inhouse: inhouse,
            hasquestions: hasquestions,
            hassession: hassession,
            isfreeconsultation: isfreeconsultation,
            authToken: localStorage.getItem("customeraccesstoken"),
            durationsList: [],
            duration: 0,
            inclinicprice: 0,
            inhouseprice: 0,
            genderpreference: 0,
            genderPreferenceList: [],
            bookingID: 0,
            discountlist: []
        };
    }

    componentDidMount() {

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/getdurations?servicetypeid=' + this.state.servicetypeid + '&authtoken=' + this.state.authToken)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ durationsList: response.durationslist });
                console.log(this.state.durationsList);
            });
    }

    handleChangeServiceDuration(e) {
        this.setState({ duration: e.target.className });

        for (var i = 0; i < this.state.durationsList.length; i++) {

            if (i == e.target.id) {
                this.setState({ inclinicprice: this.state.durationsList[i].inclinicprice });
                this.setState({ inhouseprice: this.state.durationsList[i].inhouseprice });
            }
        }
    }

    handleChangeGenderPreference(e) {
        var checkBox = document.getElementById(e.target.id);
        this.setState({ genderpreference: e.target.value });
        localStorage.setItem('gendpreference', e.target.value);

        if (checkBox.checked == true) {
            this.state.genderPreferenceList.push(e.target.value);
        }
        else if (checkBox.checked == false) {
            let index = this.state.genderPreferenceList.indexOf(e.target.value);
            this.state.genderPreferenceList.splice(index, 1);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (localStorage.getItem('requiredgenderpreference') == 'true') {
            if (this.state.genderPreferenceList.length == 1) {
                var genderPreference = this.state.genderpreference;
            }
            else {
                var genderPreference = 'both';
            }
        }
        else {
            var genderPreference = 'both';
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: localStorage.getItem('bookingId') == null ? 0 : parseInt(localStorage.getItem('bookingId')),
                categoryid: parseInt(this.state.categoryid),
                servicetypeid: parseInt(this.state.servicetypeid),
                bookingduration: parseInt(this.state.duration),
                genderpreference: localStorage.getItem('requiredgenderpreference') == 'true' ? this.state.genderPreferenceList.length == 1 ? this.state.genderpreference : 'both' : 'both',
                isfreeconsultation: this.state.isfreeconsultation != null ? this.state.isfreeconsultation == 'true' ? true : false : false,
                deviceplatform: "web",
                devicename: "web",
                authtoken: this.state.authToken
            })
        };

        console.log(requestOptions);

        fetch(App.ApisBaseUrlV2 + '/api/Booking/dodurationbooking', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    localStorage.setItem('bookingId', data.bookingid);

                    if (this.state.durationsList.hasoffer == true) {
                        //-- Save Booking Discount --//
                        var discountListKeysValues = {
                            'discounttype': 'variantdiscount',
                            'discount': parseInt(this.state.discount)
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
                                    if (this.state.isfreeconsultation == 'true') {
                                        window.location = '/select-address/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.serviceTypeName + '&bookingduration=' + this.state.duration +
                                            '&genderpreference=' + genderPreference + '&inclinic=' + this.state.inclinic +
                                            '&inhouse=' + this.state.inhouse + '&bookingid=' + data.bookingid +
                                            '&isfreeconsultation=' + this.state.isfreeconsultation + '&inclinicprice=' + this.state.inclinicprice +
                                            '&inhouseprice=' + this.state.inhouseprice));
                                    }
                                    else {
                                        window.location = '/select-address/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.serviceTypeName + '&bookingduration=' + this.state.duration +
                                            '&genderpreference=' + genderPreference + '&inclinic=' + this.state.inclinic +
                                            '&inhouse=' + this.state.inhouse + '&bookingid=' + data.bookingid +
                                            '&hasquestions=' + this.state.hasquestions + '&hassession=' + this.state.hassession + '&inclinicprice=' + this.state.inclinicprice +
                                            '&inhouseprice=' + this.state.inhouseprice));
                                    }
                                }
                            });
                    }
                    else if (this.state.isfreeconsultation == 'true') {
                        window.location = '/select-address/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.serviceTypeName + '&bookingduration=' + this.state.duration +
                            '&genderpreference=' + genderPreference + '&inclinic=' + this.state.inclinic +
                            '&inhouse=' + this.state.inhouse + '&bookingid=' + data.bookingid +
                            '&isfreeconsultation=' + this.state.isfreeconsultation + '&inclinicprice=' + this.state.inclinicprice +
                            '&inhouseprice=' + this.state.inhouseprice));
                    }
                    else {
                        window.location = '/select-address/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid +
                            '&servicetypeid=' + this.state.servicetypeid + '&servicetypename=' + this.state.serviceTypeName + '&bookingduration=' + this.state.duration +
                            '&genderpreference=' + genderPreference + '&inclinic=' + this.state.inclinic +
                            '&inhouse=' + this.state.inhouse + '&bookingid=' + data.bookingid +
                            '&hasquestions=' + this.state.hasquestions + '&hassession=' + this.state.hassession + '&inclinicprice=' + this.state.inclinicprice +
                            '&inhouseprice=' + this.state.inhouseprice));
                    }
                }
            });
    }

    render() {
        console.log(this.state.isfreeconsultation);

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

                                            <div className="col-md-12 durationWrap mb-5">
                                                <label class="col-form-label pb-4">I want my Service to be</label>
                                                <div className="cardWrapWithShadow durationList">
                                                    <div class="form-group row">
                                                        {this.state.durationsList.map((obj, index) =>
                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="radio" name="exampleRadios" id={index} className={obj.duration}
                                                                        onChange={this.handleChangeServiceDuration.bind(this)} value={this.state.duration} required />
                                                                    <label class="form-check-label" for={index}>
                                                                        <p className="font-weight-normal">{obj.duration} Minutes</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {localStorage.getItem('requiredgenderpreference') == 'true' ? 
                                                <div className="col-md-12 genderPreferenceWrap">
                                                    <label class="col-form-label pb-4">I want my Service Provider to be</label>
                                                    <div className="cardWrapWithShadow genderPreferences">
                                                        <div class="form-group row">

                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="checkbox" name="genderPreference" id="genderPreference1" value="male"
                                                                        onChange={this.handleChangeGenderPreference.bind(this)} />
                                                                    <label class="form-check-label" for="genderPreference1">
                                                                        <p className="font-weight-normal">Male</p>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="checkbox" name="genderPreference" id="genderPreference2" value="female"
                                                                        onChange={this.handleChangeGenderPreference.bind(this)} />
                                                                    <label class="form-check-label" for="genderPreference2">
                                                                        <p className="font-weight-normal">Female</p>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                : ''
                                            }
                                            

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="text-center mb-3 checkoutBtn">
                                                    {this.state.duration != '' ?
                                                        <button className="btn btn-lg bg-orange text-white" type="submit">Next Step</button>
                                                        : ''
                                                    }
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
