import React, { useEffect, useState } from "react";
import "../../styles/index.css"; // Asegúrate de tener estilos apropiados para .delete-button

const Input = () => {
    const [listItems, setListItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const apiUrl = 'https://playground.4geeks.com/todo/user/alesanchzr';

    // Cargar las tareas iniciales desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    if (response.status === 404) {
                        // Si el usuario no existe, crear una nueva lista
                        await createUser();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    const data = await response.json();
                    setListItems(data);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    // Crear una nueva lista de tareas para el usuario
    const createUser = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("User created successfully");
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Función para actualizar la lista en el servidor
    const updateServer = async (newList) => {
        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                body: JSON.stringify(newList),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Server updated successfully:", data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Validar y agregar una nueva tarea
    const validateInput = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === "") {
                alert("The input cannot be empty");
            } else {
                const newList = [...listItems, { label: inputValue.trim(), done: false }];
                setListItems(newList);
                setInputValue("");
                updateServer(newList);
            }
        }
    };

    // Eliminar una tarea
    const deleteItem = (index) => {
        const newList = listItems.filter((_, i) => i !== index);
        setListItems(newList);
        updateServer(newList);
    };

    // Limpiar todas las tareas
    const clearAll = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setListItems([]);
            console.log("All tasks cleared");
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

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
                        {item.label}
                        <button className="delete-button" onClick={() => deleteItem(index)}>
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-danger mt-3" onClick={clearAll}>Clear All</button>
        </div>
    );
};

export default Input;
