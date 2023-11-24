import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {store} from './redux/store';
import { carAdded } from './redux/actions';


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
            totalHour: 0
        }
    }

    toggleModal = (car = null) => {
        this.setState({ modal: !this.state.modal });
        this.setState({ currentCar: car });
        this.setState({ selectedTime: "" });
        this.setState({ fromDate: "" });
        this.setState({ toDate: "" });
        this.setState({ totalHour: 0 })
    };

    calculateTotalHour = () => {
        let datetimefrom = Date.parse(this.state.fromDate + " " + this.state.selectedTime + ":00")
        let datetimeto = Date.parse(this.state.toDate + " " + this.state.selectedTime + ":00")

        let totalhour = (datetimeto - datetimefrom) / (1000 * 3600)
        store.dispatch(carAdded(this.state.currentCar, totalhour))
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
                                <FormGroup>
                                    <Label for="datefrom">Date From: </Label>
                                    <Input id="datefrom" name="date" placeholder="date placeholder" type="date" onChange={(e) => this.setState({ fromDate: e.target.value })} />

                                    <Label for="dateto"> Date To: </Label>
                                    <Input id="dateto" name="date" placeholder="date placeholder" type="date" onChange={(e) => this.setState({ toDate: e.target.value })} />

                                    <Label for="alongtime">Time: </Label>
                                    <Input id="alongtime" name="time" placeholder="time placeholder" type="time" onChange={(e) => this.setState({ selectedTime: e.target.value })} />

                                </FormGroup>
                            </ModalBody>

                            <ModalFooter>
                                <Button color="success" onClick={() => { this.calculateTotalHour(); this.toggleModal() }}>
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