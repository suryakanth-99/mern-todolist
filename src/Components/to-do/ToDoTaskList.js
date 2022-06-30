import React from "react";

const ToDoTaskList = (props) => {
  const task = props.taskobj;
  const t = props.token;
  const deleteUserTask = async (taskId) => {
    const response = await fetch(`http://localhost:8000/user/task/${taskId}`, {
      method: "DELETE",

      headers: {
        "auth-token": t,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      props.deleteTask(taskId);
    }
  };
  return (
    <div className={props.class}>
      <li key={task._id}>{task.task}</li>
      <span>
        <button onClick={deleteUserTask.bind(null, task._id)}>-</button>
      </span>
    </div>
  );
};

export default ToDoTaskList;
