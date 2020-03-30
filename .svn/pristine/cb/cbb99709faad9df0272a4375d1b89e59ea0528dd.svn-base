import React, { Component } from 'react';
import banner from '../../assets/img/girl.png';
import icon1 from '../../assets/img/training.png';
import icon2 from '../../assets/img/free.png';
import icon3 from '../../assets/img/book.png';
import bottomBg from '../../assets/img/footer.jpg';
import App from '../../App';

export class FreeTraining extends Component {
    displayName = FreeTraining.name

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

                <section class="freetraining section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-6  pl-0 freeTraining">
                                    <h1>
                                        FREE TRAINING
                                    </h1>
                                    <h2>
                                        BEAUTY, LASER & AESTHETICS
                                    </h2>
                                    <h4>
                                        A direct pathway to a New you - Start your career Now
                                    </h4>
                                    <h6>
                                        We provide you
                                    </h6>
                                    <h3 class="training">
                                        Training, Experience & Work
                                    </h3>
                                </div>
                                <div class="col-md-6 pl-0">
                                    <img src={banner} class="img-fluid" alt="Responsive image" />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section class="freeTrainingRegister section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <h1 class="text-center">
                                Register Me For Free Training
                            </h1>
                            <div class="col text-center">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" placeholder="Full Name" name="fullname" value={this.state.fullname}
                                                onChange={this.handleChangeFullname} required />
                                        </div>
                                        <div class="col-md-6">
                                            <input type="email" class="form-control" placeholder="Email" name="email" value={this.state.email}
                                                onChange={this.handleChangeEmail} required />
                                        </div>
                                        <div class="col-md-12 pt-3">
                                            <input type="text" class="form-control" placeholder="Phone no." name="phone" value={this.state.phone}
                                                onChange={this.handleChangePhone} required />
                                        </div>

                                    </div>
                                    <div class="col text-center">
                                        <button type="submit" class="btn submit ">Sign Up</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="freeTrainingHowitWorks section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">
                                <div class="col-md-12 pt-5">
                                    <h4 class="text-center">
                                        How It Works
                                    </h4>
                                </div>
                            </div>

                            <div class="row text-center th-image">
                                <div class="col-md-4">
                                    <img src={icon1} class="img-fluid" alt="Responsive image" />
                                    <h5 class="font-weight-bold pt-3">
                                        Free Training
                                    </h5>
                                </div>
                                <div class="col-md-4">
                                    <img src={icon2} class="img-fluid" alt="Responsive image" />
                                    <h5 class="font-weight-bold pt-3">
                                        Free Experience
                                    </h5>
                                </div>

                                <div class="col-md-4">
                                    <img src={icon3} class="img-fluid" alt="Responsive image" />
                                    <h5 class="font-weight-bold pt-3">
                                        Booked Clients
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="freeTrainingProvideTraining section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">
                                <div class="col-md-12 pt-5">
                                    <h4 class="text-center">
                                        We provide you Training, Experience & Work
                                    </h4>
                                    <p class="text-center lead1">
                                        Find an Expert provides on demand Beauty & Aesthetic services in the home. We are growing & need motivated individuals <br />
                                        like yourselves. We give you the clients and youreceive 80% of money. There's no catch its as simple as that.
                                    </p>
                                </div>
                            </div>

                            <div class="row text-center">

                                <div class="col-md-3">
                                    <div class=" round-boxes bg-lightpink">
                                        <p class="text-center">
                                            We give you FREE training provide the equipment and give you clients. Work when you want as much as you want. You are your own boss.
                                        </p>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class=" round-boxes bg-yellow">
                                        <p class="text-center">
                                            Become an experienced Aesthetician where the job opportunities are endless.
                                        </p>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class=" round-boxes bg-darkpink">
                                        <p class="text-center">
                                            Learn the fastest growing and potentially the most profitable aesthetic treatments
                                        </p>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class=" round-boxes bg-blue">
                                        <p class="text-center ">
                                            Internationally recognised Diplomas in different areas of Beauty. Qualifications awarded by VTCT.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section class="freeTrainingCanBeTrained section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-3 round-boxes">
                                    <h1>
                                        You Can Be <br />
                                        <strong>Trained On</strong> <br />
                                        Any Of These:
                                    </h1>
                                </div>

                                <div class="col-md-3">
                                    <ul>
                                        <li>
                                            Facials
                                        </li>
                                        <li>
                                            Nails
                                        </li>
                                        <li>
                                            Massage
                                        </li>
                                        <li>
                                            Skin Peels
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-3">
                                    <ul>
                                        <li>
                                            Microdermabrasion
                                        </li>
                                        <li>
                                            Dermapen
                                        </li>
                                        <li>
                                            HIFU skin tightening
                                        </li>
                                        <li>
                                            Level 4 Laser & IPL Hair Removal
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-3">
                                    <ul>
                                        <li>
                                            Level 4 Laser Skin Treatments
                                        </li>
                                        <li>
                                            Electrolysis Hair Removal
                                        </li>
                                        <li>
                                            HIFU skin tightening
                                        </li>
                                        <li>
                                            Hair - Blowdry
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
