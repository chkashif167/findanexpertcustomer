import React, { Component } from 'react';

export class HelpMobile extends Component {
    displayName = HelpMobile.name

  render() {
      return (

          <section className="account-details section-padding bg-half-white">
              <div className="services-wrapper">
                  <div className="container">
                      <div className="row pb-4">

                          <div className="col-md-12">

                              <div className="accordion md-accordion faqs" id="accordionEx" role="tablist" aria-multiselectable="true">

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingOne1">
                                          <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                                              aria-controls="collapseOne1">
                                              <h3 className="mb-0">
                                                  Where is my booking confirmation email? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseOne1" className="collapse" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <ul>
                                                  <li>You will get a confirmation email within 5-10 minutes after having
                                                      completed your order.</li>
                                                  <li>If you don't seem to have your email, please check your junk mail folder first.
                                                      If you do find it there, please label it as 'Not junk' and add the address to your
                                                      accepted emails list that should stop it happening next time.</li>
                                                  <li>If it is still not there, please email us and we will re-send it to you.</li>
                                              </ul>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingTwo2">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseTwo2"
                                              aria-expanded="false" aria-controls="collapseTwo2">
                                              <h3 className="mb-0">
                                                  I have lost/deleted my booking confirmation email <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseTwo2" className="collapse" role="tabpanel" aria-labelledby="headingTwo2" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>Don't worry your still booked for your service. You can log into your account and view all of your bookings,
                                                  both previous and upcoming. </p>
                                              <p>If you still want the booking email just email our customer service team and please tell us the following:</p>
                                              <ul>
                                                  <li>the email address used to complete your purchase</li>
                                                  <li>date of booking</li>
                                                  <li>details of the service you purchased (name of service, duration & price)</li>
                                              </ul>
							      	      </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree3">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree3"
                                              aria-expanded="false" aria-controls="collapseThree3">
                                              <h3 className="mb-0">
                                                  I ordered a gift voucher and I did not receive it  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree3" className="collapse" role="tabpanel" aria-labelledby="headingThree3" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>Your gift voucher is instant and should be sent by email or text so you can send to your loved one. 
                                                  First try to log into your account and go to orders,
                                                  there you will find your gift voucher order and you can click resend.</p>
                                              <p>If you have still not received it contact us and we will get the problem sorted immediately.
                                                  You have the option of emailing us on or calling us. Please tell us the following:</p>
                                              <ul>
                                                  <li>the email address used to complete your purchase</li>
                                                  <li>date of booking</li>
                                                  <li>details of the service you purchased (name of service, duration & price)</li>
                                              </ul>
							      	      </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingTwo4">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseTwo4"
                                              aria-expanded="false" aria-controls="collapseTwo4">
                                              <h3 className="mb-0">
                                                  I didn't receive my recommend a friend 50% off <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseTwo4" className="collapse" role="tabpanel" aria-labelledby="headingTwo4" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>If you have recommended a friend an automatic 50% off will be applied to your service
                                                  when you check out as long as your friend has purchased their service.
                                                  You do not need to do anything. When you recommend your friend they will have a
                                                  link sent to their email, once they click this link they can go to the website, register
                                                  and make their first purchase. An automatic 50% off will be applied to their account</p>
                                              <p>If there is a technical problem and this does not happen then please contact our customer services
                                                  support team who will have this problem resolved in no time.</p>
							      	      </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree5">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree5"
                                              aria-expanded="false" aria-controls="collapseThree5">
                                              <h3 className="mb-0">
                                                  How do I get in touch with Expert Clinic directly? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree5" className="collapse" role="tabpanel" aria-labelledby="headingThree5" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>If you have booked your service with Expert Clinic you cannot call the clinic directly, but should 
                                                  call customer services who will be able to help you.
                                                  If you need to cancel or reschedule your appointment you can do this by logging into your account. </p>
							      	      </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree6">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree6"
                                              aria-expanded="false" aria-controls="collapseThree6">
                                              <h3 className="mb-0">
                                                  Where do I add my promotional code? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree6" className="collapse" role="tabpanel" aria-labelledby="headingThree6" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <ul>
                                                  <li>Simply select your service, at checkout enter the code exactly as you have it and
                                                      it will automatically add it to your order.</li>
                                                  <li>Please make sure not to click the backspace or your code may be temporarily redeemed.
                                                      If that happens, not to worry, give it another try in about 35-40 minutes.</li>
                                                  <li>If there's a problem and your promotional code is not recognised please get in touch with us.</li>
                                              </ul>
							      	      </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree7">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree7"
                                              aria-expanded="false" aria-controls="collapseThree7">
                                              <h3 className="mb-0">
                                                  What if I need to change my booking? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree7" className="collapse" role="tabpanel" aria-labelledby="headingThree7" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>We understand that due to unforeseen circumstances or change of plan you may need to change your
                                                  booking. You can do so by logging into your account and going into your booked job and clicking
                                                  edit or cancel. </p>
                                              <p>Amendments or cancellations up to 24 hours before booking time are Free of charge. </p>
                                              <p>Amendments and cancellations within 24 hours but 2 hours before the booking time will incure a fixed charge.</p>
                                              <p>Amendments or cancellations 2 hours before the service will incure the full fee of the service.</p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree8">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree8"
                                              aria-expanded="false" aria-controls="collapseThree8">
                                              <h3 className="mb-0">
                                                  A change to the price of the service has been made & I have not been notified. <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree8" className="collapse" role="tabpanel" aria-labelledby="headingThree8" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>We reserve the right to change the prices of our service or our service hours without
                                                  any prior notification. Any service booked and paid for in advance will remain the
                                                  same amount. </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree9">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree9"
                                              aria-expanded="false" aria-controls="collapseThree9">
                                              <h3 className="mb-0">
                                                  Help, I can't log in! <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree9" className="collapse" role="tabpanel" aria-labelledby="headingThree9" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>Once you have created your registration and logged in, you will remain logged in. 
                                                  If you have forgotten your password then you can reset the password.  
                                                Still having problems? Email us and we'd be glad to help you out.
                                              </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree10">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree10"
                                              aria-expanded="false" aria-controls="collapseThree10">
                                              <h3 className="mb-0">
                                                  How can I change my Expert Profile details? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree10" className="collapse" role="tabpanel" aria-labelledby="headingThree10" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>Every customer will have a profile at the time of registering, if you would like to 
                                                  change any information on your profile then simply go onto your profile and click 
                                                  edit, you will be able to easily edit any information on your profile.  
                                              </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree11">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree11"
                                              aria-expanded="false" aria-controls="collapseThree11">
                                              <h3 className="mb-0">
                                                  Do I get a receipt? <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree11" className="collapse" role="tabpanel" aria-labelledby="headingThree11" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>After booking you will receive a confirmation of your order by email. 
                                                  Also by logging into your account you can view information such as the name 
                                                  of the service, the date and time the service is due and your service provider 
                                                  information. If you have lost or do not have this information for any reason  
                                                  you can contact our customer services team you will be more than happy to help you. 
                                              </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree12">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree12"
                                              aria-expanded="false" aria-controls="collapseThree12">
                                              <h3 className="mb-0">
                                                  I wasn't happy with my service provider <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree12" className="collapse" role="tabpanel" aria-labelledby="headingThree12" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>We're sorry to hear that your Expert service provider didn't live up to your expectations. 
                                                  We want to ensure that you are satisfied with your service.  Our customer services team will 
                                                  do everything to make it right.
                                              </p>
                                              <p>We set high standards, and all of the Experts on our platform are meant to provide
                                                  quality service.</p>
                                              <p>Please be sure to rate your Expert so that our system won't match you with them again.
                                                  If you'd like, you can also reach out to our customer experience team for assistance.
                                                  Please provide as much detail as you are able.</p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree13">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree13"
                                              aria-expanded="false" aria-controls="collapseThree13">
                                              <h3 className="mb-0">
                                                  My service provider did not show up  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree13" className="collapse" role="tabpanel" aria-labelledby="headingThree13" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>If your service provider did not show up you need to contact the customer services team immediately.
                                                  We will investigate the matter and resolve this quickly. Depending on the individual
                                                  case we can offer a refund or another similar service.</p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree14">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree14"
                                              aria-expanded="false" aria-controls="collapseThree14">
                                              <h3 className="mb-0">
                                                  How do I change my payment method   <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree14" className="collapse" role="tabpanel" aria-labelledby="headingThree14" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>To change your card payment method simply go to accounts and you will be able to edit
                                                  payment details or add a new card. </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree15">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree15"
                                              aria-expanded="false" aria-controls="collapseThree15">
                                              <h3 className="mb-0">
                                                  Do I need to be home for my service?  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree15" className="collapse" role="tabpanel" aria-labelledby="headingThree15" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>For certain bookings like beauty and massage you will need to be present at the specified time
                                                  of your service. For other services like cleaning, pluming or electrical whether or not you're
                                                  home during your booking is up to you! When you make a booking, you'll be prompted to give
                                                  your professional entry instructions. If you have a doorman or can hide a key somewhere,
                                                  there's no need for you to be home. Or, feel free to stick around during the booking.
                                                  Whatever you're most comfortable with is fine.</p>
                                              <p>In any case, please don't forget about your bookings. We'll remind you with an email,
                                                  a text message, and a push notification, but if your pro can't get in the door by following
                                                  your entry instructions, or if you aren't home when you said you would be, you'll be charged
                                                  the full cost of the booking.</p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree16">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree16"
                                              aria-expanded="false" aria-controls="collapseThree16">
                                              <h3 className="mb-0">
                                                  How do Regular/Repeat Services work?  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree16" className="collapse" role="tabpanel" aria-labelledby="headingThree16" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>To sign up for regular service, make a booking and you’ll be able to select the frequency,
                                                  day, time and length of commitment. After that, bookings will be scheduled automatically
                                                  based on the frequency you selected.</p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree17">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree17"
                                              aria-expanded="false" aria-controls="collapseThree17">
                                              <h3 className="mb-0">
                                                  How are Expert services priced?  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree17" className="collapse" role="tabpanel" aria-labelledby="headingThree17" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <p>We want to make our services affordable to everyone and we are priced very competitively
                                                  without compromising on quality. </p>
                                              <p>We take advantage of economies of scale to bring synergies together. </p>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree18">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree18"
                                              aria-expanded="false" aria-controls="collapseThree18">
                                              <h3 className="mb-0">
                                                  How does Expert select its service providers?  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree18" className="collapse" role="tabpanel" aria-labelledby="headingThree18" data-parent="#accordionEx">
                                          <div className="card-body">
                                              <ul>
                                                  <li>We vet our Expert Service providers to ensure they are fully qualified and
                                                      have experience. As well as this we ensure they demonstrate the highest
                                                      level of professionalism, compassionate communication, and intuitive touch.</li>
                                                  <li>We check all qualifications, check background and experience and personally meet our Expert
                                                      Service providers.</li>
                                                  <li>Our Experts care about their work and go that extra mile to give you the best service possible.</li>
                                              </ul>
                                          </div>
                                      </div>

                                  </div>

                                  <div className="card">

                                      <div className="card-header" role="tab" id="headingThree19">
                                          <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree19"
                                              aria-expanded="false" aria-controls="collapseThree19">
                                              <h3 className="mb-0">
                                                  Want to Work with us?  <i className="fas fa-angle-down rotate-icon"></i>
                                              </h3>
                                          </a>
                                      </div>

                                      <div id="collapseThree19" className="collapse" role="tabpanel" aria-labelledby="headingThree19" data-parent="#accordionEx">
                                          <div className="card-body">
                                            <p>If you wish to Partner with Expert then visit the following link where everything
                                                will be explained to you. We want motivated professionals like yourself to be
                                                a part of our team.</p>
                                          </div>
                                      </div>

                                  </div>

                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </section>
    );
  }
}
