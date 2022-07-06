import { useRef } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const SignUp = (props) => {
  const enteredFirstName = useRef();
  const enteredLastName = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  async function postSignupData(signupdata) {
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify(signupdata),
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
    console.log(enteredFirstName);
    const data = {
      firstname: enteredFirstName.current.value,
      lastname: enteredLastName.current.value,
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
    };

    enteredEmail.current.value = "";
    enteredFirstName.current.value = "";
    enteredLastName.current.value = "";
    enteredPassword.current.value = "";
    postSignupData(data);
  };

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
          <RouteLink to="/">
            <Button colorScheme="teal">Login</Button>
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
          <Flex borderRadius="lg" bg="white" mt="20" mb="10">
            <Box
              maxW="sm"
              borderRadius="lg"
              overflow="hidden"
              h="100%"
              px="5"
              py="3"
            >
              <form>
                <FormControl py="3">
                  <FormLabel htmlFor="firstname">First Name</FormLabel>
                  <Input id="fname" type="text" ref={enteredFirstName} />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl py="3">
                  <FormLabel htmlFor="lastname">Last Name</FormLabel>
                  <Input id="lname" type="text" ref={enteredLastName} />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl py="3">
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input id="email" type="email" ref={enteredEmail} />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl py="3">
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <Input id="password" type="password" ref={enteredPassword} />
                  <FormHelperText>Password must have min 6 char</FormHelperText>
                </FormControl>
                <Center>
                  <Button mb="2" colorScheme="blue" onClick={submitHandler}>
                    Signup
                  </Button>
                </Center>
              </form>
            </Box>
          </Flex>
        </Center>
      </Box>
    </div>

    // <Card className={classes.main}>
    //   <h1 className={classes.heading}>SignUp</h1>
    //   <form onSubmit={submitHandler} className={classes.form}>
    //     <div className={classes.firstname}>
    //       <label htmlFor="firstname">FirstName</label>
    //       <br />
    //       <input
    //         name="firstname"
    //         type="text"
    //         id={classes.fname}
    //         ref={enteredFirstName}
    //       ></input>
    //     </div>
    //     <div className={classes.lastname}>
    //       <label htmlFor="lastname">LastName</label>
    //       <br />
    //       <input
    //         name="lastname"
    //         type="text"
    //         id={classes.lname}
    //         ref={enteredLastName}
    //       ></input>
    //     </div>
    //     <div className={classes.email}>
    //       <label htmlFor="email">Email</label>
    //       <br />
    //       <input
    //         name="email"
    //         type="email"
    //         id={classes.email}
    //         ref={enteredEmail}
    //       ></input>
    //     </div>
    //     <div className={classes.password}>
    //       <label htmlFor="password">Password</label>
    //       <br />
    //       <input
    //         name="password"
    //         type="password"
    //         id={classes.password}
    //         ref={enteredPassword}
    //       ></input>
    //     </div>
    //     <div>
    //       <button className={classes.btn}>SignUp</button>
    //       <p>
    //         Already Subscribed? <a href="/login">Login</a>
    //       </p>
    //     </div>
    //   </form>
    // </Card>
  );
};

export default SignUp;
