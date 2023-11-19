import { Row, Container, Col } from 'reactstrap';

import React, { Component } from 'react'
import ProductModal from './ProductModal';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            error: null,

        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCategory !== this.props.selectedCategory) {
            this.fetchItems();
        }
    }

    fetchItems() {

        const apiUrl = this.props.selectedCategory
            ? `http://localhost:3000/items?kategoriId=${this.props.selectedCategory}`
            : 'http://localhost:3000/items';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('Gelen veri:', data);
                if (data) {
                    this.setState({ items: data });
                } else {
                    this.setState({ error: 'API verisi beklenen formatta değil' });
                }
            })
            .catch((error) => {
                console.error('Veri çekme hatası:', error);
                this.setState({ error: 'Veri çekme hatası' });
            });
    }


    render() {
        const { items, error } = this.state;
        if (error) {
            return <div>{error}</div>;
        }
        return (
            <Container>
                <Row>
                    <Col xs="9">
                        {items.map((item, index) => (
                            <div key={index} onClick={() => this.props.onItemClick(item)}>
                                <Row>
                                    <div className="container mt-3">
                                        <div className="row mb-3">
                                            <div className="col-md-7" >
                                                <img src={item.resim} width="100%" height="350" alt="" />
                                            </div>
                                            <div className="col-5">
                                                <h3>
                                                    {item.baslik}
                                                </h3>
                                                <a href="test">
                                                    {item.author} - {item.tarih}
                                                </a>
                                                <p>{item.aciklama}</p>
                                                <div>
                                                    <i className="fa fa-heart-o"></i> {item.favoriSayisi}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        ))}
                    </Col>
                    <Col xs="3">
                        <h3 className='mt-3'>Etiketler</h3>
                    </Col>
                </Row>
                {this.props.selectedItem && (
                    <ProductModal product={this.props.selectedItem} onClose={this.props.onClose}
                        showModal={this.props.showModal}  addBag={this.props.addBag}/>
                )}
            </Container>
        )
            ;
    }
}
