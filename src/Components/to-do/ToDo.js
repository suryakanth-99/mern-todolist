import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import ToDoTaskList from "./ToDoTaskList";
import { Link as RouteLink } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  ButtonGroup,
  Center,
  Input,
} from "@chakra-ui/react";

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
      console.log(data);
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
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        bg="grey"
        py="2"
        px="5"
      >
        <Box p="2">
          <RouteLink to="/">
            <Heading
              fontSize="3xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              TO-DO
            </Heading>
          </RouteLink>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <RouteLink to="/signup">
            <Button colorScheme="teal" onClick={logoutHandler}>
              Log Out
            </Button>
          </RouteLink>
        </ButtonGroup>
      </Flex>
      <Box
        w="100%"
        h="100%"
        bgGradient={[
          "linear(to-tr, teal.300, yellow.400)",
          "linear(to-t, blue.200, teal.500)",
          "linear(to-b, orange.100, purple.300)",
        ]}
      >
        <Center>
          <Box
            maxW="sm"
            bg="white"
            borderRadius="lg"
            px="5"
            py="5"
            mt="20"
            mb="10"
          >
            <Box display="flex" maxW="sm" borderRadius="lg" px="5" py="5">
              <Input
                id="newtask"
                type="text"
                placeholder="Add task"
                ref={taskRef}
              />
              {/* <Spacer /> */}
              <Center>
                <Button
                  flex="2"
                  ml="2"
                  colorScheme="blue"
                  onClick={addTask.bind(null, taskRef)}
                >
                  Add
                </Button>
              </Center>
            </Box>

            <Box
              maxW="sm"
              borderRadius="lg"
              display="flex"
              overflow="hidden"
              h="100%"
              px="5"
              py="3"
            >
              {tasks && (
                <ul>
                  {tasks.map((taskObj) => {
                    return (
                      <ToDoTaskList
                        taskobj={taskObj}
                        key={taskObj._id}
                        token={token}
                        deleteTask={deleteTaskHandler}
                      />
                    );
                  })}
                </ul>
              )}
            </Box>
          </Box>
        </Center>
      </Box>
    </div>
  );
};

export default ToDo;
