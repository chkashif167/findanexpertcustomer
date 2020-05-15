import React, { Component } from 'react';
import { Home } from '../Home';
import App from '../../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../../assets/img/free-service-label.png';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

export class RecommendedServices extends Component {
    displayName = RecommendedServices.name

    constructor(props) {
        super(props);
        this.state = { servicesList: [], loading: true };
    }

    componentDidMount() {
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        fetch(App.ApisBaseUrlV2 + '/api/Customer/getpreferences?email=' + '' + '&pagenumber=1&pagesize=10')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ servicesList: data.preferencelist, loading: false });
                }
                else {
                    this.state.allServices = [];
                }
            })
    }

    getServiceTypeID(e) {
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        if (this.state.servicesList != '') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.recommendedServices();
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noRecommendedServices()
            );
        }
    }

    recommendedServices() {

        return (
            <ul>
                
                {this.state.servicesList.map((obj, index) =>
                    <li>
                        <div className="onlyForYou">
                            <Link to={'/services/' + encodeURI(obj.servicetypename).replace(/%20/g, '-') + 
                                '/'} >
                                <div className="contentWrapper">
                                    {(obj.offerpercentage > 0) ?
                                        <div class="ribbon ribbonTopLeft"><span>{obj.offerpercentage}% OFF</span></div>
                                        : ''
                                    }
                                    {obj.imagepath != '' ?
                                        <img className="card-img-top" src={obj.imagepath}
                                            alt={obj.servicetypename} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' />
                                    }
                                    <h2 className="text-center">{obj.servicetypename}</h2>
                                </div>
                            </Link>
                        </div>
                    </li>
                )}
            </ul>
        );
    }

    noRecommendedServices() {
        return (
            <p></p>
        );
    }

}
