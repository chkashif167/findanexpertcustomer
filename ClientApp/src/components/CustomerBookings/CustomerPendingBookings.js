import React, { Component } from 'react';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

export class CustomerPendingBookings extends Component {
    displayName = CustomerPendingBookings.name

    constructor(props) {
        super(props);

        this.state = {
            totalPages: '', pendingBookingResponse: [], bookinglist: [],
            authtoken: localStorage.getItem('customeraccesstoken')
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

        fetch(App.ApisBaseUrlV2 + '/api/Customer/getpendingbookings?pagenumber=' + pageSize + '&pagesize=' + 15 + '&authtoken=' + this.state.authtoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ totalPages: data.pagination.totalpages });
                    this.setState({ bookinglist: data.pendingbookinglist });
                }
                if (data.statuscode == 404) {
                    this.state.bookinglist = [];
                }
            })
            .catch((error) => {
                this.state.bookinglist = [];
            });
    }

    getNotification(e) {
        e.preventDefault();
        toastr["error"]('Please complete your profile first.');
        setTimeout(function () {
            window.location = "/profile";
        }, 3000);
    }

    render() {
        if (this.state.bookinglist != '') {
            return (
                this.pendingBookings()
            );
        }
        else {
            return (
                this.noPendingBookings()
            );
        }
    }

    pendingBookings() {

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

        var pageItem = '';
        for (var i = 0; i < this.state.totalPages; i++) {

            pageItem += (<li class="page-item"><a class="page-link" href="/customer-obj">{i}</a></li>);

        }

        if (this.state.totalPages == '2') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 1}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-obj/?" + 'booking=' + 'pending' + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

            <div>

                <div className="no-mobile">
                    {this.state.bookinglist.map(obj =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx profileBox">
                                    {obj.typeimagepath != '' ?
                                        <img className="card-img-top" src={obj.typeimagepath}
                                            alt={obj.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div className="media-body">
                                        <h5 className="service-name ml-4 mt-3 font-weight-bold">{obj.servicetypename} <span className="small-text font-weight-normal">({obj.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <div className="float-left ml-4 mt-3">
                                                <h5 className="mt-0">{obj.providername}</h5>

                                                {obj.reviewpoints == 5 ?
                                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                        <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                        <li className="list-inline-item m-0 p-0 5th" ><i className="fas fa-star amber-text"></i></li>
                                                    </ul>
                                                    : obj.reviewpoints == 4 ?
                                                        <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                            <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                            <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                        </ul>
                                                        : obj.reviewpoints == 3 ?
                                                            <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                                <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                            </ul>
                                                            : obj.reviewpoints == 2 ?
                                                                <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                    <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                    <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                                </ul>
                                                                : obj.reviewpoints == 1 ?
                                                                    <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                                        <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                                    </ul>
                                                                    : 'No Review.'
                                                }
                                            </div>

                                            <span className="date-time ml-5 float-right">
                                                <div className="links">
                                                    {obj.istraining == false ?
                                                        <a className="pr-2" href={'/edit-customer-booking/?' + btoa(encodeURIComponent('bookingid=' + obj.bookingid +
                                                            '&bookingdate=' + obj.bookingdate + '&bookingtime=' + obj.bookingtime +
                                                            '&bookingduration=' + obj.bookingduration + '&bookingNotes=' + obj.notes
                                                            + '&servicetypename=' + obj.servicetypename + '&providerid=' + obj.providerid))}>Edit</a>
                                                        : ''
                                                    }
                                                    <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingid=' + obj.bookingid + '&bookingdate=' + obj.bookingdate + '&bookingtime=' +
                                                        obj.bookingtime + '&servicetype=' + obj.servicetypename + '&bookingnotes=' + obj.notes + '&servicename=' + obj.servicename +
                                                        '&serviceprovider=' + obj.providername +
                                                        '&serviceproviderid=' + obj.serviceproviderid + '&isconsentaccepted=' + obj.isconsentaccepted))}>View Details</a>
                                                    {localStorage.getItem('isprofilecompleted') == 'true' ?
                                                        <a href={'/chat/?' + btoa(encodeURIComponent('customerid=' + obj.customerid + '&serviceproviderid=' + obj.providerid + '&bookingid=' + obj.bookingid))} class="pl-3">
                                                            <i class="fas fa-comment-alt"></i>
                                                        </a>
                                                        : <button class="btn bg-transparent pl-3" onClick={this.getNotification}>
                                                            <i class="fas fa-comment-alt"></i>
                                                        </button>
                                                    }
                                                </div>
                                                <p className="mb-0">{obj.bookingdate}</p>
                                                <p className="mb-0">{obj.bookingtime}</p>
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
                    {this.state.bookinglist.map(obj =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div class="booking-bx profileBox">
                                    {obj.typeimagepath != '' ?
                                        <img className="card-img-top" src={App.ApisImageBaseUrl + obj.typeimagepath}
                                            alt={obj.servicetypename} style={styles} />
                                        : <img className="card-img-top" src={placeholderSmall}
                                            alt='placeholder' style={styles} />
                                    }
                                    <div class="media-body">
                                        <h5 class="service-name m-0 pb-4 font-weight-bold">{obj.servicetypename} <span class="small-text font-weight-normal">({obj.servicetypeduration} hours)</span></h5>
                                        <span class="inline-items">
                                            <div class="float-left ml-0 mt-0">
                                                <h5 class="mt-0">{obj.providername}</h5>
                                                <ul class="list-unstyled list-inline ratings mb-0 pl-0">
                                                    <li class="list-inline-item m-0 p-0 1st"><i class="fas fa-star amber-text"> </i></li>
                                                    <li class="list-inline-item m-0 p-0 2nd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 3rd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 4th"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 5th"><i class="fas fa-star amber-text"></i></li>
                                                </ul>
                                            </div>
                                            <span class="date-time mt-3 float-left">
                                                <div className="links pb-2">
                                                    {obj.istraining == false ?
                                                        <a className="pr-2" href={'/edit-customer-booking/?' + btoa(encodeURIComponent('bookingid=' + obj.bookingid +
                                                            '&bookingdate=' + obj.bookingdate + '&bookingtime=' + obj.bookingtime +
                                                            '&bookingduration=' + obj.bookingduration + '&bookingNotes=' + obj.notes
                                                            + '&servicetypename=' + obj.servicetypename + '&providerid=' + obj.providerid))}>Edit</a>
                                                        : ''
                                                    }
                                                    <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingid=' + obj.bookingid + '&bookingdate=' + obj.bookingdate + '&bookingtime=' +
                                                        obj.bookingtime + '&servicetype=' + obj.servicetypename + '&bookingnotes=' + obj.notes + '&servicename=' + obj.servicename +
                                                        '&serviceprovider=' + obj.providername +
                                                        '&serviceproviderid=' + obj.serviceproviderid + '&isconsentaccepted=' + obj.isconsentaccepted))}>View Details</a>
                                                    {localStorage.getItem('isprofilecompleted') == 'true' ?
                                                        <a href={'/chat/?' + btoa(encodeURIComponent('customerid=' + obj.customerid + '&serviceproviderid=' + obj.providerid + '&bookingid=' + obj.bookingid))} class="pl-3">
                                                            <i class="fas fa-comment-alt"></i>
                                                        </a>
                                                        : <button class="btn bg-transparent pl-3" onClick={this.getNotification}>
                                                            <i class="fas fa-comment-alt"></i>
                                                        </button>
                                                    }
                                                </div>
                                                <p className="mb-0">{obj.bookingdate}</p>
                                                <p className="mb-0">{obj.bookingtime}</p>
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

    noPendingBookings() {
        return (

            <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                <p className="text-center">You have No Scheduled Bookings</p>
            </div>
        );
    }
}
