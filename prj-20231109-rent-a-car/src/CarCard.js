import React from "react";

export default function CarCard({car}) {

    return (
        <button onClick={() => console.log(car.carModel)} style={{border:"none", background:"none", padding:0}}>

            <div className="card text-bg-dark mb-3">
                <img src={car.carUrl} className="card-img" height={"150px"} style={{opacity: 0.7}} alt="..."/>
                <div className="card-img-overlay">
                    <h5 className="card-title">{car.carModel} - {car.carBrand}</h5>
                    <p className="card-text"><small>Price: {Number(car.price)}</small></p>
                </div>
            </div>

        </button>
    )
}