import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import googleMapsKey from '../GoogleMapsKey';

export default class Location extends Component {

    constructor(props) {
        super(props);
        this.setDisplayMap = this.props.setDisplayMap

        this.state = {
            locations: [],
            defaultCenter: {
                lat: 40.92314334391547,
                lng: 29.31636180797253
            },
            defaultZoom: 10
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/locations")
            .then(db => db.json())
            .then(data => {
                this.setState({ locations: data })
                console.log(data)
            })
    }

    render() {
        return (
            <div>
                <Container className='mt-5'>
                    <Row className=''>
                        <Col xs="1">
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => this.setDisplayMap(false)} className='fa-xl' />
                        </Col>
                        <Col xs="4" className='pe-5 pt-5'>
                            {
                                this.state.locations.map((location, index) =>
                                    <Row key={index} className='mb-5 pe-auto' onClick={() => this.zoomWhenLocationClicked(location)} style={{ cursor: 'pointer' }}>
                                        <h4>{location.locationName}</h4>
                                        <p><strong>Phone: </strong>{location.phone}</p>
                                        <p><strong>Email: </strong>{location.email}</p>
                                        <hr />
                                    </Row>
                                )
                            }

                        </Col>
                        <Col xs="7" className=''>
                            <div style={{ height: '75vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: googleMapsKey }}
                                    defaultCenter={this.state.defaultCenter}
                                    defaultZoom={this.state.defaultZoom}
                                >
                                    {
                                        this.state.locations.map((location, index) =>
                                            <FontAwesomeIcon
                                                key={index}
                                                className='fa-2xl'
                                                lat={location.lat}
                                                lng={location.lng}
                                                icon={faLocationDot}
                                            />
                                        )
                                    }
                                </GoogleMapReact>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}
