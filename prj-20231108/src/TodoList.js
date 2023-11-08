import React, {useState} from "react";

export default function TodoList() {
    const [tdList, setTdList] = useState([]);
    const [todo, setTodo] = useState("");

    const addTodoList = () => {
        if (todo) {
            setTdList([...tdList, todo])
            setTodo("")
        }
    }

    const getTodo = (value) => {
        setTodo(value)
    }

    const deleteTodo = (deleted) => {
        setTdList(tdList.filter((element) => element !== deleted))
    }


    return (
        <div>
            <h3>Görev Listesi</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={todo} onChange={(event) => getTodo(event.target.value)}></input>
                <button className="btn btn-outline-secondary" type="button" onClick={addTodoList}>Ekle</button>
            </div>
            <ul>
                {tdList.map(element => <li style={{margin:'10px'}}>{element} <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={() => deleteTodo(element)}>Delete</button></li>)}
            </ul>
        </div>
    )
}