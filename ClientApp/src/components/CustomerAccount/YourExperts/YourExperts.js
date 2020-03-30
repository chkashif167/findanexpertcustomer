import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';

export class YourExperts extends Component {
    displayName = YourExperts.name

    constructor(props) {
        super(props);
        this.state = {
            totalPages: '', apiResponse: '', expertList: [], starRatingList: [], customerAccesstoken: localStorage.getItem('customeraccesstoken'),
            loading: true
        };
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber = params.get('page');

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }

        fetch(App.ApisBaseUrlV2 + '/api/JobAllocator/getexperts?pagenumber=' + pageSize + '&pagesize=' + 15 + '&authtoken=' + this.state.customerAccesstoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ apiResponse: data.statuscode });
                this.setState({ totalPages: data.pagination });
                this.setState({ expertList: data.expertlist, loading: false });

                var availableArray = this.state.starRatingList.slice();
                for (var i = 0; i < this.state.bookinglist.length; i++) {

                    availableArray.push(this.state.bookinglist[i]);
                    this.setState({ starRatingList: availableArray });
                    localStorage.setItem('reviewPoints', this.state.starRatingList[i].reviewPoints);
                }
            })
            .catch((error) => {

                this.state.expertList = [];
            });
    }

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        if (this.state.apiResponse == '200') {
            return (
                this.getExperts(this.state.allAddress)
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

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile ">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                {this.state.expertList.map((experts, index) =>
                                    <div className="col-md-12 pb-4">
                                        <div className="media watchlist-bx yourExperts profileBox bg-half-white p-4">
                                            <a href="#">
                                                <img className="d-flex pr-4" src={App.ApisBaseUrlV2 + experts.providerimagepath} className="mr-3" height="130" width="" alt="avatar" />
                                            </a>
                                            <div className="media-body pl-4">
                                                <h4 className="mt-0 font-weight-bold">{experts.providername}</h4>
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

                                                <div className="float-right">
                                                    <h5 className="mt-0 mb-1">{experts.servicetypename}</h5>
                                                    <p className="card-text mb-3">{experts.bookingdate.slice(0, 10)} - {experts.bookingtime}</p>
                                                    <a className="btn bg-orange text-white" href={'/services/' + encodeURI(experts.servicetypename).replace(/%20/g, '-') +
                                                        '/?' + btoa(encodeURIComponent('providerid=' + experts.providerid))}>Book Now</a>
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
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    noExperts() {
        var styles = {
            width: '132px',
        };

        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">

                                    <p className="profileBox">You have No Experts</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
