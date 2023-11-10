import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarCard({car}) {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <><button onClick={toggle} style={{border:"none", background:"none", padding:0} }>

            <div className="card text-bg-dark mb-3">
                <img src={car.carUrl} className="card-img" height={"150px"} style={{opacity: 0.7}} alt="..."/>
                <div className="card-img-overlay">
                    <h5 className="card-title">{car.carModel} - {car.carBrand}</h5>
                    <p className="card-text"><small>Price: {Number(car.price)}</small></p>
                </div>
            </div>

        </button>
        <div>
            {/* <Button color="danger" onClick={toggle}>
            Click Me
            </Button> */}
            <Modal isOpen={modal} toggle={toggle} backdrop={true} fade={true}>
            <Input type='text'/>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                Cancel
                </Button>
            </ModalFooter>
            </Modal>
        </div>
        </>
    )
}