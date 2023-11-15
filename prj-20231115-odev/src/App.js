import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './Component/Header';
import Headline from './Component/Headline';
// import News from './Component/News';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: null,
      selectedBlog: null,
      showModal: false,
    };
  }

  handleCategorySelect = (selectedCategoryId) => {
    this.setState({ selectedCategoryId });
  };

  openModal = (blog) => {
    this.setState({ selectedBlog: blog, showModal: true });
  };

  closeModal = () => {
    this.setState({ selectedBlog: null, showModal: false });
  };

  render() {
    return (
      <Container>
        <Header onCategorySelect={this.handleCategorySelect} />
        <Headline onBlogClick={this.openModal} />
      </Container>
    );
  }
}
