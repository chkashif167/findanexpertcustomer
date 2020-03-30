import React, { Component } from 'react';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import App from '../../App';
import expertRedIcon from '../../assets/img/expert-red-icon.png';

export class YourWatchlist extends Component {
    displayName = YourWatchlist.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber = params.get('page');

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }

        this.state = { totalPages: '', watchList: [], loading: true, removed: false };

        fetch(App.ApisBaseUrl + '/api/ServiceType/getwatchlist?customerId=' + localStorage.getItem("customerid") + '&pageNumber=' + pageSize + '&pageSize=' + 15 + '&authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({ totalPages: data.pages.totalpages });
                this.setState({ watchList: data.watchlist, loading: false });
                console.log(this.state.watchList);
            })
            .catch((error) => {

                this.state.watchList = [];
            });
    }

    showWatchlistID(e) {

        localStorage.setItem('customerwatchlistid', e.target.id)
        localStorage.setItem('watchlistserviceid', e.target.id)
        localStorage.setItem('watchlistservicetypeid', e.target.id)
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                watchlistid: localStorage.getItem('customerwatchlistid'),
                customerid: localStorage.getItem("customerid"),
                serviceid: localStorage.getItem('watchlistserviceid'),
                servicetypeid: localStorage.getItem('watchlistservicetypeid'),
                iswatchlist: false,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ServiceType/addtowatchlist', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    //this.setState({ removeWatchList: response, removed: true });
                    window.location = '/watchlist';
                }
            });
    }

    render() {

        if (localStorage.getItem('customerid') == null) {
            window.location.href = "/customer-authentication";
        }

        if (this.state.watchList) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.WatchList(this.state.watchList);
            return (
                <div>
                    {contents}
                </div>
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
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 1}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

          <div>

                <div className="col-md-12 pt-4 pb-4">

                                    {watchList.map((wtchlst, index) =>

                                      <div className="row pb-4">

                                          <div className="col-md-12">
                                              <div className="media watchlist-bx profileBox">
                                                  <div className="leftImage">
                                                        {(wtchlst.offerdiscount > 0) ?
                                                            <div class="ribbon ribbonTopLeft"><span>{wtchlst.offerdiscount} %</span></div>
                                                            : ''
                                                        }
                                                        <img className="d-flex" src={App.ApisImageBaseUrl + wtchlst.servicetypeimagepath} alt="Service image" />
                                                        <div class="overlay">
                                                            <h4 class="overlay-text text-white"><strong>{wtchlst.servicename}</strong></h4>
                                                        </div>
                                                  </div>
                                                    <div className="media-body pl-4">
                                                        <div className="contentLeft">
                                                            <h4 className="mt-0 font-weight-bold">{wtchlst.servicetypename}</h4>
                                                            {(wtchlst.offerdiscount > 0) ?
                                                                <p className="inlinItem text-item pb-2"><del>&#163;<span className="price text-red"> {wtchlst.lowestprice}</span></del> <span className="ml-4">&#163;<span class="pl-1">{wtchlst.lowestprice - wtchlst.offerdiscount / 100 * wtchlst.lowestprice}</span></span></p>
                                                                : <p className="inlinItem text-item pb-2">&#163;<span className="price text-red"> {wtchlst.lowestprice}</span></p>
                                                            }
                                                            <div className="delete">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <button type="submit" className="btn text-red p-0 mr-4" name={wtchlst.serviceid} value={wtchlst.servicetypeid} id={wtchlst.watchlistid}
                                                                        onClick={this.showWatchlistID}  ><i class="fas fa-trash-alt"></i></button>
                                                                </form>
                                                            </div>
                                                        </div>

                                                        <div className="contentRight">
                                                            <img className="icon" src={expertRedIcon} alt="expertRedIcon" />
                                                            <a className="btn bg-transparent"
                                                                href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + wtchlst.servicetypename +
                                                                    '&index=' + index + '&serviceid=' + wtchlst.serviceid + '&servicename=' +
                                                                    wtchlst.servicename + '&servicetypeid=' + wtchlst.servicetypeid + '&srvtypename=' +
                                                                    wtchlst.servicetypename + '&inclinic=' + wtchlst.inclinic + '&inhouse=' +
                                                                    wtchlst.inhouse + '&isgeneric=' + wtchlst.isgeneric + '&peakhours='
                                                                    + wtchlst.peakhours + '&endpeakhours=' + wtchlst.end_peakhours + '&offerdiscount='
                                                                    + wtchlst.offerdiscount + '&hasarea=' + wtchlst.hasarea))}>Book Now</a>
                                                        </div>
                                                        
                                                    </div>
                                              </div>
                                          </div>

                                      </div>
                                    )}
                </div>

                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        {listItems}
                    </nav>
                </div>

          </div>
        );
    }
}
