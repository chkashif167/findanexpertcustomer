import React, { Component } from 'react';
import { AuthenticateCustomer } from '../AuthenticateCustomer';
import { RegisterCustomer } from '../RegisterCustomer';
import App from '../../App';

export class CusomerAuthentication extends Component {
    displayName = CusomerAuthentication.name

    render() {

        document.getElementsByTagName("META")[2].content = 'Sign up on “The Expert App” as it is the only platform which allows you to book any service and the right person for the right job.';
        document.getElementsByTagName("TITLE")[0].text = 'Login or Create an Account | Find an Expert';

        if (localStorage.getItem("customeraccesstoken") != null) {
            window.location.href = '/profile';
        }

        if (localStorage.getItem('checkSignInSignUpLink') == 'signin') {
            var userAuthentication = (<div>
                <ul class="nav nav-tabs nav-justified signinRegister" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#signIn" role="tab">
                            Sign In
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#createAccount" role="tab">
                            Sign Up
                        </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="signIn" role="tabpanel">
                        <AuthenticateCustomer />
                    </div>

                    <div class="tab-pane fade in" id="createAccount" role="tabpanel">
                        <RegisterCustomer />
                    </div>
                </div>
            </div>);
        }
        else if (localStorage.getItem('checkSignInSignUpLink') == 'signup') {
            var userAuthentication = (<div>
                <ul class="nav nav-tabs nav-justified signinRegister" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#signIn" role="tab">
                            Sign In
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#createAccount" role="tab">
                            Sign Up
                        </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div class="tab-pane fade in" id="signIn" role="tabpanel">
                        <AuthenticateCustomer />
                    </div>

                    <div class="tab-pane fade in show active" id="createAccount" role="tabpanel">
                        <RegisterCustomer />
                    </div>
                </div>
            </div>);
        }
        else {
            var userAuthentication = (<div>
                <ul class="nav nav-tabs nav-justified signinRegister" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#signIn" role="tab">
                            Sign In
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#createAccount" role="tab">
                            Sign Up
                        </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="signIn" role="tabpanel">
                        <AuthenticateCustomer />
                    </div>

                    <div class="tab-pane fade in" id="createAccount" role="tabpanel">
                        <RegisterCustomer />
                    </div>
                </div>
            </div>);
        }

      return (

          <div id="MainPageWrapper">

              <section className="section-padding">
		        <div className="container">
			        <div className="row pb-4">
                          <div className="col-md-12 signinRegisterWrap">

                              {userAuthentication}

                          </div>
		            </div>
		        </div>
	          </section>
          </div>
    );
  }
}
