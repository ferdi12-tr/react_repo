import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './Component/Header';
import Headline from './Component/Headline';
import Products from './Component/Products';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: null,
      selectedItem: null,
      showModal: false,
      bag: []
    };
  }

  addBag = (item) => {
    this.state.bag.push(item)
  }

  resetBag = ( ) => {
    this.setState({bag: []})
  } 

  deleteItemFromBag = (deleted) => {
    let newBag = this.state.bag.filter((item) => item.id !== deleted.id);
    this.setState({bag:newBag});
  }

  handleCategorySelect = (selectedCategoryId) => {
    this.setState({ selectedCategoryId });
  };

  openModal = (item) => {
    this.setState({ selectedItem: item, showModal: true });
  };

  closeModal = () => {
    this.setState({ selectedItem: null, showModal: false });
  };

  render() {
    return (
      <Container>
        <Header onCategorySelect={this.handleCategorySelect} bag={this.state.bag}  resetBag={this.resetBag} deleteItemFromBag={this.deleteItemFromBag}/>
        <Headline onItemClick={this.openModal} />
        <Products selectedCategory={this.state.selectedCategoryId} onItemClick={this.openModal} showModal={this.state.showModal} selectedItem={this.state.selectedItem}
                      onClose={this.closeModal} addBag={this.addBag}/>
      </Container>
    );
  }
}
