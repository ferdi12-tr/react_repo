import React, {useState} from "react";

export default function CountFunction() {
    const [count, setCount] = useState(0);


    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count <= 0 ? 0 : count - 1);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button 
                className="btn btn-primary" 
                type="button" 
                onClick={increment}
            >Increment</button>
            <button 
                className="btn btn-danger" 
                type="button" 
                onClick={decrement}
            >Decrement</button>
        </div>
    )
}