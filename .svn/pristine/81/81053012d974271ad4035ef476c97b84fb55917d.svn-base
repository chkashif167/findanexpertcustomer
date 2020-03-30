import React, { Component } from 'react';
import { Home } from '../Home';
import App from '../../App';

export class RecommendedServicesMobile extends Component {
    displayName = RecommendedServicesMobile.name

    constructor(props) {
        super(props);
        this.state = { allServices: [], loading: true };

        if (localStorage.getItem("customerid") != null) {
            var customerId = localStorage.getItem("customerid");
        } else {
            var customerId = "0";
        }

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        fetch(App.ApisBaseUrl + '/api/ServiceType/getcustomerpreference?customerId=' + customerId + '&email=' + customerEmail + '&authToken=' + customerAccesstoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ allServices: data, loading: false });
            });
    }

    static renderRecommendedServices(allServices) {
        return (
            <div>
                <div className="carousel-item active">
                    {allServices.map(srvtype =>
                        <div className="col-md-4" key={srvtype.serviceid}>
                            <div className="card mb-2">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename + '&servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                    srvtype.servicetypename + '&srvtypeduration=' + srvtype.servicetypeduration + '&srvtypeprice=' + srvtype.price))}>
                                    <img className="card-img-top" src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt="Recommended Services" />
                                    <div className="offers overlay">
                                        <h4 className="overlay-text text-white">{srvtype.servicetypename}</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="carousel-item">
                    {allServices.map(srvtype =>
                        <div className="col-md-4" key={srvtype.serviceid}>
                            <div className="card mb-2">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename + '&servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                    srvtype.servicetypename + '&srvtypeduration=' + srvtype.servicetypeduration + '&srvtypeprice=' + srvtype.price))}>
                                    <img className="card-img-top" src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt="Recommended Services" />
                                    <div className="offers overlay">
                                        <h4 className="overlay-text text-white">{srvtype.servicetypename}</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="carousel-item">
                    {allServices.map(srvtype =>
                        <div className="col-md-4" key={srvtype.serviceid}>
                            <div className="card mb-2">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename + '&servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                    srvtype.servicetypename + '&srvtypeduration=' + srvtype.servicetypeduration + '&srvtypeprice=' + srvtype.price))}>
                                    <img className="card-img-top" src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt="Recommended Services" />
                                    <div className="offers overlay">
                                        <h4 className="overlay-text text-white">{srvtype.servicetypename}</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="carousel-item">
                    {allServices.map(srvtype =>
                        <div className="col-md-4" key={srvtype.serviceid}>
                            <div className="card mb-2">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename + '&servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                    srvtype.servicetypename + '&srvtypeduration=' + srvtype.servicetypeduration + '&srvtypeprice=' + srvtype.price))}>
                                    <img className="card-img-top" src={'http://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt="Recommended Services" />
                                    <div className="offers overlay">
                                        <h4 className="overlay-text text-white">{srvtype.servicetypename}</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="carousel-item">
                    {allServices.map(srvtype =>
                        <div className="col-md-4" key={srvtype.serviceid}>
                            <div className="card mb-2">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename + '&servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                    srvtype.servicetypename + '&srvtypeduration=' + srvtype.servicetypeduration + '&srvtypeprice=' + srvtype.price))}>
                                    <img className="card-img-top" src={'http://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt="Recommended Services" />
                                    <div className="offers overlay">
                                        <h4 className="overlay-text text-white">{srvtype.servicetypename}</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }

    render() {
        let contents = <p><em>...</em></p>
        let HasData = this.state.allServices == null ? false : true;
        if (HasData) {
            contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : RecommendedServicesMobile.renderRecommendedServices(this.state.allServices);
        }

        return (
            <div>
                {contents}
            </div>
        );
    }

}

RecommendedServicesMobile.defaultProps = {
    allServices: []
}

export default RecommendedServicesMobile;
