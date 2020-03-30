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

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class ServiceAreas extends Component {
    displayName = ServiceAreas.name

    static bookingId = 0;

    constructor() {
        super();

        var todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var dateArray = [];
        var dateArray = todayDate.split("-");
        var year = dateArray[0];
        var month = dateArray[1];
        var day = dateArray[2];

        var dateFormatted = day + '-' + month + '-' + year;

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
            inhouse: inhouse,
            inclinic: inclinic,
            hasquestions: hasquestions,
            hassession: hassession,
            isfreeconsultation: isfreeconsultation,
            authToken: localStorage.getItem("customeraccesstoken"),
            apiResponse: [],
            configList: [], variantsList: [], areasList: [], currentDate: dateFormatted,
            multipleAreaIds: [],
            areaidList: [],
            areaIds: [],
            areaDurations: [], areaPrices: [], packagePrices: [], packagePricesSum: 0,
            areasTotalPrice: 0, discountedPrices: 0, areaDurationsSum: [],
            discount: 0, finalPrice: 0,
            checkboxStatus: false, bookingID: 0,
            discountlist: [],
            checkPriceBtn: false
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/getareas?servicetypeid=' + this.state.servicetypeid + '&authtoken=' + this.state.authToken)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ configList: response.configlist });
                console.log(this.state.configList);

                this.setState({ variantsList: response.packagelist });
                console.log(this.state.variantsList);

                var newArray = this.state.areasList.slice();
                for (var i = 0; i < this.state.variantsList.length; i++) {

                    newArray.push(this.state.variantsList[i].areaslist);
                }

                this.setState({ areasList: newArray });
                console.log(this.state.areasList);
            });
    }

    handleChangePackages(e) {
        var checkBox = document.getElementById(e.target.id);
        this.setState({ checkboxStatus: document.getElementById(e.target.id) });

        var areasInnerList = [];
        
        if (checkBox.checked == true) {
            for (var i = 0; i < this.state.areasList.length; i++) {
                if (i == e.target.id) {
                    areasInnerList.push(this.state.areasList[i]);
                    var newArray = areasInnerList[0];
                    for (var j = 0; j < newArray.length; j++) {
                        var areaidlistObjects = {
                            'areaid': parseInt(newArray[j].areaid),
                            'packagedetailid': parseInt(newArray[j].packagedetailid)
                        }
                        this.state.areaidList.push(areaidlistObjects);
                        this.state.areaDurations.push(newArray[j].duration);
                    }

                    this.state.packagePrices.push(e.target.getAttribute('name'));
                }
            }
        }
        else if (checkBox.checked == false) {
            for (var i = 0; i < this.state.areasList.length; i++) {
                if (i == e.target.id) {
                    areasInnerList.push(this.state.areasList[i]);
                    var newArray = areasInnerList[0];
                    for (var j = 0; j < newArray.length; j++) {
                        var areaidlistObjects = {
                            'areaid': parseInt(newArray[j].areaid),
                            'packagedetailid': parseInt(newArray[j].packagedetailid)
                        }
                        //this.state.areaidList.splice(j, 1);
                        this.state.areaidList.pop(areaidlistObjects);
                        this.state.areaDurations.pop(newArray[j].duration);
                    }

                    this.state.packagePrices.pop(e.target.getAttribute('name'));
                    
                    //this.state.areaDurations.push(areasInnerList[0].map(obj => obj.duration));
                }
            }
        }

        this.state.areaDurationsSum = 0;
        for (var i = 0; i < this.state.areaDurations.length; i++) {

            this.state.areaDurationsSum += parseInt(this.state.areaDurations[i]);
        }

        if (this.state.packagePrices.length != 0) {
            this.state.packagePricesSum = 0;
            for (var i = 0; i < this.state.packagePrices.length; i++) {

                this.state.packagePricesSum += parseInt(this.state.packagePrices[i]);
            }

            if (this.state.areaPrices.length != 0) {
                for (var i = 0; i < this.state.areaPrices.length; i++) {
                    var priceSum = this.state.areaPrices[i];
                    var sum = 0;
                    sum += parseInt(priceSum);
                    this.state.packagePricesSum += sum;
                }
            }

            this.setState({ areasTotalPrice: this.state.packagePricesSum });
        }

        console.log(this.state.areasTotalPrice);
    }

    handleChangeAreasPriceList(e) {

        var checkBox = document.getElementById(e.target.id);
        this.setState({ checkboxStatus: document.getElementById(e.target.id) });

        if (checkBox.checked == true) {

            var areaidlistObjects = {
                'areaid': parseInt(e.target.id),
                'packagedetailid': parseInt(e.target.getAttribute('rel'))
            }
            console.log(areaidlistObjects);
            
            this.state.areaidList.push(areaidlistObjects);
            this.state.areaDurations.push(e.target.value);
            this.state.areaPrices.push(e.target.className);
        }
        else if (checkBox.checked == false) {

            var areaidlistObjects = {
                'areaid': parseInt(e.target.id),
                'packagedetailid': parseInt(e.target.getAttribute('rel'))
            }
            console.log(areaidlistObjects);

            let index = this.state.areaidList.indexOf(areaidlistObjects);
            console.log(index);
            this.state.areaidList.splice(index, 1);

            //this.state.areaidList.pop(areaidlistObjects);
            this.state.areaDurations.pop(e.target.value);
            this.state.areaPrices.pop(e.target.className);
        }

        this.state.areaDurationsSum = 0;
        for (var i = 0; i < this.state.areaDurations.length; i++) {
            this.state.areaDurationsSum += parseInt(this.state.areaDurations[i]);
        }

        
        this.state.areasTotalPrice = 0;
        for (var i = 0; i < this.state.areaPrices.length; i++) {
            var priceSum = this.state.areaPrices[i];
            this.state.areasTotalPrice += parseInt(priceSum);
        }

        if (this.state.packagePricesSum != 0) {
            this.state.areasTotalPrice += parseInt(this.state.packagePricesSum);
        }

        console.log(this.state.areaidList);
        console.log(this.state.areaPrices);
    }

    handleSubmit(e) {

        e.preventDefault();
        this.setState({ checkPriceBtn: true });
        console.log(this.state.areasTotalPrice);
        console.log(this.state.areaDurationsSum);

        if (this.state.checkboxStatus.checked == true) {
            for (var i = 0; i < this.state.configList.length; i++) {
                if (this.state.configList[i].number == this.state.areaidList.length) {
                    var calculateDiscount = this.state.configList[i].offer * this.state.areasTotalPrice / 100;
                    this.setState({ discount: calculateDiscount });
                    var applyDiscount = this.state.areasTotalPrice - calculateDiscount;
                    this.setState({ finalPrice: applyDiscount });
                }
                else if (this.state.configList[i].number != this.state.areaidList.length &&
                    this.state.areaidList.length > this.state.configList[i].number) {
                    var calculateDiscount = this.state.configList.slice(-1)[0].offer * this.state.areasTotalPrice / 100;
                    this.setState({ discount: calculateDiscount });
                    var applyDiscount = this.state.areasTotalPrice - calculateDiscount;
                    this.setState({ finalPrice: applyDiscount });
                }
            }
        }
        else if (this.state.checkboxStatus.checked == false) {

            this.state.areaIds.pop(e.target.value);
            this.state.areaDurations.pop(e.target.getAttribute('name'));
            this.state.areaPrices.pop(e.target.className);

            for (var i = 0; i < this.state.configList.length; i++) {

                if (this.state.configList[i].number == this.state.areaidList.length) {
                    var calculateDiscount = this.state.configList[i].offer * this.state.areasTotalPrice / 100;
                    this.setState({ discount: calculateDiscount });
                    var applyDiscount = this.state.areasTotalPrice - calculateDiscount;
                    this.setState({ finalPrice: applyDiscount });
                }
                else if (this.state.configList[i].number != this.state.areaidList.length &&
                    this.state.areaidList.length > this.state.configList[i].number) {
                    var calculateDiscount = this.state.configList.slice(-1)[0].offer * this.state.areasTotalPrice / 100;
                    this.setState({ discount: calculateDiscount });
                    var applyDiscount = this.state.areasTotalPrice - calculateDiscount;
                    this.setState({ finalPrice: applyDiscount });
                }
            }
        }

        if (this.state.finalPrice != 0) {
            localStorage.setItem('serviceFinalPrice', this.state.finalPrice);
        }
        else {
            localStorage.setItem('serviceFinalPrice', this.state.areasTotalPrice);
        }

        var areaIDs = this.state.areaIds;
        var areaIdsList = areaIDs.map(Number);
        
        //-- Get BookingId --//
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: localStorage.getItem('bookingId') == null ? 0 : parseInt(localStorage.getItem('bookingId')),
                categoryid: parseInt(this.state.categoryid),
                servicetypeid: parseInt(this.state.servicetypeid),
                areaidlist: this.state.areaidList,
                isfreeconsultation: this.state.isfreeconsultation != null ? this.state.isfreeconsultation == 'true' ? true : false : false,
                deviceplatform: "web",
                devicename: "web",
                authtoken: this.state.authToken
            })
        };

        console.log(requestOptions);

        fetch(App.ApisBaseUrlV2 + '/api/Booking/doareabooking', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ bookingID: data.bookingid });
                localStorage.setItem('bookingId', this.state.bookingID);
                console.log(localStorage.getItem('bookingId'));
            });
    }

    otherAction(e) {
        e.preventDefault();

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
                        window.location = '/areas-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.servicetypeid +
                            '&servicetypename=' + this.state.serviceTypeName + '&bookingid=' + this.state.bookingID + '&totalprice=' + this.state.finalPrice +
                            '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                            '&bookingduration=' + this.state.areaDurationsSum + '&isfreeconsultation=' + this.state.isfreeconsultation));
                    }
                    else {
                        if (this.state.hassession == 'true') {
                            window.location = '/service-sessions/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.servicetypeid +
                                '&servicetypename=' + this.state.serviceTypeName + '&bookingid=' + this.state.bookingID +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&totalprice=' +
                                this.state.finalPrice + '&bookingduration=' + this.state.areaDurationsSum));
                        }
                        else if (this.state.hasquestions == 'true') {
                            window.location = '/questions-answers/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.servicetypeid +
                                '&servicetypename=' + this.state.serviceTypeName + '&bookingid=' + this.state.bookingID +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic + '&totalprice=' +
                                this.state.finalPrice + '&bookingduration=' + this.state.areaDurationsSum));
                        }
                        else {
                            window.location = '/areas-date-time/?' + btoa(encodeURIComponent('serviceType=' + this.state.serviceType + '&categoryid=' + this.state.categoryid + '&servicetypeid=' + this.state.servicetypeid +
                                '&servicetypename=' + this.state.serviceTypeName + '&bookingid=' + this.state.bookingID + '&totalprice=' + this.state.finalPrice +
                                '&inhouse=' + this.state.inhouse + '&inclinic=' + this.state.inclinic +
                                '&bookingduration=' + this.state.areaDurationsSum));
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
                                            <p className="lead mb-0 service-name text-white">{this.state.serviceTypeName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <div className="treatmentAreasTp">
                                        <p class="lead text-center pt-5 pb-3">Select <span class="text-red">Treatment Area</span></p>
                                        <div className="row">
                                            {this.state.configList.map(obj =>
                                                <div className="col-md-4">
                                                    <div className="circle rounded-circle bg-red">
                                                        <p>{obj.number}Areas</p>
                                                        <small>{obj.offer}% OFF</small>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            {this.state.variantsList.map((obj1, index) =>
                                                <div className="col-md-6 pt-5">
                                                    <div id="accordion">
                                                        <div class="card areasCard">
                                                            <div class="card-header" id="headingOne">
                                                                <h5 class="m-0">
                                                                    {obj1.isallselectable == true ?
                                                                        <a class="btn btn-link">
                                                                            <div className="areaChecks">
                                                                                <input type="checkbox" id={index} name={obj1.packageprice}
                                                                                    onChange={this.handleChangePackages.bind(this)}
                                                                                />
                                                                                <label class="form-check-label" for={index}>
                                                                                    {obj1.packagename} <span className="text-red">£{obj1.packageprice}</span>
                                                                                </label>
                                                                            </div>
                                                                        </a>
                                                                        : <a class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                                                            aria-expanded="true" aria-controls="collapseOne">
                                                                            {obj1.packagename} <span className="text-red">£{obj1.packageprice}</span>
                                                                        </a>
                                                                    }
                                                                </h5>
                                                            </div>

                                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                                <div class="card-body">
                                                                    
                                                                    {obj1.isallselectable == true ?
                                                                        this.state.variantsList[index].areaslist.map((obj, index) =>
                                                                            <div className="areaChecks">
                                                                                <input type="checkbox" disabled />
                                                                                <label class="form-check-label" for={obj.areaid}>
                                                                                    {obj.areaname}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                        : this.state.variantsList[index].areaslist.map((obj, index) =>
                                                                            <div className="areaChecks">
                                                                                <input type="checkbox" id={obj.areaid} name="areaPrice"
                                                                                    value={obj.duration} className={obj1.packageprice} rel={obj.packagedetailid}
                                                                                    onChange={this.handleChangeAreasPriceList.bind(this)} onClick={this.checkboxChecked}
                                                                                />
                                                                                <label class="form-check-label" for={obj.areaid}>
                                                                                    {obj.areaname}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-md-12">
                                                <form onSubmit={this.handleSubmit.bind(this)} >
                                                    <div className="text-center mb-3 checkoutBtn">
                                                        <button className="btn btn-lg bg-orange text-white" type="submit">Check Price</button>
                                                    </div>
                                                </form>
                                            </div>

                                            {this.state.checkPriceBtn == true ?
                                                <div class="col-md-12 pt-5 notes">
                                                    <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                                                        <p className="lead">Actual Price <span className="pl-5">£{this.state.areasTotalPrice}</span></p>
                                                        {this.state.finalPrice != 0 ?
                                                            <p className="lead">Discounted Price <span className="pl-5">£ {this.state.finalPrice}</span></p>
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                                : ''
                                            }

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3 checkoutBtn">
                                                    {this.state.bookingID != 0 ?
                                                        <button className="btn btn-lg bg-orange text-white" type="submit"
                                                            onClick={this.otherAction.bind(this)}>Next Step</button>
                                                        : ''
                                                    }
                                                </div>
                                            </div>
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
