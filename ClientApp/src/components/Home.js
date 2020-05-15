import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MainSlider } from "../components/MainSlider/MainSlider";
import { PopularServices } from "../components/Services/PopularServices";
import { RecommendedServices } from "../components/Services/RecommendedServices";
import { RecommendedServicesMobile } from "../components/Services/RecommendedServicesMobile";
import { PopularServicesMobile } from "./Services/PopularServiceMobile";
//import { InfiniteScroller } from './Services/InfiniteScroller';
import toastr from "toastr";
import App from "../App";

export class Home extends Component {
  displayName = Home.name;

  constructor(props) {
    super(props);
    this.handleChangeOffer = this.handleChangeOffer.bind(this);
  }

  handleChangeOffer(e) {
    toastr["error"]("You are not logged in. Please Log in First");
  }

  render() {
    var Styles = {
      display: "block"
    };
    var cursor = {
      cursor: "pointer"
    };

    document.title = "Find an Expert | Book Any Service, Anytime, Anywhere";
    document.getElementsByTagName("META")[2].content =
      "Find an Expert offers all types of services 24/7. Open the website or download the Expert App, book your service, and get your work done, it�s simple and easy. ";

    /*Facebook open graphy meta tags*/
    document.getElementsByTagName("META")[3].content =
      "Book Any Services Anytime Anywhere � Find An Expert";
    document.getElementsByTagName("META")[4].content = "website";
    document.getElementsByTagName("META")[5].content =
      "https://www.findanexpert.net/";
    document.getElementsByTagName("META")[6].content =
      "https://admin.findanexpert.net//Images/ServiceTypesImages/web_design_and_develop.jpg";
    document.getElementsByTagName("META")[7].content =
      "Find and expert provides the Beauty, Household, IT And Digital Marketing services that can be availed 24/7 hours. Just download the expert app and you will get all services under one roof in London, UK.";
    document.getElementsByTagName("META")[8].content = "findanexpert";

    /*Twitter card meta tags*/
    document.getElementsByTagName("META")[9].content = "summary_large_image";
    document.getElementsByTagName("META")[10].content = "findanexpert";
    document.getElementsByTagName("META")[11].content = "findanexpert";
    document.getElementsByTagName("META")[12].content =
      "Book Any Services Anytime Anywhere - Find An Expert";
    document.getElementsByTagName("META")[13].content =
      "Find and expert provides the Beauty, Household, IT And Digital Marketing services that can be availed 24/7 hours. Just download the expert app and you will get all services under one roof in London, UK.";
    document.getElementsByTagName("META")[14].content =
      "https://admin.findanexpert.net//Images/ServiceTypesImages/web_design_and_develop.jpg";

    return (
      <div id="MainPageWrapper">
        <div className="no-mobile">
          <div
            id="carousel-example-1z"
            className="carousel slide carousel-fade main-slider"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox" id="main-slider">
              <li className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={App.StaticImagesUrl + "web_banner1.png"}
                  alt=""
                />
              </li>
            </div>
          </div>
        </div>

        <div className="yes-mobile">
          <iframe
            src="https://player.vimeo.com/video/391233884?autoplay=1&loop=1&autopause=0"
            width="auto"
            height="auto"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            autoplay="true"
          ></iframe>
        </div>

        <div className="main-wrapper pb-4">
          <section className="homeCirclesSection section-padding">
            <div className="homeCircles-wrapper">
              <div className="container-fluid">
                <div className="row noMobile">
                  <div className="col-md-3 text-center homeCircles">
                    <Link to="/sale" className="text-gray" style={cursor}>
                      <img
                        className="w-auto img-responsive m-auto"
                        alt="free-treatments-expert"
                        src={App.StaticImagesUrl + "offers_2.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">50% Off Referral</h5>
                    </Link>
                  </div>

                  <div className="col-md-3 text-center homeCircles">
                    <Link to="/gift-vouchers" className="text-gray">
                      <img
                        className="w-auto img-responsive m-auto"
                        alt="gift-vouchers-expert"
                        src={App.StaticImagesUrl + "offers_1.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">Gift Cards</h5>
                    </Link>
                  </div>

                  <div className="col-md-3 text-center homeCircles">
                    <Link to="/free-treatments" className="text-gray">
                      <img
                        className="w-auto img-responsive m-auto"
                        alt="free-treatments"
                        src={App.StaticImagesUrl + "offers_3.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">Free Treatment</h5>
                    </Link>
                  </div>

                  <div className="col-md-3 text-center homeCircles">
                    <Link to="/student-discounts" className="text-gray">
                      <img
                        className="w-auto img-responsive m-auto"
                        alt="student-discount-expert"
                        src={App.StaticImagesUrl + "offers_4.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">Student Discount</h5>
                    </Link>
                  </div>
                </div>

                <div className="row yes-mobile">
                  <div className="col-xs-4 text-center homeCircles">
                    <Link to="/sale" className="text-gray">
                      <img
                        className="w-auto img-responsive"
                        alt="free-treatments-expert"
                        src={App.StaticImagesUrl + "offers_2.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">50% Off Referral</h5>
                    </Link>
                  </div>

                  <div className="col-xs-4 text-center homeCircles">
                    <Link to="/gift-vouchers" className="text-gray">
                      <img
                        className="w-auto img-responsive"
                        alt="gift-vouchers-expert"
                        src={App.StaticImagesUrl + "offers_1.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">Gift Vouchers</h5>
                    </Link>
                  </div>

                  <div className="col-xs-4 text-center homeCircles">
                    <Link to="/student-discounts" className="text-gray">
                      <img
                        className="w-auto img-responsive"
                        alt="student-discount-expert"
                        src={App.StaticImagesUrl + "offers_4.png"}
                        width="auto"
                      />
                      <h5 className="icon-group__title">Student Discount</h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="st_app_links_media" className="pb-4">
            <div className="services-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-2 info-col pr-0 noMobile">
                    <div className="info-box section-bg-light" id="col_1">
                      <img
                        className="img-responsive m-auto"
                        src={App.StaticImagesUrl + "info_1.png"}
                        alt="expert-mobile"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 info-col noMobile">
                    <div className="info-box section-bg-light" id="col_2">
                      <p className="lead text">
                        Want all the <strong>Services</strong> at your
                        fingertips ? <strong>Download</strong> the Expert app{" "}
                        <strong>Now</strong>
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4 info-col pl-0">
                    <div class="info-box section-bg-light no-mobile" id="col_3">
                      <div className="content">
                        <a
                          href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                          target="_blank"
                        >
                          <img
                            className="IOS app img-responsive"
                            src={App.StaticImagesUrl + "appleStore.png"}
                            alt="expert-applestore"
                            width="100%"
                          />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.findanexpert"
                          target="_blank"
                        >
                          <img
                            className="Andriod app img-responsive"
                            src={App.StaticImagesUrl + "googleStore.png"}
                            alt="expert-googleStore"
                            width="100%"
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      class="info-box section-bg-light yes-mobile"
                      id="col_3"
                    >
                      <h3>Download App to claim your free Gift. </h3>
                      <div>
                        <a
                          href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                          target="_blank"
                        >
                          <img
                            className="IOS app img-responsive"
                            src={App.StaticImagesUrl + "appleStore.png"}
                            alt="expert-applestore"
                            width="100%"
                          />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.findanexpert"
                          target="_blank"
                        >
                          <img
                            className="Andriod app img-responsive"
                            src={App.StaticImagesUrl + "googleStore.png"}
                            alt="expert-googleStore"
                            width="100%"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="trendingNow pb-4 bg-white">
            <div className="trendingNow-wrapper">
              <div className="container-fluid">
                <div className="row pb-3">
                  <div className="col-md-12">
                    <h1 className="homeSectionTitle">Trending Stuff</h1>
                  </div>
                </div>

                <div className="row" id="trendingNow">
                  <div className="col-md-12">
                    <PopularServices />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="st_ft_offer_pro"
            className="fullWidthBanner mt-5 mb-5 bg-white"
          >
            <div className="overlay">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-9">
                    <div className="bannerTextWrap no-mobile">
                      <div className="content">
                        <p className="text-white pb-4">
                          <span>
                            <span className="small">Claim your</span>
                            <br />
                            <strong>Free Beauty Treatment</strong>
                          </span>
                        </p>
                      </div>
                      <div className="content">
                        <p className="text-white">
                          <span>
                            <span className="small"> By downloading</span>
                            <br />
                            <strong> The Expert App.</strong>
                          </span>
                        </p>
                      </div>
                      <div className="content">
                        <a
                          href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                          target="_blank"
                        >
                          <img
                            className="IOS app"
                            src={App.StaticImagesUrl + "appleStore.png"}
                            alt="expert-applestore"
                            width="100%"
                          />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.findanexpert"
                          target="_blank"
                        >
                          <img
                            className="Andriod app"
                            src={App.StaticImagesUrl + "googleStore.png"}
                            alt="expert-googleStore"
                            width="100%"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="bannerTextWrap yes-mobile">
                      <div className="content">
                        <p className="text-white pb-4">
                          <span>
                            <span className="small">
                              Any <strong>Service. </strong>
                              Any <strong>Time. </strong>
                              Any <strong>Where. </strong>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="bannerImageWrap">
                      <img
                        className="card-img-top"
                        src={App.StaticImagesUrl + "beautygirl.png"}
                        alt="Girl smiling"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="serices pb-4 bg-white">
            <div className="services-wrapper">
              <div className="container-fluid">
                <div className="row pb-3">
                  <div className="col-md-12">
                    <h2 className="homeSectionTitle">Only For You</h2>
                  </div>
                </div>

                <div className="row" id="recommendedServices">
                  <RecommendedServices />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
