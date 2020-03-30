import React, { Component } from 'react';
import App from '../../App';
import { Link } from 'react-router-dom';
import expertRedIcon from '../../assets/img/expert-red-icon.png';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

export class Offers extends Component {
  displayName = Offers.name

    constructor(props) {
        super(props);

        this.state = { allOffers: [], statusCode: '', loading: true, removed: false };

        fetch(App.ApisBaseUrlV2 + '/api/ServiceType/getalloffersV2?pagenumber=1&pagesize=50')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ statusCode: data.statuscode });
                if (data.statuscode == 200) {
                    this.setState({ allOffers: data.offerslist, loading: false });
                }
            });
    }

    getDiscount(e) {

        console.log(e.target.id);
        localStorage.setItem('offerDiscount', e.target.id);
    }

    render() {

        document.getElementsByTagName("META")[2].content = 'If you are a student, grab the amazing beauty discount offers online from our website findanexpert.net. Our discount offers last till December 2019.';
        document.getElementsByTagName("TITLE")[0].text = 'Student Discount Offers, Discount Offers UK, Offers Discount Codes';

        return (

              <section className="offersPage section-padding">
                  <div className="services-wrapper">
                      <div className="container">
                          <div className="row pb-4">

                              <div className="col-md-12">
                                  <h1 className="section-title pb-2"><strong>
                                      <span className="text-red">Red</span> Hot Offers</strong>
                                  </h1>
                              </div>

                          </div>

                          <div className="row contentWraper no-mobile">

                                  {this.state.statusCode == '404' ?
                                    <div className="col-md-12">
                                        <p>There are no offers right now.</p>
                                    </div>
                                    : this.state.allOffers.map(offer =>
                                        <div className="col-md-4">
                                            <Link to={encodeURI('/services/' + offer.servicetypename).replace(/%20/g, '-')} >
                                                <div className="offers mb-4">
                                                    {offer.imagepath != '' ?
                                                        <img className="img-fluid rounded"
                                                            src={App.ApisImageBaseUrl + offer.imagepath}
                                                            alt={offer.servicetypename} />
                                                        : <img className="img-fluid rounded"
                                                            src={placeholderSmall}
                                                            alt={offer.servicetypename} />
                                                    }

                                                    <div className="content">
                                                        <h5>{offer.servicetypename}</h5>
                                                        <p className="discount"><strong className="text-red">{offer.offer}%</strong> Off</p>
                                                        <p className="inlineItems mr-4">&#163; <del className="text-muted">{offer.lowestprice}</del></p>
                                                        <p className="inlineItems"><strong className="text-red">&#163; {offer.lowestprice - offer.offer / 100 * offer.lowestprice}</strong></p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                  }
                                 
                              </div>

                          <div className="row contentWraper yes-mobile">

                                  {this.state.statusCode == '404' ?
                                    <div className="col-md-12">
                                        <p>There are no offers right now.</p>
                                    </div>
                                    : this.state.allOffers.map(offer =>
                                        <div className="col-md-4">
                                            <div className="offers mb-4">
                                                <div className="row tpContent">
                                                    <div class="col-md-12">
                                                        <h5>{offer.servicetypename}</h5>
                                                    </div>
                                                </div>

                                                <div className="btmContent">
                                                    <div class="inlineItems One">
                                                        {offer.imagepath != '' ?
                                                            <img className="img-fluid rounded"
                                                                src={App.ApisImageBaseUrl + offer.imagepath}
                                                                alt={offer.servicetypename} />
                                                            : <img className="img-fluid rounded"
                                                                src={placeholderSmall}
                                                                alt={offer.servicetypename} />
                                                        }
                                                    </div>
                                                    <div class="inlineItems Two">
                                                        <p><strong className="text-red discount">{offer.offerdiscount}%</strong> Off</p>
                                                        <p>&#163; <del className="text-muted">{offer.lowestprice}</del>
                                                            <span className="discountedPrice">
                                                                &#163; <strong className="text-red">
                                                                    {offer.lowestprice - offer.offerdiscount / 100 * offer.lowestprice}
                                                                </strong>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="claimNow">
                                                        <img className="icon" src={expertRedIcon} alt="expertRedIcon" />
                                                        <Link to={encodeURI('/services/' + offer.servicetypename).replace(/%20/g, '-')}
                                                            className="btn btn-block bg-transparent p-0 mt-2">
                                                            Claim Now
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                  }

                              </div>

                      </div>
                  </div>
              </section>
        );
  }
}
