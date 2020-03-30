import React, { Component } from 'react';

export class OffersThree extends Component {
    displayName = OffersThree.name

    render() {

        var bg = {
            background: 'url(https://mdbootstrap.com/img/Photos/Horizontal/Things/full%20page/img%20%287%29.jpg)'
        }
        var rgb = {
            background: '-webkit-linear-gradient(45deg,rgba(255,88,88,.7),rgba(238,66,146,.8) 100%)'
        }

        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row section-padding">

                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="https://mdbootstrap.com/img/Photos/Others/images/66.jpg" width="100%" />
                                    </div>
                                    <div className="col-md-6">
                                        <h3 className="section-title pb-2"><strong>Offer three</strong></h3>
                                        <p className="">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo animi soluta ratione quisquam,
                                            dicta ab cupiditate iure eaque? Repellendus voluptatum, magni impedit delectus, beatae maxime temporibus maiores quibusdam.
                                        </p>
                                        <p className="">
                                            Rem magnam ad perferendis iusto sint tempora ea voluptatibus iure, animi excepturi modi aut possimus in hic molestias repellendus
                                            illo ullam odit quia velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        </p>
                                        <p className="">
                                            Incidunt eligendi mollitia labore ipsum ex fugit explicabo saepe error neque beatae in, expedita eveniet quae aliquam assumenda voluptatibus!
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                <div className="row pb-5">
                                    <div className="text-center">
                                        <h3 className="section-title pb-2"><strong>Build your brand with us</strong></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum quas, eos officia maiores ipsam ipsum dolores reiciendis ad voluptas,
                                            animi obcaecati adipisci sapiente mollitia.</p>
                                    </div>
                                </div>

                                <div class="row pt-5 wow fadeIn" data-wow-delay="0.4s">

                                    <div class="col-lg-4 col-md-12">

                                        <div class="row mb-3">
                                            <div class="col-2">
                                                <i class="fas fa-edit text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">Modern design</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                                    minima.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-2">
                                                <i class="fas fa-cogs text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">Easy customize</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                                    minima assumenda.</p>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-2">
                                                <i class="fas fa-tablet-alt text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">Responsive layouts</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam.</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-lg-4 col-md-12 mb-1 text-center text-md-left">
                                        <img src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png" alt="" class="z-depth-0 img-fluid" />
                                    </div>

                                    <div class="col-lg-4 col-md-12">

                                        <div class="row mb-3">
                                            <div class="col-2">
                                                <i class="fas fa-chart-line text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">Optymized for SEO</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam.</p>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-2">
                                                <i class="fas fa-users text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">Technical support</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                                    minima assumenda.</p>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-2">
                                                <i class="far fa-gem text-red fa-2x"></i>
                                            </div>
                                            <div class="col-10 mb-2">
                                                <h4 class="font-weight-bold title mt-0">igh quality</h4>
                                                <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam
                                                    minima.
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row section-padding">
                            <div class="card card-image" style={bg}>
                                <div class="text-white text-center overlay p-5" style={rgb}>
                                    <div class="py-5">
                                        <h2 class="card-title h2 my-4 py-2">Jumbotron with image overlay</h2>
                                        <p class="mb-4 pb-2 px-md-5 mx-md-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur obcaecati vero aliquid libero doloribus ad,
                                            unde tempora maiores, ullam, modi qui quidem minima debitis perferendis vitae cumque et quo impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur obcaecati vero aliquid libero doloribus ad,
                                            unde tempora maiores, ullam, modi qui quidem minima debitis perferendis vitae cumque et quo impedit.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container">
                        <div className="row section-padding">

                            <div className="col-md-12">
                                <div className="row">

                                    <div className="col-md-4">

                                        <div class="card">

                                            <div class="view overlay">
                                                <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="Card image cap" />
                                                <a>
                                                    <div class="mask rgba-white-slight"></div>
                                                </a>
                                            </div>

                                            <div class="card-body">
                                                <h4 class="card-title">Card title</h4>
                                                <hr />
                                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>

                                            <div class="bg-black rounded-bottom mdb-color lighten-3 text-center pt-3">
                                                <ul class="list-unstyled list-inline font-small">
                                                    <li class="list-inline-item pr-2 text-white"><i class="far fa-clock pr-1"></i>05/10/2015</li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="far fa-comments pr-1"></i>12</a></li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="fab fa-facebook-f pr-1"> </i>21</a></li>
                                                    <li class="list-inline-item"><a href="#" class="text-white"><i class="fab fa-twitter pr-1"> </i>5</a></li>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div class="card">

                                            <div class="view overlay">
                                                <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/48.jpg" alt="Card image cap" />
                                                <a>
                                                    <div class="mask rgba-white-slight"></div>
                                                </a>
                                            </div>

                                            <div class="card-body">
                                                <h4 class="card-title">Card title</h4>
                                                <hr />
                                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>

                                            <div class="bg-black rounded-bottom mdb-color lighten-3 text-center pt-3">
                                                <ul class="list-unstyled list-inline font-small">
                                                    <li class="list-inline-item pr-2 text-white"><i class="far fa-clock pr-1"></i>05/10/2015</li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="far fa-comments pr-1"></i>12</a></li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="fab fa-facebook-f pr-1"> </i>21</a></li>
                                                    <li class="list-inline-item"><a href="#" class="text-white"><i class="fab fa-twitter pr-1"> </i>5</a></li>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div class="card">

                                            <div class="view overlay">
                                                <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/77.jpg" alt="Card image cap" />
                                                <a>
                                                    <div class="mask rgba-white-slight"></div>
                                                </a>
                                            </div>

                                            <div class="card-body">
                                                <h4 class="card-title">Card title</h4>
                                                <hr />
                                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>

                                            <div class="bg-black rounded-bottom mdb-color lighten-3 text-center pt-3">
                                                <ul class="list-unstyled list-inline font-small">
                                                    <li class="list-inline-item pr-2 text-white"><i class="far fa-clock pr-1"></i>05/10/2015</li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="far fa-comments pr-1"></i>12</a></li>
                                                    <li class="list-inline-item pr-2"><a href="#" class="text-white"><i class="fab fa-facebook-f pr-1"> </i>21</a></li>
                                                    <li class="list-inline-item"><a href="#" class="text-white"><i class="fab fa-twitter pr-1"> </i>5</a></li>
                                                </ul>
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
