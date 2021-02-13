import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

const Login = (props) => {
  const bg = useColorModeValue("gray.100", "gray.900");

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };
  const handleSubmit = async () => {
    if (!username || !password) {
      toast({
        position: "bottom-left",
        title: "Missing Fields.",
        description: "Please fill in all the data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "bottom-left",
        title: "Success",
        description: "Welcome back.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setState({ username: "", password: "" });

      props.history.push("/");
    }
  };

  const { username, password } = state;
  return (
    <Flex justifyContent="center" alignItems="center" height="70vh">
      <Flex
        textAlign="center"
        fontSize="md"
        p={6}
        bgColor={bg}
        borderRadius="md"
        flexDirection="column"
        height="45vh"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Welcome Back.</Heading>
        <Input
          placeholder="Username"
          value={username}
          name="username"
          onChange={handleChange}
          pr="4.5rem"
        />

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="green" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(Login);
