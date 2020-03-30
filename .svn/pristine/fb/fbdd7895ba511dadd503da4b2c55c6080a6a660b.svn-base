import React, { Component } from 'react';
import { EditCustomerProfile } from '../../EditCustomerProfile';
import { SidebarLinks } from './SidebarLinks';

export class EditProfile extends Component {
    displayName = EditProfile.name

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">

                                <div className="col-md-12 pt-4 pb-5">
                                    
                                    <EditCustomerProfile />
                                </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
