import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
// import getUserData from "../routeFunctions/getUserData";
import ToDoTaskList from "./ToDoTaskList";

const ToDo = (props) => {
  const taskRef = useRef();
  const [tasks, setTasks] = useState([]);
  let { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      //   console.log("hello");
      const response = await fetch(`http://localhost:8000/user/tasks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("somethin went wrong");
      }
      const data = await response.json();
      // console.log(data);
      setTasks(data);
    };
    // console.log("hii");
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [id]);

  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((obj) => {
        return obj._id !== taskId;
      });
    });
  };

  const addTask = async (taskRef) => {
    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: "POST",
      // mode: "cors",
      body: JSON.stringify({ name: taskRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },

      // referrerPolicy: "no-referrer",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTasks((prev) => [...prev, data]);
      // console.log(data);
    }
  };
  return (
    <div>
      <div>
        <input type="text" ref={taskRef}></input>
        <button onClick={addTask.bind(null, taskRef)}>addTask</button>
      </div>
      {console.log(tasks)}
      <ul>
        {tasks.map((taskObj) => {
          return (
            <ToDoTaskList
              taskobj={taskObj}
              key={taskObj._id}
              userId={id}
              deleteTask={deleteTaskHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ToDo;
