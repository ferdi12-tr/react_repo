
import React, { Component } from 'react';
import Topbar from "./Topbar";
import Categories from "./Categories";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategorilerData: [],
            selectedCategoryId: null,
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/kategoriler")
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorilerData: data });
            })
            .catch(error => console.error("Veri çekme hatası:", error));
    }



    render() {
        return (
            <div>
                <Topbar />
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3 fh5co_padding_menu">
                                <img src="images/logo.png" alt="img" className="fh5co_logo_width" />
                            </div>
                            <div className="col-12 col-md-9 align-self-center fh5co_mediya_right">
                                <Categories
                                    Kategoriler={this.state.kategorilerData}
                                    onCategorySelect={this.props.onCategorySelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
