import React, { useState } from "react";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const SignUp = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [state, setState] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    country: "",
  });

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    alert(password);
    setState({
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      country: "",
    });
  };

  const { name, username, password, email, phone } = state;
  return (
    <Flex justifyContent="center" alignItems="center" height="80vh">
      <Flex
        textAlign="center"
        fontSize="md"
        p={6}
        bgColor={bg}
        borderRadius="md"
        flexDirection="column"
        height="70vh"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Start Your Journey.</Heading>
        <Input
          placeholder="Name"
          value={name}
          name="username"
          onChange={handleChange}
        />
        <Input
          placeholder="Username"
          value={username}
          name="username"
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Phone"
          value={phone}
          name="phone"
          onChange={handleChange}
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

export default SignUp;
