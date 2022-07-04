import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";

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
    <Flex minWidth="max-content" alignItems="center">
      <Box p="2">
        <li style={{ width: "250px" }} key={task._id}>
          {task.task}
        </li>
      </Box>
      <Box p="4">
        <Button onClick={deleteUserTask.bind(null, task._id)}>-</Button>
      </Box>
    </Flex>
  );
};

export default ToDoTaskList;
