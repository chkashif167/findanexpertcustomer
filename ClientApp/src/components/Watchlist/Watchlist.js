import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import App from '../../App';
import expertRedIcon from '../../assets/img/expert-red-icon.png';
import headerporfileicon from '../../assets/img/icons/header-porfile-icon.png';
import placeholderSmall from '../../assets/img/placeholderSmall.jpg';

var iconstyle = {
    width: '20px',
    height: '20px',
}

export class Watchlist extends Component {
    displayName = Watchlist.name

    constructor(props) {
        super(props);

        this.state = {
            apiResponse: '', totalPages: '', watchList: [], loading: true, removed: false, showModal: '',
            modalMessage: ''
        };
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber = params.get('page');

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }
        fetch(App.ApisBaseUrlV2 + '/api/Customer/getwatchlistv2?pagenumber=' + pageSize + '&pagesize=' + 15 + '&authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ apiResponse: data.statuscode });
                this.setState({ totalPages: data.pagination.totalpages });
                this.setState({ watchList: data.listwatchlist, loading: false });
                console.log(this.state.watchList);
            })
            .catch((error) => {

                this.state.watchList = [];
            });
    }

    showWatchlistID(e) {
        localStorage.setItem('watchlistservicetypeid', e.target.getAttribute('rel'));
        localStorage.setItem('categoryid', e.target.id);
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryid: parseInt(localStorage.getItem('categoryid')),
                servicetypeid: parseInt(localStorage.getItem('watchlistservicetypeid')),
                iswatchlist: false,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrlV2 + '/api/ServiceType/addupdatewatchlistv2', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.statuscode == 200) {
                    window.location = '/watchlist';
                }
            });
    }

    handleModal(e) {

        e.preventDefault();
        this.setState({ showModal: null });
        window.location = '/watchlist';
    }

    render() {

        if (localStorage.getItem('customeraccesstoken') == null) {
            window.location.href = "/customer-authentication";
        }

        if (this.state.apiResponse == '200') {
            return (
                this.WatchList(this.state.watchList)
            );
        }
        else {
            return (
                this.emptyWatchList()
            );
        }
    }

    WatchList(watchList) {
        var styles = {
            height: '85px',
        };

        if (this.state.totalPages == '2') {
            var listItems = (<ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 1}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href={"/watchlist/?"}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href={"/watchlist/?"}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/watchlist/?" + 'page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

          <div id="MainPageWrapper">

              <SidebarLinks />

              <section className="section-padding customerProfile">
                  <div className="services-wrapper">
                      <div className="container">
                          <div className="row coloredBox">

                                <div className="col-md-12 pt-4 pb-4">
                                    {watchList.map((obj, index) =>

                                      <div className="row pb-4">

                                          <div className="col-md-12">
                                              <div className="media watchlist-bx profileBox">
                                                  <div className="leftImage">
                                                        {(obj.offerdiscount > 0) ?
                                                            <div class="ribbon ribbonTopLeft"><span>{obj.offerdiscount} %</span></div>
                                                            : ''
                                                        }

                                                        {obj.imagepath != '' ?
                                                            <img className="card-img-top" src={obj.imagepath}
                                                                alt={obj.servicetypename} />
                                                            : <img className="card-img-top" src={placeholderSmall}
                                                                alt='placeholder' />
                                                        }

                                                        <div class="overlay">
                                                            <h4 class="overlay-text text-white"><strong>{obj.servicetypename}</strong></h4>
                                                        </div>
                                                  </div>
                                                    <div className="media-body pl-4">
                                                        <div className="contentLeft">
                                                            <h4 className="mt-0">{obj.servicetypename}</h4>
                                                            {(obj.offerdiscount > 0) ?
                                                                <p className="inlinItem text-item pb-2"><del>&#163;<span className="price text-red"> {obj.lowestprice}</span></del> <span className="ml-4">&#163;<span class="pl-1">{obj.lowestprice - obj.offerdiscount / 100 * obj.lowestprice}</span></span></p>
                                                                : <p className="inlinItem text-item pb-2">&#163;<span className="price text-red"> {obj.lowestprice}</span></p>
                                                            }
                                                            <div className="delete">
                                                                <input type="submit" className="btn bg-transparent text-red p-0 mr-4" data-toggle="modal" data-target="#deletecard"
                                                                    rel={obj.servicetypeid} id={obj.categoryid}
                                                                    value="Delete" onClick={this.showWatchlistID}  />
                                                            </div>
                                                        </div>

                                                        <div className="contentRight">
                                                            <img className="icon" src={expertRedIcon} alt="expertRedIcon" />
                                                            <a className="btn bg-transparent"
                                                                href={'/services/' + encodeURI(obj.servicetypename).replace(/%20/g, '-') +
                                                                    '/'}>
                                                                Book Now
                                                            </a>
                                                        </div>

                                                        
                                                    </div>
                                              </div>
                                            </div>

                                          <div className="col-md-12 pt-5">
                                            <nav aria-label="Page navigation" className="text-center">
                                                {listItems}
                                            </nav>
                                          </div>

                                      </div>
                                    )}
                                </div>

                                <div className="modal fade" id="deletecard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col-md-12 d-flex">
                                                        <div>
                                                            <img src={headerporfileicon} style={iconstyle} className="change-to-white" />
                                                        </div>
                                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                                    </div>
                                                    <div className="col-md-12 text-center fs-18 p-5">
                                                        Are you sure you want to delete this service from watchlist?
                                                    </div>
                                                    <div className="col-md-12 d-flex text-right">
                                                        <form className="pt-3 w-100" onSubmit={this.handleSubmit}>
                                                            <input type="submit" value="Remove" className="st_sp_l_btn btn text-white bg-orange" name="remove"
                                                            />
                                                        </form>
                                                        <Link to="" className="btn bg-black text-white mt-3 ml-3" data-dismiss="modal">Cancel</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                          </div>

                          
                      </div>
                  </div>
              </section>

          </div>
        );
    }

    emptyWatchList(watchList) {
        var styles = {
            height: '85px',
        };
        return (

            <div id="MainPageWrapper">

                <SidebarLinks />

                <section className="section-padding customerProfile">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row coloredBox">

                                <div className="col-md-9 pt-4 pb-4">
                                    <p>Your watchlist is empty!</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
