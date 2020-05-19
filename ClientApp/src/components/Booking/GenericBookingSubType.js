import React, { Component } from "react";
import App from "../../App";
import toastr from "toastr";

export class GenericBookingSubType extends Component {
  displayName = GenericBookingSubType.name;

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
      subTypeList: [],
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
        "/api/SubType/getsubtypes?authtoken=" +
        this.state.authToken +
        "&servicetypeid=" +
        this.state.servicetypeid
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        this.setState({ subTypeList: data.subtypelist });
      });
  }

  render() {
    return (
      <div className="BookingSubTypeComp container">
        {this.state.subTypeList.map((itm, index) => (
          <a
            href={
              "/generic-booking/?" +
              btoa(
                encodeURIComponent(
                  "serviceType=isgeneric" +
                    "&categoryid=" +
                    this.state.categoryid +
                    "&servicetypename=" +
                    this.state.servicetypename +
                    "&servicetypeid=" +
                    this.state.servicetypeid +
                    "&subtypeid=" +
                    itm.subtypeid +
                    "&hasfreetreatment=" +
                    this.state.hasfreetreatment +
                    "&inhouse=" +
                    itm.inhouse +
                    "&inclinic=" +
                    itm.inclinic +
                    "&hasquestions=" +
                    itm.hasquestions +
                    "&hassession=" +
                    itm.hassession +
                    "&inclinicprice=" +
                    itm.inclinicprice +
                    "&inhouseprice=" +
                    itm.inhouseprice +
                    "&requiredgenderpreference=" +
                    itm.requiredgenderpreference +
                    "&referralbonus=" +
                    this.state.referralbonus +
                    "&offer=" +
                    itm.offer +
                    "&isfreeconsultation=" +
                    itm.isfreeconsultation +
                    itm.isfreeconsultation +
                    "&hasclickedfreeconsultation=" +
                    this.state.hasclickedfreeconsultation
                )
              )
            }
          >
            <div className="img">
              <img src={itm.imageurl} />
            </div>
            <div className="nameAndDesc">
              <h3> {itm.subtypename} </h3>
              <div className="description">{itm.description}</div>
            </div>
            <div className="price">
              {" "}
              £{itm.price} ===== {itm.subtypeid}
            </div>
          </a>
        ))}
        <br />
      </div>
    );
  }
}
