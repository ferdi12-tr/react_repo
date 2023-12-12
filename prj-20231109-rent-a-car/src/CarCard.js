import React, { Component } from "react";
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { store, loginUserStore } from './redux/store';
import { carAdded, loginUser } from './redux/actions';


export default class CarCard extends Component {

    constructor(prop) {
        super(prop)
        this.car = prop.car;
        this.state = {
            modal: false,
            currentCar: null,
            selectedTime: "",
            fromDate: "",
            toDate: "",
            totalHour: 0,
            locations: [],
            pickupLocation: "",
            returnLocation: "",
            validationMessage: ""
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/locations")
            .then(db => db.json())
            .then(data => {
                this.setState({ locations: data })
            })
    }

    validateInput = () => {
        if (!(this.state.selectedTime
            && this.state.fromDate
            && this.state.toDate
            && this.state.pickupLocation
            && this.state.returnLocation
        )) {
            this.setState({ validationMessage: "Please fill in all blanks" })
            return;
        }
        else {
            this.toggleModal();
            this.calculateTotalHour();
        }
    }

    toggleModal = (car = null) => {
        this.setState({ modal: !this.state.modal });
        this.setState({ currentCar: car });
        this.setState({ selectedTime: "" });
        this.setState({ fromDate: "" });
        this.setState({ toDate: "" });
        this.setState({ totalHour: 0 })
        this.setState({ pickupLocation: "" });
        this.setState({ returnLocation: "" });
        this.setState({ validationMessage: "" })
    };

    calculateTotalHour = () => {
        let datetimefrom = Date.parse(this.state.fromDate + " " + this.state.selectedTime + ":00")
        let datetimeto = Date.parse(this.state.toDate + " " + this.state.selectedTime + ":00")

        let totalhour = (datetimeto - datetimefrom) / (1000 * 3600)
        store.dispatch(carAdded(this.state.currentCar, totalhour))

        let bookedCarObj = Object();
        bookedCarObj.carId = store.getState().car.id;
        bookedCarObj.totalhour = totalhour;
        bookedCarObj.fromDate = this.state.fromDate;
        bookedCarObj.toDate = this.state.toDate;
        bookedCarObj.selectedTime = this.state.selectedTime;
        bookedCarObj.pickupLocation = this.state.pickupLocation;
        bookedCarObj.returnLocation = this.state.returnLocation;
        this.updateAddedCarsId(bookedCarObj);
    }

    updateAddedCarsId = async (bookedCarObj) => {
        const currentUser = loginUserStore.getState();

        const updatedUser = {
            ...currentUser,
            addedCars: currentUser.addedCars.concat([bookedCarObj])
        }

        loginUserStore.dispatch(loginUser(updatedUser)) // update current user info with updated car info

        fetch(`http://localhost:3000/users/${currentUser.id}`, { // also, send the info to json db
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
    }

    render() {
        return (
            <>
                <button onClick={() => this.toggleModal(this.car)} style={{ border: "none", background: "none", padding: 0 }}>
                    <div>
                        <Card inverse className="mt-3">
                            <CardImg alt="Card image cap" src={this.car.carUrl} style={{ height: 270 }} width="100%" />
                            <CardImgOverlay>
                                <CardTitle tag="h5">
                                    {this.car.carModel} - {this.car.carBrand}
                                </CardTitle>
                                <CardText>
                                    <small>Price: {this.car.carPrice} $</small>
                                </CardText>
                            </CardImgOverlay>
                        </Card>
                    </div>
                </button>
                <div>
                    {this.state.currentCar &&
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop={true} fade={true}>
                            <ModalHeader toggle={this.toggleModal}>
                                {"Car Brand: " + this.state.currentCar.carBrand + " Car Model: " + this.state.currentCar.carModel}
                            </ModalHeader>
                            <ModalBody>
                                <img src={this.state.currentCar.carUrl} className="card-img" height={"auto"} width={"auto"} alt="..." />
                                <p>Be able to book this car, please enter the date to calculate pay amount.</p>
                                <strong>Car Per Hour Price: {this.state.currentCar.carPrice} $</strong>
                                <hr />
                                <Form >
                                    <FormGroup>
                                        <Label for="datefrom">Date From: </Label>
                                        <Input id="datefrom" name="date" placeholder="date placeholder" type="date" onChange={(e) => this.setState({ fromDate: e.target.value })} />

                                        <Label for="dateto"> Date To: </Label>
                                        <Input id="dateto" name="date" placeholder="date placeholder" type="date" onChange={(e) => this.setState({ toDate: e.target.value })} />

                                        <Label for="alongtime">Time: </Label>
                                        <Input id="alongtime" name="time" placeholder="time placeholder" type="time" onChange={(e) => this.setState({ selectedTime: e.target.value })} />

                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="PickUpLocation'">Pick-Up Location</Label>
                                        <Input onChange={e => this.setState({ pickupLocation: e.currentTarget.value })} type="select" name="PickUpLocation" id="PickUpLocation">
                                            <option value="">Select Pick-Up Location</option>
                                            {this.state.locations.map((location, index) => <option key={index} value={location.locationName}>{location.locationName}</option>)}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="ReturnLocation'">Return Location</Label>
                                        <Input onChange={e => this.setState({ returnLocation: e.currentTarget.value })} type="select" name="ReturnLocation" id="ReturnLocation">
                                            <option value="">Select Return Location</option>
                                            {this.state.locations.map((location, index) => <option key={index} value={location.locationName}>{location.locationName}</option>)}
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </ModalBody>

                            <p className="text-danger h5 text-center">{this.state.validationMessage}</p>
                            <ModalFooter>
                                <Button color="success" onClick={() => { this.validateInput() }}>
                                    Book
                                </Button>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>}
                </div>
            </>
        )
    }
}