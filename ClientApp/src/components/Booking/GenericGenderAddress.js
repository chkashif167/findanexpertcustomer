import React, { Component } from "react";
import App from "../../App";
import toastr from "toastr";

export class GenericGenderAddress extends Component {
  displayName = GenericGenderAddress.name;

  constructor(props) {
    super(props);

    const search = window.location.search;
    var decodedString = window.atob(search.replace("?", ""));
    const decodeParams = decodeURIComponent(decodedString);
    const params = new URLSearchParams(decodeParams);

    const hasclickedfreeconsultation = params.get("hasclickedfreeconsultation");
    const serviceType = params.get("serviceType");
    const categoryid = params.get("categoryid");
    const servicetypeid = params.get("servicetypeid");
    const servicetypename = params.get("servicetypename");
    const hasfreetreatment = params.get("hasfreetreatment");
    const inclinic = params.get("inclinic");
    const inhouse = params.get("inhouse");
    const hasquestions = params.get("hasquestions");
    const hassession = params.get("hassession");
    const isfreeconsultation = params.get("isfreeconsultation");
    localStorage.setItem("isfreeconsultation", isfreeconsultation);
    const inclinicprice = params.get("inclinicprice");
    const inhouseprice = params.get("inhouseprice");
    const requiredgenderpreference = params.get("requiredgenderpreference");
    localStorage.setItem("requiredgenderpreference", requiredgenderpreference);
    const referralbonus = params.get("referralbonus");
    localStorage.setItem("referralbonus", referralbonus);
    const offer = params.get("offer");
    localStorage.setItem("offer", offer);

    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-0" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate();

    this.state = {
      currentDate: formatted_date,
      serviceType: serviceType,
      serviceTypeName: servicetypename,
      categoryid: categoryid,
      servicetypeid: servicetypeid,
      inclinic: inclinic,
      inhouse: inhouse,
      hasquestions: hasquestions,
      hassession: hassession,
      isfreeconsultation: isfreeconsultation,
      inclinicprice: inclinicprice,
      inhouseprice: inhouseprice,
      authToken: localStorage.getItem("customeraccesstoken"),
      genderpreference: 0,
      genderPreferenceList: [],
      allAddress: [],
      inClinicAddressList: [],
      inClinicAddress: [],
      addressid: 0,
      postalcode: "",
      inHouse: "",
      inClinic: "",
      addressid: 0,
      bookingID: 0,
      offer: localStorage.getItem("offer"),
      studentDiscountCode: "",
      discountDetails: [],
      priceAfterDiscount: 0,
      finalPrice: 0,
      questionsList: [],
      discountlist: [],
      hasclickedfreeconsultation: hasclickedfreeconsultation,
    };
  }

