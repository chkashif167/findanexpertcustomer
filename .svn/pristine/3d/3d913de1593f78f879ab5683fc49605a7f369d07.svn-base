import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';
import headerporfileicon from '../../../assets/img/icons/header-porfile-icon.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class CustomerComposer extends Component {
    displayName = CustomerComposer.name

    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            body: '',
            sentEmail: [],
            showModal: '',
            modalMessage: '',
        };
    }

    SendEmail(subject, body) {

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                subject: subject,
                body: body,
                parentid: 0,
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/Email/sendemailmessageV2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                    this.setState({ sentEmail: response });
                    this.setState({ modalMessage: 'Email sent successfully!', showModal: 'show' });
                }
            });
    }

    handleChangeTo(e) {
        this.setState({ to: e.target.value });
    }

    handleChangeSubject(e) {
        this.setState({ subject: e.target.value });
    }

    handleChangeBody(e) {
        this.setState({ body: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { subject, body } = this.state;
        this.SendEmail(subject, body);
    }

    handleModal(e) {

        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/your-emails';
    }

    render() {
        return (
            this.ComposeEmail(this.state.allMessages)
        );
    }

    ComposeEmail() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} className="p-5">
                    <div className="pb-3">
                        <input type="hidden" name="to" className="form-control validate frm-field" placeholder="To" value={this.state.to}
                            onChange={this.handleChangeTo.bind(this)} required />
                    </div>
                    <div className="pb-3">
                        <input type="text" name="subject" className="form-control validate frm-field" placeholder="subject" value={this.state.subject}
                            onChange={this.handleChangeSubject.bind(this)} required />
                    </div>
                    <div className="pb-3">
                        <textarea type="text" id="body" name="body" rows="5" class="form-control md-textarea frm-field" placeholder="Your Message" value={this.state.body}
                            onChange={this.handleChangeBody.bind(this)} required />
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Send Email</button>
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
