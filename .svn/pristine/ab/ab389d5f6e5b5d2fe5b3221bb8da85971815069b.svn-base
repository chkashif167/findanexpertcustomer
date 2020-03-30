import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';

export class DatePickerPage extends React.Component {
    displayName = DatePickerPage.name

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div id="MainPageWrapper">

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">
                                <div className="col-md-12">
                                    <ModernDatepicker
                                    date={this.state.startDate}
                                    format={'DD-MM-YYYY'}
                                    showBorder
                                    onChange={(date) => this.handleChange(date)}
                                    placeholder={'Select a date'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
       );
    }
}