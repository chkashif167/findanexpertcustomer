import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import App from '../App';

export interface ServiceTypesDataState {
    serviceTypes: ServiceTypes[];
    serviceid: number;
    found: boolean;
}

export class ServiceType extends React.Component {
    displayName = ServiceType.name

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = { serviceTypes: [], found: false };

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const getServiceId = params.get('serviceid');
        localStorage.setItem('serviceid', getServiceId);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceid: getServiceId
            })
        };

        console.log(requestOptions);

        fetch(App.ApisBaseUrl + '/api/ServiceType/findservicetypeextension', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ serviceTypes: response, found: true });

            });
    }

    render() {
        if (localStorage.getItem('customerid') != null ) {
            let contents = this.state.found
                ? this.ServiceTypes(this.state.serviceTypes)
                : <p>Loading....</p>;
            return <div>
                {contents}
            </div>;
        } else {
            let contents = this.state.found
                ? this.ServiceTypesWithNotLogin(this.state.serviceTypes)
                : <p>Loading....</p>;
            return <div>
                {contents}
            </div>;
        }
    }

    ServiceTypes(serviceTypes) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const keyWord = params.get('servicename');

        return (

            <div className="row pb-4">
                {serviceTypes.map((srvtype, index) =>
                      <div class="col-md-4 pb-4">
                        <div class="card booking-card">
                          <div class="view overlay">
                                <img class="card-img-top service-img" src={App.ApisBaseUrl + srvtype.servicetypeimagepath} alt="Service Image" />
                          </div>

                          <div class="card-body">
                          
                             <div key={srvtype.servicetypeid}>
                                <h4 class="card-title font-weight-bold">{srvtype.servicetypename}</h4>
                                <div class="serviceDec"> {srvtype.short_description} </div>
                                <hr class="my-4" />
                                <p class="lead"><strong>Duration</strong>: <span class="card-small-txt">{srvtype.serviceduration}</span>
                                </p>
                             </div>
                          
                          </div>
                          <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' +
                                    srvtype.serviceimagepath + '&srvtypename=' + srvtype.servicename
                                    + '&srvtypeduration=' + srvtype.serviceduration + '&srvtypeprice=' + srvtype.price))} 
                                    class="btn bg-dark text-white services-card-footer-btn">Get Details</a>
                                <a href={'/booking/?' + 'searchedservice=' + srvtype.servicetypename + '&index=' + 
                                    index + '&serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename +
                                    '&servicetypeid=' + srvtype.servicetypeid + '&srvtypename=' + srvtype.servicetypename + '&isgenericservice=' 
                                    + srvtype.isgenericservice + '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse + '&isgeneric=' 
                                    + srvtype.isgeneric + '&peakhours=' + srvtype.peakhours + '&end_peakhours=' + srvtype.end_peakhours}
                                    class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                          </div>
                        </div>
                      </div>
                )}

            </div>
            
        );
    }

    ServiceTypesWithNotLogin(serviceTypes) {
        return (

            <div className="row pb-4">
                {serviceTypes.map((srvtype) =>
                    <div class="col-md-4 pb-4">
                        <div class="card booking-card">
                            <div class="view overlay">
                                <img class="card-img-top service-img" src={App.ApisBaseUrl + srvtype.servicetypeimagepath} alt="Service Image" />
                            </div>

                            <div class="card-body">

                                <div key={srvtype.servicetypeid}>
                                    <h4 class="card-title font-weight-bold">{srvtype.servicetypename}</h4>
                                    <div class="serviceDec"> { srvtype.short_description } </div>
                                    <hr class="my-4" />
                                    <p class="lead"><strong>Duration</strong>: <span class="card-small-txt">{srvtype.serviceduration}</span>
                                    </p>
                                </div>

                            </div>
                            <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
                                <a href={'/service-single/?' + btoa(encodeURIComponent('servicetypeid=' + srvtype.servicetypeid + '&srvtypeimg=' + srvtype.serviceimagepath + '&srvtypename=' + srvtype.servicename +
                                     '&srvtypeduration=' + srvtype.serviceduration + '&srvtypeprice=' + srvtype.price))}
                                    class="btn bg-dark text-white services-card-footer-btn">Get Details</a>
                                <a href='/customer-authentication/'
                                    class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        );
    }
}

ServiceType.defaultProps = {
    serviceTypes: []
}

export class ServiceTypes {
    serviceid = 0;
    servicetypeid = 0;
    servicename = "";
    servicedescription = "";
    price = "";
    serviceduration = "";
    serviceimagepath = "";
}
