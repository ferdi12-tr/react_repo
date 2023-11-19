import React, { Component } from 'react';
import { Row, Container, Col, Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';

export default class Headline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerItems: [],
            error: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(data => {
                console.log('Gelen veri:', data);
                if (data) {
                    const bannerItems = data.filter(item => item.banner === 1);
                    this.setState({ bannerItems: bannerItems });
                } else {
                    this.setState({ error: 'API verisi beklenen formatta değil' });
                }
            })
            .catch(error => {
                console.error('Veri çekme hatası:', error);
                this.setState({ error: 'Veri çekme hatası' });
            });
    }

    render() {
        const { bannerItems, error } = this.state;
        if (error) {
            return <div>{error}</div>;
        }
        return (
            <div>
                {bannerItems.length > 0 && (
                    <Container>
                        <Row>
                            <Col
                                xs="6"
                            >

                                <div onClick={() => this.props.onItemClick(this.state.bannerItems[0])}>
                                    <Card inverse>
                                        <CardImg
                                            alt="Card image cap"
                                            src={this.state.bannerItems[0].resim}
                                            style={{
                                                height: 270
                                            }}
                                            width="100%"
                                            height="270"
                                        />
                                        <CardImgOverlay>
                                            <CardTitle tag="h5">
                                                {this.state.bannerItems[0].baslik}
                                            </CardTitle>
                                            <CardText>
                                                {this.state.bannerItems[0].aciklama}
                                            </CardText>
                                            <CardText>
                                                <small className="text-muted">
                                                    {this.state.bannerItems[0].date}
                                                </small>
                                            </CardText>
                                        </CardImgOverlay>
                                    </Card>
                                </div>
                            </Col>
                            <Col
                                xs="6"
                            >
                                <Row>
                                    {bannerItems.slice(2, 7).map((item, index) => (
                                        <Col
                                            key={index}
                                            xs="6"
                                        >
                                            <div key={index} onClick={() => this.props.onItemClick(item)}>
                                                <Card inverse>
                                                    <CardImg
                                                        alt="Card image cap"
                                                        src={item.resim}
                                                        style={{
                                                            height: 270
                                                        }}
                                                        width="100%"
                                                    />
                                                    <CardImgOverlay>
                                                        <CardTitle tag="h6">
                                                            {item.baslik}
                                                        </CardTitle>
                                                        <CardText>
                                                            {item.aciklama}
                                                        </CardText>
                                                        <CardText>
                                                            <small className="text-muted">
                                                                {item.date}
                                                            </small>
                                                        </CardText>
                                                    </CardImgOverlay>
                                                </Card>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container >
                )
                }
            </div>
        )
    }
}