import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Spinner,
  VStack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import "../assets/scroll.css";

const DataBox = ({ text, Icon }) => (
  <Flex
    alignSelf="center"
    mb={10}
    width="90%"
    justifyContent="flex-start"
    alignItems="center"
  >
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={Icon} />
      <Input type="tel" value={text} variant="filled" />
    </InputGroup>
  </Flex>
);

const NavItem = ({ setPage, text, page }) => (
  <Heading
    rounded="sm"
    mb={6}
    size="lg"
    bg={page == text ? "gray.800" : "gray.900"}
    p={1}
    onClick={() => setPage(text)}
    cursor="pointer"
  >
    {text}
  </Heading>
);

const Profile = (props: any) => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);
  const { currentUser, history } = props;
  const [page, setPage] = useState("Profile");
  useEffect(() => {
    fetch(`/profile/${currentUser.username}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) throw Error(json.message);
        setState({ ...json.profileData });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "bottom-left",
          title: "Failed to load info",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        history.push("/");
      });
  }, [currentUser, history, toast]);
  if (loading)
    return <Spinner position="relative" top="30vh" size="xl" color="green" />;
  return (
    <Flex justifyContent="center" alignItems="center" height="87vh">
      <Flex
        bg="gray.900"
        height="80vh"
        width="10vw"
        padding={3}
        flexDir="column"
        justifyContent="center"
      >
        <NavItem text="Profile" setPage={setPage} page={page} />
        <NavItem text="Rides" setPage={setPage} page={page} />
        <NavItem text="Hosts" setPage={setPage} page={page} />
      </Flex>
      {/* Profile data */}
      {page === "Profile" ? <ProfilePage {...state} /> : null}
      {page === "Rides" ? <RidesPage {...state} /> : null}
      {page === "Hosts" ? <HostsPage {...state} /> : null}
    </Flex>
  );
};

const ProfilePage = (props: any) => {
  const { name, username, email, phone } = props;
  return (
    <Flex
      textAlign="center"
      fontSize="md"
      p={8}
      bgColor="gray.800"
      flexDirection="column"
      height="80vh"
      width="40vw"
      justifyContent="flex-start"
    >
      <Flex flexDirection="row" alignItems="center" mb={5}>
        <Avatar size="lg" name={name} mr={12}>
          <AvatarBadge boxSize="1em" bg="green.600" />
        </Avatar>
        <Heading size="lg">{name}</Heading>
      </Flex>
      <Divider mb={10} />
      <DataBox
        text={username}
        Icon={<AtSignIcon w={6} h={6} color="gray.300" />}
      />
      <DataBox text={email} Icon={<EmailIcon w={6} h={6} />} />
      <DataBox text={phone} Icon={<PhoneIcon w={6} h={6} />} />
      <Button colorScheme="green" width="30%" alignSelf="center">
        Update
      </Button>
    </Flex>
  );
};

const RidesPage = (props: any) => {
  const rides = [
    {
      rideId: "#2525",
      status: "pending",
      origin: "OH - Ohio",
      destination: "KS - Kansas",
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
    {
      rideId: "#7721",
      status: "rejected",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
    {
      rideId: "#7721",
      status: "rejected",
      origin: "FL - Florida",
      destination: "TX - Texas",
    },
  ];
  return (
    <Flex
      textAlign="center"
      fontSize="md"
      p={8}
      bgColor="gray.800"
      flexDirection="column"
      height="80vh"
      width="40vw"
      justifyContent="flex-start"
    >
      <Flex flexDirection="row" alignItems="center" mb={5}>
        <Heading size="lg">Ride Requests</Heading>
      </Flex>
      <Divider mb={5} />
      <VStack overflow="auto">
        {rides.map((ride, i) => {
          let color = null;
          if (ride.status === "accepted") {
            color = "green";
          } else if (ride.status === "rejected") {
            color = "red";
          }
          return (
            <Card
              ride={ride.rideId}
              status={ride.status}
              origin={ride.origin}
              destination={ride.destination}
              color={color}
              key={i}
            />
          );
        })}
      </VStack>
    </Flex>
  );
};

const HostsPage = (props: any) => {
  const rides = [
    {
      rideId: "#2525",
      status: "pending",
      origin: "OH - Ohio",
      destination: "KS - Kansas",
      requests: 9,
      capacity: 3,
      passengers: ["at", "ab", "ac"],
      isCompleted: 0,
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      requests: 2,
      capacity: 6,
      passengers: ["at", "ab", "ac"],
      isCompleted: 1,
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      requests: 9,
      capacity: 10,
      passengers: ["at", "ab", "ac"],
      isCompleted: 0,
    },
  ];
  return (
    <Flex
      textAlign="center"
      fontSize="md"
      p={8}
      bgColor="gray.800"
      flexDirection="column"
      height="80vh"
      width="40vw"
      justifyContent="flex-start"
    >
      <Flex flexDirection="row" alignItems="center" mb={5}>
        <Heading size="lg">Your Trips</Heading>
      </Flex>
      <Divider mb={5} />
      <VStack overflow="auto">
        {rides.map((ride, i) => {
          let color = null;
          let status = "active";
          if (ride.requests) {
            color = "green";
            status = "requested";
          }
          if (ride.capacity === ride.passengers.length) {
            color = "orange";
            status = "full";
          }
          if (ride.isCompleted) {
            color = "red";
            status = "completed";
          }

          return (
            <Card
              ride={ride.rideId}
              status={status}
              origin={ride.origin}
              destination={ride.destination}
              color={color}
            />
          );
        })}
      </VStack>
    </Flex>
  );
};

const Card = ({ ride, status, origin, destination, color }) => {
  return (
    <Flex
      p={4}
      shadow="md"
      borderWidth="1px"
      rounded="lg"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading>{ride}</Heading>
      <Text ml={5}>{`${origin} to ${destination}`}</Text>
      <Badge p={1} width="6rem" colorScheme={color}>
        {status}
      </Badge>
    </Flex>
  );
};

export default withRouter(Profile);
