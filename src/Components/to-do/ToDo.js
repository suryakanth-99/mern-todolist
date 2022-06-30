import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import ToDoTaskList from "./ToDoTaskList";
import Card from "../../Components/UI/Card";
import classes from "./ToDo.module.css";

const ToDo = (props) => {
  const taskRef = useRef();
  const [tasks, setTasks] = useState([]);
  let { token } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/user`, {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [token]);

  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((obj) => {
        return obj._id !== taskId;
      });
    });
  };

  const addTask = async (taskRef) => {
    const response = await fetch(`http://localhost:8000/user`, {
      method: "POST",
      body: JSON.stringify({ name: taskRef.current.value }),
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTasks((prev) => [...prev, data]);
    }
  };
  const logoutHandler = () => {};
  return (
    <div>
      <div>
        <button onclick={logoutHandler}>Logout</button>
      </div>
      <Card>
        <div className="card-header">
          <input type="text" ref={taskRef} className={classes.todo}></input>
          <span>
            <button onClick={addTask.bind(null, taskRef)}>addTask</button>
          </span>
        </div>
        {console.log(tasks)}
        {tasks && (
          <ul className="list-group">
            {tasks.map((taskObj) => {
              return (
                <ToDoTaskList
                  class="list-group-item d-flex justify-content-between align-items-start"
                  taskobj={taskObj}
                  key={taskObj._id}
                  token={token}
                  deleteTask={deleteTaskHandler}
                />
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ToDo;
