import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import { carAdded, carRemoved } from './redux/actions';


export default function CarCard({car}) {

    const [modal, setModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(null)
    const [selectedTime, setSelectedTime] = useState("") 
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [totalHour, setTotalHour] = useState(0);

    const toggleModal = (car=null) => {
        setModal(!modal)
        setCurrentCar(car)
        setSelectedTime("");
        setFromDate("");
        setToDate("");
        setTotalHour(0);
    };

    const modalBookBtn = () => {
        calculateTotalHour()
    }

    const getFromDate = (date) => setFromDate(date);
    const getToDate = (date) => setToDate(date);
    const getSelectedTime = (time) => setSelectedTime(time);

    const calculateTotalHour = () => {
        let datetimefrom = Date.parse(fromDate + " " + selectedTime + ":00")
        let datetimeto = Date.parse(toDate + " " + selectedTime + ":00")

        setTotalHour((datetimeto - datetimefrom) / (1000 * 3600));
    }

    const addingDispatcher = () => {
        store.dispatch(carAdded(currentCar, totalHour))
    }

    return (
        <>
            <button onClick={() => toggleModal(car)} style={{border:"none", background:"none", padding:0} }>
                <div>
                    <Card inverse className="mt-3">
                        <CardImg alt="Card image cap" src={car.carUrl} style={{height: 270}} width="100%" />
                        <CardImgOverlay>
                            <CardTitle tag="h5">
                                {car.carModel} - {car.carBrand}
                            </CardTitle>
                            <CardText>
                                <small>Price: {car.carPrice} $</small>
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </div>
            </button>
            <div>
                {currentCar && 
                <Modal isOpen={modal} toggle={toggleModal} backdrop={true} fade={true}>
                    <ModalHeader toggle={toggleModal}>
                        {"Car Brand: " + currentCar.carBrand + " Car Model: " + currentCar.carModel}
                    </ModalHeader>
                    <ModalBody>
                        <img src={car.carUrl} className="card-img" height={"auto"} width={"auto"} alt="..."/>
                        <p>Be able to book this car, please enter the date to calculate pay amount.</p>
                        <strong>Car Per Hour Price: {car.carPrice} $</strong>
                        <hr />
                        <FormGroup>
                            <Label for="datefrom">Date From: </Label>
                            <Input id="datefrom" name="date" placeholder="date placeholder" type="date" onChange={(e) => getFromDate(e.target.value)}/>

                            <Label for="dateto"> Date To: </Label>
                            <Input id="dateto" name="date"  placeholder="date placeholder" type="date" onChange={(e) => getToDate(e.target.value)}/>
                        
                            <Label for="alongtime">Time: </Label>
                            <Input id="alongtime" name="time"  placeholder="time placeholder" type="time" onChange={(e) => getSelectedTime(e.target.value)}/>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={() => {modalBookBtn(); addingDispatcher();  toggleModal();}}>
                            Book
                        </Button>
                        <Button color="danger" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>}
            </div>
        </>
    )
}