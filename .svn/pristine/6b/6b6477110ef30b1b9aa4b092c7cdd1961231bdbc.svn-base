import React, { Component } from 'react';
import App from '../../../App';

export class CustomerInbox extends Component {
    displayName = CustomerInbox.name

    constructor(props) {
        super(props);
        this.state = {
            inBoxMails: [], loading: true
        };

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerEmail = localStorage.getItem("email");

        fetch(App.ApisBaseUrlV2 + '/api/Email/getinboxemails?isCustomer=true&pagenumber=' + 1 + '&pagesize=' + 15 + '&authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    this.setState({ inBoxMails: data.emaillist, emaillist: false });
                }
                else {
                    this.state.inBoxMails = [];
                }
                
            })
            .catch((error) => {

                this.state.inBoxMails = [];
            });
    }

    render() {
        if (this.state.inBoxMails != '') {
            return (
                this.CustomerInbox()
            );
        }
        else {
            return (
                this.CustomerEmptyInbox()
            );
        }
        
    }

    CustomerInbox() {
        return (
            <div>
                {this.state.inBoxMails.map(obj =>
                    <div className="list-group emails mb-4">
                        <a href={'/inbox-email-details?' + btoa(encodeURIComponent('parentid=' + obj.parentid + '&subject=' + obj.subject + '&from=' + obj.sender + '&body=' + obj.emailbody))}
                            className="list-group-item list-group-item-action flex-column align-items-start profileBox" key={obj.emailid}>
                            <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <h5 className="mb-2"><strong>From:</strong> <strong>{obj.sender}</strong></h5>
                                    <p className="mb-3"><strong>Subject:</strong> {obj.subject}</p>
                                </div>
                                <p className="emailShortDesc">{obj.emailbody}</p>
                                <span>
                                    <p className="m-0">{obj.emaildate.split('', 10)}</p>
                                    <p>{obj.emaildate.slice(11).split('', 8)}</p>
                                </span>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        );
    }

    CustomerEmptyInbox() {
        return (

            <div className="list-group emails profileBox">
                <p class="list-group-item text-center">You have no emails.</p>
            </div>
        );
    }
}
