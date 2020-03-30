import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import App from '../App';

export interface ServiceTypesDataState {
    serviceTypes: ServiceTypes[];
    serviceid: number;
    found: boolean;
}

export class ServiceDetail extends React.Component {
    displayName = ServiceDetail.name

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = { serviceTypes: [], found: false };

        //this.handleChangeSearch = this.handleChangeSearch.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    FindServiceTypes(serviceid) {
        var serviceid = '8';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serviceid: serviceid })
        };

        return fetch(App.ApisBaseUrl + '/api/ServiceType/findservicetype', requestOptions)
            .then(response => response.json())
            .then(response => {
                this.setState({ serviceTypes: response, found: true });
                console.log(response);
            });
    }

    //handleChangeSearch(e) {
    //    this.setState({ serviceid: e.target.value });
    //}

    //handleSubmit(e) {
    //    e.preventDefault();
    //    const { serviceid } = this.state;
    //    this.FindServiceTypes(serviceid);
    //}

    render() {
        const { serviceid } = this.state;
        this.FindServiceTypes(serviceid);
        let contents = this.state.found
            ? this.renderAvailableServiceTypes(this.state.serviceTypes)
            : <p>Loading....</p>;
        return <div>
                   {contents}
               </div>;
    }

    GetServiceId() {
        return <div className="Search">
            <h3>Find Service type</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="search">Search Service Type</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="search" value={this.state.serviceId} onChange={this.handleChangeSearch} required />
                    </div>
                </div>
            </form>
        </div>;
    }

    renderAvailableServiceTypes(serviceTypes) {
        return (

            <div className="row pb-4">
                {serviceTypes.map((srvtype) =>
                      <div class="col-md-4 pb-4">
                        <div class="card booking-card">
                          <div class="view overlay">
                                <img class="card-img-top service-img" src={App.ApisBaseUrl + srvtype.serviceimagepath} alt="Service Image" />
                              <a href="#!">
                                  <div class="mask rgba-white-slight"></div>
                              </a>
                          </div>

                          <div class="card-body">
                          
                             <div key={srvtype.servicetypeid}>
                                <h4 class="card-title font-weight-bold"><a href={'/service-single/' + srvtype.servicetypeid}>{srvtype.servicename}</a></h4>
                                <p class="card-text">{srvtype.servicedescription}</p>
                                <hr class="my-4" />
                                <p class="lead"><strong>Duration</strong>: <span class="card-small-txt">{srvtype.serviceduration}</span>
                                </p>
                             </div>
                          
                          </div>
                          <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
                            <a href={'/service-single/' + srvtype.servicetypeid} class="btn bg-dark text-white services-card-footer-btn">Get Details</a>
                            <a href="#" class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                          </div>
                        </div>
                      </div>
                )}

            </div>
            
        );
    }
}

ServiceDetail.defaultProps = {
    serviceTypes: []
}

export class ServiceDetail {
    serviceid = 0;
    servicetypeid = 0;
    servicename = "";
    servicedescription = "";
    price = "";
    serviceduration = "";
    serviceimagepath = "";
}
