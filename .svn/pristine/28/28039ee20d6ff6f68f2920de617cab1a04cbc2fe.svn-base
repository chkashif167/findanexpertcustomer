import React, { Component } from 'react';
import { GlobalVariables } from '../GlobalVariables';
import { SearchService } from '../SearchService';
import { StoreServiceDetails } from './StoreServiceDetails';
import App from '../../App';

export class SearchResults extends React.Component {
    displayName = SearchResults.name

    constructor() {
        super();
        this.state = {
            allServices: true,
        };
    }
    
    //constructor(props) {
    //    super(props);
    //    // Don't call this.setState() here!
    //    //this.handleClick = this.handleClick.bind(this);
    //    this.state = {
    //        //allServices: {
    //        //    servicename: 'Massage',
    //        //    servicedescription: 'This is test services',
    //        //    serviceduration: '2 hours'
    //        //}
    //        allServices: []
    //    };
    //    //console.log(GlobalVariables.this.state.searchedServices);
    //    //this.state.allServices = GlobalVariables.searchedServices;
    //}

    //componentDidMount = function () {
    //    if (this.state.allServices.length > 0) {
    //        alert("data available");
    //    }
    //}

    //handleSubmit(e) {
    //    e.preventDefault();
    //    localStorage.setItem("serviceid", srv.serviceid);
    //    localStorage.setItem("serviceid", srv.servicename);
    //    localStorage.setItem("serviceid", srv.servicedescription);
    //    localStorage.setItem("serviceid", srv.serviceduration);
    //}

    render() {
       
      return (

          <section className="section-padding" id="search-results">
            <div className="container">
                  <div className="row pb-4">

                  {this.props.allServices.map((srv) =>
                      <div class="col-md-4 pb-4">
                        <div class="card booking-card">
                          <div class="view overlay">
                                  <img class="card-img-top service-img" src={App.ApisBaseUrl + srv.serviceimagepath} alt="Service image" />
                              <a href="#!">
                                  <div class="mask rgba-white-slight"></div>
                              </a>
                          </div>
                          
                          <div class="card-body">
                          
                             <div key={srv.serviceid}>
                                <h4 class="card-title font-weight-bold">
                                    <a href={'/service-type/?' + btoa(encodeURIComponent('serviceid=' + srv.serviceid +
                                        '&servicename=' + srv.servicename))}>{srv.servicename}</a>
                                </h4>
                                <p class="card-text">{srv.servicedescription}</p>
                                <hr class="my-4" />
                                <p class="lead"><strong>Duration</strong>: <span class="card-small-txt">{srv.serviceduration}</span>
                                </p>
                             </div>
                          
                          </div>

                        </div>
                      </div>
                   )}

               </div>
            </div>
          </section>
    );
  }
}


SearchResults.defaultProps = {
    allServices: []
}

export default SearchResults;