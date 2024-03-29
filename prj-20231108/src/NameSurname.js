import React, {useState} from "react";

export default function Description() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("");

    const [couple, setCouple] = useState([])

    const checkIfExist = (name, surname) => {
        return couple.find(element => element.name === name && element.surname === surname)
    } 

    const addCouple = () => {
        if (checkIfExist(name, surname)) {
            const result = prompt("This person was already added.\n But, if want to add, just type 'yes' otherwise type 'no' ")
            if (result.toLowerCase() === "no") {
                return
            }
        }
        if (name && surname) {
            setCouple([...couple, {name, surname}])
            setName("")
            setSurname("")
        }
    }

    const deleteNameSurname = (deletedIndex) => {
        setCouple(couple.filter((element, index) => deletedIndex !== index))
    }

    const updateNameSurname = (element, updatedIndex) => {
        setName(element.name)
        setSurname(element.surname)

        deleteNameSurname(updatedIndex)
    }

    return (
        <div>
            <h3>Ad Soyad Listesi</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)}></input>
                <input type="text" className="form-control" value={surname} onChange={(event) => setSurname(event.target.value)}></input>
                <button className="btn btn-outline-secondary" type="button" onClick={addCouple}>Göster</button>
            </div>

            <ul className="list-group">
                {couple.map((element, index) => 
                                <li className="list-group-item" key={index} style={{margin:'10px'}}>{element.name}: {element.surname}
                                    <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={() => deleteNameSurname(index)}
                                        >Delete
                                    </button>
                                    <button className="btn btn-success btn-sm" style={{float:'right'}} onClick={() => updateNameSurname(element, index)}
                                        >Update
                                    </button>
                                </li>)
                }
            </ul>
        </div>
    )
}
