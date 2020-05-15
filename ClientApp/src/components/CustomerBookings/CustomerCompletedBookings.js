import React, { Component } from 'react';
import { CustomerCancelledBookings } from './CustomerCancelledBookings';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';
import { Link } from 'react-router-dom';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

export class CustomerCompletedBookings extends Component {
    displayName = CustomerCompletedBookings.name

    constructor(props) {
        super(props);

        this.state = {
            totalPages1: '', completedList: [], loading: true,
            authtoken: localStorage.getItem('customeraccesstoken')
        };
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber1 = params.get('page1');
        console.log(pageNumber1);

        if (pageNumber1 != null) {
            var pageSize1 = pageNumber1;
        }
        else {
            var pageSize1 = 1;
        }

        fetch(App.ApisBaseUrlV2 + '/api/Customer/getcompletedbookings?pagenumber=' + pageSize1 + '&pagesize=' + 15 + '&authtoken=' + this.state.authtoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ totalPages1: data.pagination.totalpages });
                    this.setState({ completedList: data.completedbookinglist });
                }
                else if (data.statuscode == 404) {
                    this.state.completedList = [];
                }
            })
    }

    render() {
        if (this.state.completedList != '') {
            return (
                this.completedBookings()
            );
        }
        else {
            return (
                this.noCompletedBookings()
            );
        }
    }

    completedBookings() {

        console.log(this.state.completedList);

        var styles = {
            width: '132px',
        };
        var style = {
            width: '80px',
            height: '80px'
        };
        var tabBorder = {
            border: '1px solid',
        };

        if (this.state.totalPages1 == '2') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages1 == '3') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 3))}>3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages1 == '4') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 3))}>3</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 4))}>4</a></li>
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

                <div className="no-mobile">
                    {this.state.completedList.map((bookings, index) =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx profileBox">
                                    {bookings.typeimagepath != null ?
                                        <img className="card-img-top" src={bookings.typeimagepath}
                                            alt={bookings.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 ml-4 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <div className="float-left  ml-4">
                                                <h5 className="mt-0">{bookings.providername}</h5>
                                                {bookings.reviewpoints == 5 ?
                                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                        <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 5th" ><i className="fas fa-star amber-text"></i></li>
                                                    </ul>
                                                    : bookings.reviewpoints == 4 ?
                                                        <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                            <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                            <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                        </ul>
                                                        : bookings.reviewpoints == 3 ?
                                                            <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                                <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                            </ul>
                                                            : bookings.reviewpoints == 2 ?
                                                                <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                    <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                    <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                                </ul>
                                                                : bookings.reviewpoints == 1 ?
                                                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                    </ul>
                                                                    : 'No Review.'
                                                }
                                            </div>
                                            <span className="date-time ml-5 float-right">
                                                {/*<div className="links">
                                                    <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename +
                                                        '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' +
                                                        bookings.servicename + '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' +
                                                        bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' +
                                                        bookings.inhouse + '&isgeneric=' + bookings.isgeneric + '&peakhours='
                                                        + bookings.peakhours + '&end_peakhours=' + bookings.endpeakhours
                                                        + '&hasarea=' + bookings.hasarea + '&offerdiscount=' + bookings.offerdiscount))}>Book Now</a>
                                                        + '&hasarea=' + bookings.hasarea))}>Book Now</a>
                                                        + '&hasarea=' + bookings.hasarea))}>Book Now</a>
                                                    <Link to={'/services/' + encodeURI(bookings.servicetypename).replace(/%20/g, '-') +
                                                        '/'}>Book Now</Link>

                                                </div>*/}
                                                <div className="links">
                                                    {/*<a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename + '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' + bookings.servicename +
                                                        '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' + bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' + bookings.inhouse + '&isgeneric=' +
                                                        bookings.isgeneric + '&peakhours=' + bookings.peakhours + '&end_peakhours=' +
                                                        bookings.end_peakhours + '&hasarea=' + bookings.hasarea))}>Book Now</a>*/}
                                                    <Link to={'/services/' + encodeURI(bookings.servicetypename).replace(/%20/g, '-') +
                                                        '/'}>Book Now</Link>
                                                </div>
                                                <p className="mb-0">{bookings.bookingdate}</p>
                                                <p className="mb-0">{bookings.bookingtime}</p>
                                            </span>
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )}

                    <div>
                        {listItems}
                    </div>

                    <CustomerCancelledBookings />
                </div>

                <div className="yes-mobile">
                    {this.state.completedList.map((bookings, index) =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div class="booking-bx profileBox">
                                    {bookings.typeimagepath != null ?
                                        <img className="card-img-top" src={App.ApisImageBaseUrl + bookings.typeimagepath}
                                            alt={bookings.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div class="media-body">
                                        <h5 class="service-name m-0 pb-4 font-weight-bold">{bookings.servicetypename} <span class="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span class="inline-items">
                                            <div class=" ml-4 mt-0">
                                                <h5 class="mt-0">{bookings.providername}</h5>
                                                <ul class="list-unstyled list-inline ratings mb-0">
                                                    <li class="list-inline-item m-0 p-0 1st"><i class="fas fa-star amber-text"> </i></li>
                                                    <li class="list-inline-item m-0 p-0 2nd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 3rd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 4th"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 5th"><i class="fas fa-star amber-text"></i></li>
                                                </ul>
                                            </div>
                                            <span class="date-time mt-3 ">
                                                <div className="links pb-2">
                                                    {/*<a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename +
                                                        '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' +
                                                        bookings.servicename + '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' +
                                                        bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' +
                                                        bookings.inhouse + '&isgeneric=' + bookings.isgeneric + '&peakhours='
                                                        + bookings.peakhours + '&end_peakhours=' + bookings.endpeakhours))}>Book Now</a>*/}
                                                    <Link to={'/services/' + encodeURI(bookings.servicetypename).replace(/%20/g, '-') +
                                                        '/'}>Book Now</Link>
                                                </div>
                                                <p className="mb-0">{bookings.bookingdate}</p>
                                                <p className="mb-0">{bookings.bookingtime}</p>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }

    noCompletedBookings() {
        return (

            <div class="tab-pane fade in show active" id="pending" role="tabpanel">

                <p className="text-center">You have No Completed Bookings</p>
                <CustomerCancelledBookings />

            </div>
        );
    }
}
