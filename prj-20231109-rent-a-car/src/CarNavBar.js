import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './fkoca_logo.svg';
import store from "./redux/store";


export default class CarNavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navbarOpen: false,
            totalPayAmount: 0,
        }

        this.unsubscribe = store.subscribe(this.calculateTotal);
    }

    calculateTotal = () => {
        let total = 0;
        store.getState().forEach(element => {
            total += Number(element.car.carPrice) * Number(element.totalHour)
        });
        this.setState({ totalPayAmount: total });
    }
    

    /* FlexGrow is a temporary solution for aligning item to the right side*/
    render() {
        return (
            <div>
                <Navbar color="light" expand="md">
                    <NavbarBrand href="#">
                        <img alt="logo" src={logo} style={{ height: 80, width: 80, marginRight: 30 }} />
                        FKoca - Rent A Car
                    </NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({ navbarOpen: !this.state.navbarOpen })} />
                    <Collapse isOpen={this.state.navbarOpen} navbar style={{ flexGrow: "0" }}>
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
                                <NavLink href="#">Bag: {this.state.totalPayAmount}$</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}