import React, { Component } from "react";
import CarCard from "./CarCard";
import CarNavBar from "./CarNavBar";
import Login from "./Login";

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carBrand: "",
            carModel: "",
            carPrice: "",
            carUrl: "",
            carList: [],
            currentUser: null,
        }
    }

    clearInputs = () => {
        this.setState({ carBrand: "" });
        this.setState({ carModel: "" });
        this.setState({ carPrice: "" });
        this.setState({ carUrl: "" });
    }

    componentDidMount() {
        this.getCarsFromJson();
    }

    getCarsFromJson = () => {
        fetch("http://localhost:3000/cars")
            .then(db => db.json())
            .then(data => {
                this.setState({ carList: data })
            })
    }

    addCarToJson = (addedCarData) => {
        fetch("http://localhost:3000/cars", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedCarData),
        })
        .finally(() => {
            this.clearInputs();
            this.getCarsFromJson();
        })
    }

    addCar = () => {
        if (this.state.carBrand && this.state.carModel && Number(this.state.carPrice) > 0) {
            this.addCarToJson({carBrand: this.state.carBrand, carModel: this.state.carModel, carPrice: this.state.carPrice, carUrl: this.state.carUrl })
        }
    }

    GetCarUrl = (file) => {
        let url = URL.createObjectURL(file);
        this.setState({ carUrl: url });
    }

    setCurrentUser = (user) => {
        console.log(user)
        this.setState({currentUser:user})
    }

    render() {
        return (
            <>
                <CarNavBar />
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-3">
                            {this.state.currentUser ?
                            <div>
                                <input type="text" className="form-control mt-3" value={this.state.carBrand} onChange={(e) => this.setState({ carBrand: e.target.value })} placeholder="Brand" />
                                <input type="text" className="form-control mt-3" value={this.state.carModel} onChange={(e) => this.setState({ carModel: e.target.value })} placeholder="Model" />
                                <input type="number" className="form-control mt-3" value={this.state.carPrice} onChange={(e) => this.setState({ carPrice: e.target.value })} placeholder="Price (Per Hour)" />

                                <label htmlFor="imgUploader" className="btn btn-danger btn-sm mt-3">Upload Image</label>
                                <input style={{ display: "none" }} id="imgUploader" type="file" name="Image" onChange={(event) => { this.GetCarUrl(event.target.files[0]); }} /> <br />

                                <button className="btn btn-success mt-3" onClick={this.addCar}>Add Car</button>
                            </div>
                            :
                            <Login setCurrentUser={this.setCurrentUser} />}
                        </div>
                        {this.state.currentUser &&
                        <div className="col-9">
                            <div className="container">
                                <div className="row">
                                    {this.state.carList.map((element, index) => <div key={index} className="col-6">
                                        <CarCard car={element} />
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </>
        )
    }
}