import React, { useState } from "react";
import {
  Heading,
  Flex,
  Image,
  useColorModeValue,
  Switch,
  Box,
  Text,
  Select,
  Divider,
  Input,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

const Picker = ({ text }) => (
  <Flex flexDirection="column" alignItems="flex-start" mb={2}>
    <Heading mb={6}>{text}</Heading>
    <Select width="15em" variant="filled" placeholder="Select" isRequired />
  </Flex>
);

const Dashboard = ({ currentUser }) => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const [riding, setRiding] = useState(true);
  return (
    <Flex
      height="80vh"
      width="85vw"
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
        width="80%"
        marginLeft="auto"
        marginRight="auto"
      >
        <Flex justifyContent="space-between" width="100%" mb={8}>
          <Picker text="Origin" />
          <Divider orientation="vertical" />
          <Picker text="Destination" />
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
                <PinInputField variant="filled" />
              </PinInput>
            </Flex>
          </>
        )}

        {/* Date Picker */}
        <Flex alignItems="center" width="100%" justifyContent="">
          <Heading mb={6} mr={7}>
            When
          </Heading>
          <Input isRequired width="12em" type="date" mb={6} />
        </Flex>
        <Button width="10em" colorScheme="green" alignSelf="center">
          {riding ? "GO" : "HOST"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
