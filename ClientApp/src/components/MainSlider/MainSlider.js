import React, { Component } from 'react';
import App from '../../App';
import loader from '../../assets/img/loader.gif';

export class MainSlider extends Component {
    displayName = MainSlider.name

    constructor(props) {
        super(props);
        this.state = { apiResponse: '', sliderimages: [], loading: true };

        var screenSize = window.screen.width;
        if (screenSize == '767' || screenSize <= '767') {
            var isMobile = true;
        }
        else {
            var isMobile = false;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ismobile: isMobile })
        };
        
        fetch(App.ApisBaseUrl + '/api/Image/getsliderimages', requestOptions)
            .then(response => {
                this.setState({ apiResponse: response.status });
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (this.state.apiResponse == '200') {
                    this.setState({ sliderimages: data, loading: false });
                }
            })
            .catch((error) => {

                this.state.sliderimages = [];
            });
    }

    render() {
        if (this.state.sliderimages != '') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderSliderImages(this.state.sliderimages);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noSliderImages()
            );
        }
    }

    renderSliderImages(sliderimages) {
        return (
            <div className="carousel-inner" role="listbox" id="main-slider">
                
                <li className="carousel-item active">
                    <img className="d-block w-100" src={App.ApisBaseUrl + sliderimages[0].imagepath} alt="" />
                </li>
                
                {sliderimages.map(si =>
                    <li className="carousel-item" key={si.sliderid}>
                        <img className="d-block w-100" src={App.ApisBaseUrl + si.imagepath} alt="" />
                    </li>
                )}

            </div>
        );
    }

    noSliderImages() {
        return (
            <div className="carousel-inner" role="listbox" id="main-slider">
                <li className="carousel-item active">
                    <img className="d-block w-100" src={App.StaticImagesUrl + 'web_banner1.png'} alt="" />
                </li>
            </div>
        );
    }

    
}

MainSlider.defaultProps = {
    sliderimages: []
}

export default MainSlider;
