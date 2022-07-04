// import React from "react";
import { Center, Input, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "@reach/router";

import {
  FormControl,
  Text,
  FormLabel,
  Box,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as RouteLink } from "react-router-dom";

const Login = (props) => {
  const enteredUserId = useRef();
  const passwordRef = useRef();

  async function postLoginData(e) {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const h = await response.json();
    if (h && h.token) {
      props.session(true, h.token);
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: enteredUserId.current.value,
      password: passwordRef.current.value,
    };
    enteredUserId.current.value = "";
    passwordRef.current.value = "";
    postLoginData(data);
  };
  return (
    <div>
      <Box maxW="sm" borderRadius="lg" overflow="hidden" h="100%" px="5" py="3">
        <form>
          <FormControl py="3">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" ref={enteredUserId} />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl py="3">
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input id="password" type="password" ref={passwordRef} />
          </FormControl>
          <Center>
            <Button mb="2" colorScheme="blue" onClick={submitHandler}>
              Login
            </Button>
          </Center>
          <Text>
            Not Registered?{" "}
            <RouteLink to="/signup">
              <Link>Signup now</Link>
            </RouteLink>
          </Text>
        </form>
      </Box>
    </div>
  );
};

export default Login;
