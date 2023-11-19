import React, { Component } from 'react'

export default class ProductModal extends Component {

    render() {
        return (
            <div
                className={`modal fade ${this.props.showModal ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{display: this.props.showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.product.baslik}</h5>
                            <button type="button" className="close" onClick={this.props.onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.product.resim && <img src={this.props.product.resim} alt={this.props.product.baslik} className="img-fluid"/>}
                            <p>{this.props.product.aciklama}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {this.props.addBag(this.props.product); this.props.onClose()}}>Add To Bag</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
