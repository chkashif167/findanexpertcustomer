import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LandingPages extends Component {
    displayName = LandingPages.name

  render() {
      return (

          <section className="account-details section-padding">
              <div className="services-wrapper">
                  <div className="container">
                      <div className="row pb-4">

                          <div className="col-md-12">
                              <h3 className="section-title pb-2"><strong>Landing Pages</strong></h3>
                          </div>

                          <div className="col-md-4">
                              <div className="offers mb-4">
                                  <Link to="/special-pages/free-beauty-treatments">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </Link>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <Link to="/special-pages/free-training">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </Link>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <Link to="/special-pages/partner-with-expert">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg" alt="Sample image"></img>
                                  </Link>
                              </div>
                          </div>

                      </div>

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="offers mb-4">
                                  <a href="/special-pages/eye-lift">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <a href="https://mdbootstrap.com/img/Photos/Others/images/86.jpg">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <a href="https://mdbootstrap.com/img/Photos/Others/images/31.jpg">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                      </div>

                      <div className="row">

                          <div className="col-md-4">
                              <div className="offers mb-4">
                                  <a href="https://mdbootstrap.com/img/Photos/Others/images/86.jpg">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <a href="https://mdbootstrap.com/img/Photos/Others/images/86.jpg">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="offers rounded mb-4">
                                  <a href="https://mdbootstrap.com/img/Photos/Others/images/31.jpg">
                                      <img className="img-fluid rounded" src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg" alt="Sample image"></img>
                                  </a>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </section>
    );
  }
}
