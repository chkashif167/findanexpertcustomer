import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import { CustomerInbox } from './CustomerInbox';
import { CustomerOutbox } from './CustomerOutbox';
import { CustomerComposer } from './CustomerComposeEmail';

export class CustomerMailbox extends Component {
    displayName = CustomerMailbox.name

    render() {

        if (localStorage.getItem("customeraccesstoken") == null) {
            window.location.href = "/customer-authentication";
        }

        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 emptyDiv"></div>
                                <div className="col-md-8 pt-4 pb-4">

                                    <ul class="nav nav-tabs booking-tabs nav-justified primary-color" id="tablist" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#inbox" role="tab">
                                                <i class="fas fa-inbox pr-2" />Inbox
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#outbox" role="tab">
                                                <i class="fas fa-sign-out-alt pr-2" />Outbox
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#compose" role="tab">
                                                <i class="fas fa-plus-square pr-2" />Compose
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-12 pb-4">

                                    <div class="tab-content coloredBox mt-2">

                                        <div class="tab-pane fade in show active" id="inbox" role="tabpanel">

                                            <CustomerInbox />

                                        </div>

                                        <div class="tab-pane fade in" id="outbox" role="tabpanel">

                                            <CustomerOutbox />

                                        </div>

                                        <div class="tab-pane fade in profileBox" id="compose" role="tabpanel">

                                            <CustomerComposer />

                                        </div>

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
