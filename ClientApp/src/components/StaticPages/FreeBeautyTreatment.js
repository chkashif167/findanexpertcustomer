import React, { Component } from 'react';
import banner from '../../assets/img/models.png';
import box1 from '../../assets/img/model1.png';
import box2 from '../../assets/img/model2.png';
import box3 from '../../assets/img/model3.jpg';
import box4 from '../../assets/img/model4.png';
import App from '../../App';

export class FreeBeautyTreatment extends Component {
    displayName = FreeBeautyTreatment.name

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: '', fullname: '', email: '', phone: '', added: false
        };
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    AddToEmailList(fullname, email, phone) {
        const requestoptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: fullname,
                email: email,
                phone: phone

            })
        };
        console.log(requestoptions);

        return fetch(App.ApisBaseUrl + '/api/Registration/savepartneremail', requestoptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ apiResponse: response, added: true });
                if (this.state.apiResponse.statuscode == '200') {
                    alert(this.state.apiResponse.message);

                } else if (this.state.apiResponse.statuscode == '409') {
                    alert(this.state.apiResponse.message);

                }

            });
    }

    handleChangeFullname(e) {
        this.setState({ fullname: e.target.value });
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangePhone(e) {
        this.setState({ phone: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { fullname, email, phone } = this.state;
        this.AddToEmailList(fullname, email, phone);

        this.setState({
            fullname: '',
            email: '',
            phone: ''
        });
    }

    render() {
        return (
            <div>

                <section className="freeTreatmentsBanner section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="card shadow mb-5 bg-white rounded">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card-img-bottom5">
                                            <img class="card-img-top mb-5" src={banner} alt="slider image" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-block">
                                            <h3 class="card-title font-weight-bold pt-5">Looking for MODELS in London</h3>
                                            <h2 class="font-weight-bold text-red mb-2">FREE <br />BEAUTY TREATMENTS</h2>
                                            <p class="mrgnBttmPrgrph">We are beauty training company and we require <br />models on daily basis</p>
                                            <p className="font-weight-bold">We train <br /><span className="lead font-weight-bold text-red">Doctors, Nurses and Beauty Professionals.</span></p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="freeTreatmentsRegister bg-red section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div class="col-md-12 text-center">
                                    <h2 class="text-center font-weight-bold text-white pt-3 pb-3 register-now">Register Now!</h2>
                                    <form onSubmit={this.handleSubmit} >
                                        <div class="form-row">
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Full Name" name="fullname" value={this.state.fullname}
                                                    onChange={this.handleChangeFullname} required />
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Email" name="email" value={this.state.email}
                                                    onChange={this.handleChangeEmail} required />
                                            </div>
                                        </div>
                                        <div class="form-row pt-3">
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Mobile" name="phone" value={this.state.phone}
                                                    onChange={this.handleChangePhone} required />
                                            </div>

                                        </div>
                                        <div class="col text-center mt-2">
                                            <button type="submit" class="btn btn-dark form-button mt-3 mb-3">Sign Up</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section className="freeTreatmentsBoxes section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3 className="font-weight-bold">We require Modals for the following treatments:</h3>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-3 bg-black coloredBox">
                                    <ul class="services-list text-white mb-0">
                                        <li>
                                            CO2 Laser Resurfacing
                                        </li>
                                        <li>
                                            Botox/Fillers
                                        </li>
                                        <li>
                                            Vaginal Rejuvenation
                                        </li>
                                        <li>
                                            Skin Peels
                                        </li>
                                        <li>
                                            Herbal Peels
                                        </li>
                                        <li>
                                            HIFU Non Surgical Skin
                                            Tightening
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 Box p-0">
                                    <img class="card-img-top" src={box1} alt="slider image" />
                                </div>

                                <div className="col-md-3 bg-black coloredBox" id="two">
                                    <ul class="services-list text-white mb-0">
                                        <li>
                                            Laser Hair Removal
                                        </li>
                                        <li>
                                            IPL Photo Rejuvenation
                                        </li>
                                        <li>
                                            Microdermabrasion
                                        </li>
                                        <li>
                                            Body Sculpting/Fat Freeze
                                        </li>
                                        <li>
                                            Rosacea Laser treatment
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 Box p-0">
                                    <img class="card-img-top" src={box1} alt="slider image" />
                                </div>

                                <div className="col-md-3 Box p-0">
                                    <img class="card-img-top" src={box1} alt="slider image" />
                                </div>

                                <div className="col-md-3 bg-red coloredBox" id="three">
                                    <ul class="services-list text-white mb-0">
                                        <li>
                                            Sunspots Freckle Removal
                                        </li>
                                        <li>
                                            Vein Removal
                                        </li>
                                        <li>
                                            Plasma Firbroblast Pen
                                            treatment
                                        </li>
                                        <li>
                                            Skin Tags/Warts/Milia
                                            <br />Removal
                                        </li>
                                        <li>
                                            Massage Treatments
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 Box p-0">
                                    <img class="card-img-top" src={box1} alt="slider image" />
                                </div>

                                <div className="col-md-3 bg-red coloredBox" id="four">
                                    <ul class="services-list text-white mb-0">
                                        <li>
                                            PRP Hair Regrowth
                                        </li>
                                        <li>
                                            Vampire Facial
                                        </li>
                                        <li>
                                            Mesotherapy Facial
                                        </li>
                                        <li>
                                            Dermapen/Dermaroller
                                        </li>
                                        <li>
                                            Classic relaxing Facials
                                        </li>
                                        <li>
                                            Nails
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="freeTreatmentsColoredSection section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div className="row">

                                <div className="col-md-12 text-center lead text-white">
                                    <p className="text-white">Having these treatments can cost a lot of money, some of our treatments are
                                        worth thousands of pounds, so why not book your <strong>FREE treatment today.</strong></p>
                                    <p class="lead m-0 text-white">We have a High Demand so Register your interest today.
                                        We work on first come first serve Basic.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
