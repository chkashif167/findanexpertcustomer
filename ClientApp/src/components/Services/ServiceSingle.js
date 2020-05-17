import React, { Component } from "react";
import App from "../../App";
import toastr from "toastr";
import HTMLReactParser from 'html-react-parser';
import headerporfileicon from "../../assets/img/icons/header-porfile-icon.png";
import placeholderLarge from "../../assets/img/placeholderLarge.jpg";

var iconstyle = {
  width: "20px",
  height: "20px",
};

export class ServiceSingle extends Component {

  constructor(props) {
    super(props);
    localStorage.removeItem("bookingId");
    localStorage.removeItem("servicePageUrl");
    var lastVisitedUrl = document.referrer;

    const search = window.location.search;
    var decodedString = window.atob(search.replace("?", ""));
    const decodeParams = decodeURIComponent(decodedString);
    const params = new URLSearchParams(decodeParams);
    const ServicetypeId = params.get("ID");

    var lastVisitedUrlArray = [];
    var lastVisitedUrlArray = lastVisitedUrl.split("/");
    var lastVisitedPage = lastVisitedUrlArray[3];
    const providerid = params.get("providerid");

    var currentServicePageUrl = window.location;
    var pathname = new URL(currentServicePageUrl).pathname;

    var urlArray = [];
    var urlArray = pathname.split("/");
    var first = urlArray[0];
    var serviceName = urlArray[2];
    var serviceTypeName = serviceName.replace(/-/g, " ");
    var serviceTypeName = serviceTypeName.replace(/&/g, "%26");

    this.state = {
      servicetypename: serviceTypeName,
      allServices: [],
      inclinicprice: 0,
      inhouseprice: 0,
      hasduration: false,
      isgeneric: false,
      istraining: false,
      hasarea: false,
      categoryid: 0,
      servicetypeid: 0,
      providerid: providerid,
      lastVisitedPage: lastVisitedPage,
      imagepath: "",
      serviceDetails: [],
      openGraphTags: [],
      ogTitle: "",
      ogType: "",
      ogUrl: "",
      ogImage: "",
      ogDescription: "",
      ogSiteName: "",
      twitterCardsTags: [],
      twCard: "",
      twSite: "",
      twCreator: "",
      twTitle: "",
      twDescription: "",
      twImage: "",
      hasfreetreatment: false,
      added: false,
      showModal: "",
      modalMessage: "",
      referralbonus: 0,
      hassubtypeGeneric: false,
      hassubtypeArea: false,
      hasSubTypeTraining: false,
      hasSubTypeDuration: false,
    };

    //fetch(App.ApisBaseUrl + '/api/ServiceType/getservicetypedetail?servicetypename=' + serviceTypeName)
    //    .then(response => {
    //        if (response.status == 200) {
    //            return response.json();
    //        }
    //        else {
    //            window.location = '/';
    //        }
    //    })
    //    .then(response => {
    //        console.log(response);
    //        const tempArr = this.state.serviceDetails;
    //        tempArr.push(response);
    //        this.setState({ serviceDetails: tempArr });

    //        /*---Facebook open graph content---*/
    //        var openGraphArray = [];
    //        for (var i = 0; i < this.state.serviceDetails.length; i++) {
    //            if (i == 0) {
    //                openGraphArray.push(this.state.serviceDetails[i].fbopengraph_code);
    //            }
    //        }

    //        this.setState({ openGraphTags: openGraphArray });
    //        console.log(this.state.openGraphTags);

    //        var openGraphArray2 = this.state.openGraphTags[0].split("<br/>");
    //        var ogTitle = openGraphArray2[0];
    //        this.setState({ ogTitle: ogTitle.split(':').pop() });
    //        var ogType = openGraphArray2[1];
    //        this.setState({ ogType: ogType.split(':').pop() });
    //        var ogUrl = openGraphArray2[2];
    //        this.setState({ ogUrl: ogUrl.split(':').pop() });
    //        var ogImage = openGraphArray2[3];
    //        this.setState({ ogImage: ogImage.split(':').pop() });
    //        var ogDescription = openGraphArray2[4];
    //        this.setState({ ogDescription: ogDescription.split(':').pop() });
    //        var ogSiteName = openGraphArray2[5];
    //        this.setState({ ogSiteName: ogSiteName.split(':').pop() });

    //        /*---Twitter card content---*/
    //        var twitterCardArray = [];
    //        for (var i = 0; i < this.state.serviceDetails.length; i++) {
    //            if (i == 0) {
    //                twitterCardArray.push(this.state.serviceDetails[i].twittercard);
    //            }
    //        }

    //        this.setState({ twitterCardsTags: openGraphArray });
    //        var twitterCardArray2 = this.state.twitterCardsTags[0].split("<br/>");
    //        var twCard = twitterCardArray2[0];
    //        this.setState({ twCard: twCard.split(':').pop() });
    //        var twSite = twitterCardArray2[1];
    //        this.setState({ twSite: twSite.split(':').pop() });
    //        var twCreator = twitterCardArray2[2];
    //        this.setState({ twCreator: twCreator.split(':').pop() });
    //        var twTitle = twitterCardArray2[3];
    //        this.setState({ twTitle: twTitle.split(':').pop() });
    //        var twDescription = twitterCardArray2[4];
    //        this.setState({ twDescription: twDescription.split(':').pop() });
    //        var twImage = twitterCardArray2[5];
    //        this.setState({ twImage: twImage.split(':').pop() });
    //    });
  }

