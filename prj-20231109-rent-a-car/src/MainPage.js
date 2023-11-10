import React, {useState} from "react";
import CarCard from "./CarCard";


export default function MainPage() {

    const [id, setId] = useState(0);
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carPrice, setCarPrice] = useState(0)
    const [carUrl, setCarUrl] = useState("");

    const [carList, setCarList] = useState([]);

    const addCar = () => {
        if (carBrand && carModel && carPrice > 0) {
            setId(id + 1)
            setCarList([...carList, {id, carBrand, carModel, carPrice, carUrl}])
        }
        setCarBrand("");
        setCarModel("");
        setCarPrice(0);
        setCarUrl("");

        console.log(carList)
    }

    const GetCarUrl = (file) => {
        let url = URL.createObjectURL(file);
        setCarUrl(url);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3">
                    <input type="text" className="form-control mt-3" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} placeholder="Brand"/>
                    <input type="text" className="form-control mt-3" value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="Model"/>
                    <input type="number" className="form-control mt-3" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} placeholder="Price (Per Hour)"/>

                    <label htmlFor="imgUploader"  className="btn btn-danger btn-sm mt-3">Upload Image</label>
                    <input style={{ display: "none" }} id="imgUploader" type="file" name="Image" onChange={(event) => { GetCarUrl(event.target.files[0])}} /> <br />

                    <button className="btn btn-success mt-3" onClick={addCar}>Add Car</button>
                </div>
                <div className="col-9">
                    <div className="row">
                        {carList.map((element, index) => 
                            <div key={index} className="col-3">
                                <CarCard car={element}/>    
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}