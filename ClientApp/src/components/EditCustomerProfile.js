import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import toastr from 'toastr';
import headerporfileicon from '../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class EditCustomerProfile extends Component {
    displayName = EditCustomerProfile.name

    constructor(props) {
        super(props);

        console.log(localStorage.getItem('servicePageUrl'));

        if (localStorage.getItem('dob') != null) {
            if (localStorage.getItem('dob') == '0001-01-01') {
                var customerDOB = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            }
            else {
                var customerDOB = localStorage.getItem('dob');
            }
        }

        this.state = {
            file: null,
            users: [],
            allAddresses: [],
            successupdateprofile: '',
            firstname: localStorage.getItem('firstname'), surname: localStorage.getItem('lastname'), mobile: localStorage.getItem('mobile'),
            genderpreference: localStorage.getItem('genderpreference'), gender: localStorage.getItem('gender'),
            dob: customerDOB, authtoken: localStorage.getItem('customeraccesstoken'), showModal: '', modalMessage: ''
        };

        // alert(this.state.genderpreference)
    }

    handleChangeFirstname(e) {
        this.setState({ firstname: e.target.value });
    }

    handleChangeSurname(e) {
        this.setState({ surname: e.target.value });
    }

    handleChangeMobile(e) {
        this.setState({ mobile: e.target.value });
    }

    handleChangeGenderPreference = e => {
        const { genderpreference } = this.state;
        const { value } = e.target;


        console.log(genderpreference, value);

        if (
            (genderpreference == "male" && value == "male") ||
            (genderpreference == "female" && value == "female")
        ) {
            this.setState({ genderpreference: null });
        } else if (!genderpreference) {
            this.setState({ genderpreference: value });
        }
        else if (genderpreference == 0) {
            this.setState({ genderpreference: value });
        }
        else if (
            (genderpreference == "male" && value == "female") ||
            (genderpreference == "female" && value == "male")
        ) {
            this.setState({ genderpreference: "both" });
        } else if (genderpreference == "both" && value == "female") {
            this.setState({ genderpreference: "male" });
        } else if (genderpreference == "both" && value == "male") {
            this.setState({ genderpreference: "female" });
        }
    };

    handleChangeGender(e) {
        this.setState({ gender: e.target.value });
    }

    handleChangeDOB(date) {
        this.setState({
            dob: date
        });
    }

    //handleChangePostalCode(e) {

    //    this.setState({ postalcode: e.target.value });

    //    fetch(App.ApisBaseUrlV2 + '/api/Address/getaddresses?postalcode=' + e.target.value)
    //        .then(response => {
    //            console.log(response);
    //            return response.json();
    //        })
    //        .then(response => {
    //            console.log(response);
    //            if (response.statuscode == 200) {
    //                localStorage.setItem('get_address', response.get_address);
    //                console.log(localStorage.getItem('get_address'));
    //                this.setState({ allAddresses: response.get_address });
    //                console.log(this.state.allAddresses);
    //            }
    //            else if (response.statuscode == 404) {
    //                this.setState({ allAddresses: '' });
    //            }
    //        });
    //}

    //handleChangeAddress(e) {
    //    this.setState({ address: e.target.value });
    //}

    UpdateCustomerProfile(firstname, surname, mobile, genderpreference, gender, dob, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: firstname,
                lastname: surname,
                mobile: mobile,
                genderpreference: genderpreference,
                gender: gender,
                dob: dob,
                authtoken: authtoken,
                postalcode: 'xyz',
                address: 'abc'
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Customer/updateprofile', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ updateCustomer: response });
                    this.setState({ modalMessage: "Your profile updated successfully!", showModal: 'show' });

                    localStorage.setItem('firstname', firstname);
                    localStorage.setItem('lastname', surname);
                    localStorage.setItem('mobile', mobile);
                    localStorage.setItem('gender', gender);
                    localStorage.setItem('genderpreference', genderpreference);
                    localStorage.setItem('dob', dob);
                    localStorage.setItem("isprofilecompleted", true);
                }
                else if (response.statuscode == 400) {
                    toastr["error"](response.message);
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.mobile.length < 11 || this.state.mobile.length > 11) {
            toastr["error"]('Please enter valid phone number');
        }
        else if (this.state.genderpreference == '' || this.state.genderpreference == '0' || this.state.dob == '') {
            toastr["error"]('All feilds are required!');
        }
        else {
            const { firstname, surname, mobile, genderpreference, gender, dob, authtoken } = this.state;
            this.UpdateCustomerProfile(firstname, surname, mobile, genderpreference, gender, dob, authtoken);
        }
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        if (localStorage.getItem('servicePageUrl') != null) {
            window.location = localStorage.getItem('servicePageUrl');
        }
        else {
            window.location = '/profile';
        }
    }

    render() {
        return (
            this.customerProfile()
        );
    }

    customerProfile() {
        console.log(localStorage.getItem('gender'));

        return (

            <div className="Register p-5 coloredBox">
                <form onSubmit={this.handleSubmit.bind(this)} enctype="multipart/form-data" className="p-5">

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="firstname" className="form-control validate frm-field" placeholder="First Name"
                                value={this.state.firstname} autocomplete="off" onChange={this.handleChangeFirstname.bind(this)} required />
                        </div>
                        <div class="col">
                            <input type="text" name="surname" className="form-control validate frm-field" placeholder="Last Name" value={this.state.surname}
                                autocomplete="off" onChange={this.handleChangeSurname.bind(this)} required />
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="number" name="mobile" className="form-control validate frm-field" placeholder="Mobile" value={this.state.mobile}
                                autocomplete="off" onChange={this.handleChangeMobile.bind(this)} />
                        </div>
                    </div>
                    <hr />

                    <h5>Gender Preference</h5>

                    <div className="md-form pb-3">

                        {/* {localStorage.getItem('genderpreference') != null ?
                            localStorage.getItem('genderpreference') == 'Male' ?
                                <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                                    onChange={this.handleChangeGenderPreference.bind(this)} required>
                                    <option selected value={localStorage.getItem('genderpreference')}>{localStorage.getItem("genderpreference")}</option>
                                    <option value="Female">Female</option>
                                </select>
                                : localStorage.getItem('genderpreference') == 'Female' ?
                                    <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                                        onChange={this.handleChangeGenderPreference.bind(this)} required>
                                        <option value="Male">Male</option>
                                        <option selected value={localStorage.getItem('genderpreference')}>{localStorage.getItem("genderpreference")}</option>
                                    </select>
                                    : <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                                        onChange={this.handleChangeGenderPreference.bind(this)} >
                                        <option>Please select an option</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                            : <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                                onChange={this.handleChangeGenderPreference.bind(this)} >
                                <option>Please select an option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        } */}

                        <label style={{ fontWeight: "normal" }} className="pr-5">
                            <input
                                type="checkbox"
                                onChange={this.handleChangeGenderPreference}
                                value="male"
                                checked={
                                    this.state.genderpreference === "male" ||
                                    this.state.genderpreference === "both"
                                }
                            />
              Male
            </label>

                        <label style={{ fontWeight: "normal" }}>
                            <input
                                type="checkbox"
                                onChange={this.handleChangeGenderPreference}
                                value="female"
                                checked={
                                    this.state.genderpreference === "female" ||
                                    this.state.genderpreference === "both"
                                }
                            />
              Female
            </label>

                    </div>

                    <hr />

                    <h5>Gender</h5>

                    <div className="md-form pb-3">
                        {localStorage.getItem('gender') != null ?
                            localStorage.getItem('gender') == 'Male' ?
                                <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                    onChange={this.handleChangeGender.bind(this)} required>
                                    <option selected value={localStorage.getItem('gender')}>{localStorage.getItem("gender")}</option>
                                    <option value="Female">Female</option>
                                    <option value="na">No Preference</option>
                                </select>
                                : localStorage.getItem('gender') == 'Female' ?
                                    <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                        onChange={this.handleChangeGender.bind(this)} required>
                                        <option value="Male">Male</option>
                                        <option selected value={localStorage.getItem('gender')}>{localStorage.getItem("gender")}</option>
                                        <option value="na">No Preference</option>
                                    </select>
                                    : localStorage.getItem('gender') == 'No Preference' ?
                                        <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                            onChange={this.handleChangeGender.bind(this)} required>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value={localStorage.getItem('gender')}>{localStorage.getItem("gender")}</option>
                                        </select>
                                        : <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                            onChange={this.handleChangeGender.bind(this)} >
                                            <option>Please select an option</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="na">No Preference</option>
                                        </select>
                            : <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                onChange={this.handleChangeGender.bind(this)} >
                                <option>Please select an option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="na">No Preference</option>
                            </select>
                        }
                    </div>

                    <h5>Date of birth</h5>
                    <div className="md-form pb-3">
                        <ModernDatepicker
                            date={this.state.dob}
                            format={'YYYY-MM-DD'}
                            showBorder
                            onChange={(date) => this.handleChangeDOB(date)}
                            maxDate={'2002-01-01'}
                            placeholder={'Select a date'} />
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Save Changes</button>
                    </div>

                </form>

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
        );
    }

}