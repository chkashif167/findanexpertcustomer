import React, { Component } from 'react';
import App from '../App';

export class MainSlider extends Component {
    displayName = MainSlider.name

    constructor(props) {
        super(props);
        this.state = { sliderimages: [], loading: true };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ IsForMobile: true })
        };

        fetch(App.ApisBaseUrl + '/api/Image/getsliderimages', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ sliderimages: data, loading: false });
            });
    }

    static renderForecastsTable(sliderimages) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {sliderimages.map(si =>
                        <tr key={si.sliderid}>
                            <td>{si.sliderid}</td>
                            <td><img class="card-img-top" src={App.ApisBaseUrl + si.imagepath} alt="Card image cap" /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : MainSlider.renderForecastsTable(this.state.sliderimages);

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}

MainSlider.defaultProps = {
    sliderimages: []
}

export default MainSlider;
