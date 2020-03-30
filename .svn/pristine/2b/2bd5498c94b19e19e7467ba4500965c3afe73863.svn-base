import React, { Component } from 'react';
import banner from '../../assets/img/freeTreatment.png';
import googleStore from '../../assets/img/info_2.png';

export class FreeTreatments extends Component {
    displayName = FreeTreatments.name
    
    render() {
        let imgUrl = 'http://selteq.net/findanexperOffersBg/bannerProvideroffers.jpg';
        var bg = {
            background: 'url(' + imgUrl + ')',
            backgroundSize: 'cover',
            padding: '60px 0 150px 0'
        }
        var rgb = {
            background: '-webkit-linear-gradient(180deg,#41151d 0%,#ce2235 100%)'
        }

        document.getElementsByTagName("META")[2].content = 'Book an appointment for free beauty treatments and Coupon Deals at FindanExpert. Our free beauty services are for short period of time. Avail them now!';
        document.getElementsByTagName("TITLE")[0].text = 'Free Treatment, Beauty Free Treatments, Coupon Deals Free Treatment';
        
        return (
            <div>
                <section class="freebeautytreatment bg-pink section-padding">
                    <div class="services-wrapper">

                        <div class="text-center">
                            <h4 className="font-weight-bold text-red">Free Beauty Treatment</h4>
                            <p>Download the Expert App Now and claim your <strong>FREE Beauty Treatment.</strong><br />
                                That's right we are giving away a Free Beauty treatment to every person who downloads the Expert App.<br />
                                This is our way of saying thank you.</p>
                            <p>You don't need to buy anything to receive your free treatment.<br />
                                We are giving this to you because we want you to feel good about yourself.</p>
                        </div>

                    </div>
                </section>

                <section class="freeBeautyTreatmentChooseService section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div class="col-md-6">
                                    <img src={banner} class="img-fluid float-right" alt="Responsive image" />
                                </div>

                                <div class="col-md-6 pl-3">
                                    <h5 class="text-red">Choose from the following services:</h5>
                                    <div className="st_ft_r_s">
                                        <p class="text-left m-0 p-0">
                                            <a href="/services/Laser-Hair-Removal-(UA-or-BL)/">
                                                Laser Hair Removal Under Arms
                                            </a>
                                        </p>
                                        <p class="text-left m-0 p-0">
                                            <a href="/services/Laser-Hair-Removal-(UA-or-BL)/">
                                                Laser Hair Removal Bikini Line
                                            </a>
                                        </p>
                                        <p class="text-left m-0 p-0">
                                            <a className="text-black" href="/services/Express-Facial/">
                                                Express Facial
                                            </a>
                                        </p>
                                        <p class="text-left">Simply search for one of the above services and follow the normal booking process.
                                        You will not be charged for the service.</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section class="freeBeautyTreatmentHowDoIClaim section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-6 ">
                                    <div class="claim-add">
                                        <h5 class="text-center font-weight-bold">How do I claim?</h5>
                                        <ul class="text-center p-0">
                                            <li>
                                                To claim your Free beauty treatment couldn't be easier.
                                            </li>
                                            <li>
                                                Just book your Free treatment through the App.
                                            </li>
                                        </ul>
                                        <div class="text-center pt-4">
                                            <img src={googleStore} class="img-fluid " alt="Responsive image" />

                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="claim-add">
                                        <h5 class="text-center font-weight-bold pt-5">Terms & Conditions</h5>
                                        <ul class="text-center p-0">
                                            <li>
                                                Limit:One free treatment per client
                                            </li>
                                            <li>
                                                Can't be exchanged for cash
                                            </li>
                                        </ul>
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
