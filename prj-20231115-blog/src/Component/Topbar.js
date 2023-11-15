import React, {Component} from 'react';

class Topbar extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid fh5co_header_bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 fh5co_mediya_center">
                                <a href="test" className="color_fff fh5co_mediya_setting">
                                    <i className="fa fa-clock-o"></i>
                                    &nbsp;&nbsp;&nbsp;15 Kasım 2023
                                </a>
                                <div className="d-inline-block fh5co_trading_posotion_relative">
                                    <a href="test" className="treding_btn">KODUSTA</a>
                                    <div className="fh5co_treding_position_absolute"></div>
                                </div>
                                <a href="test" className="color_fff fh5co_mediya_setting">Blog Sitesi Yaptım site
                                    Gençler :) </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;