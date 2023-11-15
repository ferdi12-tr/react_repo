import './App.css';
import Header from "./Component/Header";
import React, {Component} from "react";
import Headline from "./Component/Headline";
import News from "./Component/News";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: null,
            selectedBlog: null,
            showModal: false,
        };
    }
    handleCategorySelect = (selectedCategoryId) => {
        this.setState({selectedCategoryId});
    };
    openModal = (blog) => {
        this.setState({selectedBlog: blog, showModal: true});
    }

    closeModal = () => {
        this.setState({selectedBlog: null, showModal: false});
    }

    render() {
        return (
            <div>
                <Header onCategorySelect={this.handleCategorySelect}/>
                <Headline onBlogClick={this.openModal}/>
                <News selectedCategory={this.state.selectedCategoryId} onBlogClick={this.openModal} showModal={this.state.showModal} selectedBlog={this.state.selectedBlog}
                      onClose={this.closeModal}/>
            </div>
        );
    }
}

export default App;


 