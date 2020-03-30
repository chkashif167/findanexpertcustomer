import React, { Component } from 'react';
import App from '../../App';
//import { Home } from '../Home';
import { Link } from 'react-router-dom';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class AllCustomerAddresses extends Component {
    displayName = AllCustomerAddresses.name

    constructor(props) {
        super(props);
        this.state = { allAddress: [], getAddressApiResponse: 0 };
    }

    componentDidMount() {
        if (localStorage.getItem("customeraccesstoken") != null) {
            fetch(App.ApisBaseUrlV2 + '/api/Address/getcustomeraddresses?authtoken=' + localStorage.getItem('customeraccesstoken'))
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.setState({ getAddressApiResponse: data.statuscode });
                    if (data.statuscode == 200) {
                        this.setState({ allAddress: data.addresslist });
                    }
                })
                .catch((error) => {

                    this.state.allAddress = [];
                });
        }
    }

    showAddressId(e) {
        localStorage.setItem('addressid', e.target.id);
        localStorage.setItem('postalcode', e.target.name);
    }

    handleSubmit(e) {
        e.preventDefault();
        var lastVisitedUrl = window.document.referrer;
        var lastVisitedUrlArray = [];
        var lastVisitedUrlArray = lastVisitedUrl.split("/");
        var lastVisitedPage = lastVisitedUrlArray[3];

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');
        var addressId = localStorage.getItem('addressid');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addressid: parseInt(addressId),
                authtoken: customeraccesstoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Address/deletecustomeraddress', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    window.location = '/your-addresses';
                }
            });
    }

    render() {

        if (this.state.getAddressApiResponse == 200) {
            return (
                this.getAddresses(this.state.allAddress)
            );
        }
        else if (this.state.getAddressApiResponse == 404) {
            return (
                this.noAddresses()
            );
        }
        else {
            return (
                <em>Loading...</em>
            );
        }
    }

    getAddresses(allAddress) {
        return (
            <div>
                <div className="row mb-4 pb-0">
                    {allAddress.map(adr =>

                        <div className="col-md-4 pb-4 addressCardWrap" key={adr.addressid}>
                            <div class="card colored-card addressCard profileBox">
                                <div class="card-body p-0">
                                    <h6 class="card-title">
                                        {adr.address.split('\n').map(function (item, key) {
                                            return (
                                                <span key={key}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}
                                    </h6>
                                    <div class="d-block d-md-flex float-right">
                                        <div class="flex-1 mr-2">
                                            <a className="btn  text-red float-left mr-2" href={'/update-address?' + btoa(encodeURIComponent('postalcode=' + adr.postalcode + '&addressid='
                                                + adr.addressid + '&address=' + adr.address))}><i class="far fa-edit"></i> </a>
                                        </div>
                                        <div class="flex-1">

                                            {this.state.allAddress.length != 1 ?
                                                <input type="button" value="Delete" class="btn btn-primary text-red" data-toggle="modal" data-target="#addressModal"
                                                    name={adr.postalcode} id={adr.addressid}
                                                    onClick={this.showAddressId} />
                                                : ''
                                            }

                                            <div class="modal fade" id="addressModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                    Do you want to delete your address?
                                                                </div>
                                                                <div className="col-md-12 text-right">
                                                                    <div className="w-100">
                                                                        <a class="btn bg-black text-white float-right ml-3" data-dismiss="modal">Cancel</a>
                                                                        <form onSubmit={this.handleSubmit.bind(this)}>
                                                                            <button type="submit" className="btn text-white bg-orange">Delete</button>
                                                                        </form>
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
                            </div>
                        </div>

                    )}
                </div>
            </div>
        );
    }

    noAddresses() {
        return (
            <div>
                <div className="row mb-4 pb-4">
                    <div className="col-md-6">
                        <div className="profileBox">
                            <p className="card-text">You have not added any address.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

AllCustomerAddresses.defaultProps = {
    allAddress: []
}

//export allCustomerAddresses;
