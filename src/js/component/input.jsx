import React, { useState } from "react";
import '../../styles/index.css'; // Asegúrate de tener estilos apropiados para .delete-button

const Input = () => {
    const [listItems, setListItems] = useState(["Make the bed", "Wash my hands"]);
    const [inputValue, setInputValue] = useState("");

    const validateInput = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === "") {
                alert("The input cannot be empty");
            } else {
                setListItems(prevItems => [...prevItems, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const deleteItem = (index) => {
        setListItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    return (
        <div className="container">
            <input
                type="text"
                onChange={e => setInputValue(e.target.value)}
                onKeyUp={validateInput}
                value={inputValue}
                className="form-control"
                placeholder="What needs to be done?"
            />
            <ul className="list-group">
                {listItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item}
                        <button className="delete-button" onClick={() => deleteItem(index)}>
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Input;
