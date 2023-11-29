import { Card, CardImg, CardImgOverlay, CardTitle, CardText, } from 'reactstrap';

const DisplayCar = (props) => {
    return (
        <div>
            <Card inverse className="mt-3">
                <CardImg alt="Card image cap" src={props.car.carUrl} style={{ height: 270 }} width="100%" />
                <CardImgOverlay>
                    <CardTitle tag="h5">
                        {props.car.carModel} - {props.car.carBrand}
                    </CardTitle>
                    <CardText>
                        <small>Price: {props.car.carPrice} $</small>
                    </CardText>
                </CardImgOverlay>
            </Card>
        </div>
    )
}

export default DisplayCar