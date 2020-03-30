import React, { Component } from 'react';
import { CustomerPendingBookings } from './CustomerPendingBookings';
import { CustomerCompletedBookings } from './CustomerCompletedBookings';
import { CustomerCancelledBookings } from './CustomerCancelledBookings';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import { CustomerCartBookings } from './CustomerCartBookings';

export class CustomerBookings extends Component {
    displayName = CustomerBookings.name

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        var styles = {
            width: '132px',
        };
        var tabBorder = {
            border: '1px solid',
        };
        
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const customerBooking = params.get('booking');
        
        if(customerBooking == 'pending'){
            var bookingTab = (
                <ul class="nav nav-tabs booking-tabs nav-justified booking-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#pending" role="tab">
                            <i class="fas fa-hourglass pr-2"></i>Scheduled Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#completed" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Completed Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#cart" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Incompleted Bookings
                        </a>
                    </li>
                </ul>
            );
        }
        else {
            var bookingTab = (
                <ul class="nav nav-tabs booking-tabs nav-justified booking-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#pending" role="tab">
                            <i class="fas fa-hourglass pr-2"></i>Scheduled Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#completed" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Completed Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#cart" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Incompleted Bookings
                        </a>
                    </li>
                </ul>
            );
        }

        if(customerBooking == 'pending'){
            var bookingTabContent = (
                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                        <CustomerPendingBookings />
                    </div>

                    <div class="tab-pane fade in" id="cart" role="tabpanel">
                        <CustomerCartBookings />
                    </div>

                    <div class="tab-pane fade in" id="completed" role="tabpanel">
                        <CustomerCompletedBookings />
                    </div>
                </div>
            );
        }
        else {
           var bookingTabContent = (
                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                       <CustomerPendingBookings />
                    </div>

                    <div class="tab-pane fade in" id="cart" role="tabpanel">
                        <CustomerCartBookings />
                    </div>

                    <div class="tab-pane fade in" id="completed" role="tabpanel">
                        <CustomerCompletedBookings />
                    </div>
                </div>
            ); 
        }
        
        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="customerProfile account-details">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row ">

                                <div className="col-md-12 pt-4 pb-4">
                                
                                    <div className="row pb-4">
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-8">
                                            {bookingTab}
                                        </div>
                                    </div>

                                    <div className="coloredBox">
                                        {bookingTabContent}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
