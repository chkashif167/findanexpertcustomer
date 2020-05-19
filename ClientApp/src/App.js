import React, { Component } from "react";
import { Route } from "react-router";
import { Redirect, Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";

import { Home } from "./components/Home";
import { SearchResults } from "./components/Services/SearchResults";
import { Offers } from "./components/Offers/Offers";
import { Referral } from "./components/Referral/Referral";
import { Watchlist } from "./components/Watchlist/Watchlist";
import { Help } from "./components/Help/Help";
import { CusomerAuthentication } from "./components/CustomerAccount/CusomerAuthentication";
import { YourAccount } from "./components/CustomerAccount/YourAccount/YourAccount";
import { Profile } from "./components/CustomerAccount/YourAccount/Profile";
import { SignOut } from "./components/SignOut";
import { ServiceTypeResults } from "./components/Services/ServiceTypeResults";
import { ServiceSingle } from "./components/Services/ServiceSingle";
import { EditProfile } from "./components/CustomerAccount/YourAccount/EditProfile";
import { CustomerBookings } from "./components/CustomerBookings/CustomerBookings";
import { addAddress } from "./components/CustomerAccount/YourAddresses/addAddress";
import { allAddress } from "./components/CustomerAccount/YourAddresses/allAddresses";
import { PaymentSuccessfull } from "./components/Payment/PaymentSuccessfull";
import { YourExperts } from "./components/CustomerAccount/YourExperts/YourExperts";

import { DisplayCustomerConsent } from "./components/ConsentForms/DisplayCustomerConsent";
import { CustomerBookingDetail } from "./components/CustomerBookings/CustomerBookingDetail";
import { ChangePassword } from "./components/CustomerAccount/YourAccount/ChangePassword";
import { EditCustomerBooking } from "./components/Booking/EditBooking";
import { SaveReferral } from "./components/Referral/SaveReferral";
import { ConfirmCustomer } from "./components/CustomerAccount/YourAccount/ConfirmCustomer";
import { CustomerForgotPassword } from "./components/CustomerAccount/YourAccount/ForgotPasswordLink";
import { CustomerUpdatePassword } from "./components/CustomerAccount/YourAccount/UpdatePassword";
import { SearchService } from "./components/SearchService";

import { DatePickerPage } from "./components/CustomerAccount/YourAccount/DatePickerPage";
import { CustomerInboxEmailDetails } from "./components/CustomerAccount/MailBox/CustomerInboxEmailDetails";
import { CustomerOutboxEmailDetails } from "./components/CustomerAccount/MailBox/CustomerOutboxEmailDetails";
import { CustomerPaymentDetails } from "./components/CustomerAccount/PaymentDetails/PaymentDetails";
import { CustomerMailbox } from "./components/CustomerAccount/MailBox/CustomerMailbox";
import { BookAgain } from "./components/CustomerAccount/YourExperts/BookAgain";
import { CheckOut } from "./components/Payment/CheckOut";
import { UpdateCustomerAddress } from "./components/CustomerAccount/YourAddresses/UpdateCustomerAddress";
import { ProductOne } from "./components/StaticPages/ProductOne";
import { ProductTwo } from "./components/StaticPages/ProductTwo";
import { ProductThree } from "./components/StaticPages/ProductThree";
import { OffersOne } from "./components/StaticPages/OffersOne";
import { OffersTwo } from "./components/StaticPages/OffersTwo";
import { OffersThree } from "./components/StaticPages/OffersThree";
import { OffersFour } from "./components/StaticPages/OffersFour";

import { FiftyPercentSale } from "./components/StaticPages/FiftyPercentSale";
import { StudentDiscounts } from "./components/StaticPages/StudentDiscount";
import { GiftVouchers } from "./components/StaticPages/GiftVouchers";
import { FreeTreatments } from "./components/StaticPages/FreeTreatments";
import { FreeBeautyTreatment } from "./components/StaticPages/FreeBeautyTreatment";
import { LandingPages } from "./components/Offers/LandingPages";
import { FreeTraining } from "./components/StaticPages/FreeTraining";
import { PartnerWithExpert } from "./components/StaticPages/PartnerWithExpert";
import { NotFound } from "./components/Help/NotFound";
import { SimpleLayout } from "./components/SimpleLayout";
import { SearchServiceTypeFromFooter } from "./components/SearchServiceTypeFromFooter";
import { PrivacyPolicy } from "./components/Policies/PrivacyPolicy";
import { TermsAndConditions } from "./components/Policies/TermsAndConditions";
import { CookiesPolicy } from "./components/Policies/CookiesPolicy";
import { ContactUs } from "./components/Help/ContactUs";
import { AboutUs } from "./components/Help/AboutUs";
import { HelpMobile } from "./components/Help/HelpMobile";
import { TwilioChat } from "./components/Chat/TwilioChat";
import { ActivateCustomer } from "./components/CustomerAccount/YourAccount/ActivateCustomer";
import { NormalBooking } from "./components/Booking/NormalBooking";
import { ServiceAreas } from "./components/Booking/ServiceAreas";
import { ServiceSessions } from "./components/Booking/ServiceSessions";
import { QuestionAnswers } from "./components/Booking/QuestionAnswers";
import { ServiceDurations } from "./components/Booking/ServiceDurations";
import { SelectAddress } from "./components/Booking/SelectAddress";
import { DurationDateTime } from "./components/Booking/DurationDateTime";
import { DurationSummary } from "./components/Booking/DurationSummary";
import { GenericGenderAddress } from "./components/Booking/GenericGenderAddress";
import { GenericBookingSubType } from "./components/Booking/GenericBookingSubType";
import { ServiceDurationSubType } from "./components/Booking/DurationBookingSubType";
import { ServiceAreaBookingSubType } from "./components/Booking/ServiceAreaBookingSubType";
import { GenericDateTime } from "./components/Booking/GenericDateTime";
import { GenericSummary } from "./components/Booking/GenericSummary";
import { TrainingCourses } from "./components/Booking/TrainingCourses";
import { TrainingSummary } from "./components/Booking/TrainingSummary";
import { AreasSummary } from "./components/Booking/AreasSummary";
import { AreasDateTime } from "./components/Booking/AreasDateTime";
import AddPaymentMethod from "./components/Payment/AddPaymentMethod";

export default class App extends Component {
  displayName = App.name;

  static ApisBaseUrl = "https://api.findanexpert.net";
  static ApisBaseUrlV2 = "https://api-acc.findanexpert.net";
  static ApisImageBaseUrl = "https://admin.findanexpert.net";
  static ImagesCdnUrl = "https://1864597015.rsc.cdn77.org";
  static StaticImagesUrl =
    "https://1864597015.rsc.cdn77.org/Images/StaticImages/";

  render() {
    var currentLocation = window.location.pathname;

    if (
      currentLocation == "/special-pages/partner-with-expert" ||
      currentLocation == "/customer-help"
    ) {
      var layoutContent = (
        <SimpleLayout>
          <Route
            exact
            path="/special-pages/partner-with-expert"
            component={PartnerWithExpert}
          />
          <Route exact path="/customer-help" component={HelpMobile} />
        </SimpleLayout>
      );
    } else if (
      currentLocation == "/index.html" ||
      currentLocation == "/index"
    ) {
      window.location = "/";
    } else if (currentLocation == "/blogs") {
      window.location = "https://blog.findanexpert.net/";
    } else {
      var layoutContent = (
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/show-services/" component={SearchService} />
            <Route path="/services" component={ServiceSingle} />
            <Route path="/service" component={SearchServiceTypeFromFooter} />
            <Route path="/service-type" component={ServiceTypeResults} />
            <Route path="/offers" component={Offers} />
            <Route path="/referral" component={Referral} />
            <Route path="/accept-referral" component={SaveReferral} />
            <Route path="/watchlist" component={Watchlist} />
            <Route path="/help" component={Help} />
            <Route
              path="/customer-authentication"
              component={CusomerAuthentication}
            />
            <Route path="/confirm-your-account" component={ConfirmCustomer} />
            <Route path="/activate-your-account" component={ActivateCustomer} />
            <Route path="/your-account" component={YourAccount} />
            <Route path="/profile" component={Profile} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/change-password" component={ChangePassword} />
            <Route
              path="/forgot-password-link"
              component={CustomerForgotPassword}
            />
            <Route path="/update-password" component={CustomerUpdatePassword} />
            <Route path="/your-addresses" component={allAddress} />
            <Route path="/add-address" component={addAddress} />
            <Route path="/update-address" component={UpdateCustomerAddress} />
            <Route path="/your-emails" component={CustomerMailbox} />
            <Route
              path="/inbox-email-details"
              component={CustomerInboxEmailDetails}
            />
            <Route
              path="/outbox-email-details"
              component={CustomerOutboxEmailDetails}
            />
            <Route path="/signout" component={SignOut} />

            <Route path="/booking" component={NormalBooking} />

            <Route path="/service-areas" component={ServiceAreas} />
            <Route
              path="/service-areas-subtype"
              component={ServiceAreaBookingSubType}
            />
            <Route path="/service-sessions" component={ServiceSessions} />
            <Route path="/questions-answers" component={QuestionAnswers} />
            <Route path="/areas-date-time" component={AreasDateTime} />
            <Route path="/areas-summary" component={AreasSummary} />
            <Route path="/service-durations" component={ServiceDurations} />
            <Route path="/select-address" component={SelectAddress} />
            <Route path="/duration-date-time" component={DurationDateTime} />
            <Route path="/duration-summary" component={DurationSummary} />
            <Route path="/generic-booking" component={GenericGenderAddress} />
            <Route
              path="/generic-booking-subtype"
              component={GenericBookingSubType}
            />

            <Route
              path="/service-durations-subtype"
              component={ServiceDurationSubType}
            />
            <Route path="/generic-date-time" component={GenericDateTime} />
            <Route path="/generic-summary" component={GenericSummary} />
            <Route path="/select-course-date" component={TrainingCourses} />
            <Route path="/course-summary" component={TrainingSummary} />

            <Route path="/booking-detail" component={CustomerBookingDetail} />
            <Route path="/payment" component={AddPaymentMethod} />
            <Route path="/checkout" component={CheckOut} />
            <Route
              path="/your-payment-details"
              component={CustomerPaymentDetails}
            />
            <Route
              path="/payment-success-message"
              component={PaymentSuccessfull}
            />
            <Route path="/customer-bookings" component={CustomerBookings} />
            <Route
              path="/edit-customer-booking"
              component={EditCustomerBooking}
            />
            <Route path="/your-experts" component={YourExperts} />
            <Route path="/book-again-your-expert" component={BookAgain} />
            <Route
              path="/customer-consent"
              component={DisplayCustomerConsent}
            />
            <Route path="/chat" component={TwilioChat} />

            <Route path="/free-treatments" component={FreeTreatments} />
            <Route path="/sale" component={FiftyPercentSale} />
            <Route path="/student-discounts" component={StudentDiscounts} />
            <Route path="/gift-vouchers" component={GiftVouchers} />

            <Route exact path="/special-pages" component={LandingPages} />
            <Route
              path="/special-pages/free-beauty-treatments"
              component={FreeBeautyTreatment}
            />
            <Route
              path="/special-pages/free-training"
              component={FreeTraining}
            />

            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-conditions" component={TermsAndConditions} />
            <Route path="/cookies-policy" component={CookiesPolicy} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      );
    }

    return <div>{layoutContent}</div>;
  }
}
