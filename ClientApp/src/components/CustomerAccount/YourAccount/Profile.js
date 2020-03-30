import React, { Component } from 'react';
import App from '../../../App';
import { SidebarLinks } from './SidebarLinks';

export class Profile extends Component {
    displayName = Profile.name

    constructor(props) {
        super(props);

        this.state = {
            customerVoucherCredit: [], voucherAmount: 0
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/GiftVoucher/customergiftvouchercreditsV2?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (response.statuscode == 200) {
                    this.setState({ customerVoucherCredit: response.credithistorylist });
                    this.setState({ voucherAmount: this.state.customerVoucherCredit[0].remainingamount });
                    localStorage.setItem('customerVoucherCredit', this.state.customerVoucherCredit[0].remainingamount);
                }
            })
            .catch((error) => {
                this.state.customerVoucherCredit = [];
            });
    }

    render() {

        if (localStorage.getItem('gender') == 'na') {
            var customerGender = (<h3>Other</h3>);
        }
        else {
            var customerGender = (<h3>{localStorage.getItem('gender')}</h3>);
        }

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            {this.state.voucherAmount > 0 ?
                                <div class="col-md-12 p-0 mb-4">
                                    <div className="text-center">
                                        <h4>Voucher Credit</h4>
                                        <p className="lead">&#163; {this.state.voucherAmount}</p>
                                    </div>
                                </div>
                                : ''
                            }

                            <div class="row coloredBox mb-5">

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">First Name</h4>
                                        <h3>{localStorage.getItem("firstname")}</h3>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">Last Name</h4>
                                        <h3>{localStorage.getItem("lastname")}</h3>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">Gender</h4>
                                        {customerGender}
                                    </div>
                                </div>

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">Date of Birth</h4>
                                        <h3>{localStorage.getItem('dob')}</h3>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">Mobile Number</h4>
                                        <h3>{localStorage.getItem("mobile")}</h3>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-4 infoBox">
                                    <div class="profileBox info">
                                        <h4 class="text-muted">Email Address</h4>
                                        <h3>{localStorage.getItem("email")}</h3>
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-md-12 p-0 mb-4">
                                    <div className="text-right">
                                        <a href="/edit-profile" class="btn btn_black mr-2">Edit Profile</a>
                                        <a href="/change-password" class="btn btn_red">Change Password</a>
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
