import React, { Component } from 'react';

export class BookingDateTime extends Component {
    displayName = BookingDateTime.name

    constructor() {
        super();

        this.state = {
            bookingtime: '', bookingDate: '', submitTime : false
        };

        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    AddBookingTimeDate(bookingtimeVal) {
        var servicetypeID = localStorage.getItem('servicetypeid');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Bookingtime: bookingtimeVal,
                servicetypeid: servicetypeID
            })
        };

        return fetch('http://expert.uksouth.cloudapp.azure.com/api/ServiceType/getservicetypeprice', requestOptions)
            .then(response => {
                //console.log(response.json());
                return response.json();
            })
            .then(response => {
                if (response != null) {
                    //alert(response.price);
                    localStorage.setItem('servicePrice', response.price);
                    this.setState({ addDatetime: response, submitTime: true });
                    console.log(this.state.addDatetime);
                }
                else {
                    this.setState({ addDatetime: null, submitTime: false });
                }
            });
    }

    handleChangeBookingTime(e) {
        this.setState({ bookingtime: e.target.value });
        //const { bookingtime } = this.state;
        this.AddBookingTimeDate(e.target.value);
        localStorage.setItem('bookingTime', e.target.value);
    }

    handleChangeBookingDate(e) {
        this.setState({ bookingDate: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { bookingtime, bookingDate } = this.state;
        this.AddBookingTimeDate(bookingtime, bookingDate);        
    }

    render() {
          let contents = this.state.submitTime
            ? this.renderDateTimeDetails(this.state.addDatetime)
            : this.renderDateTime();
        return <div>
            {contents}
        </div>;
    }

    renderDateTime() {
        return (
            <div>                
                <div className="md-form pb-5">
                        <label>Booking Time</label>
                        <select className="form-control" value={this.state.bookingtime}
                            onChange={this.handleChangeBookingTime}>
                            <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                        </select>
                </div>
                <div className="pb-3">
                    <h4>Service Price</h4>
                    <p>0.00</p>                    
                </div>
            </div>
        );
    }

    renderDateTimeDetails(addDatetime) {
        return (
            <div>
                <div className="md-form pb-5">
                    <label>Booking Time</label>
                    <select className="form-control" value={this.state.bookingtime}
                        onChange={this.handleChangeBookingTime} required>
                        <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                    </select>
                </div>
                    <div className="pb-3">
                        <h4>Service Price</h4>
                        <p>{addDatetime.price} ({addDatetime.price_description})</p>
                    </div>
            </div>
        );
    }
}