  componentDidMount() {
    fetch(
      App.ApisBaseUrlV2 +
        "/api/Address/getcustomeraddresses?authtoken=" +
        this.state.authToken
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ allAddress: data.addresslist });
        console.log(this.state.allAddress);
        this.setState({ inClinicAddressList: data.clinicaddresslist });
      });
  }

  handleChangeGenderPreference(e) {
    var checkBox = document.getElementById(e.target.id);
    this.setState({ genderpreference: e.target.value });
    localStorage.setItem("gendpreference", e.target.value);

    if (checkBox.checked == true) {
      this.state.genderPreferenceList.push(e.target.value);
    } else if (checkBox.checked == false) {
      let index = this.state.genderPreferenceList.indexOf(e.target.value);
      this.state.genderPreferenceList.splice(index, 1);
    }
  }

  getInclinicAddress(e) {
    if (localStorage.getItem("InClininc") == "true") {
      var showCustomerAddress = (
        <div class="col-sm-9 bookingPageAddressWrap">
          {this.state.inClinicAddressList.map((adr) => (
            <div class="form-check bookingPageAddress">
              <input
                type="radio"
                className={adr.postalcode}
                id={adr.addressid}
                name="rdoNewAddress"
                onChange={this.handleChangeAddressCheck.bind(this)}
                required
              />
              <label class="form-check-label" for={adr.addressid}>
                <p className="lead">
                  {adr.address.split(",").map(function (item, key) {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </p>
              </label>
              <p className="postalCode m-0 pt-4 text-uppercase text-dark">
                {adr.postalcode}
              </p>
            </div>
          ))}
        </div>
      );

      this.setState({ inClinicAddress: showCustomerAddress });
    } else if (localStorage.getItem("InHouse") == "true") {
      var showCustomerAddress = (
        <div class="col-sm-9 bookingPageAddressWrap">
          {this.state.allAddress != null ? (
            this.state.allAddress.map((adr) => (
              <div class="form-check bookingPageAddress">
                <input
                  type="radio"
                  className={adr.postalcode}
                  id={adr.addressid}
                  name="rdoNewAddress"
                  onChange={this.handleChangeAddressCheck.bind(this)}
                  required
                />
                <label class="form-check-label" for={adr.addressid}>
                  <p className="lead">
                    {adr.address.split("\n").map(function (item, key) {
                      return (
                        <span key={key}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </p>
                </label>
                <p className="postalCode m-0 pt-4 text-uppercase text-dark">
                  {adr.postalcode}
                </p>
              </div>
            ))
          ) : (
            <p>You have no address. Please add address.</p>
          )}
        </div>
      );

      this.setState({ inClinicAddress: showCustomerAddress });
    }

    //Check Inclinic, inhouse
    if (
      (this.state.inclinic == "true" && this.state.inhouse == "true") ||
      (this.state.inclinic == "false" && this.state.inhouse == "false")
    ) {
      var inhouseVal = localStorage.getItem("InHouse") != null ? true : false;
      var inclinicVal =
        localStorage.getItem("InClininc") != null ? true : false;
    } else if (this.state.inclinic == "true") {
      var inhouseVal = false;
      var inclinicVal = true;
    } else if (this.state.inhouse == "true") {
      var inhouseVal = true;
      var inclinicVal = false;
    }

    if (inhouseVal == true) {
      this.setState({ finalPrice: this.state.inhouseprice });
    } else if (inclinicVal == true) {
      this.setState({ finalPrice: this.state.inclinicprice });
    }
  }

  handleChangeInclinic(e) {
    this.setState({ inClinic: e.target.name });
    localStorage.setItem("InClininc", e.target.name);
    localStorage.removeItem("InHouse");

    this.getInclinicAddress();
  }

  handleChangeInhouse(e) {
    this.setState({ inHouse: e.target.name });
    localStorage.setItem("InHouse", e.target.name);
    localStorage.removeItem("InClininc");

    this.getInclinicAddress();
  }

  handleChangeAddressCheck(e) {
    this.setState({ addressid: e.target.id });
    this.setState({ postalcode: e.target.className });

    //Check Inclinic, inhouse
    if (
      (this.state.inclinic == "true" && this.state.inhouse == "true") ||
      (this.state.inclinic == "false" && this.state.inhouse == "false")
    ) {
      var inhouseVal = localStorage.getItem("InHouse") != null ? true : false;
      var inclinicVal =
        localStorage.getItem("InClininc") != null ? true : false;
    } else if (this.state.inclinic == "true") {
      var inhouseVal = false;
      var inclinicVal = true;
    } else if (this.state.inhouse == "true") {
      var inhouseVal = true;
      var inclinicVal = false;
    }

    if (inhouseVal == true) {
      this.setState({ finalPrice: this.state.inhouseprice });
    } else if (inclinicVal == true) {
      this.setState({ finalPrice: this.state.inclinicprice });
    }
  }

  handleAddNewAddress(e) {
    var bookingPageUrl = window.location.href;
    localStorage.setItem("bookingUrlIfUserAddNewAddress", bookingPageUrl);
    window.location = "/add-address";
  }

  handChangeDiscountCode(e) {
    this.setState({ studentDiscountCode: e.target.value });
  }

  submitDiscountCode(e) {
    e.preventDefault();
    fetch(
      App.ApisBaseUrlV2 +
        "/api/Discount/getdiscountdetail?discountcode=" +
        this.state.studentDiscountCode +
        "&authtoken=" +
        this.state.authToken
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.statuscode == 200) {
          if (
            data.detail.amount > 0 &&
            this.state.finalPrice > data.detail.amount
          ) {
            if (
              this.state.currentDate < data.detail.expirydate ||
              this.state.currentDate == data.detail.expirydate
            ) {
              if (
                data.detail.amount < data.detail.maxlimit ||
                data.detail.amount == data.detail.maxlimit
              ) {
                this.setState({ discountDetails: data.detail });
                var applyDiscount = this.state.finalPrice - data.detail.amount;
                this.setState({ priceAfterDiscount: applyDiscount });
              } else {
                this.setState({ discountDetails: data.detail });
                var applyDiscount =
                  this.state.finalPrice - data.detail.maxlimit;
                this.setState({ priceAfterDiscount: applyDiscount });
              }
            } else {
              toastr["error"](
                "This " + data.detail.description + " is expired!"
              );
            }
          } else {
            toastr["error"](
              "Service price must be greater than " +
                data.detail.description +
                " discount amount!"
            );
          }
        } else {
          toastr["error"](data.message);
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    //Check Inclinic, inhouse
    if (
      (this.state.inclinic == "true" && this.state.inhouse == "true") ||
      (this.state.inclinic == "false" && this.state.inhouse == "false")
    ) {
      var inhouseVal = localStorage.getItem("InHouse") != null ? true : false;
      var inclinicVal =
        localStorage.getItem("InClininc") != null ? true : false;
    } else if (this.state.inclinic == "true") {
      var inhouseVal = false;
      var inclinicVal = true;
    } else if (this.state.inhouse == "true") {
      var inhouseVal = true;
      var inclinicVal = false;
    }

    if (localStorage.getItem("requiredgenderpreference") == "true") {
      if (this.state.genderPreferenceList.length == 1) {
        var genderPreference = this.state.genderpreference;
      } else {
        var genderPreference = "both";
      }
    } else {
      var genderPreference = "both";
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingid:
          localStorage.getItem("bookingId") == null
            ? 0
            : parseInt(localStorage.getItem("bookingId")),
        categoryid: parseInt(this.state.categoryid),
        servicetypeid: parseInt(this.state.servicetypeid),
        addressid: parseInt(this.state.addressid),
        isinhouse: inhouseVal,
        isinclinic: inclinicVal,
        genderPreference: genderPreference,
        isfreeconsultation:
          this.state.isfreeconsultation != null
            ? this.state.isfreeconsultation == "true"
              ? true
              : false
            : false,
        deviceplatform: "web",
        devicename: "web",
        authtoken: this.state.authToken,
      }),
    };

    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrlV2 + "/api/Booking/dogenericbookingV2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.statuscode == 200) {
          localStorage.setItem("bookingId", data.bookingid);

          //-- Save Booking Discount --//
          if (this.state.offer > "0") {
            var discountListKeysValues = {
              discounttype: "Offer",
              discount: parseInt(this.state.offer),
            };
            this.state.discountlist.push(discountListKeysValues);
          } else if (this.state.discountDetails != "") {
            var discountListKeysValues = {
              discounttype: "Discount code",
              discount: parseInt(this.state.discountDetails.amount),
            };
            this.state.discountlist.push(discountListKeysValues);
          }

          if (this.state.offer > "0" || this.state.discountDetails != "") {
            const bookingDiscountPrams = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingid: parseInt(data.bookingid),
                discountlist: this.state.discountlist,
                authtoken: this.state.authToken,
              }),
            };

            console.log(bookingDiscountPrams);

            fetch(
              App.ApisBaseUrlV2 + "/api/Booking/savebookingdiscount",
              bookingDiscountPrams
            )
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                console.log(response);
              });
          }

          if (this.state.offer > "0") {
            var finalPrice = Math.round(
              this.state.finalPrice -
                (this.state.offer * this.state.finalPrice) / 100
            );
          } else if (this.state.discountDetails != "") {
            var finalPrice = this.state.priceAfterDiscount;
          } else {
            var finalPrice = this.state.finalPrice;
          }

          // if (this.state.isfreeconsultation == 'true') {
          if (this.state.hasclickedfreeconsultation == "true") {
            window.location =
              "/generic-date-time/?" +
              btoa(
                encodeURIComponent(
                  "serviceType=" +
                    this.state.serviceType +
                    "&categoryid=" +
                    this.state.categoryid +
                    "&servicetypeid=" +
                    this.state.servicetypeid +
                    "&servicetypename=" +
                    this.state.serviceTypeName +
                    "&postalcode=" +
                    this.state.postalcode +
                    "&inhouse=" +
                    inhouseVal +
                    "&inclinic=" +
                    inclinicVal +
                    "&genderpreference=" +
                    genderPreference +
                    "&totalprice=" +
                    finalPrice +
                    "&bookingid=" +
                    data.bookingid +
                    "&hasclickedfreeconsultation=" +
                    this.state.hasclickedfreeconsultation
                )
              );
          } else {
            if (this.state.hassession == "true") {
              window.location =
                "/service-sessions/?" +
                btoa(
                  encodeURIComponent(
                    "serviceType=" +
                      this.state.serviceType +
                      "&categoryid=" +
                      this.state.categoryid +
                      "&servicetypeid=" +
                      this.state.servicetypeid +
                      "&servicetypename=" +
                      this.state.serviceTypeName +
                      "&postalcode=" +
                      this.state.postalcode +
                      "&inhouse=" +
                      inhouseVal +
                      "&inclinic=" +
                      inclinicVal +
                      "&genderpreference=" +
                      genderPreference +
                      "&totalprice=" +
                      finalPrice +
                      "&bookingid=" +
                      data.bookingid +
                      "&hasclickedfreeconsultation=" +
                      this.state.hasclickedfreeconsultation
                  )
                );
            } else if (this.state.hasquestions == "true") {
              window.location =
                "/questions-answers/?" +
                btoa(
                  encodeURIComponent(
                    "serviceType=" +
                      this.state.serviceType +
                      "&categoryid=" +
                      this.state.categoryid +
                      "&servicetypeid=" +
                      this.state.servicetypeid +
                      "&servicetypename=" +
                      this.state.serviceTypeName +
                      "&postalcode=" +
                      this.state.postalcode +
                      "&inhouse=" +
                      inhouseVal +
                      "&inclinic=" +
                      inclinicVal +
                      "&genderpreference=" +
                      genderPreference +
                      "&totalprice=" +
                      finalPrice +
                      "&bookingid=" +
                      data.bookingid +
                      "&hasclickedfreeconsultation=" +
                      this.state.hasclickedfreeconsultation
                  )
                );
            } else {
              window.location =
                "/generic-date-time/?" +
                btoa(
                  encodeURIComponent(
                    "serviceType=" +
                      this.state.serviceType +
                      "&categoryid=" +
                      this.state.categoryid +
                      "&servicetypeid=" +
                      this.state.servicetypeid +
                      "&servicetypename=" +
                      this.state.serviceTypeName +
                      "&postalcode=" +
                      this.state.postalcode +
                      "&inhouse=" +
                      inhouseVal +
                      "&inclinic=" +
                      inclinicVal +
                      "&genderpreference=" +
                      genderPreference +
                      "&totalprice=" +
                      finalPrice +
                      "&bookingid=" +
                      data.bookingid +
                      "&hasclickedfreeconsultation=" +
                      this.state.hasclickedfreeconsultation
                  )
                );
            }
          }
        }
      });
  }

  render() {
    /*-----Show Label, inhouse, inclinic------*/
    if (
      (this.state.inclinic == "true") & (this.state.inhouse == "true") ||
      (this.state.inclinic == "false") & (this.state.inhouse == "false")
    ) {
      var incliniceInhouseItems = (
        <div className="col-md-12 pt-3 inclinicInhouseMainCol">
          <div className="col-md-6 pl-0 inclinicInhouseCol">
            <label class="col-form-label pb-4">I want the service at</label>
            <div className="cardWrapWithShadow inclinicInhouseWrapper">
              <div class="form-group row">
                <div class="col-sm-4 inclinicInhouse">
                  <div class="form-check">
                    <input
                      type="radio"
                      name="true"
                      id="0"
                      value={this.state.inHouse}
                      onChange={this.handleChangeInhouse.bind(this)}
                      required
                    />
                    <label class="form-check-label" for="0">
                      <p className="font-weight-normal">My place</p>
                    </label>
                  </div>
                </div>
                <div class="col-sm-4 inclinicInhouse">
                  <div class="form-check">
                    <input
                      type="radio"
                      name="true"
                      id="1"
                      value={this.state.inClinic}
                      onChange={this.handleChangeInclinic.bind(this)}
                      required
                    />
                    <label class="form-check-label" for="1">
                      <p className="font-weight-normal">Expert center</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      var showAddresses =
        this.state.inClinicAddressList.length == 0 ? (
          <div class="col-sm-9 bookingPageAddressWrap">
            {this.state.allAddress != null ? (
              this.state.allAddress.map((adr) => (
                <div class="form-check bookingPageAddress">
                  <input
                    type="radio"
                    className={adr.postalcode}
                    id={adr.addressid}
                    name="rdoNewAddress"
                    onChange={this.handleChangeAddressCheck.bind(this)}
                    required
                  />
                  <label class="form-check-label" for={adr.addressid}>
                    <p className="lead">
                      {adr.address.split("\n").map(function (item, key) {
                        return (
                          <span key={key}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                    </p>
                  </label>
                  <p className="postalCode m-0 pt-4 text-uppercase text-dark">
                    {adr.postalcode}
                  </p>
                </div>
              ))
            ) : (
              <p>You have no address. Please add address.</p>
            )}
          </div>
        ) : (
          this.state.inClinicAddress
        );
    } else if (this.state.inclinic == "true") {
      var showAddresses = (
        <div class="col-sm-9 bookingPageAddressWrap">
          {this.state.inClinicAddressList.map((adr) => (
            <div class="form-check bookingPageAddress">
              <input
                type="radio"
                className={adr.postalcode}
                id={adr.addressid}
                name="rdoNewAddress"
                onChange={this.handleChangeAddressCheck.bind(this)}
                required
              />
              <label class="form-check-label" for={adr.addressid}>
                <p className="lead">
                  {adr.address.split(",").map(function (item, key) {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </p>
              </label>
              <p className="postalCode m-0 pt-4 text-uppercase text-dark">
                {adr.postalcode}
              </p>
            </div>
          ))}
        </div>
      );
    } else if (this.state.inhouse == "true") {
      var showAddresses = (
        <div class="col-sm-9 bookingPageAddressWrap">
          {this.state.allAddress != null ? (
            this.state.allAddress.map((adr) => (
              <div class="form-check bookingPageAddress">
                <input
                  type="radio"
                  className={adr.postalcode}
                  id={adr.addressid}
                  name="rdoNewAddress"
                  onChange={this.handleChangeAddressCheck.bind(this)}
                  required
                />
                <label class="form-check-label" for={adr.addressid}>
                  <p className="lead">
                    {adr.address.split("\n").map(function (item, key) {
                      return (
                        <span key={key}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                  </p>
                </label>
                <p className="postalCode m-0 pt-4 text-uppercase text-dark">
                  {adr.postalcode}
                </p>
              </div>
            ))
          ) : (
            <p>You have no address. Please add address.</p>
          )}
        </div>
      );
    }

    return (
      <div id="MainPageWrapper">
        <section className="bookingPage account-details section-padding">
          <div className="services-wrapper">
            <div className="container">
              <div className="row pb-4">
                <div className="col-md-12">
                  <div className="row bookingPageTpRw bg-gray p-2">
                    <div className="col-md-6">
                      <p className="lead mb-0 service-name text-white">
                        {this.state.serviceTypeName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <form
                    onSubmit={this.handleSubmit.bind(this)}
                    className="bookingPageForm"
                  >
                    {localStorage.getItem("requiredgenderpreference") ==
                    "true" ? (
                      <div className="row pt-4 pb-4">
                        <div className="col-md-12 genderPreferenceWrap">
                          <label class="col-form-label pb-4">
                            I want my Service Provider to be
                          </label>
                          <div className="cardWrapWithShadow genderPreferences">
                            <div class="form-group row">
                              <div class="col-sm-4">
                                <div class="form-check">
                                  <input
                                    type="checkbox"
                                    name="genderPreference"
                                    id="genderPreference1"
                                    value="male"
                                    onChange={this.handleChangeGenderPreference.bind(
                                      this
                                    )}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="genderPreference1"
                                  >
                                    <p className="font-weight-normal">Male</p>
                                  </label>
                                </div>
                              </div>

                              <div class="col-sm-4">
                                <div class="form-check">
                                  <input
                                    type="checkbox"
                                    name="genderPreference"
                                    id="genderPreference2"
                                    value="female"
                                    onChange={this.handleChangeGenderPreference.bind(
                                      this
                                    )}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="genderPreference2"
                                  >
                                    <p className="font-weight-normal">Female</p>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="row pt-4 pb-4">
                      {incliniceInhouseItems}

                      <div className="col-md-12 pt-5 addressesWraper">
                        {this.state.inHouse != "" &&
                        localStorage.getItem("InHouse") != null ? (
                          <label class="addressLabel col-form-label pb-4">
                            Send my Expert to
                          </label>
                        ) : (
                          <label class="addressLabel col-form-label pb-4">
                            Service venue will be
                          </label>
                        )}
                        {this.state.inclinic == "true" &&
                        this.state.inhouse == "false" ? (
                          ""
                        ) : (
                          <div class=" text-right pb-4 addressTitle">
                            <a
                              class="btn btn-transparent text-dark"
                              onClick={this.handleAddNewAddress.bind(this)}
                            >
                              <i class="fas fa-plus text-red pr-2"></i> Add new
                              address
                            </a>
                          </div>
                        )}

                        <div className="cardWrapWithShadow">
                          <div class="form-group row">{showAddresses}</div>
                        </div>
                      </div>

                      {this.state.offer == "0" &&
                      this.state.hassession != "true" ? (
                        this.state.addressid != 0 ? (
                          <div className="col-md-12 text-center pt-5 pb-3">
                            <p className="mb-3">Have a Discount Code?</p>
                            <div className="reedemCode">
                              <span>
                                <input
                                  type="text"
                                  placeholder="Enter discount code"
                                  value={this.state.studentDiscountCode}
                                  onChange={this.handChangeDiscountCode.bind(
                                    this
                                  )}
                                />
                                {this.state.studentDiscountCode != "" ? (
                                  <button
                                    className="btn bg-black text-white"
                                    type="button"
                                    onClick={this.submitDiscountCode.bind(this)}
                                  >
                                    Verify Code
                                  </button>
                                ) : (
                                  <button
                                    className="btn bg-black text-white disabled"
                                    type="button"
                                  >
                                    Verify Code
                                  </button>
                                )}
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}

                      {this.state.addressid != 0 ? (
                        this.state.discountDetails != "" ? (
                          <div class="col-md-12 pt-5 notes">
                            <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                              <p className="lead">
                                Actual Price
                                <span className="pl-5">
                                  £{this.state.finalPrice}
                                </span>
                              </p>
                              <p className="lead">
                                Discounted Price
                                <span className="pl-5">
                                  £{this.state.priceAfterDiscount}
                                  <small className="pl-3">
                                    ({this.state.discountDetails.description})
                                  </small>
                                </span>
                              </p>
                            </div>
                          </div>
                        ) : this.state.offer > "0" ? (
                          this.state.hasclickedfreeconsultation == "false" ? (
                            <div class="col-md-12 pt-5 notes">
                              <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                                <p className="lead">
                                  Actual Price
                                  <span className="pl-5">
                                    £{this.state.finalPrice}
                                  </span>
                                </p>
                                <p className="lead">
                                  Discounted Price
                                  <span className="pl-5">
                                    £
                                    {Math.round(
                                      this.state.finalPrice -
                                        (this.state.offer *
                                          this.state.finalPrice) /
                                          100
                                    )}
                                    <small className="pl-3">
                                      ({this.state.offer}% offer discount
                                      applied)
                                    </small>
                                  </span>
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )
                        ) : (
                          <div class="col-md-12 pt-5 notes">
                            <div class="col-md-12 cardWrapWithShadow bg-lite-gray">
                              <p className="lead">
                                Price
                                <span className="pl-5">
                                  £{this.state.finalPrice}
                                </span>
                              </p>
                            </div>
                          </div>
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-center mb-3 checkoutBtn">
                          {this.state.addressid != "" ? (
                            <button
                              className="btn btn-lg bg-orange text-white"
                              type="submit"
                            >
                              Next Step
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
