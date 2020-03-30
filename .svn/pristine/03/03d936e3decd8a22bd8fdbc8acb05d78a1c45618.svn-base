import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from '../../App';

export class Footer extends Component {
    displayName = Footer.name

    constructor(props) {
        super(props);

        this.state = { categorieslist: []  };
    }

    componentDidMount() {
        fetch(App.ApisBaseUrlV2 + '/api/Categories/getallcategories?pagenumber=1&pagesize=100')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ categorieslist: data.categorieslist });
            });
    }

    render(allServices) {
      return (

          <footer className="footer bg-black col-sm-12">

              <div className="container py-5">

                  <div className="row mb-4">
                      <div className="col-md-12">
                          <h4 className="text-white text-center">Service Categories</h4>
                      </div>
                  </div>

                  <div className="row">

                      {this.state.categorieslist.map(obj =>
                          <div className="col-md-3">
                              <ul className="list-unstyled text-small">
                                  <li>
                                      <a className="text-muted text-white" id={obj.categoryid}
                                          href={'/service/' + encodeURI(obj.categoryname).replace(/%20/g, '-') +
                                              '/?ID=' + obj.categoryid}>{obj.categoryname}</a>
                                  </li>
                              </ul>
                          </div>
                      )}

                  </div>

                  <div className="row footerBottom">

                      <div className="col-6 col-md">
                          <ul className="list-unstyled text-small">
                              <li><a className="text-muted text-white" href="/about-us">About</a></li>
                              <li><a className="text-muted text-white" href="/blogs">Blogs</a></li>
                          </ul>
                      </div>

                      <div className="col-6 col-md">
                          <ul className="list-unstyled text-small">
                              <li><a className="text-muted text-white" href="https://pro.findanexpert.net/" target="_blank">Become an expert</a></li>
                              <li><a className="text-muted text-white" href="/cookies-policy">Cookies Policy</a></li>
                          </ul>
                      </div>

                      <div className="col-6 col-md">
                          <ul className="list-unstyled text-small">
                              <li><a className="text-muted text-white" href="/privacy-policy">Privacy Policy</a></li>
                              <li><a className="text-muted text-white" href="/terms-conditions">Terms & Conditions</a></li>
                          </ul>
                      </div>

                      <div className="col-6 col-md">
                          <ul className="list-unstyled text-small">
                              <li><a className="text-muted text-white" href="/contact-us">Contact</a></li>
                              <li><a className="text-muted text-white" href="/help">Help</a></li>
                          </ul>
                      </div>

                  </div>

                  <div className="row">
                      <div className="col-md-12">
                          <div className="SocialIcons">
                              <a href="https://www.facebook.com/FindnExpert/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-facebook-f btn-fb"></i>
                              </a>
                              <a href="https://twitter.com/findnexpert/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-twitter btn-tw"></i>
                              </a>
                              <a href="https://www.linkedin.com/company/findanexpert/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-linkedin-in btn-li"></i>
                              </a>
                              <a href="https://www.instagram.com/findnexpert/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-instagram btn-ins"></i>
                              </a>
                              <a href="https://www.pinterest.co.uk/findnexpert/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-pinterest btn-pin"></i>
                              </a>
                              <a href="https://www.youtube.com/channel/UCCr1Cv5QiiGsEztlFYG8OQw/" target="_blank"
                                  class="btn-floating btn-lg" type="button" role="button">
                                  <i class="fab fa-youtube btn-yt"></i>
                              </a>
                          </div>
                      </div>
                  </div>

                  <div className="row footerBottom">
                      <div className="col-md-12 text-center">
                          <Link to="/">
                              <img className="selteqLogo" src={App.StaticImagesUrl + 'company-logo.png'} alt="Company Logo" width="auto" />
                          </Link>
                          <small className="d-block mb-3 text-muted text-white">© 2019-2020</small>
                      </div>
                  </div>
              </div>

              {/*<a href="#" id="scroll"><span id="scroll-icon"></span> <p>Back to top</p></a>*/}

          </footer>


      );
  }
}
