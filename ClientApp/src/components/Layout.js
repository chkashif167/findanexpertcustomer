import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './Navbar/NavMenu';
import { Footer } from './Footer/Footer';

export class Layout extends Component {
  displayName = Layout.name
    
    render() {
        window.scrollTo(0, 0);
    return (
        <Grid fluid>
            <div id="stickysidebarButton">
              <a href="tel:+442070997738">
                <i class="fas fa-phone"></i>
              </a>
            </div>

            <Row>
                <NavMenu />
                <Col sm={12} className="section-wrapper">
                    {this.props.children}
                </Col>
                <Footer />
            </Row>
      </Grid>
    );
  }
}
