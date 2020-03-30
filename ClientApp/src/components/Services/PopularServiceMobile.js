import React, { Component } from 'react';
import App from '../../App';

export class PopularServicesMobile extends Component {
    displayName = PopularServicesMobile.name

    constructor(props) {
        super(props);
        this.state = { allServices: [], loading: true };

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(App.ApisBaseUrl + '/api/Service/getpromoservices', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ allServices: data, loading: false });
            });
    }

    static renderPopularServices(allServices) {
        return (
            <div>

                    <div className="carousel-item active">
                        {allServices.map(srvi =>
                            <div className="col-md-4" key={srvi.serviceid}>
                                <div className="card mb-2">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srvi.serviceid + '&servicename=' + srvi.servicename))}>
                                        <img className="card-img-top" src={App.ApisBaseUrl + srvi.serviceimagepath} alt="Popular Services" />
                                        <div className="offers overlay">
                                            <h4 className="overlay-text text-white">{srvi.servicename}</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="carousel-item">
                        {allServices.map(srvi =>
                            <div className="col-md-4" key={srvi.serviceid}>
                                <div className="card mb-2">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srvi.serviceid + '&servicename=' + srvi.servicename))}>
                                        <img className="card-img-top" src={'http://admin.findanexpert.net/' + srvi.serviceimagepath} alt="Popular Services" />
                                        <div className="offers overlay">
                                            <h4 className="overlay-text text-white">{srvi.servicename}</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="carousel-item">
                        {allServices.map(srvi =>
                            <div className="col-md-4" key={srvi.serviceid}>
                                <div className="card mb-2">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srvi.serviceid + '&servicename=' + srvi.servicename))}>
                                        <img className="card-img-top" src={App.ApisBaseUrl + srvi.serviceimagepath} alt="Popular Services" />
                                        <div className="offers overlay">
                                            <h4 className="overlay-text text-white">{srvi.servicename}</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="carousel-item">
                        {allServices.map(srvi =>
                            <div className="col-md-4" key={srvi.serviceid}>
                                <div className="card mb-2">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srvi.serviceid + '&servicename=' + srvi.servicename))}>
                                        <img className="card-img-top" src={App.ApisBaseUrl + srvi.serviceimagepath} alt="Popular Services" />
                                        <div className="offers overlay">
                                            <h4 className="overlay-text text-white">{srvi.servicename}</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="carousel-item">
                        {allServices.map(srvi =>
                            <div className="col-md-4" key={srvi.serviceid}>
                                <div className="card mb-2">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srvi.serviceid + '&servicename=' + srvi.servicename))}>
                                        <img className="card-img-top" src={App.ApisBaseUrl + srvi.serviceimagepath} alt="Popular Services" />
                                        <div className="offers overlay">
                                            <h4 className="overlay-text text-white">{srvi.servicename}</h4>
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
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : PopularServicesMobile.renderPopularServices(this.state.allServices);
        return (
            <div>
                {contents}
            </div>
        );
    }
}

PopularServicesMobile.defaultProps = {
    allServices: []
}

export default PopularServicesMobile;
