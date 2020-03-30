import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr';

export class Chat extends Component {
    displayName = Chat.name

    constructor() {
        super();

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount() {
        const nick = window.prompt('Your name:', 'John');

        const hubConnection = new HubConnection('https://chat.findanexpert.net/livehub');

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    }

    render() {
        return (

            <section className="account-details section-padding bg-half-white">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="notFoundText text-center">
                                    <p>OOPS! PAGE NOT FOUND</p>
                                    <h3>404</h3>
                                    <p>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS<br /> NOT FOUND</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
