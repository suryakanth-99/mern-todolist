import { Link } from "react-router-dom";
import {
  Flex,
  Image,
  Box,
  Heading,
  Spacer,
  Button,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import Login from "../Pages/Login";
const Welcome = (props) => {
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
          <Link to="/">
            <Heading
              fontSize="3xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              TO-DO
            </Heading>
          </Link>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Link to="/signup">
            <Button colorScheme="teal">Sign Up</Button>
          </Link>
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
            <Login session={props.session} />

            <Box maxW="sm" borderRadius="lg" px="5" py="5">
              <Image
                objectFit={"inherit"}
                src={process.env.PUBLIC_URL + "images/todo.webp"}
                alt="todolist"
              />
            </Box>
          </Flex>
        </Center>
      </Box>
    </div>
  );
};

export default Welcome;
