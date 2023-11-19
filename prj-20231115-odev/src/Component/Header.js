import React, { Component } from 'react';
import Categories from "./Categories";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategorilerData: [],
            selectedCategoryId: null,
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorilerData: data });
            })
            .catch(error => console.error("Veri çekme hatası:", error));
    }

    render() {
        return (
            <div>
                <Categories
                    deleteItemFromBag={this.props.deleteItemFromBag}
                    resetBag={this.props.resetBag}
                    bag = {this.props.bag}
                    kategoriler={this.state.kategorilerData}
                    onCategorySelect={this.props.onCategorySelect}
                />
            </div>
        );
    }
}
