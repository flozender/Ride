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
  FormControl,
  useToast,
} from "@chakra-ui/react";

const SignUp = (props) => {
  const bg = useColorModeValue("gray.100", "gray.900");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

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
    if (!name || !username || !password || !email || !phone) {
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
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setState({
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        country: "",
      });
      props.history.push("/");
    }
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
        <FormControl name="name" isRequired>
          <Input
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl name="username" isRequired>
          <Input
            placeholder="Username"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl name="email" isRequired>
          <Input
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl name="phone" isRequired>
          <Input
            placeholder="Phone"
            value={phone}
            name="phone"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl name="password" isRequired>
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
        </FormControl>

        <Button colorScheme="green" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(SignUp);
