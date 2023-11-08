import React, {useState} from "react";
// ürün ekle sil güncelle fonksiyonları. ürün adı kategorisi açıklaması fiyatı resim

export default function Products() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [infoBatchList, setInfoBatchList] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);

    const addBatchToList = () => {
        if (name && category && description && price > 0) {
            setInfoBatchList([...infoBatchList, {name, category, description, price, selectedImage}]);
            setName("");
            setCategory("");
            setDescription("");
            setPrice("");
            setSelectedImage(null)
        }
    }

    const deleteProduct = (deletedIndex) => {
        setInfoBatchList(infoBatchList.filter((element, index) => deletedIndex !== index))
    }

    const editProduct = (element, updatedIndex) => {
        setName(element.name);
        setCategory(element.category);
        setDescription(element.description);
        setPrice(element.price);

        deleteProduct(updatedIndex);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Product Name"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Product Category"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Product Description"/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={price  } onChange={(event) => setPrice(event.target.value)} placeholder="Product Price"/>
                    </div>
                </div>
                <div className="col-1">
                    <label htmlFor="imgUploader" className="btn btn-danger btn-sm">Upload Image</label>
                    <input style={{ display: "none" }} id="imgUploader" type="file" name="Image" onChange={(event) => setSelectedImage(event.target.files[0])} />
                </div>
            </div>
            <div className="row mt-3" style={{justifyContent:"center"}}>
                <button className="btn btn-success" style={{width:"20%"}} onClick={addBatchToList}>Add Product</button>
            </div>

            <div className="row mt-3">
                <div className="container">
                    <div className="row mb-3">
                            <div className="col-2"><u>NAME</u></div>
                            <div className="col-2"><u>CATEGORY</u></div>
                            <div className="col-2"><u>DESCRIPTION</u></div>
                            <div className="col-2"><u>PRICE</u></div>
                    </div>
                    {infoBatchList.map((element, index) => 
                        <>
                            <div key={index} className="row mb-3">
                                <div className="col-2">{element.name}</div>
                                <div className="col-2">{element.category}</div>
                                <div className="col-2">{element.description}</div>
                                <div className="col-2">{element.price} $</div>

                                <div className="col-1">
                                    <button className="btn btn-warning" onClick={() => editProduct(element, index)}>Edit</button>
                                </div>

                                <div className="col-1">
                                    <button className="btn btn-danger" onClick={() => deleteProduct(index)}>Delete</button>
                                </div>

                            </div>
                            {element.selectedImage && (
                                <div className="imageDisplay">
                                    <img src={URL.createObjectURL(element.selectedImage)} alt="" width={"200px"}/>
                                </div>)
                            }
                            <hr className="mt-3" />
                        </>
                        )}
                </div>
            </div>
        </div>
    )
}