import React, { Component } from 'react';
import Chat from 'twilio-chat';
import '@progress/kendo-theme-material/dist/all.css';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import App from '../../App';

export class TwilioChat extends Component {
    displayName = TwilioChat.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const customerId = params.get('customerid');
        const serviceProviderId = params.get('serviceproviderid');
        const bookingId = params.get('bookingid');
        const authToken = localStorage.getItem("customeraccesstoken");
        const isCustomerAuthtoken = true;

        this.state = {
            error: null,
            isLoading: true,
            messages: [],
            serviceProviderId: serviceProviderId,
            customerId: customerId,
            bookingId: bookingId,
            toid: customerId,
            authtoken: authToken,
            iscustomerauthtoken: isCustomerAuthtoken,
            name: localStorage.getItem("firstname"),
            msgbody: '',
        };

        
        var userID = customerId;
        var userName = localStorage.getItem('firstname');

        this.user = {
            id: userID,
            name: userName
        };

        console.log(this.user.id);
        console.log(this.user.name);

        this.setupChatClient = this.setupChatClient.bind(this);
        this.messagesLoaded = this.messagesLoaded.bind(this);
        this.messageAdded = this.messageAdded.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Messaging/generatetwilliotoken?identity=' + this.user.name + '&device=web')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data =>
                Chat.create(data.token.twillioToken)
            )
            .then(this.setupChatClient)
            .catch(this.handleError);
            console.log(this.res);
    }

    handleError(error) {
        console.error(error);
        this.setState({
            error: 'Could not load chat.'
        });
    }

    setupChatClient(client) {

        var channelName = 'C' + localStorage.getItem("customerid") + 'S' + this.state.serviceProviderId + 'B' + this.state.bookingId;
        console.log(channelName);

        this.client = client;
        this.client
            .getChannelByUniqueName(channelName)
            .then(channel => channel)
            .catch(error => {
                if (error.body.code === 50300) {
                    return this.client.createChannel({ uniqueName: channelName });
                } else {
                    this.handleError(error);
                }
            })
            .then(channel => {
                this.channel = channel;
                return this.channel.join().catch(() => { });
            })
            .then(() => {
                // Success!
                this.setState({ isLoading: false });
                this.channel.getMessages().then(this.messagesLoaded);
                this.channel.on('messageAdded', this.messageAdded);
                console.log("Chat client setup!");
            })
            .catch(this.handleError);
    }

    twilioMessageToKendoMessage(message) {
        return {
            text: message.body,
            author: { id: message.author, name: message.author },
            timestamp: message.timestamp
        };
    }

    messagesLoaded(messagePage) {
        this.setState({
            messages: messagePage.items.map(this.twilioMessageToKendoMessage)
        });
    }

    messageAdded(message) {
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                this.twilioMessageToKendoMessage(message)
            ]
        }));
    }

    sendMessage(event) {
        this.channel.sendMessage(event.message.text);
    }

    componentWillUnmount() {
        this.client.shutdown();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.sendMessage();
        const sendchatnotification = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toid: this.state.toid,
                authtoken: this.state.authtoken,
                iscustomerauthtoken: this.state.iscustomerauthtoken,
                name: this.state.name,
                msgbody: this.state.message,
                bookingid: this.state.bookingId,
            })
        };

        fetch(App.ApisBaseUrlV2 + '/api/Notification/sendchatnotification', sendchatnotification)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                //this.setState({ allServices: response, found: true });
            });
    }

    render() {
        return (

            <section className="account-details section-padding bg-half-white">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <ChatUI
                                    user={this.user}
                                    messages={this.state.messages}
                                    onMessageSend={this.sendMessage}
                                    width={500}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
