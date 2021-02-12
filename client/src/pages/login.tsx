import React, { useState } from "react";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";

const Login = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (event: any) => {
    alert(password);
    setState({ username: "", password: "" });
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
        height="40vh"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Welcome Back.</Heading>
        <Input
          placeholder="Username"
          value={username}
          name="username"
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          value={password}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}> Submit </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
