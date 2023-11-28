import React, { Component } from "react";
import { Button, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import logo from './fkoca_logo.svg';
import { store, loginUserStore } from "./redux/store";


export default class CarNavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navbarOpen: false,
            totalPayAmount: 0,
            carList: []
        }

        //this.unsubscribe = store.subscribe(this.calculateTotal);
        this.unsubscribeLogin = loginUserStore.subscribe(this.whenUpdatedOrLogin);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.carList !== this.state.carList) {
            this.calculateTotal()
        }
    }


    // when user logged in or current user updated, get the current user info from state 
    whenUpdatedOrLogin = () => {
        this.setState({ carList: [] });
        const currentUser = loginUserStore.getState();
        const carList = currentUser.addedCarsId.map((addedCar) => fetch(`http://localhost:3000/cars/${addedCar.carId}`).then(data => data.json()))
        Promise.all(carList).then(data => {this.setState({carList: data})})
    }

    calculateTotal = () => {
        if (this.state.carList.length === 0)
            return;

        let total = 0;
        const currentUser = loginUserStore.getState();
        currentUser.addedCarsId.forEach(addedCar => {
            let foundCar = this.state.carList.find(car => addedCar.carId === car.id)
            total += Number(addedCar.totalhour) * Number(foundCar.carPrice)
        })
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

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {this.state.totalPayAmount}$
                                </DropdownToggle>
                                <DropdownMenu end>
                                    {this.state.carList.map((element, index) =>
                                        <DropdownItem key={index}>{element.carModel} {element.carBrand}<FontAwesomeIcon onClick={() => console.log(element)} color='red' className='ms-3' icon={faTrash} /></DropdownItem>
                                    )}
                                    <DropdownItem divider />
                                    <DropdownItem tag="a"><Button size='sm' color='danger' disabled={!(this.state.carList.length > 0)}>Reset</Button></DropdownItem>
                                    <DropdownItem tag="a"><Button size='sm' disabled={!(this.state.carList.length > 0)} color='success'>Buy All</Button></DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}