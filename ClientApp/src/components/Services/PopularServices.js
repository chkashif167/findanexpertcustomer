import React, { Component } from 'react';
import App from '../../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../../assets/img/free-service-label.png';
import placeholderLarge from '../../assets/img/placeholderLarge.jpg';

export class PopularServices extends Component {
    displayName = PopularServices.name

    constructor(props) {
        super(props);
        this.state = { allServices: [], loading: true };
    }

    getServiceTypeID(e) {
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    componentDidMount() {

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/getpromoservicetypesV2?apikey=XzUzTFQzUS5AUEkudkAyX5OG8eakYoY5XY39bxPGnvU=')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == 200) {
                    this.setState({ allServices: data.promotypelist, loading: false });
                }
            })
    }

    render() {
        if (this.state.allServices != '') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.popularServices(this.state.allServices);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noPopularServices()
            );
        }
    }

    popularServices(allServices) {
        return (
            <ul>
                {allServices.map(obj =>
                    <li>
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
                                    : <img className="card-img-top" src={placeholderLarge}
                                        alt='placeholder' />
                                }
                                
                                <div className="overlay">
                                    <h2>{obj.servicetypename}</h2>
                                </div>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        );
    }

    noPopularServices() {
        return (
            <p></p>
        );
    }
}

PopularServices.defaultProps = {
    allServices: []
}

export default PopularServices;
