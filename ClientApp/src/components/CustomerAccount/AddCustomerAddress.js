import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class AddCustomerAddress extends Component {
    displayName = AddCustomerAddress.name

    constructor(props) {
        super(props);

        this.state = {
            allAddresses: [],
            postalcode: '', address: '', add: false,
            showModal: '',
            modalMessage: '',
            noAddressFound: ''
        };
    }

    addAddress(postalcode, address) {

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postalcode: postalcode,
                address: address,
                authtoken: customeraccesstoken
            })
        };
        console.log(requestOptions);

        if (this.state.address == '') {
            toastr["error"]("Please Select an Address!");
        }
        else {
            return fetch(App.ApisBaseUrlV2 + '/api/Address/addcustomeraddress', requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.statuscode == 200) {
                        this.setState({ modalMessage: 'Address added successfully!', showModal: 'show' });
                    }
                });
        }
    }

    handleChangePostalCode(e) {

        this.setState({ postalcode: e.target.value });

        return fetch(App.ApisBaseUrlV2 + '/api/Address/getaddresses?postalcode=' + e.target.value)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    localStorage.setItem('get_address', data.get_address);
                    this.setState({ allAddresses: data.get_address });
                }
                else {
                    // toastr['error'](data.message);
                    this.setState({ noAddressFound: data.message })
                }
            });
    }

    handleChangeAddress(e) {
        this.setState({ address: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { postalcode, address } = this.state;
        this.addAddress(postalcode, address);
    }

    handleModal(e) {

        e.preventDefault();

        var lastVisitedUrl = document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        this.setState({ showModal: null });
        if (lastVisitedUrl == localStorage.getItem('bookingUrlIfUserAddNewAddress')) {
            window.location = lastVisitedUrl;
        }
        else if (lastVisitedPage == '/your-payment-details') {
            window.location = '/your-payment-details';
        }
        else {
            window.location = '/your-addresses';
        }
    }


    render() {
        return (
            this.addAddressForm()
        );
    }

    addAddressForm() {

        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit.bind(this)} enctype="multipart/form-data">

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode.bind(this)} required />
                        </div>
                    </div>

                    <div className="addressAccordion" id="accordion">

                        <div class="heading" id="headingOne">
                            <h5 class="mb-0">
                                <a class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Find your address
                                </a>
                            </h5>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="form-row pb-3">
                                <div class="col">
                                    <select className="form-control" value={this.state.address}
                                        onChange={this.handleChangeAddress.bind(this)}>
                                        <option value="">Please select an address</option>
                                        {this.state.allAddresses &&
                                            <option value="" selected> {this.state.noAddressFound} </option>
                                        }

                                        {this.state.allAddresses.map((adr) =>
                                            <option value={adr.replace("{", " ").replace("}", " ")}>{adr.replace("{", " ").replace("}", " ")}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="heading" id="headingTwo">
                            <h5 class="mb-0">
                                <a class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Add manual address
                                </a>
                            </h5>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="form-row pb-3">
                                <div className="col">
                                    <input type="text" name="postalcode" className="form-control validate" placeholder="Your address" value={this.state.address}
                                        onChange={this.handleChangeAddress.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right mb-3">
                        <button type="submit" className="btn bg-black text-white">Add New Address</button>
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

    addressDetails(addAddress) {
        return (
            <div className="Register">
                <div className="alert alert-success st_success">
                    New address added!
                </div>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode} required />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.address}
                                onChange={this.handleChangeAddress}>
                                <option value="">Please select an address</option>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="text-right mb-3">
                        <button type="submit" className="btn bg-black text-white">Add New Address</button>
                    </div>
                </form>
            </div>
        );
    }
}