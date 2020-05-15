import React, { Component } from 'react';
import App from '../App';
import { Link } from 'react-router-dom';
import placeholderLarge from '../assets/img/placeholderLarge.jpg';
import freeServiceLabel from '../assets/img/free-service-label.png';

export class SearchServiceTypeFromFooter extends Component {
    displayName = SearchServiceTypeFromFooter.name


    constructor(props) {
        super(props);

        this.state = {
            totalPages: '', allServiceTypes: [], found: false
        };
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const categoryid = params.get('ID');
        const pageNumber = params.get('page');

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/getservicetypesV2?apikey=XzUzTFQzUS5AUEkudkAyX5OG8eakYoY5XY39bxPGnvU=&categoryid=' + categoryid)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ allServiceTypes: response.servicetypeslist, found: true });
            })
            .catch((error) => {

                this.state.allServiceTypes = [];
            });
    }

    getServiceTypeID(e) {
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        let contents = this.state.found
            ? this.renderAvailableServices(this.state.allServiceTypes)
            : <p><em>Loading......</em></p>;
        return <div>
            {contents}
        </div>;
    }

    renderAvailableServices(allServiceTypes) {

        var lastVisitedUrl = window.location.href;

        var urlArray = [];
        var urlArray = lastVisitedUrl.split("/");
        var serviceName = urlArray[4];

        const listItems = allServiceTypes.map((srvtype, index) => (
            <div class="col-md-4">
                <Link to={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            <div className="contentWrapper">
                                {(srvtype.offerpercentage > 0) ?
                                    <div class="ribbon ribbonTopLeft"><span>{srvtype.offerpercentage}% OFF</span></div>
                                    : ''
                                }
                                {srvtype.imagepath != '' ?
                                    <img className="card-img-top" src={srvtype.imagepath}
                                        alt={srvtype.servicetypename} />
                                    : <img className="card-img-top" src={placeholderLarge}
                                        alt='placeholder' />
                                }
                                <div className="serviceTitle">
                                    <h3 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                        {srvtype.servicetypename}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">
                        <div className="col-md-12">
                            <h3>{this.state.allServiceTypes[0].servicename}</h3>
                        </div>
                    </div>
                    <div className="row pb-4">
                        {listItems}
                    </div>
                </div>
            </section>
        );

    }

    noservicesFound() {
        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div className="col-md-12 fullHeight">
                            <h3>No data found!</h3>
                        </div>

                    </div>
                </div>
            </section>
        );
    }

}
