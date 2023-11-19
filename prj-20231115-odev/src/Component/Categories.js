import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, Button, NavLink, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



class Categories extends Component {

    state = {
        activeCategoryId: null,
    };

    handleCategoryClick = (kategoriId) => {
        console.log('Seçilen kategori:', kategoriId);
        this.props.onCategorySelect(kategoriId);
        this.setState({ activeCategoryId: kategoriId })
    };

    render() {
        return (
            <div className='mt-3'>
                <Navbar color="light" expand="md">
                    <NavbarToggler className="mt-3" />
                    <NavbarBrand>
                        <img src="./fkoca_logo.svg" alt="img" />
                    </NavbarBrand>
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            {this.props.kategoriler.map((kategori, index) => (
                                <NavItem key={index}>
                                    <NavLink
                                        href='#'
                                        color="link"
                                        onClick={() => this.handleCategoryClick(kategori.id)}
                                    >
                                        <Button outline color='success' active={this.state.activeCategoryId === kategori.id}>
                                            {kategori.ad}
                                        </Button>
                                    </NavLink>
                                </NavItem>
                            ))}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    My Bag - {this.props.bag.length}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.props.bag.map((element, index) =>
                                        <DropdownItem key={index}>{element.id} price: {element.price} $ <FontAwesomeIcon onClick={() => this.props.deleteItemFromBag(element)} color='red' className='ms-3' icon={faTrash} /></DropdownItem>
                                    )}
                                    <DropdownItem divider />
                                    <DropdownItem><Button size='sm' onClick={this.props.resetBag} color='danger' disabled={!(this.props.bag.length > 0)}>Reset</Button></DropdownItem>
                                    <DropdownItem><Button size='sm' disabled={!(this.props.bag.length > 0)} color='success'>Buy All</Button></DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
// ddoktor hatırlatıcı
// randevu
// fetch ile put db json
// hastane için furkanın hastane kısmına bak
export default Categories;