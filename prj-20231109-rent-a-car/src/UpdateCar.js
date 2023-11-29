import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { loginUserStore } from './redux/store';
import DisplayCar from './Components/DisplayCar';

export default class UpdateCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateCar: this.props.getUpdateCar(),
            updateCarInfo: null,
            selectedTime: "",
            fromDate: "",
            toDate: "",
            totalHour: 0
        }
        this.setUpdateCar = this.props.setUpdateCar;
    }

    componentDidMount() {
        const currentUser = loginUserStore.getState();
        const updateCar = this.props.getUpdateCar();

        const carInfoToUpdate = currentUser.addedCars.find(car => car.carId === updateCar.id);

        this.setState({ updateCarInfo: carInfoToUpdate })
        this.setState({ fromDate: carInfoToUpdate.fromDate })
        this.setState({ toDate: carInfoToUpdate.toDate })
        this.setState({ selectedTime: carInfoToUpdate.selectedTime })
    }

    render() {
        return (
            <div>
                <div className='d-flex justify-content-around'>
                </div>
                <Container>
                    <Row>
                        <Col xs="1">
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => this.setUpdateCar(null)} className='fa-xl' />
                        </Col>
                        <Col xs="11" className='d-flex justify-content-center'>
                            <h3><u>Update Car</u></h3>
                        </Col>
                    </Row>
                    {this.state.updateCar &&
                        <Row className='mt-5'>
                            <Col xs="5">
                                <DisplayCar car={this.state.updateCar} />
                            </Col>
                            <Col xs="7" className='mt-5'>
                                <Form>
                                    <FormGroup row>
                                        <Label for="datefrom" sm={3}>Date From: </Label>
                                        <Col sm={9}>
                                            <Input value={this.state.fromDate} id="datefrom" name="date" placeholder="" type="date" onChange={(e) => this.setState({ fromDate: e.target.value })} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="dateto" sm={3}> Date To: </Label>
                                        <Col sm={9}>
                                            <Input value={this.state.toDate} id="dateto" name="date" placeholder="date placeholder" type="date" onChange={(e) => this.setState({ toDate: e.target.value })} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="alongtime" sm={3}>Time: </Label>
                                        <Col sm={9}>
                                            <Input value={this.state.selectedTime} id="alongtime" name="time" placeholder="time placeholder" type="time" onChange={(e) => this.setState({ selectedTime: e.target.value })} />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>}
                </Container>
            </div>
        )
    }
}
