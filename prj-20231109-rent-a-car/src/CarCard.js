import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarCard({car}) {

    const [modal, setModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(null)

    const toggleModal = (car=null) => {
        setModal(!modal)
        if(car) {
            setCurrentCar(car)
        }
        else {
            setCurrentCar(null)
        }
    };

    return (
        <><button onClick={() => toggleModal(car)} style={{border:"none", background:"none", padding:0} }>

            <div className="card text-bg-dark mb-3">
                <img src={car.carUrl} className="card-img" height={"150px"} style={{opacity: 0.7}} alt="..."/>
                <div className="card-img-overlay">
                    <h5 className="card-title">{car.carModel} - {car.carBrand}</h5>
                    <p className="card-text"><small>Price: {Number(car.price)}</small></p>
                </div>
            </div>

        </button>
        <div>
            <Modal isOpen={modal} toggle={toggleModal} backdrop={true} fade={true}>
                <ModalHeader toggle={toggleModal}>{"Car Brand: " + currentCar.carBrand + " Car Model: " + currentCar.carModel}</ModalHeader>
                <ModalBody>
                    To preceed booking this car, please enter the date to calculate pay amount.
                    Car Per Hour Price: {car.price}
                    <FormGroup>
                        <Label for="exampleDate">Date From: </Label>
                        <Input id="exampleDate" name="date" placeholder="date placeholder" type="date"/>

                        <Label for="exampleDate"> Date To: </Label>
                        <Input id="exampleDate" name="date"  placeholder="date placeholder" type="date"/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={toggleModal}>
                        Book
                    </Button>
                    <Button color="danger" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    )
}