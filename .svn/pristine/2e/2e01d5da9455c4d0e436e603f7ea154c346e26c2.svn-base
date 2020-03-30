import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class SignOut extends Component {
    displayName = SignOut.name

    render() {

        localStorage.removeItem("customeraccesstoken");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("mobile");
        localStorage.removeItem("gender");
        localStorage.removeItem("genderpreference");
        localStorage.removeItem("dob");
        localStorage.removeItem("email");
        localStorage.removeItem("customercardtokenmakedefault");
        localStorage.removeItem("isprofilecompleted");

        return <Redirect to='/' />;

    }
}