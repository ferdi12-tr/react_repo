import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { loginUserStore } from './redux/store';
import { loginUser } from './redux/actions';
import DisplayCar from './Components/DisplayCar';

export default class UpdateCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateCar: this.props.getUpdateCar(),
            selectedTime: "",
            fromDate: "",
            toDate: "",
            locations: [],
            pickupLocation: "",
            returnLocation: "",
            message: "Updated successfully"
        }
        this.setUpdateCar = this.props.setUpdateCar;
    }

    calculateTotalHour = () => {
        let datetimefrom = Date.parse(this.state.fromDate + " " + this.state.selectedTime + ":00")
        let datetimeto = Date.parse(this.state.toDate + " " + this.state.selectedTime + ":00")

        let totalhour = (datetimeto - datetimefrom) / (1000 * 3600)
        return totalhour;
    }

    componentDidMount() {
        this.currentUser = loginUserStore.getState();
        this.updateCar = this.props.getUpdateCar();

        const carInfoToUpdate = this.currentUser.addedCars.find(car => car.carId === this.updateCar.id);

        this.setState({ fromDate: carInfoToUpdate.fromDate })
        this.setState({ toDate: carInfoToUpdate.toDate })
        this.setState({ selectedTime: carInfoToUpdate.selectedTime })
        this.setState({ pickupLocation: carInfoToUpdate.pickupLocation })
        this.setState({ returnLocation: carInfoToUpdate.returnLocation })

        fetch("http://localhost:3000/locations")
            .then(db => db.json())
            .then(data => {
                this.setState({ locations: data })
            })
    }

    updateCarButton = () => {
        let updatedCarInfo = Object();
        updatedCarInfo.carId = this.updateCar.id;
        updatedCarInfo.fromDate = this.state.fromDate;
        updatedCarInfo.toDate = this.state.toDate;
        updatedCarInfo.selectedTime = this.state.selectedTime;
        updatedCarInfo.totalhour = this.calculateTotalHour();
        updatedCarInfo.pickupLocation = this.state.pickupLocation;
        updatedCarInfo.returnLocation = this.state.returnLocation;

        const addedCars = this.currentUser.addedCars.filter(car => car.carId !== this.updateCar.id);
        addedCars.push(updatedCarInfo);


        const updatedUser = {
            ...this.currentUser,
            addedCars: addedCars
        }

        loginUserStore.dispatch(loginUser(updatedUser))

        fetch(`http://localhost:3000/users/${this.currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .catch(e => this.setState({ message: "Cannot update successfully" }))

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

                                    <FormGroup row>
                                        <Label sm={4} for="PickUpLocation'">Pick-Up Location</Label>
                                        <Input sm={8} onChange={e => this.setState({ pickupLocation: e.currentTarget.value })} type="select" name="PickUpLocation" id="PickUpLocation">
                                            {this.state.locations.map((location, index) => {
                                                if (location.locationName === this.state.pickupLocation)
                                                    return <option selected key={index} value={location.locationName}>{location.locationName}</option>
                                                return <option key={index} value={location.locationName}>{location.locationName}</option>
                                            })}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm={4} for="ReturnLocation'">Return Location</Label>
                                        <Input sm={8} onChange={e => this.setState({ returnLocation: e.currentTarget.value })} type="select" name="ReturnLocation" id="ReturnLocation">
                                            {this.state.locations.map((location, index) => {
                                                if (location.locationName === this.state.returnLocation)
                                                    return <option selected key={index} value={location.locationName}>{location.locationName}</option>
                                                return <option key={index} value={location.locationName}>{location.locationName}</option>
                                            })}
                                        </Input>
                                    </FormGroup>

                                    <Button color="success" onClick={this.updateCarButton}>Update</Button>
                                </Form>
                            </Col>
                        </Row>}
                </Container>
            </div>
        )
    }
}
