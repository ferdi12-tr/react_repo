
import React, { Component } from 'react';

class Categories extends Component {
    handleCategoryClick = (kategoriId) => {
        console.log('Seçilen kategori:', kategoriId);
        this.props.onCategorySelect(kategoriId);
    };

    render() {
        return (
            <div>
                <div className="container-fluid bg-faded fh5co_padd_mediya padding_786">
                    <div className="container padding_786">
                        <nav className="navbar navbar-toggleable-md navbar-light ">
                            <button
                                className="navbar-toggler navbar-toggler-right mt-3"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="fa fa-bars"></span>
                            </button>
                            <a className="navbar-brand" href="test">
                                <img src="images/logo.png" alt="img" className="mobile_logo_width" />
                            </a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    {this.props.Kategoriler.map((kategori, index) => (
                                        <li className="nav-item" key={index}>
                                            <button
                                                className="nav-link"
                                                onClick={() => this.handleCategoryClick(kategori.id)}
                                            >
                                                {kategori.ad} <span className="sr-only">(current)</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;
