import React from "react";

import "./DisplayOneTodo.css";

const DisplayOneTodo = ({
    item,
    handleDelete,
    handleEdit,
    handleComplete,
    title,
}) => {
    return (
        <div className="container" key={item.id}>
            <div className="task">{item.task}</div>
            <div className="task">{item.date}</div>
            <div className="button">
                <input
                    type="button"
                    value="Delete"
                    onClick={() => handleDelete(item.id)}
                    style={{ "--i": "#FBBC05" }}
                />
                {title === "Pending" && (
                    <>
                        <input
                            type="button"
                            value="Edit"
                            onClick={() => handleEdit(item, item.id)}
                            style={{ "--i": "#0dcaf0" }}
                        />
                        <input
                            type="button"
                            value="Completed"
                            onClick={() => handleComplete(item, item.id)}
                            style={{ "--i": "#d63384" }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default DisplayOneTodo;
