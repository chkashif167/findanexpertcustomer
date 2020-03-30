import React, { Component } from 'react';
import App from '../../../App';

export class CustomerOutbox extends Component {
    displayName = CustomerOutbox.name

    constructor(props) {
        super(props);
        this.state = {
            outBoxMails: [], loading: true
        };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Email/getoutboxemails?isCustomer=true&pagenumber=' + 1 + '&pagesize=' + 15 + '&authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.statuscode == 200) {
                    this.setState({ outBoxMails: data.emaillist, loading: false });
                }
            })
            .catch((error) => {
                this.state.outBoxMails = [];
            });
    }

    render() {
        if (this.state.outBoxMails != '') {
            return (
                this.CustomerOutbox()
            );
        }
        else {
            return (
                this.CustomerEmptyOutbox()
            );
        }

    }

    CustomerOutbox() {
        return (

            <div className="list-group emails">
                {this.state.outBoxMails.map(obj =>
                    <a href={'/outbox-email-details?' + btoa(encodeURIComponent('subject=' + obj.subject + '&from=' + obj.receiver + '&body=' + obj.emailbody))}
                        className="list-group-item list-group-item-action flex-column align-items-start profileBox mb-3" key={obj.emailid}>
                        <div className="d-flex w-100 justify-content-between">
                            <div>
                                <h5 className="mb-2"><strong>From:</strong> <strong>{localStorage.getItem('email')}</strong></h5>
                                <p className="mb-3"><strong>Subject:</strong> {obj.subject}</p>
                            </div>
                            <p className="emailShortDesc">{obj.emailbody}</p>
                            <span>
                                <p className="m-0">{obj.emaildate.split('', 10)}</p>
                                <p>{obj.emaildate.slice(11).split('', 8)}</p>
                            </span>
                        </div>
                    </a>
                )}
            </div>
        );
    }

    CustomerEmptyOutbox() {
        return (

            <div className="list-group emails profileBox">
                <p class="list-group-item text-center">You have no emails.</p>
            </div>
        );
    }
}
 