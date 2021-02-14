import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import fetchApi from "../components/fetch-custom";

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
  FormControl,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Modal,
  useDisclosure,
  Spinner,
  VStack,
} from "@chakra-ui/react";

import { states } from "../us-states";

const Picker = ({ text, name, onChange, ...rest }) => (
  <Flex flexDirection="column" alignItems="flex-start" mb={2} {...rest}>
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
    capacity: "",
  });
  const [search, setSearch] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    setLoading(true);
    const { when, origin, destination, capacity } = state;
    if (!riding) {
      if (!when || !origin || !destination || !capacity) {
        setLoading(false);
        toast({
          position: "bottom-left",
          title: "Missing Fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      fetchApi(`/trip`, {
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
    } else {
      // Riding
      if (!when || !origin || !destination) {
        setLoading(false);
        toast({
          position: "bottom-left",
          title: "Missing Fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setLoading(true);
      onOpen();

      fetchApi(`/pool/trips`, {
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
          setSearch(json.trips);
          setLoading(false);
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
      setLoading(false);
    }
  };

  const handleChange = (event: any) => {
    let { value, name } = event.target;
    if (name === "when") {
      value = value + " 23:59:59";
    }
    setState({ ...state, [name]: value });
  };

  const { capacity } = state;
  return (
    <>
      <Flex
        height="80vh"
        width="70vw"
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
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="riding" mb="0">
                {riding ? "Riding" : "Hosting"}
              </FormLabel>
              <Switch
                name="riding"
                defaultChecked={riding}
                colorScheme="green"
                size="lg"
                onChange={() => setRiding(!riding)}
              />
            </FormControl>
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
              alignItems="flex-start"
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
            onClick={() => {
              handleSubmit();
              setLoading(true);
            }}
            isLoading={loading}
          >
            {riding ? "GO" : "HOST"}
          </Button>
        </Flex>
      </Flex>
      <SearchModal
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
        search={search}
        state={state}
        currentUser={currentUser}
      />
    </>
  );
};

const RequestCard = ({ ride, currentUser }) => {
  const [requesting, setRequesting] = useState(false);
  const { rideid, when } = ride;
  const toast = useToast();

  const handleSubmit = () => {
    fetchApi(`/pool/request/${rideid}`, {
      method: "post",
      body: JSON.stringify(ride),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) throw Error(json.message);
        setRequesting(false);
        toast({
          position: "bottom-left",
          title: "Request sent!",
          description: "You should hear back soon.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setRequesting(false);
        toast({
          position: "bottom-left",
          title: "Failed to request pool",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <Flex
      p={4}
      shadow="md"
      borderWidth="1px"
      rounded="lg"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      bg="gray.900"
      mb={2}
    >
      <Heading size="md">{`#${rideid.slice(-4)}`}</Heading>
      <Heading size="sm">{when.substring(0, 10)}</Heading>
      <Button
        colorScheme="green"
        isLoading={requesting}
        onClick={() => {
          setRequesting(true);
          handleSubmit();
        }}
      >
        Request
      </Button>
    </Flex>
  );
};

const SearchModal = ({
  isOpen,
  onClose,
  loading,
  search,
  state,
  currentUser,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <ModalOverlay />
      <ModalContent height="80vh" width="90vw" bg="gray.900">
        <ModalHeader>
          <Flex justifyContent="space-between">
            <Text>Available Trips</Text>
            <Text>{state.when.split(" ")[0]}</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {/* Origin/Destination */}
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            mb={4}
            p={4}
            shadow="md"
            borderWidth="1px"
            rounded="lg"
            width="100%"
          >
            <Box>
              <Heading size="sm" mb={2}>
                Origin
              </Heading>
              <Heading size="md">{state.origin}</Heading>
            </Box>
            <Heading>-</Heading>
            <Box>
              <Heading size="sm" mb={2}>
                Destination
              </Heading>
              <Heading size="md">{state.destination}</Heading>
            </Box>
          </Flex>
          <Divider orientation="horizontal" mb={4} />
          {/* HOST: requests incoming */}

          <Flex
            bg="gray.800"
            p={4}
            height="50vh"
            rounded="md"
            justifyContent="flex-start"
            overflow="auto"
            flexDirection="column"
          >
            {loading ? (
              <Spinner size="xl" color="green" margin="auto" />
            ) : search.length > 0 ? (
              search.map((ride, i) => {
                return (
                  <RequestCard ride={ride} key={i} currentUser={currentUser} />
                );
              })
            ) : (
              <Flex
                bg="gray.800"
                p={4}
                height="60%"
                rounded="md"
                justifyContent="center"
                margin="auto"
              >
                <VStack alignItems="center" justifyContent="center">
                  <Heading size="md">No Results Found</Heading>
                  <Heading size="sm">Please try another date.</Heading>
                </VStack>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Dashboard);
