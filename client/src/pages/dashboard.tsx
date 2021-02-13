import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import fetch from "node-fetch";
import {
  Heading,
  Flex,
  Switch,
  Text,
  Select,
  Divider,
  Input,
  Button,
  PinInput,
  PinInputField,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { states } from "../us-states";

const Picker = ({ text, name, onChange }) => (
  <Flex flexDirection="column" alignItems="flex-start" mb={2}>
    <Heading mb={6}>{text}</Heading>
    <Select
      width="15em"
      variant="filled"
      placeholder="Select"
      isRequired
      name={name}
      onChange={onChange}
    >
      {states.map((e, i) => {
        return (
          <option key={i} value={e}>
            {e}
          </option>
        );
      })}
    </Select>
  </Flex>
);

const Dashboard = (props: any) => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const { currentUser } = props;
  const [riding, setRiding] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    origin: "",
    destination: "",
    when: "",
    capacity: 0,
  });
  const toast = useToast();

  const handleSubmit = () => {
    setLoading(true);
    state.when = state.when + " 23:59:59";
    if (!riding) {
      fetch(`/trip`, {
        method: "post",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) throw Error(json.message);
          setLoading(false);
          toast({
            position: "bottom-left",
            title: "Trip created.",
            description: "We've created your trip for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast({
            position: "bottom-left",
            title: "Failed to create trip",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const { capacity } = state;
  return (
    <Flex
      height="80vh"
      width="75vw"
      mt={8}
      p={8}
      margin="auto"
      flexDir="column"
    >
      {/* Header */}
      <Flex
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        height="2em"
        mt={6}
        width="100%"
      >
        <Heading fontSize="2xl" color="#fff" p={3}>
          Good Evening, {currentUser.name}.
        </Heading>
        <Flex alignItems="center">
          <Text fontSize="2xl">{riding ? "Riding" : "Hosting"}</Text>
          <Switch
            name="riding"
            defaultChecked={riding}
            colorScheme="green"
            size="lg"
            alignSelf="flex-end"
            ml={5}
            onChange={() => setRiding(!riding)}
          />
        </Flex>
      </Flex>
      {/* Data Card */}
      <Flex
        bg={bg}
        mt={10}
        rounded="lg"
        p={10}
        flexDirection="column"
        width="95%"
        marginLeft="auto"
        marginRight="auto"
      >
        <Flex justifyContent="space-between" width="100%" mb={8}>
          <Picker text="Origin" name="origin" onChange={handleChange} />
          <Divider orientation="vertical" />
          <Picker
            text="Destination"
            name="destination"
            onChange={handleChange}
          />
        </Flex>
        {/* Bottom Flex */}
        {/* Capacity */}
        {riding ? (
          <></>
        ) : (
          <>
            <Flex
              alignItems=""
              width="80%"
              justifyContent=""
              flexDirection="row"
              mb={5}
            >
              <Heading mr={10}>Seats </Heading>
              <PinInput>
                <PinInputField
                  variant="filled"
                  value={capacity}
                  name="capacity"
                  onChange={handleChange}
                />
              </PinInput>
            </Flex>
          </>
        )}

        {/* Date Picker */}
        <Flex alignItems="center" width="100%" justifyContent="">
          <Heading mb={6} mr={7}>
            When
          </Heading>
          <Input
            isRequired
            width="12em"
            type="date"
            mb={6}
            name="when"
            onChange={handleChange}
          />
        </Flex>
        <Button
          width="10em"
          colorScheme="green"
          alignSelf="center"
          onClick={() => handleSubmit()}
          isLoading={loading}
        >
          {riding ? "GO" : "HOST"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(Dashboard);
