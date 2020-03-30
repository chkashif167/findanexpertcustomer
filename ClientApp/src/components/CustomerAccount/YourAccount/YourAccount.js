import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class YourAccount extends Component {
    displayName = YourAccount.name

    render() {
        return (

            <div id="MainPageWrapper">

                <section className="account-details section-padding">
                    <div className="myaccount-cardswrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <h3 className="section-title pb-2"><strong>Your Account</strong></h3>
                                </div>

                                <div className="col-md-4">
                                    <Link to="/profile" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-user d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Profile</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla amet nibh.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-4">
                                    <a href="#" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-shopping-cart icon-grey d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Your Orders</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4">
                                    <a href="your-experts.html" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-users icon-blue d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Your Experts</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <a href="#" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-map-marker icon-green d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Your Addresses</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4">
                                    <a href="payment-options.html" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-credit-card icon-yellow d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Payment Options</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-4">
                                    <a href="#" className="box-link">
                                        <div className="media">
                                            <i className="fas fa-lock icon-lightBlue d-flex mr-3"></i>
                                            <div className="media-body">
                                                <h5 className="mt-0 font-weight-bold">Login & Security</h5>
                                                <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="account-details section-padding">
                    <div className="account-wrapper">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card account-boxes text-black bg-light mb-3">
                                        <div className="card-body">
                                            <ul>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                                <li><i className="fas fa-chevron-right"></i> <a href="#">Cras sit amet nibh libero.</a></li>
                                            </ul>
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
