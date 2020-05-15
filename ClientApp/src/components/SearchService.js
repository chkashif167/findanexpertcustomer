import React, { Component } from 'react';
import App from '../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../assets/img/free-service-label.png';
import notFound from '../assets/img/data_not_found.png';
import placeholderLarge from '../assets/img/placeholderLarge.jpg';

export class SearchService extends Component {
    displayName = SearchService.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        this.state = { search: keyWord, allServices: [], found: false, noSearchResult: "none" };
    }

    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                searchservice: this.state.search,
            })
        };

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/findservicetypev2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ allServices: data.searchedlist, found: true });
                }
                else {
                    this.state.allServices = [];
                    this.setState({ noSearchResult: "block" })
                }
            });
    }

    getServiceTypeID(e) {
        console.log(e.target.id);
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        return (
            this.renderAvailableServices(this.state.allServices)
        );
    }

    renderAvailableServices(allServices) {

        const listItems = allServices.map((obj, index) => (
            <li class="searchItem">
                <a href={'/services/' + encodeURI(obj.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            <div className="contentWrapper">
                                {(obj.offerpercentage > 0) ?
                                    <div class="ribbon ribbonTopLeft"><span>{obj.offerpercentage}% OFF</span></div>
                                    : ''
                                }
                                {obj.imagepath != '' ?
                                    <img className="card-img-top" src={obj.imagepath}
                                        alt={obj.servicetypename} />
                                    : <img className="card-img-top" src={placeholderLarge}
                                        alt='placeholder' />
                                }
                                <div className="serviceTitle">
                                    <h3 className={index} id={obj.servicetypeid}>
                                        {obj.servicetypename}
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </a>
            </li>
        ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        {this.state.allServices != '' ?
                            <ul>
                                {listItems}
                            </ul>
                            : <div className="col-md-12 text-center notFoundPage pt-4"
                                style={{ display: this.state.noSearchResult }}>
                                <div class="text">
                                    <p className="lead">Your search did not match any service. Please try again!</p>
                                </div>
                                <img src={notFound} />
                            </div>
                        }

                    </div>
                </div>
            </section>
        );

    }

    whenFreeTreatmentTrue(allServices) {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        const listItems = allServices.map((srvtype, index) => (

            <div class="col-md-4 pb-4">
                <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            {(srvtype.offerdiscount > 0) ?
                                <div class="ribbon ribbonTopLeft"><span>{srvtype.offerdiscount}% OFF</span></div>
                                : ''
                            }
                            <img className={index} src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt={srvtype.servicetypename}
                                id={srvtype.servicetypeid} onClick={this.getServiceTypeID} />
                            <div className="serviceTitle">
                                <h3 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                    {srvtype.servicetypename}</h3>
                            </div>
                        </div>

                        <div class="d-none rounded-bottom mdb-color lighten-3 text-center pt-3">
                            <a href={'/service-single/?' + btoa(encodeURIComponent('index=' + index + '&serviceid=' + srvtype.serviceid +
                                '&servicename=' + srvtype.servicename + '&servicetypeid=' +
                                srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                srvtype.servicetypename + '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse +
                                '&isgeneric=' + srvtype.isgeneric))}
                                class="btn bg-dark text-white services-card-footer-btn" >Get Details</a>
                            <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + keyWord + '&index=' + index + '&serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename +
                                '&servicetypeid=' + srvtype.servicetypeid + '&srvtypename=' + srvtype.servicetypename + '&isgenericservice=' + srvtype.isgenericservice +
                                '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse + '&isgeneric=' + srvtype.isgeneric + '&peakhours='
                                + srvtype.peakhours + '&end_peakhours=' + srvtype.end_peakhours))}
                                class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                        </div>
                    </div>
                </a>
            </div>
        ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div>
                            {listItems}
                        </div>

                    </div>
                </div>
            </section>
        );

    }

    whenFreeTreatmentTrue(allServices) {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        const listItems = allServices.map((srvtype, index) => (

            <div class="col-md-4 pb-4">
                <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            {(srvtype.offerdiscount > 0) ?
                                <div class="ribbon ribbonTopLeft"><span>{srvtype.offerdiscount}% OFF</span></div>
                                : ''
                            }
                            <img className={index} src={srvtype.servicetypeimagepath} alt={srvtype.servicetypename}
                                id={srvtype.servicetypeid} onClick={this.getServiceTypeID} />
                            <div className="serviceTitle">
                                <h3 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                    {srvtype.servicetypename}</h3>
                            </div>
                        </div>

                        <div class="d-none rounded-bottom mdb-color lighten-3 text-center pt-3">
                            <a href={'/service-single/?' + btoa(encodeURIComponent('index=' + index + '&serviceid=' + srvtype.serviceid +
                                '&servicename=' + srvtype.servicename + '&servicetypeid=' +
                                srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                srvtype.servicetypename + '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse +
                                '&isgeneric=' + srvtype.isgeneric))}
                                class="btn bg-dark text-white services-card-footer-btn" >Get Details</a>
                            <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + keyWord + '&index=' + index + '&serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename +
                                '&servicetypeid=' + srvtype.servicetypeid + '&srvtypename=' + srvtype.servicetypename + '&isgenericservice=' + srvtype.isgenericservice +
                                '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse + '&isgeneric=' + srvtype.isgeneric + '&peakhours='
                                + srvtype.peakhours + '&end_peakhours=' + srvtype.end_peakhours))}
                                class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                        </div>
                    </div>
                </a>
            </div>
        ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div>
                            {listItems}
                        </div>

                    </div>
                </div>
            </section>
        );

    }

    noServiceFound() {

        var style = {
            width: '6rem'
        }

        return (
            <section className="section-padding fullHeight" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div className="col-md-12 text-center notFoundPage pt-4">
                            <div class="text">
                                <p className="lead">Your search did not match any service. Please try again.</p>
                            </div>
                            <img src={notFound} />
                        </div>

                    </div>
                </div>
            </section>
        );
    }

}
