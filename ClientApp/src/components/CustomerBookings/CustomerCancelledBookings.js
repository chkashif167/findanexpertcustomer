import React, { Component } from 'react';
import App from '../../App';

export class CustomerCancelledBookings extends Component {
    displayName = CustomerCancelledBookings.name

    constructor(props) {
        super(props);
        var customerId = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const bookingid = params.get('bookingid');
        const bookingDate = params.get('bookingdate');
        const bookingTime = params.get('bookingtime');
        const serviceproviderid = params.get('serviceproviderid');

        console.log(bookingid);
        console.log(bookingDate);
        console.log(bookingTime);

        this.state = {
            totalPages2: '', cancelledList: [], loading: true
        };

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/Booking/cancelbooking?canceltoken=' + customerAccesstoken)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.setState({ cancelledList: data.bookinglist, loading: false });
                });
        }
    }

    render() {
        if (this.state.cancelledList != '') {
            return (
                this.cancelledBookings()
            );
        }
        else {
            return (<p></p>);
        }
    }

    cancelledBookings() {
        var styles = {
            width: '132px',
        };
        var tabBorder = {
            border: '1px solid',
        };
        return (
            <div>
                <hr />
                <h3>Cancelled Bookings</h3>
                {this.state.cancelledList.map(bookings =>
                    <div className="row pb-4">

                        <div className="col-md-12">
                            <div className="media watchlist-bx">
                                <img className="d-flex mr-3" src={App.ApisBaseUrl + bookings.serviceTypeImagePath} alt="Service image" style={styles} />
                                <div className="media-body">
                                    <h5 className="mt-0 font-weight-bold">{bookings.serviceType}</h5>
                                    <p className="mb-0">{bookings.description}</p>
                                    <p>{bookings.bookingDate}</p>
                                </div>
                                <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingdate=' + bookings.bookingDate + '&bookingid=' + bookings.bookingID + '&servicetype=' + bookings.serviceType +
                                    '&description=' + bookings.description + '&serviceprovider=' + bookings.serviceProvider))}>View Details</a>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        );
    }
}