  componentDidMount() {
    if (this.state.lastVisitedPage == "your-experts") {
      localStorage.setItem("providerid", this.state.providerid);
    } else {
      localStorage.removeItem("providerid", this.state.providerid);
    }

    //-- Get Referral Bonus --//
    if (localStorage.getItem("customeraccesstoken") != null) {
      fetch(
        App.ApisBaseUrlV2 +
        "/api/Referral/getreferralbonusV2?authtoken=" +
        localStorage.getItem("customeraccesstoken")
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ referralbonus: data.referralbonus });
        });
    }

    //-- Get service details --//
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SearchService: this.state.servicetypename,
      }),
    };

    fetch(
      App.ApisBaseUrlV2 + "/api/ServiceType/findservicetypev2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ allServices: data.searchedlist || [] });

        for (var i = 0; i < this.state.allServices.length; i++) {
          var serviceTypeName = this.state.allServices[i].servicetypename.replace(/-/g, " ");
          if (serviceTypeName == this.state.servicetypename) {
            this.setState({
              inclinicprice: this.state.allServices[i].inclinicprice,
            });
            this.setState({
              inhouseprice: this.state.allServices[i].inhouseprice,
            });
            this.setState({ categoryid: this.state.allServices[i].categoryid });
            this.setState({
              servicetypeid: this.state.allServices[i].servicetypeid,
            });
            this.setState({
              hasfreetreatment: this.state.allServices[i].hasfreetreatment,
            });
            this.setState({
              hasduration: this.state.allServices[i].hasduration,
            });
            this.setState({ isgeneric: this.state.allServices[i].isgeneric });
            this.setState({ istraining: this.state.allServices[i].istraining });
            this.setState({ hasarea: this.state.allServices[i].hasarea });
            this.setState({ imagepath: this.state.allServices[i].imagepath });
          }
        }

        if (this.state.hasduration == true) {
          this.hasduration();
        } else if (this.state.isgeneric == true) {
          this.isgeneric();
        } else if (this.state.hasarea == true) {
          this.hasarea();
        } else if (this.state.istraining == true) {
          this.istraining();
        }
      });
  }

  hasduration() {
    fetch(
      App.ApisBaseUrlV2 +
      "/api/ServiceType/getdurationtypedetail?servicetypeid=" +
      this.state.servicetypeid
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempArr = this.state.serviceDetails;
        tempArr.push(data);
        this.setState({ serviceDetails: tempArr, hasSubTypeDuration: data.hassubtype });

        if (this.state.serviceDetails[0].fbgraphcode != "") {
          /*---Facebook open graph content---*/
          var openGraphArray = [];
          openGraphArray.push(this.state.serviceDetails[0].fbgraphcode);

          this.setState({ openGraphTags: openGraphArray });
          console.log(this.state.openGraphTags);

          var openGraphArray2 = this.state.openGraphTags[0].split("<br/>");
          var ogTitle = openGraphArray2[0];
          this.setState({ ogTitle: ogTitle.split(":").pop() });
          var ogType = openGraphArray2[1];
          this.setState({ ogType: ogType.split(":").pop() });
          var ogUrl = openGraphArray2[2];
          this.setState({ ogUrl: ogUrl.split(":").pop() });
          var ogImage = openGraphArray2[3];
          this.setState({ ogImage: ogImage.split(":").pop() });
          var ogDescription = openGraphArray2[4];
          this.setState({ ogDescription: ogDescription.split(":").pop() });
          var ogSiteName = openGraphArray2[5];
          this.setState({ ogSiteName: ogSiteName.split(":").pop() });
        } else if (this.state.serviceDetails[0].twittercard != "") {
          /*---Twitter card content---*/
          var twitterCardArray = [];
          twitterCardArray.push(this.state.serviceDetails[0].twittercard);

          this.setState({ twitterCardsTags: twitterCardArray });
          var twitterCardArray2 = this.state.twitterCardsTags[0].split("<br/>");
          var twCard = twitterCardArray2[0];
          this.setState({ twCard: twCard.split(":").pop() });
          var twSite = twitterCardArray2[1];
          this.setState({ twSite: twSite.split(":").pop() });
          var twCreator = twitterCardArray2[2];
          this.setState({ twCreator: twCreator.split(":").pop() });
          var twTitle = twitterCardArray2[3];
          this.setState({ twTitle: twTitle.split(":").pop() });
          var twDescription = twitterCardArray2[4];
          this.setState({ twDescription: twDescription.split(":").pop() });
          var twImage = twitterCardArray2[5];
          this.setState({ twImage: twImage.split(":").pop() });
        }

      });

    /*---Save incomplete booking---*/
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: this.state.categoryid,
        servicetypeid: this.state.servicetypeid,
        authtoken: localStorage.getItem("customeraccesstoken"),
      }),
    };

    fetch(
      App.ApisBaseUrlV2 + "/api/Booking/saveincompletebookingV2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });

    /*---Save customer preference ---*/
    if (localStorage.getItem("customeraccesstoken") != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryid: this.state.categoryid,
          servicetypeid: this.state.servicetypeid,
          authtoken: localStorage.getItem("customeraccesstoken"),
        }),
      };

      fetch(App.ApisBaseUrlV2 + "/api/Customer/savepreference", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  }

  isgeneric() {
    fetch(
      App.ApisBaseUrlV2 +
      "/api/ServiceType/getgenerictypedetail?servicetypeid=" +
      this.state.servicetypeid
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const tempArr = this.state.serviceDetails;
        tempArr.push(data);
        this.setState({ serviceDetails: tempArr });
        console.log(this.state.serviceDetails);
        console.log(this.state.serviceDetails[0].fbgraphcode);

        if (this.state.serviceDetails[0].fbgraphcode != "") {
          /*---Facebook open graph content---*/
          var openGraphArray = [];
          openGraphArray.push(this.state.serviceDetails[0].fbgraphcode);

          this.setState({ openGraphTags: openGraphArray });
          console.log(this.state.openGraphTags);

          var openGraphArray2 = this.state.openGraphTags[0].split("<br/>");
          var ogTitle = openGraphArray2[0];
          this.setState({ ogTitle: ogTitle.split(":").pop() });
          var ogType = openGraphArray2[1];
          this.setState({ ogType: ogType.split(":").pop() });
          var ogUrl = openGraphArray2[2];
          this.setState({ ogUrl: ogUrl.split(":").pop() });
          var ogImage = openGraphArray2[3];
          this.setState({ ogImage: ogImage.split(":").pop() });
          var ogDescription = openGraphArray2[4];
          this.setState({ ogDescription: ogDescription.split(":").pop() });
          var ogSiteName = openGraphArray2[5];
          this.setState({ ogSiteName: ogSiteName.split(":").pop() });
        } else if (this.state.serviceDetails[0].twittercard != "") {
          /*---Twitter card content---*/
          var twitterCardArray = [];
          twitterCardArray.push(this.state.serviceDetails[0].twittercard);

          this.setState({ twitterCardsTags: twitterCardArray });
          var twitterCardArray2 = this.state.twitterCardsTags[0].split("<br/>");
          var twCard = twitterCardArray2[0];
          this.setState({ twCard: twCard.split(":").pop() });
          var twSite = twitterCardArray2[1];
          this.setState({ twSite: twSite.split(":").pop() });
          var twCreator = twitterCardArray2[2];
          this.setState({ twCreator: twCreator.split(":").pop() });
          var twTitle = twitterCardArray2[3];
          this.setState({ twTitle: twTitle.split(":").pop() });
          var twDescription = twitterCardArray2[4];
          this.setState({ twDescription: twDescription.split(":").pop() });
          var twImage = twitterCardArray2[5];
          this.setState({ twImage: twImage.split(":").pop() });
          this.setState({ hassubtypeGeneric: data.hassubtype });
        }
      });

    /*---Save incomplete booking---*/
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: this.state.categoryid,
        servicetypeid: this.state.servicetypeid,
        authtoken: localStorage.getItem("customeraccesstoken"),
      }),
    };

    fetch(
      App.ApisBaseUrlV2 + "/api/Booking/saveincompletebookingV2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });

    /*---Save customer preference---*/
    if (localStorage.getItem("customeraccesstoken") != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryid: this.state.categoryid,
          servicetypeid: this.state.servicetypeid,
          authtoken: localStorage.getItem("customeraccesstoken"),
        }),
      };

      fetch(App.ApisBaseUrlV2 + "/api/Customer/savepreference", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  }

  hasarea() {
    fetch(
      App.ApisBaseUrlV2 +
      "/api/ServiceType/getareatypedetail?servicetypeid=" +
      this.state.servicetypeid
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempArr = this.state.serviceDetails;
        tempArr.push(data);
        this.setState({ serviceDetails: tempArr });
        console.log(data);
        this.setState({ hassubtypeArea: data.hassubtype });

        if (this.state.serviceDetails[0].fbgraphcode != "") {
          /*---Facebook open graph content---*/
          var openGraphArray = [];
          openGraphArray.push(this.state.serviceDetails[0].fbgraphcode);
          console.log(openGraphArray);

          this.setState({ openGraphTags: openGraphArray });
          console.log(this.state.openGraphTags.length);

          if (this.state.openGraphTags.length > 1) {
            var openGraphArray2 = this.state.openGraphTags[0].split("<br/>");
            var ogTitle = openGraphArray2[0];
            this.setState({ ogTitle: ogTitle.split(":").pop() });
            var ogType = openGraphArray2[1];
            this.setState({ ogType: ogType.split(":").pop() });
            var ogUrl = openGraphArray2[2];
            this.setState({ ogUrl: ogUrl.split(":").pop() });
            var ogImage = openGraphArray2[3];
            this.setState({ ogImage: ogImage.split(":").pop() });
            var ogDescription = openGraphArray2[4];
            this.setState({ ogDescription: ogDescription.split(":").pop() });
            var ogSiteName = openGraphArray2[5];
            this.setState({ ogSiteName: ogSiteName.split(":").pop() });
          }
        } else if (this.state.serviceDetails[0].twittercard != "") {
          /*---Twitter card content---*/
          var twitterCardArray = [];
          twitterCardArray.push(this.state.serviceDetails[0].twittercard);

          this.setState({ twitterCardsTags: twitterCardArray });
          var twitterCardArray2 = this.state.twitterCardsTags[0].split("<br/>");
          var twCard = twitterCardArray2[0];
          this.setState({ twCard: twCard.split(":").pop() });
          var twSite = twitterCardArray2[1];
          this.setState({ twSite: twSite.split(":").pop() });
          var twCreator = twitterCardArray2[2];
          this.setState({ twCreator: twCreator.split(":").pop() });
          var twTitle = twitterCardArray2[3];
          this.setState({ twTitle: twTitle.split(":").pop() });
          var twDescription = twitterCardArray2[4];
          this.setState({ twDescription: twDescription.split(":").pop() });
          var twImage = twitterCardArray2[5];
          this.setState({ twImage: twImage.split(":").pop() });
        }
      });

    /*---Save incomplete booking---*/
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: this.state.categoryid,
        servicetypeid: this.state.servicetypeid,
        authtoken: localStorage.getItem("customeraccesstoken"),
      }),
    };

    fetch(
      App.ApisBaseUrlV2 + "/api/Booking/saveincompletebookingV2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });

    /*---Save customer preference---*/
    if (localStorage.getItem("customeraccesstoken") != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryid: this.state.categoryid,
          servicetypeid: this.state.servicetypeid,
          authtoken: localStorage.getItem("customeraccesstoken"),
        }),
      };

      fetch(App.ApisBaseUrlV2 + "/api/Customer/savepreference", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  }

  istraining() {
    fetch(
      App.ApisBaseUrlV2 +
      "/api/ServiceType/gettrainingtypedetail?servicetypeid=" +
      this.state.servicetypeid
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tempArr = this.state.serviceDetails;
        tempArr.push(data.course);
        this.setState({ serviceDetails: tempArr, hasSubTypeTraining: data.course.hassubtype });

        if (this.state.serviceDetails[0].fbgraphcode != "") {
          /*---Facebook open graph content---*/
          var openGraphArray = [];
          openGraphArray.push(this.state.serviceDetails[0].fbgraphcode);

          this.setState({ openGraphTags: openGraphArray });
          console.log(this.state.openGraphTags);

          var openGraphArray2 = this.state.openGraphTags[0].split("<br/>");
          var ogTitle = openGraphArray2[0];
          this.setState({ ogTitle: ogTitle.split(":").pop() });
          var ogType = openGraphArray2[1];
          this.setState({ ogType: ogType.split(":").pop() });
          var ogUrl = openGraphArray2[2];
          this.setState({ ogUrl: ogUrl.split(":").pop() });
          var ogImage = openGraphArray2[3];
          this.setState({ ogImage: ogImage.split(":").pop() });
          var ogDescription = openGraphArray2[4];
          this.setState({ ogDescription: ogDescription.split(":").pop() });
          var ogSiteName = openGraphArray2[5];
          this.setState({ ogSiteName: ogSiteName.split(":").pop() });
        } else if (this.state.serviceDetails[0].twittercard != "") {
          /*---Twitter card content---*/
          var twitterCardArray = [];
          twitterCardArray.push(this.state.serviceDetails[0].twittercard);

          this.setState({ twitterCardsTags: twitterCardArray });
          var twitterCardArray2 = this.state.twitterCardsTags[0].split("<br/>");
          var twCard = twitterCardArray2[0];
          this.setState({ twCard: twCard.split(":").pop() });
          var twSite = twitterCardArray2[1];
          this.setState({ twSite: twSite.split(":").pop() });
          var twCreator = twitterCardArray2[2];
          this.setState({ twCreator: twCreator.split(":").pop() });
          var twTitle = twitterCardArray2[3];
          this.setState({ twTitle: twTitle.split(":").pop() });
          var twDescription = twitterCardArray2[4];
          this.setState({ twDescription: twDescription.split(":").pop() });
          var twImage = twitterCardArray2[5];
          this.setState({ twImage: twImage.split(":").pop() });
        }
      });

    /*---Save incomplete booking---*/
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: this.state.categoryid,
        servicetypeid: this.state.servicetypeid,
        authtoken: localStorage.getItem("customeraccesstoken"),
      }),
    };

    fetch(
      App.ApisBaseUrlV2 + "/api/Booking/saveincompletebookingV2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });

    /*---Save customer preference---*/
    if (localStorage.getItem("customeraccesstoken") != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryid: this.state.categoryid,
          servicetypeid: this.state.servicetypeid,
          authtoken: localStorage.getItem("customeraccesstoken"),
        }),
      };

      fetch(App.ApisBaseUrlV2 + "/api/Customer/savepreference", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  }

  getServiceID(e) {
    localStorage.setItem("serviceID", e.target.id);
  }

  addWatchlist(categoryid, servicetypeid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: categoryid,
        servicetypeid: servicetypeid,
        iswatchlist: true,
        authtoken: localStorage.getItem("customeraccesstoken"),
      }),
    };

    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrlV2 + "/api/ServiceType/addupdatewatchlistv2",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.statuscode == "409") {
          toastr["error"]("Already Added.");
        }
        if (response.statuscode == "400") {
          toastr["error"]("You are not logged in. Please Log in first.");
        } else if (response.statuscode == "200") {
          this.setState({ modalMessage: response.message, showModal: "show" });
        }
      });
  }

  handleModal(e) {
    e.preventDefault();
    this.setState({ showModal: null });
  }

  getNotification(e) {
    e.preventDefault();

    var lastVisitedUrl = window.document.referrer;
    localStorage.setItem("servicePageUrl", lastVisitedUrl);

    toastr["error"]("Please complete your profile first.");
    setTimeout(function () {
      window.location = "/edit-profile";
    }, 3000);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { categoryid, servicetypeid } = this.state;
    this.addWatchlist(categoryid, servicetypeid);
  }

  buttons = (value) => {
    let url = this.urlTypes()
    const bookingUrl = this.bookingUrl(url, value)
    let consultantUrl = null
    const buttons = ["Book Now"]
    if (value.isfreeconsultation) {
      buttons.push("Free Consultation")
      consultantUrl = this.consultantUrl(url, value)
    }
    return buttons.map((button, key) => {
      const classes = ["btn", "text-white", "services-card-footer-btn"]
      let url = null
      if (button === "Book Now") {
        classes.push("bg-orange")
        url = bookingUrl
      }
      if (button === "Free Consultation") {
        classes.push("bg-transparent")
        url = consultantUrl
      }
      return <a className={classes.join(" ")} href={url} key={key}>{button}</a>
    })
  }

  urlTypes = () => {
    const {
      hassubtypeGeneric, isgeneric, hasduration, istraining, hasSubTypeTraining, hasarea, hassubtypeArea
    } = this.state
    let url = null
    if (isgeneric) {
      url = hassubtypeGeneric ? "/generic-booking-subtype/" : "/generic-booking/"
    } else if (hasduration) {
      url = "/service-durations/"
    } else if (istraining) {
      url = hasSubTypeTraining ? "/select-course-date-subtype/" : "/select-course-date/"
    } else if (hasarea) {
      url = hassubtypeArea ? "/service-areas-subtype/" : "/service-areas/"
    }
    return url
  }

  bookingUrl = (url, value) => {
    const { isgeneric, hasduration, istraining, hasarea } = this.state
    let bookingParams = []
    if (value.isfreeconsultation) {
      bookingParams.push("hasclickedfreeconsultation=false")
    }
    let keysFromState = [
      "categoryid", "servicetypename", "servicetypeid", "referralbonus"
    ]
    let keysForBooking = []

    if (isgeneric) {
      bookingParams.push("serviceType=isgeneric")
      keysFromState.push("hasfreetreatment")
      keysForBooking = ["inhouse", "inclinic", "inclinicprice", "inhouseprice", "requiredgenderpreference", "offer", "isfreeconsultation", "hasquestions", "hassession"]
    } else if (hasduration) {
      bookingParams.push("serviceType=hasduration")
      keysForBooking = ["inhouse", "inclinic", "requiredgenderpreference", "isfreeconsultation", "hasquestions", "hassession", "offer"]
    } else if (istraining) {
      bookingParams.push("serviceType=istraining")
      keysForBooking = ["requiredgenderpreference", "offer"]
    } else if (hasarea) {
      bookingParams.push("serviceType=hasarea")
      keysForBooking = ["inhouse", "inclinic", "hasquestions", "hassession", "requiredgenderpreference", "offer", "isfreeconsultation"]
    }
    keysFromState.forEach(key => {
      const txt = `${key}=${this.state[key]}`
      bookingParams.push(txt)
    })
    keysForBooking.forEach(val => {
      const txt = `${val}=${value[val]}`
      bookingParams.push(txt)
    })
    const encodedParams = btoa(encodeURIComponent(bookingParams.join("&")))
    return `${url}?${encodedParams}`
  }

  consultantUrl = (url, value) => {
    const { isgeneric, hasduration, istraining, hasarea } = this.state
    let consultantParams = []
    let keysFromState = [
      "categoryid", "servicetypename", "servicetypeid", "referralbonus"
    ]
    let keysForConsultant = []

    if (isgeneric) {
      consultantParams.push("serviceType=isgeneric")
      consultantParams.push("hasclickedfreeconsultation=true")
      keysFromState.push("hasfreetreatment")
      keysForConsultant = ["inhouse", "inclinic", "inclinicprice", "inhouseprice", "requiredgenderpreference", "offer", "isfreeconsultation"]
    } else if (hasduration) {
      consultantParams.push("serviceType=hasduration")
      consultantParams.push("hasclickedfreeconsultation=true")
      keysForConsultant = ["inhouse", "inclinic", "requiredgenderpreference", "isfreeconsultation"]
    } else if (istraining) {
      consultantParams.push("serviceType=istraining")
      consultantParams.push("hasclickedfreeconsultation=true")
      keysForConsultant = ["requiredgenderpreference", "offer"]
    } else if (hasarea) {
      consultantParams.push("serviceType=hasarea")
      consultantParams.push("hasclickedfreeconsultation=true")
      keysForConsultant = ["inhouse", "inclinic", "isfreeconsultation", "requiredgenderpreference", "offer"]
    }
    keysFromState.forEach(key => {
      const txt = `${key}=${this.state[key]}`
      consultantParams.push(txt)
    })
    keysForConsultant.forEach(val => {
      const txt = `${val}=${value[val]}`
      consultantParams.push(txt)
    })
    const encodedParams = btoa(encodeURIComponent(consultantParams.join("&")))
    return `${url}?${encodedParams}`
  }

  getButtons = (value) => {
    const isprofilecompleted = localStorage.getItem("isprofilecompleted")
    if (isprofilecompleted === "false") {
      return (<button
        class="btn bg-orange text-white services-card-footer-btn"
        onClick={this.getNotification}
      >
        Book Now
      </button>)
    }
    return this.buttons(value)
  }

  render() {
    console.log(this.state)
    var metaTitle = this.state.serviceDetails.map((obj) => obj.metatitle);
    var metaDescription = this.state.serviceDetails.map(
      (obj) => obj.metadescription
    );
    document.getElementsByTagName("META")[2].content = metaDescription[0];
    document.getElementsByTagName("TITLE")[0].text = metaTitle;

    /*Facebook open graph meta tags*/
    document.getElementsByTagName("META")[3].content = this.state.ogTitle;
    document.getElementsByTagName("META")[4].content = this.state.ogType;
    document.getElementsByTagName("META")[5].content =
      "https:" + this.state.ogUrl;
    document.getElementsByTagName("META")[6].content =
      "https:" + this.state.ogImage;
    document.getElementsByTagName("META")[7].content = this.state.ogDescription;
    document.getElementsByTagName("META")[8].content = this.state.ogSiteName;

    /*Twitter card meta tags*/
    document.getElementsByTagName("META")[9].content = this.state.twCard;
    document.getElementsByTagName("META")[10].content = this.state.twSite;
    document.getElementsByTagName("META")[11].content =
      "https:" + this.state.twCreator;
    document.getElementsByTagName("META")[12].content =
      "https:" + this.state.twTitle;
    document.getElementsByTagName(
      "META"
    )[13].content = this.state.twDescription;
    document.getElementsByTagName("META")[14].content = this.state.twImage;

    var serviceIndex = localStorage.getItem("searchedServiceIndex");

    const appLinksMedia = (<section class="pb-4" id="st_app_links_media">
      <div class="services-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2 info-col pr-0 noMobile">
              <div class="info-box section-bg-light" id="col_1">
                <img
                  className="img-responsive m-auto"
                  src={App.StaticImagesUrl + "info_1.png"}
                  alt="expert-mobile"
                />
              </div>
            </div>

            <div class="col-md-6 info-col noMobile">
              <div class="info-box section-bg-light" id="col_2">
                <p class="lead text">
                  Want all the <strong>Services </strong>
                at your fingertips ? <strong>Download</strong> the
                Expert app <strong>Now</strong>
                </p>
              </div>
            </div>

            <div class="col-md-4 info-col pl-0">
              <div class="info-box section-bg-light no-mobile" id="col_3">
                <div className="content">
                  <a
                    href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                    target="_blank"
                  >
                    <img
                      className="appleImage"
                      src={App.StaticImagesUrl + "appleStore.png"}
                      alt=""
                      width="100%"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.findanexpert"
                    target="_blank"
                  >
                    <img
                      className="gooleImage"
                      src={App.StaticImagesUrl + "googleStore.png"}
                      alt=""
                      width="100%"
                    />
                  </a>
                </div>
              </div>

              <div
                class="info-box serviceSingle section-bg-light yes-mobile"
                id="col_3"
              >
                <h3>Download the expert app now</h3>
                <div>
                  <a
                    href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                    target="_blank"
                  >
                    <img
                      className="appleImage"
                      src={App.StaticImagesUrl + "appleStore.png"}
                      alt=""
                      width="100%"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.findanexpert"
                    target="_blank"
                  >
                    <img
                      className="gooleImage"
                      src={App.StaticImagesUrl + "googleStore.png"}
                      alt=""
                      width="100%"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)

    if (localStorage.getItem("customeraccesstoken") != null) {
      var serviceContent = (
        <div>
          {this.state.serviceDetails.map((obj, index) => {
            const getButtons = this.getButtons(obj)
            return (
              <div key={index}>
                <section className="serviceDetail section-padding serviceDetailTpWrap">
                  <div className="overlay"></div>
                  <div className="services-wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="serviceTitle yes-mobile">
                            <h1 className="section-title m-0 m-0">
                              <strong>{this.state.servicetypename}</strong>
                            </h1>
                            {obj.isfreeconsultation == false ? (
                              <p>
                                <span class="price pr-3">From </span>£
                                <span class="">
                                  {obj.offer > 0
                                    ? Math.round(
                                      obj.lowestprice -
                                      (obj.offer * obj.lowestprice) / 100
                                    )
                                    : obj.lowestprice}
                                </span>
                              </p>
                            ) : (
                                <p>Free Consultation</p>
                              )}
                          </div>
                          <div>
                            <div className="contentWrapper">
                              {obj.hasoffer == true && obj.offer > 0 ? (
                                <div class="ribbon ribbonTopLeft">
                                  <span>{obj.offer}% OFF</span>
                                </div>
                              ) : null}
                              {this.state.imagepath != "" ? (
                                <img
                                  className="img-fluid rounded"
                                  src={this.state.imagepath}
                                  alt={this.state.servicetypename}
                                />
                              ) : (
                                  <img
                                    className="img-fluid rounded"
                                    src={placeholderLarge}
                                    alt={this.state.servicetypename}
                                  />
                                )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 pr-0">
                          <div className="serviceDetailTpRight">
                            <div className="no-mobile">
                              <div className="serviceTitle">
                                <h1 className="section-title m-0">
                                  <strong>{this.state.servicetypename}</strong>
                                </h1>
                                {obj.isfreeconsultation == false ? (
                                  <p>
                                    <span class="price pr-3">From </span>£
                                    <span class="">
                                      {obj.offer > 0
                                        ? Math.round(
                                          obj.lowestprice -
                                          (obj.offer * obj.lowestprice) / 100
                                        )
                                        : obj.lowestprice}
                                    </span>
                                  </p>
                                ) : (
                                    <p>Free Consultation</p>
                                  )}
                              </div>
                            </div>
                            <div className="buttonWrap">
                              <div className="bookNow">
                                {getButtons}
                              </div>
                              <form
                                onSubmit={this.handleSubmit.bind(this)}
                                className="no-mobile"
                              >
                                <div className="text-center ">
                                  <button
                                    type="submit"
                                    className="btn bg-transparent text-white pr-0"
                                    id={obj.serviceid}
                                    onClick={this.getServiceID}
                                  >
                                    <i class="fas fa-heart"></i> Add to watchlist
                                </button>
                                </div>
                              </form>
                            </div>
                            <div className="btmImages no-mobile">
                              <a
                                href="https://play.google.com/store/apps/details?id=com.findanexpert"
                                target="_blank"
                              >
                                <img
                                  src={App.StaticImagesUrl + "googleStore.png"}
                                  alt=""
                                />
                              </a>
                              <a
                                href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                                target="_blank"
                              >
                                <img
                                  src={App.StaticImagesUrl + "appleStore.png"}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="serviceDetail section-padding p-0">
                  <div className="services-wrapper">
                    <div className="container">
                      <div className="row pb-4">
                        <div className="col-md-12">
                          <div className="service-decription">
                            <div>
                              {HTMLReactParser(obj.description)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="serviceDetail section-padding ">
                  <div className="overlay"></div>
                  <div className="services-wrapper serviceSingleBottom bg-black pt-5 pb-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="bookNowBottom text-center">
                            {getButtons}
                          </div>
                          <div className="yes-mobile text-white">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                              <div className="text-center ">
                                <button
                                  type="submit"
                                  className="btn bg-transparent text-white pr-0"
                                  id={obj.serviceid}
                                  onClick={this.getServiceID}
                                >
                                  <i class="fas fa-heart"></i> Add to watchlist
                              </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div
                  class={"modal fade " + this.state.showModal}
                  id="referralModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="logoutModal"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div className="row">
                          <div className="col-md-12 d-flex">
                            <div>
                              <img
                                src={headerporfileicon}
                                style={iconstyle}
                                className="change-to-white"
                              />
                            </div>
                            <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">
                              Expert
                          </h3>
                          </div>
                          <div className="col-md-12 text-center fs-18 p-5">
                            {this.state.modalMessage}
                          </div>
                          <div className="col-md-12 text-right">
                            <div className="w-100">
                              <a
                                id="okBtn"
                                class="btn bg-black text-white float-right ml-3"
                                onClick={this.handleModal.bind(this)}
                              >
                                OK
                            </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      );
    } else {
      var serviceContent = (
        <div>
          {this.state.serviceDetails.map((obj, index) => (
            <div>
              <section className="serviceDetail section-padding serviceDetailTpWrap">
                <div className="overlay"></div>
                <div className="services-wrapper">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="serviceTitle yes-mobile">
                          <h1 className="section-title m-0 m-0">
                            <strong>{this.state.servicetypename}</strong>
                          </h1>
                          {obj.isfreeconsultation == false ? (
                            <p>
                              <span class="price pr-3">From </span>£
                              <span class="">
                                {obj.offer > 0
                                  ? Math.round(
                                    obj.lowestprice -
                                    (obj.offer * obj.lowestprice) / 100
                                  )
                                  : obj.lowestprice}
                              </span>
                            </p>
                          ) : (
                              <p>Free Consultation</p>
                            )}
                        </div>
                        <div>
                          {obj.offerdiscount > 0 ? (
                            <div class="ribbon ribbonTopLeft">
                              <span>{obj.offerdiscount}% OFF</span>
                            </div>
                          ) : null}
                          {this.state.imagepath != "" ? (
                            <img
                              className="img-fluid rounded"
                              src={this.state.imagepath}
                              alt={this.state.servicetypename}
                            />
                          ) : (
                              <img
                                className="img-fluid rounded"
                                src={placeholderLarge}
                                alt={this.state.servicetypename}
                              />
                            )}
                        </div>
                      </div>

                      <div className="col-md-6 pr-0">
                        <div className="serviceDetailTpRight">
                          <div className="no-mobile">
                            <div className="serviceTitle">
                              <h1 className="section-title m-0">
                                <strong>{this.state.servicetypename}</strong>
                              </h1>
                              {obj.lowestprice > 0 ? (
                                obj.offerdiscount > 0 ? (
                                  <p>
                                    <span class="price pr-3">From </span>
                                    <span className="text-muted">
                                      <del>£{obj.lowestprice}</del>
                                    </span>
                                    <span class="pl-4">
                                      £
                                      {obj.lowestprice -
                                        (obj.offerdiscount / 100) *
                                        obj.lowestprice}
                                    </span>
                                  </p>
                                ) : (
                                    <p>
                                      <span class="price pr-3">From </span>£
                                      <span class="">{obj.lowestprice}</span>
                                    </p>
                                  )
                              ) : (
                                  <p>Free Consultation</p>
                                )}
                            </div>
                          </div>
                          <div className="buttonWrap">
                            <div className="bookNow">
                              <a
                                href="/customer-authentication/"
                                class="btn bg-orange text-white services-card-footer-btn"
                              >
                                Book Now
                              </a>
                            </div>
                            <form
                              onSubmit={this.handleSubmit}
                              className="no-mobile"
                            >
                              <div className="text-center ">
                                <button
                                  type="submit"
                                  className="btn bg-transparent text-white pr-0"
                                  id={obj.serviceid}
                                  onClick={this.getServiceID}
                                >
                                  <i class="fas fa-heart"></i> Add to watchlist
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="btmImages no-mobile">
                            <a
                              href="https://play.google.com/store/apps/details?id=com.findanexpert"
                              target="_blank"
                            >
                              <img
                                src={App.StaticImagesUrl + "googleStore.png"}
                                alt=""
                              />
                            </a>
                            <a
                              href="https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1"
                              target="_blank"
                            >
                              <img
                                src={App.StaticImagesUrl + "appleStore.png"}
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="serviceDetail section-padding p-0">
                <div className="services-wrapper">
                  <div className="container">
                    <div className="row pb-4">
                      <div className="col-md-12">
                        <div className="service-decription">
                          <div>{HTMLReactParser(obj.description)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="serviceDetail section-padding ">
                <div className="overlay"></div>
                <div className="services-wrapper serviceSingleBottom bg-black pt-5 pb-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="bookNowBottom text-center">
                          <a
                            href="/customer-authentication/"
                            class="btn bg-orange text-white services-card-footer-btn"
                          >
                            Book Now
                          </a>
                        </div>
                        <div className="yes-mobile">
                          <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="text-center ">
                              <button
                                type="submit"
                                className="btn bg-transparent text-white"
                                id={obj.serviceid}
                                onClick={this.getServiceID}
                              >
                                <i class="fas fa-heart"></i> Add to watchlist
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      );
    }

    return (<div>
      {serviceContent}
      {appLinksMedia}
    </div>);
  }
}

export default ServiceSingle;
