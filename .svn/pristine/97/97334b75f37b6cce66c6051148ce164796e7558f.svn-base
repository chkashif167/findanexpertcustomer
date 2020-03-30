import React, { Component } from 'react';
import { AllCustomerAddresses } from '../AllCustomerAddresses';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
//import { addCustomerAddress } from '../addCustomerAddress';


export class allAddress extends Component {
    displayName = allAddress.name

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        return (

            <div id="MainPageWrapper" >

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-12">
                                    <button type="button" className="btn btn-primary bg-black float-right"><a className="text-white" href="/add-address">Add New Address</a></button>
                                </div>

                                <div className="col-md-12 pt-4 pb-4">

                                    <AllCustomerAddresses />

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}