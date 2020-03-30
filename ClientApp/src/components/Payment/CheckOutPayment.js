import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../../components/Payment/CheckoutForm';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';

class CheckOutPayment extends Component {
    displayName = CheckOutPayment.name

    render() {

        var styles = {
            marginBottom: '50px'
        }

        return (

            <div id="MainPageWrapper" >

            <SidebarLinks />

            <section className="section-padding customerProfile">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row coloredBox">

                            <div className="col-md-12">

                                <StripeProvider apiKey="pk_test_lhIaSp0229prDqabMlBYAUMP00xtcyWIY2">
                                    <div className="example">
                                        <h3 style={styles}>Add your card details</h3>
                                        <Elements>
                                            <CheckoutForm />
                                        </Elements>
                                    </div>
                                </StripeProvider>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}

export default CheckOutPayment;