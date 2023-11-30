import React, { Component } from "react";
import { Button, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import logo from './fkoca_logo.svg';
import { loginUserStore } from "./redux/store";
//import { store, loginUserStore } from "./redux/store";
import { loginUser } from './redux/actions';


export default class CarNavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navbarOpen: false,
            totalPayAmount: 0,
            carList: []
        }

        this.setUpdateCar = this.props.setUpdateCar;
        this.setDisplayMap = this.props.setDisplayMap
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
        const carList = currentUser.addedCars.map((addedCar) => fetch(`http://localhost:3000/cars/${addedCar.carId}`).then(data => data.json()))
        Promise.all(carList).then(data => { this.setState({ carList: data }) })
    }

    calculateTotal = () => {
        if (this.state.carList.length === 0) {
            this.setState({ totalPayAmount: 0 });
            return;
        }

        let total = 0;
        const currentUser = loginUserStore.getState();
        currentUser.addedCars.forEach(addedCar => {
            let foundCar = this.state.carList.find(car => addedCar.carId === car.id)
            total += Number(addedCar.totalhour) * Number(foundCar.carPrice)
        })
        this.setState({ totalPayAmount: total });
    }

    deleteIconNavBar = (deletedCar) => {
        const currentUser = loginUserStore.getState();
        const afterDeleteList = currentUser.addedCars.filter(car => car.carId !== deletedCar.id);

        const updatedUser = {
            ...currentUser,
            addedCars: afterDeleteList
        }

        loginUserStore.dispatch(loginUser(updatedUser))

        fetch(`http://localhost:3000/users/${currentUser.id}`, { // also, send the info to json db
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
    }

    removeAllBtnNavBar = () => {
        const currentUser = loginUserStore.getState();

        const updatedUser = {
            ...currentUser,
            addedCars: []
        }

        loginUserStore.dispatch(loginUser(updatedUser))

        fetch(`http://localhost:3000/users/${currentUser.id}`, { // also, send the info to json db
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
    }

    updateIconNavBar = (updatedCar) => {
        this.setUpdateCar(updatedCar)
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
                                <NavLink href="#" onClick={() => this.setDisplayMap(true)}>Locations</NavLink>
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
                                        <DropdownItem key={index}>{element.carModel} {element.carBrand}
                                            <FontAwesomeIcon onClick={() => this.deleteIconNavBar(element)} color='red' className='ms-3 fa-xl' icon={faTrash} />
                                            <FontAwesomeIcon onClick={() => this.updateIconNavBar(element)} color='yellow' className='ms-3 fa-xl' icon={faPenToSquare} />
                                        </DropdownItem>
                                    )}
                                    <DropdownItem divider />
                                    <DropdownItem tag="a"><Button onClick={this.removeAllBtnNavBar} size='sm' color='danger' disabled={!(this.state.carList.length > 0)}>Remove All</Button></DropdownItem>
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