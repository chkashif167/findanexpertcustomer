import React, { Component } from 'react';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import App from '../../App';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export class InfiniteScroller extends Component {
    displayName = InfiniteScroller.name

    constructor(props) {
        super(props);

        this.state = {
            allServices: [],
            items: []
        };
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        fetch(App.ApisBaseUrl + '/api/ServiceType/getcustomerpreference?authToken=' + customerAccesstoken + '&pagenumber=1&pagesize=8')
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                var newArray = this.state.allServices.slice();
                newArray.push(response.data);

                var newArray1 = this.state.servicesList.slice();
                for (var i = 0; i < newArray[0].length; i++) {

                    this.state.allServices.push(newArray[0][i]);
                }

                //this.setState({ items: this.state.allServices, loading: true });
                //console.log(this.state.items);

                setTimeout(() => {
                    this.setState({
                        items: this.state.allServices.concat(Array.from({ length: 6 }))
                    });
                }, 1500);

                console.log("Hello" + this.state.items);
            })

            .catch((error) => {

                this.state.items = [];
            });

        //setTimeout(() => {
        //    this.setState({
        //        items: this.state.items.concat(Array.from({ length: 20 }))
        //    });
        //}, 1500);
    };
      

    render() {
        return (
          <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <ul>
                        {this.state.items.map((srvtype) =>
                            <li>
                                <div className="onlyForYou">
                                    <Link to={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                                        '/'} >
                                        <img className="card-img-top" src={App.ApisImageBaseUrl + srvtype.servicetypeimagepath}
                                            alt={srvtype.servicetypename} />
                                        <h5 className="text-center">{srvtype.servicetypename}</h5>
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ul>
                </InfiniteScroll>
          </div>
        );
    }
}

