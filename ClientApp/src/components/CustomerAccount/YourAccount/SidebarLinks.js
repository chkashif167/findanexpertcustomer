import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bannerProfile from '../../../assets/img/profileBanner.png';
import profileImage from '../../../assets/img/dummy-profile.png';
import App from '../../../App';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class SidebarLinks extends Component {
    displayName = SidebarLinks.name

    constructor(props) {

        super(props);
        this.state = {
            file: null,
            profileImage: '',
            showModal: '',
            modalMessage: ''
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Customer/getprofile?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ profileImage: data.imagepath });
            });
    }

    handleChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,

            });

            console.log(reader.result);
        }

        reader.readAsDataURL(file);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", this.state.file);
        formData.append("authtoken", localStorage.getItem('customeraccesstoken'));

        const requestOptions = {
            method: "POST",
            body: formData
        };

        return fetch(App.ApisBaseUrlV2 + '/api/Image/updatecustomerprofileimage', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == 200) {
                    this.setState({ modalMessage: "Your profile Image updated successfully!", showModal: 'show' });
                }
            });
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/profile';
    }

    render() {

        var bg = {
            background: 'url(' + bannerProfile + ')'
        }

        return (

                <section class="customerProfile w-100">
                    <div class="services-wrapper">
                        <div class="hero-image" style={bg}></div>
                        <div class="container-fluid shadow">
                            <div class="row">

                                <div class="banner_profile_picture">
                                    {this.state.profileImage != ''?
                                        <img src={App.ApisBaseUrlV2 + this.state.profileImage} class="img-fluid z-depth-1 img-profile"
                                        alt="userProfileImage" />
                                        : <img src={profileImage} class="img-fluid z-depth-1 img-profile"
                                        alt="userProfileImage" />
                                    }
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div class="form-group profileImage">
                                            <label for="exampleFormControlFile1">Upload Profile Image (Recommended 160x120)</label>
                                            <input type="file" class="form-control-file frm-field" name="image"
                                            onChange={this.handleChangeImage.bind(this)} />
                                            <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto">Upload Image</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="topnav" id="myTopnav">
                                    <Link to="/profile" class="custom_column">
                                        <div class="text-center profile_box_1">
                                            <div>
                                                <i class="fas fa-user"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Profile</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/customer-bookings" class="custom_column">
                                        <div class="text-center profile_box_2">
                                            <div>
                                                <i class="fas fa-calendar-alt"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Your Bookings</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/your-experts" class="custom_column">
                                        <div class="text-center profile_box_3">
                                            <div>
                                                <i class="fas fa-user-tie"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Your Experts</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/your-addresses" class="custom_column">
                                        <div class="text-center  profile_box_4">
                                            <div>
                                                <i class="fas fa-address-card"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Your Addresses</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/your-emails" class="custom_column">
                                        <div class="text-center profile_box_5">
                                            <div>
                                                <i class="fas fa-envelope"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Your Emails</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/your-payment-details" class="custom_column">
                                        <div class="text-center profile_box_6">
                                            <div>
                                                <i class="far fa-credit-card"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Payment Details</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/watchlist" class="custom_column">
                                        <div class="text-center profile_box_7">
                                            <div>
                                                <i class="fas fa-heart"></i>
                                            </div>
                                            <div class="text-center">
                                                <p className="text-white">Watchlist</p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                                <div class={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">

                                                <div className="row">
                                                    <div className="col-md-12 d-flex">
                                                        <div>
                                                            <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                                        </div>
                                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                                    </div>
                                                    <div className="col-md-12 text-center fs-18 p-5">
                                                        {this.state.modalMessage}
                                                    </div>
                                                    <div className="col-md-12 text-right">
                                                        <div className="w-100">
                                                            <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

        );
    }
}