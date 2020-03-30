import React, { Component } from 'react';

export class StoreServiceDetails extends React.Component {
    displayName = StoreServiceDetails.name

    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem("serviceid", this.props.allServices.serviceid);
        localStorage.setItem("serviceid", this.props.allServices.servicename);
        localStorage.setItem("serviceid", this.props.allServices.servicedescription);
        localStorage.setItem("serviceid", this.props.allServices.serviceduration);
    }

    render() {

        return (
            <p></p>
        );
    }
}