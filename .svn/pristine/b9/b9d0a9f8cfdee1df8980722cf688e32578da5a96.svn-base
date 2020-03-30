import React, { Component } from 'react';
import banner from '../../assets/img/man.jpg';
import icon1 from '../../assets/img/thumb.png';
import icon2 from '../../assets/img/like.png';
import icon3 from '../../assets/img/pound.png';
import bottomBg from '../../assets/img/footer.jpg';
import App from '../../App';
import toastr from 'toastr';

export class PartnerWithExpert extends Component {
    displayName = PartnerWithExpert.name

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
                if (response.status == '200') {

                    toastr["success"]("Registration successful");

                } else if (response.status == '409') {

                    toastr["error"]("This email is already registered! Please choose another email");
                }
                return response.json();
                
            })
            .then(response => {
                console.log(response);
                this.setState({ apiResponse: response, added: true });
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
        var styles = {
            position: 'relative'
        }
        var paddingBottom = {
            paddingBottom: '0'
        }
        var marginBottom = {
            marginBottom: '30px'
        }


        return (
            <div>

                <section class="user-banner section-padding bg-color-main">
                    <div class="services-wrapper">
                        <div class="container-fluid">
                            <div class="row">

                                <div class="col-md-7">
                                    <div class="heading-banner">
                                        <h1>DO YOU WANT MORE?</h1>
                                        <h3 class="p-right">More Clients</h3>
                                        <h3 class="p-right1">More Work</h3>
                                        <h3>More Money</h3>
                                        <h2 class="">PARTNER WITH EXPERT</h2>
                                    </div>
                                </div>

                                <div class="col-md-5">
                                    <img class="user" src={banner} />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section class="UserBannerContact-form section-padding" style={styles}>
                    <div class="partnerWithExpertOverlay"></div>
                    <div class="services-wrapper">
                        <div class="container-fluid">
                            <div class="row ">

                                <div class="col-md-6  ">
                                    <div class="heading-banner">
                                        <h3> We give you <strong>Booked Clients</strong> Through Our App</h3>
                                        <h3> You Keep <strong>80% Of The Money</strong></h3>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-class">

                                        <form onSubmit={this.handleSubmit} class="form-horizontal">
                                            <h3 class="register">Register Me For Free Training</h3>
                                            <div class="form-group ">
                                                <input type="text" class="form-control" name="fullname" value={this.state.fullname}
                                                    onChange={this.handleChangeFullname} placeholder="Enter Name" required />
                                            </div>
                                            <div class="form-group ">
                                                <input type="email" class="form-control" name="email" value={this.state.email}
                                                    onChange={this.handleChangeEmail} placeholder="Enter Email" required />
                                            </div>
                                            <div class="form-group ">
                                                <input type="number" class="form-control" name="phone" value={this.state.phone}
                                                    onChange={this.handleChangePhone} placeholder="Enter Phone Number" required />
                                            </div>

                                            <div class="form-group button-class">
                                                <button >Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section class="UserBannerHow-it-works section-padding">
                    <div class="services-wrapper">
                        <div class="container border-top-grey">

                            <div class="row text-center">
                                <div class="col-md-12">
                                    <h4>HOW IT WORKS ?</h4>
                                </div>
                            </div>

                            <div class="row text-center">

                                <div class="col-md-4">
                                    <img src={icon1} />
                                    <div class="bottom-line">REGISTER TODAY</div>
                                </div>
                                <div class="col-md-4">
                                    <img src={icon2} />
                                    <div class="bottom-line">GET APPROVED</div>
                                </div>
                                <div class="col-md-4">
                                    <img src={icon3} />
                                    <div class="bottom-line">START EARNING</div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section class="UserBannerPower-digital section-padding mt-5">
                    <div class="services-wrapper">
                        <div class="container-fluid ">
                            <div class="row text-center">

                                <div class="col-md-3">
                                    <div class=" first-color">
                                        <h3>Use The <strong>POWER</strong> Of Our <strong>DIGITAL TECHNOLOGY</strong></h3></div>
                                </div>
                                <div class="col-md-3">
                                    <div class="second-color">
                                        <h3>Join Thousands Of <strong>PEOPLE</strong> Partnering With Us</h3></div>
                                </div>
                                <div class="col-md-3">
                                    <div class="  third-color">
                                        <h3>Tons Of <strong>CLIENTS</strong> Are Waiting For Our <strong>SERVICES</strong></h3></div>
                                </div>
                                <div class="col-md-3">
                                    <div class=" four-color">
                                        <h3>We Send You <strong>BOOKED JOBS</strong> Through Our App</h3></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section class="UserBannerRegister-now section-padding mt-5" style={paddingBottom}>
                    <div class="services-wrapper">
                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-md-12 text-center" style={marginBottom}>
                                    <h1 >REGISTER NOW</h1>
                                    <h3 class="m-0">WE ARE LOOKING FOR</h3>
                                </div>
                            </div>

                            <div class="row bg-red-color">

                                <div class="col-md-4">
                                    <ul>
                                        <li>
                                            Electricians
                                        </li>
                                        <li>
                                            Handyman
                                        </li>
                                        <li>
                                            BabySitters
                                        </li>
                                        <li>
                                            Cleaners
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-4">
                                    <ul>
                                        <li>
                                            Nannys
                                        </li>
                                        <li>
                                            Gardeners
                                        </li>
                                        <li>
                                            Plumbers
                                        </li>
                                        <li>
                                            Beauticians
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-4">
                                    <ul>
                                        <li>
                                            Laser Therapists
                                        </li>
                                        <li>
                                            Massage Therapists
                                        </li>
                                        <li>
                                            Aesthetic Doctors
                                        </li>
                                        <li>
                                            Aesthetic Nurses
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
