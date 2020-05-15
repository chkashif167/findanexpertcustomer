import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class UpdateCustomerAddress extends Component {
    displayName = UpdateCustomerAddress.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const postalCode = params.get('postalcode');
        const addressId = params.get('addressid');
        const Address = params.get('address');
        console.log(Address)

        this.state = {
            allAddresses: [],
            postalcode: postalCode, addressid: addressId,
            address: Address, showModal: '',
            modalMessage: ''
        };
    }

    updateAddress(postalcode, addressid, address) {

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 52);
        console.log(lastVisitPage);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addressid: parseInt(addressid),
                postalcode: postalcode,
                address: address,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        if (this.state.address == '') {
            alert('Please select an Address');
        }
        else {
            return fetch(App.ApisBaseUrlV2 + '/api/Address/updatecustomeraddress', requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    if (response.statuscode == 200) {
                        this.setState({ modalMessage: response.message, showModal: 'show' });
                    }
                });
        }
    }

    handleChangePostalCode(e) {
        this.setState({ postalcode: e.target.value });
    }

    handleChangeAddress(e) {
        this.setState({ address: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { postalcode, addressid, address } = this.state;
        this.updateAddress(postalcode, addressid, address);
    }

    handleModal(e) {
        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/your-addresses';
    }

    render() {

        return (
            this.addAddressForm()
        );
    }

    addAddressForm() {

        return (
            <div id="MainPageWrapper" >

                <SidebarLinks />

                <section class="customerProfile w-100">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            <div class="row coloredBox mb-5">

                                <div className="col-md-12 pt-4 pb-4">

                                    <div className="Register">
                                        <form onSubmit={this.handleSubmit.bind(this)} enctype="multipart/form-data">

                                            <div className="form-row pb-3">
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate postalCode" placeholder="Postalcode"
                                                        value={this.state.postalcode} onChange={this.handleChangePostalCode.bind(this)}
                                                        required />
                                                </div>
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode"
                                                        value={this.state.address.replace(/[\r\n]+/g, " ")} onChange={this.handleChangeAddress.bind(this)} required />
                                                </div>
                                            </div>

                                            <div className="text-center mb-3">
                                                <button type="submit" className="btn bg-black text-white float-right">Update Address</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

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
                </section>

            </div>

        );
    }
}