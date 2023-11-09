import React, {useState} from "react";
import Display from "./Display";


export default function GetInfo() {
    const [id, setId] = useState(0)
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    const [batchList, setBatchList] = useState([])

    const sendButton = () => {
        if (name && surname && email) {
            setId(id + 1)
            setBatchList([...batchList, {id, name, surname, email}])

            setName("");
            setSurname("");
            setEmail("");
        }
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={surname} onChange={(event) => setSurname(event.target.value)} placeholder="Surname"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3">
                    <button className="btn btn-success" onClick={sendButton}>Send</button>
                    </div>
                </div>
            </div>
            <ul className="list-group">
                {batchList.map(element => 
                    <Display info={element}/>
                )}
            </ul>
        </div>
    );
}