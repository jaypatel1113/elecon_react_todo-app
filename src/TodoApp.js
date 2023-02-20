/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";

import DisplayPendingTodos from "./DisplayPendingTodos/DisplayPendingTodos";

// import Todos from "./Utils/Data";

import "./TodoApp.css";

const TodoApp = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(null);
    const [obj, setObj] = useState({ task: "" });
    const [data, setData] = useState([]);

     const setLocalTodos= (todos) => localStorage.setItem("TodoData", JSON.stringify(todos));
     const getLocalTodos= () => JSON.parse(localStorage.getItem("TodoData"));

    useEffect(() => {
        let todos = getLocalTodos();
        todos && setData(todos)
        // console.log(data);
    }, []);
    
    useEffect(() => {
        setLocalTodos(data);
        console.log(data)
    }, [data]);
    

    const handleChange = (e) => {
        e.preventDefault();

        const { value, name } = e.target;
        setObj({ ...obj, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (obj.task === undefined || obj.task === "") return;

        if (isEdit) {
            // console.log(obj);
            data.filter((item) => {
                if (id === item.id) {
                    item.task = obj.task;
                    item.date = new Date().toLocaleString();
                    // console.log(item)
                    // console.log(data)
                }
                setData(data);
                setLocalTodos(data)
            });
            // console.log(newData);
            setIsEdit(false);
            setId(null);
        } else {
            // console.log(obj);
            const { task } = obj;
            setData([
                ...data,
                {
                    task,
                    id: Math.random(),
                    isCompleted: false,
                    date: new Date().toLocaleString(),
                },
            ]);
        }
        setObj({ task: "" });
    };

    const handleDelete = (ind) => {
        // console.log(ind);
        setIsEdit(false);
        let newData = data.filter((item) => item.id !== ind);
        // console.log(newData);
        setData(newData);
        setObj({ task: "" });
    };
    
    const handleComplete = (item, ind) => {
        setIsEdit(false);
        console.log(item);
        data.map((item) => {
            if (item.id === ind) {
                item.isCompleted = true;
                item.date = new Date().toLocaleString();
            }
        });
        // console.log(data)
        setObj({ task: "" });
        setLocalTodos(data);
    };

    const handleEdit = (item, ind) => {
        // console.log(item)
        setIsEdit(true);
        const { task } = item;
        setObj({ ...obj, task });
        setId(ind);
    };


    return (
        <div className="maincontainer">
            <div className="inputcontainer">
                <input
                    type="text"
                    name="task"
                    id="task"
                    value={obj.task}
                    placeholder="Enter task"
                    onChange={handleChange}
                />
                <input
                    type="button"
                    value={isEdit ? "Update" : "Add"}
                    onClick={handleClick}
                    style={{ "--i": "#20c997" }}
                />
            </div>

            <div className="outputcontainer">
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleComplete={handleComplete}
                    title="Pending"
                />
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    title="Completed"
                />
            </div>
        </div>
    );
};

export default TodoApp;
