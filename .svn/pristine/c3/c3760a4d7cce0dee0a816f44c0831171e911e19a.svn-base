import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import offers from '../assets/img/icons/offers.png';
import App from '../App';

export class CheckLogin extends Component {
    displayName = CheckLogin.name

    constructor(props) {
        super(props);

        this.state = {
            notificationlist: [],
            isRead: false
        }
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Notification/getcustomernotificationsV2?pagenumber=1' + '&pagesize=' + 15 + '&authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == '200') {
                    this.setState({ notificationlist: data.notificationlist });
                }
            });
    }

    isReadStatus() {
        this.setState({ isRead: true });
    }

    render() {
        console.log(this.state.notificationlist.length);
        if (localStorage.getItem("customeraccesstoken") != null) {
            return (
                <div>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle text-white" to="#" id="accountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <strong>Account</strong></Link>
                        <div className="dropdown-menu accountDropdown" aria-labelledby="accountDropdown">
                            <Link className="dropdown-item" to="/profile">
                                <i class="fas fa-user text-red pr-2"></i>Your Profile</Link>
                            <Link className="dropdown-item" to="/your-experts">
                                <i class="fas fa-user-tie text-red pr-2"></i>Your Experts</Link>
                            <Link className="dropdown-item" to="/your-addresses">
                                <i class="fas fa-address-card text-red pr-2"></i>Your Addresses</Link>
                            <Link className="dropdown-item" to="/your-emails">
                                <i class="fas fa-envelope text-red pr-2"></i>Your Emails</Link>
                            <Link className="dropdown-item" to="/your-payment-details">
                                <i class="far fa-credit-card text-red pr-2"></i>Payment Details</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/referral">
                                <i class="fas fa-user-friends text-red pr-2"></i>Recommend A Friend</Link>
                         
                            <Link className="dropdown-item btn bg-lite-gray text-gray" to="" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt text-gray pr-2"></i>Signout</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle text-white" to="#" id="notifications" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <strong><i class="fa fa-bell" aria-hidden="true"></i></strong></Link>
                        <div className="dropdown-menu notificationDropdown" aria-labelledby="notifications">
                            <div class="notificationContent">
                                {this.state.notificationlist.length != 0 ?
                                    this.state.notificationlist.map(obj =>
                                        <li className="unreadNotification" onClick={this.isReadStatus.bind(this)}>
                                            <h5><strong>{obj.notificationtitle}</strong></h5>
                                            <p><strong>{obj.notificationbody}</strong></p>
                                        </li>)
                                        : <li className="readNotification">
                                            <p>You have no notifications.</p>
                                        </li>
                                }
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/customer-bookings">Orders</Link>
                    </li>
                </div>
            );
        }

        else {
            return (
                <div>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle text-white" to="#" id="accountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <strong>Account</strong></Link>
                        <div className="dropdown-menu accountDropdown" aria-labelledby="accountDropdown">
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-user text-red pr-2"></i>Your profile</Link>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-user-tie text-red pr-2"></i>Your Experts</Link>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-address-card text-red pr-2"></i>Your Addresses</Link>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-envelope text-red pr-2"></i>Your Emails</Link>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="far fa-credit-card text-red pr-2"></i>Payment Details</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-heart text-red pr-2"></i>Watch List</Link>
                            <Link className="dropdown-item" to="/customer-authentication">
                                <i class="fas fa-user-friends text-red pr-2"></i>Recommend A Friend</Link>
                            
                            <Link className="dropdown-item btn bg-lite-gray text-gray" to="/customer-authentication">
                                <i class="fas fa-sign-out-alt text-gray pr-2"></i>Sign In
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/customer-authentication">Orders</Link>
                    </li>
                </div>
            );
        }
    }
}

export default CheckLogin;