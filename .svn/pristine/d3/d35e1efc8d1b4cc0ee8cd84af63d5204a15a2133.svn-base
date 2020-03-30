import React, { Component } from 'react';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';
import { Link } from 'react-router-dom';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

export class CustomerCartBookings extends Component {
    displayName = CustomerCartBookings.name

    constructor(props) {
        super(props);

        this.state = {
            totalIncompletedPages: '', cartList: [], apiResponse: 0,
            authtoken: localStorage.getItem('customeraccesstoken')
        };
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const incompletePageNumber = params.get('page');

        if (incompletePageNumber != null) {
            var incompletePageSize = incompletePageNumber;
        }
        else {
            var incompletePageSize = 1;
        }

        fetch(App.ApisBaseUrlV2 + '/api/Customer/getincompletebookings?pagenumber=' + incompletePageSize + '&pagesize=' + 15 + '&authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ totalIncompletedPages: data.pagination.totalpages });
                    this.setState({ cartList: data.incompletebookinglist });
                }
                else if (data.statuscode == 404) {
                    this.state.cartList = [];
                }
            })

            .catch((error) => {
                this.state.cartList = [];
            });
    }

    render() {

        if (this.state.cartList != '') {
            return (
                this.inCompletedBookings()
            );
        }
        else {
            return (
                this.noInCompletedBookings()
            );
        }
    }

    inCompletedBookings() {

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

        if (this.state.totalIncompletedPages == '2') {
            var listItems = (<ul class="pagination">
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                </ul>
            );
        }
        else if (this.state.totalIncompletedPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalIncompletedPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (
            <div>

                <div className="no-mobile">
                    {this.state.cartList.map((bookings, index) =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx profileBox">
                                    {bookings.imagepath != '' ?
                                        <img className="card-img-top" src={App.ApisImageBaseUrl + bookings.imagepath}
                                            alt={bookings.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 ml-4 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <span className="date-time ml-5 float-right">
                                                {/*<div className="links">
                                                    {/*<a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename + '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' + bookings.servicename +
                                                        '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' + bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' + bookings.inhouse + '&isgeneric=' +
                                                        bookings.isgeneric + '&peakhours=' + bookings.peakhours + '&end_peakhours=' +

                                                        bookings.end_peakhours + '&hasarea=' + bookings.hasarea + '&offerdiscount=' + bookings.offerdiscount))}>Book Now</a>

                                                        bookings.end_peakhours + '&hasarea=' + bookings.hasarea))}>Book Now</a>

                                                        bookings.end_peakhours + '&hasarea=' + bookings.hasarea))}>Book Now</a>
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
                                            </span>
                                        </span>
                                    </div>
                                
                                </div>
                            </div>

                        </div>
                    )}
                    
                    <div className="row pb-4">
                        <div className="col-md-12">
                            <nav aria-label="Page navigation" className="text-center">
                                {listItems}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="yes-mobile">
                    {this.state.cartList.map((bookings, index) =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div className="booking-bx profileBox">
                                    {bookings.imagepath != '' ?
                                        <img className="card-img-top" src={App.ApisImageBaseUrl + bookings.imagepath}
                                            alt={bookings.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <div className="links">
                                                {/*<a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename + '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' + bookings.servicename +
                                                        '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' + bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' + bookings.inhouse + '&isgeneric=' +
                                                        bookings.isgeneric + '&peakhours=' + bookings.peakhours + '&end_peakhours=' +
                                                    bookings.end_peakhours + '&hasarea=' + bookings.hasarea))}>Book Now</a> */}
                                                <Link to={'/services/' + encodeURI(bookings.servicetypename).replace(/%20/g, '-') +
                                                    '/'}>Book Now</Link>
                                            </div>
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

    noInCompletedBookings() {

        return (
            <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                <p className="text-center">You have No Incompleted Bookings</p>
            </div>
        );
    }
}
