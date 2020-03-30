import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Route } from 'react-router';

export class SimpleLayout extends Component {
    displayName = SimpleLayout.name

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12} className="section-wrapper">
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
