import React from "react";

const ToDoTaskList = (props) => {
  const task = props.taskobj;
  const deleteUserTask = async (taskId) => {
    const userid = props.userId;
    const response = await fetch(
      `http://localhost:8000/user/${userid}/${taskId}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      props.deleteTask(taskId);
    }
  };
  return (
    <div>
      <li key={task._id}>{task.task}</li>
      <button onClick={deleteUserTask.bind(null, task._id)}>-</button>
    </div>
  );
};

export default ToDoTaskList;
