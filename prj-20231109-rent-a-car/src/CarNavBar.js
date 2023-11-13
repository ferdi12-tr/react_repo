import React, {useState} from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './fkoca_logo.svg';

import store from "./redux/store";

let setTotalPayAmountFunc;

const calculateTotal = () => {
    let total = 0;
    store.getState().forEach(element => {
        total += Number(element.car.carPrice)
    });
    setTotalPayAmountFunc(total);
    console.log("Total amount: " + total)
}

const unsubscribe = store.subscribe(calculateTotal);




export default function CarNavBar() {
    
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggle = () => setNavbarOpen(!navbarOpen);
    const [totalPayAmount, setTotalPayAmount] = useState(0);

    setTotalPayAmountFunc = setTotalPayAmount;


    
    /* FlexGrow is a temporary solution for aligning item to the right side*/
    return (
        <div>
            <Navbar color="light" expand="md">
                <NavbarBrand href="#">
                    <img alt="logo" src={logo} style={{ height: 80, width: 80, marginRight:30}}/>
                    FKoca - Rent A Car
                </NavbarBrand>
                <NavbarToggler onClick={navbarToggle} />
                <Collapse isOpen={navbarOpen} navbar style={{flexGrow:"0"}}> 
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Main Page</NavLink>
                        </NavItem>

                        <NavItem> 
                            <NavLink href="#">About Us</NavLink>
                        </NavItem>

                        <NavItem> 
                            <NavLink href="#">Gallery</NavLink>
                        </NavItem>

                        <NavItem> 
                            <NavLink href="#">Sign Up</NavLink>
                        </NavItem>
                        <NavItem> 
                            <NavLink href="#">Bag: {totalPayAmount}$</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}