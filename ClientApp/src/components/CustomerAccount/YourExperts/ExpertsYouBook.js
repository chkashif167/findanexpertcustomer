import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';

export class ExpertsYouBook extends Component {
    displayName = ExpertsYouBook.name

    constructor(props) {
        super(props);
        this.state = { totalPages: '', bookinglist: [], starRatingList: [], loading: true };

        var customerId = localStorage.getItem("customerid");
        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber = params.get('page');

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/CustomerProfile/getcustomerexperts?customerid=' + customerId + '&pageNumber=' + pageSize + '&pageSize=' + 15 + '&authToken=' + customerAccesstoken)
                .then(response => {
                    if (response.status == '200') {
                        return response.json();
                    }
                })
                .then(data => {
                    this.setState({ totalPages: data.pages.totalpages });
                    this.setState({ bookinglist: data.experts, loading: false });

                    var availableArray = this.state.starRatingList.slice();
                    for (var i = 0; i < this.state.bookinglist.length; i++) {

                        availableArray.push(this.state.bookinglist[i]);
                        this.setState({ starRatingList: availableArray });
                        localStorage.setItem('reviewPoints', this.state.starRatingList[i].reviewPoints);
                    }
                })
                .catch((error) => {

                    this.state.bookinglist = [];
                });
        }
    }

    render() {

        if (localStorage.getItem('customerid') == null) {
            window.location.href = "/customer-authentication";
        }

        if (this.state.bookinglist) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.getExperts(this.state.allAddress);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noExperts()
            );
        }
    }

    getExperts(fiveStars) {
        var styles = {
            width: '132px',
        };

        if (this.state.totalPages == '2') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 3))}>3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 3))}>3</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 4))}>4</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

            <div>

                {this.state.bookinglist.map((experts, index) =>
                    <div className="col-md-12 pb-4">
                        <div className="media watchlist-bx yourExperts profileBox bg-half-white p-4">
                            <a href="#">
                                <img className="d-flex pr-4" src={App.ApisImageBaseUrl + experts.servicetypeimagepath} className="mr-3" height="130" width="" alt="avatar" />
                            </a>
                            <div className="media-body pl-4 pb-4">
                                <h4 className="mt-0 font-weight-bold">{experts.firstname} {experts.surname}</h4>
                                {experts.reviewpoints == 5 ?
                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                        <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                        <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                        <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                        <li className="list-inline-item m-0 p-0 5th" ><i className="fas fa-star amber-text"></i></li>
                                    </ul>
                                    : experts.reviewpoints == 4 ?
                                        <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                            <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                            <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                            <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                            <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                        </ul>
                                        : experts.reviewpoints == 3 ?
                                            <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                            </ul>
                                            : experts.reviewpoints == 2 ?
                                                <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                    <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                    <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                </ul>
                                                : experts.reviewpoints == 1 ?
                                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                    </ul>
                                                    : 'No Review.'
                                }
                                <h5>{experts.servicetypename}</h5>
                                <p className="card-text pb-5">{experts.bookingdate.slice(0, 10)} - {experts.bookingtime}</p>

                                <div className="mt-5">
                                    <a className="btn bg-orange text-white float-right" href={'/booking/?' + btoa(encodeURIComponent(
                                        'searchedservice=' + experts.servicetypename + '&index=' + index + '&serviceid=' + experts.serviceid +
                                        '&servicename=' + experts.servicename + '&servicetypeid=' + experts.servicetypeid + '&srvtypename=' +
                                        experts.servicetypename + '&inclinic=' + experts.inclinic + '&inhouse=' + experts.inhouse + '&isgeneric=' +
                                        experts.isgeneric + '&switchonpeakhours=' + experts.switchonpeakhours + '&peakhours=' + experts.peakhours +
                                        '&end_peakhours=' + experts.end_peakhours + '&hasarea=' + experts.hasarea + '&serviceProvider=' + experts.firstname + ' ' +
                                        experts.surname + '&serviceproviderid=' + experts.serviceproviderid + '&offerdiscount=' + experts.offerdiscount))}>Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-md-12 mt-4">

                    <div>
                        {listItems}
                    </div>

                </div>
                
            </div>
        );
    }

    noExperts() {
        var styles = {
            width: '132px',
        };

        return (

            <div>

                <div className="col-md-12 pt-4 pb-4">

                    <p className="profileBox">You have No Experts</p>

                </div>

            </div>
        );
    }
}
