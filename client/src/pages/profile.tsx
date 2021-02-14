import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { withRouter } from "react-router-dom";
import {
  Button,
  Heading,
  Flex,
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Modal,
  Tooltip,
  AvatarGroup,
  Box,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import {
  EmailIcon,
  PhoneIcon,
  AtSignIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
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
    rounded="lg"
    mb={6}
    size="lg"
    bg={page === text ? "gray.800" : "gray.900"}
    p={1}
    onClick={() => setPage(text)}
    cursor="pointer"
  >
    {text}
  </Heading>
);

const Profile = (props: any) => {
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
        width="12vw"
        padding={3}
        flexDir="column"
        justifyContent="center"
      >
        <NavItem text="Profile" setPage={setPage} page={page} />
        <NavItem text="Rides" setPage={setPage} page={page} />
        <NavItem text="Hosts" setPage={setPage} page={page} />
      </Flex>
      {/* Profile data */}
      {page === "Profile" ? <ProfilePage {...state} page={page} /> : null}
      {page === "Rides" ? (
        <RidesPage {...state} page={page} currentUser={currentUser} />
      ) : null}
      {page === "Hosts" ? (
        <HostsPage {...state} page={page} currentUser={currentUser} />
      ) : null}
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
      width="42vw"
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
      when: "2021-12-03",
      host: {},
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {
        username: "Jethro",
        name: "Krishna Boyapati",
        phone: "882924414",
        passengers: [
          "Christian Nwamba",
          "Ryan Florence",
          "Segun Adebayo",
          "Kent Dodds",
          "Prosper Otemuyiwa",
        ],
      },
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {
        username: "Jethro",
        name: "Krishna",
        phone: "882924414",
        passengers: [
          "Christian Nwamba",
          "Ryan Florence",
          "Segun Adebayo",
          "Kent Dodds",
          "Prosper Otemuyiwa",
        ],
      },
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {
        username: "Jethro",
        name: "Krishna",
        phone: "882924414",
        passengers: [
          "Christian Nwamba",
          "Ryan Florence",
          "Segun Adebayo",
          "Kent Dodds",
          "Prosper Otemuyiwa",
        ],
      },
    },
    {
      rideId: "#7721",
      status: "accepted",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {
        username: "Jethro",
        name: "Krishna",
        phone: "882924414",
        passengers: [
          "Christian Nwamba",
          "Ryan Florence",
          "Segun Adebayo",
          "Kent Dodds",
          "Prosper Otemuyiwa",
        ],
      },
    },
    {
      rideId: "#7721",
      status: "rejected",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {},
    },
    {
      rideId: "#7721",
      status: "rejected",
      origin: "FL - Florida",
      destination: "TX - Texas",
      when: "2021-12-03",
      host: {},
    },
  ];
  const { page, currentUser } = props;

  return (
    <Flex
      textAlign="center"
      fontSize="md"
      p={8}
      bgColor="gray.800"
      flexDirection="column"
      height="80vh"
      width="42vw"
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
              rideId={ride.rideId}
              status={ride.status}
              origin={ride.origin}
              destination={ride.destination}
              color={color}
              key={i}
              ride={ride}
              page={page}
              currentUser={currentUser}
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
      origin: "OH - Ohio",
      destination: "KS - Kansas",
      requests: [
        {
          poolId: "PL441",
          username: "flozender",
          datetime: "2021-04-30",
          status: "pending",
        },
      ],
      capacity: 3,
      passengers: ["at", "ab", "ac"],
      isCompleted: 0,
      status: "",
      when: "2010-03-09",
    },
    {
      rideId: "#7721",
      origin: "FL - Florida",
      destination: "TX - Texas",
      requests: [],
      capacity: 6,
      passengers: ["at", "ab", "ac"],
      isCompleted: 1,
      status: "",
      when: "2010-03-09",
    },
    {
      rideId: "#8727",
      origin: "FL - Florida",
      destination: "TX - Texas",
      requests: [
        {
          poolId: "PL441",
          username: "Flozender",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PL241",
          username: "Jethro",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Steve",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "John",
          datetime: "2021-04-30",
          status: "rejected",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
        {
          poolId: "PX041",
          username: "Caleb",
          datetime: "2021-04-30",
          status: "pending",
        },
      ],
      capacity: 10,
      passengers: ["at", "ab", "ac"],
      isCompleted: 0,
      status: "",
      when: "2010-03-09",
    },
    {
      rideId: "#9521",
      origin: "KS - Kansas",
      destination: "TX - Texas",
      requests: [],
      capacity: 10,
      passengers: ["at", "ab", "ac"],
      isCompleted: 0,
      status: "",
      when: "2010-03-09",
    },
  ];
  const { page, currentUser } = props;
  return (
    <Flex
      textAlign="center"
      fontSize="md"
      p={8}
      bgColor="gray.800"
      flexDirection="column"
      height="80vh"
      width="42vw"
      justifyContent="flex-start"
    >
      <Flex flexDirection="row" alignItems="center" mb={5}>
        <Heading size="lg">Your Trips</Heading>
      </Flex>
      <Divider mb={5} />
      <VStack overflow="auto">
        {rides.map((ride, i) => {
          let color = "purple";
          let status = "active";
          if (ride.requests.length > 0) {
            color = "green";
            status = "requests";
          }
          if (ride.passengers.length >= ride.capacity) {
            color = "orange";
            status = "full";
          }
          if (ride.isCompleted) {
            color = "red";
            status = "completed";
          }

          ride.status = status;

          return (
            <Card
              rideId={ride.rideId}
              status={status}
              origin={ride.origin}
              destination={ride.destination}
              color={color}
              ride={ride}
              page={page}
              currentUser={currentUser}
            />
          );
        })}
      </VStack>
    </Flex>
  );
};

const Card = ({
  rideId,
  status,
  origin,
  destination,
  color,
  ride,
  page,
  currentUser,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        p={4}
        shadow="md"
        borderWidth="1px"
        rounded="lg"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        onClick={onOpen}
        cursor="pointer"
        bg="gray.900"
      >
        <Heading>{rideId}</Heading>
        <Text ml={5}>{`${origin} to ${destination}`}</Text>
        <Badge p={1} width="6rem" colorScheme={color}>
          {status}
        </Badge>
      </Flex>
      {page === "Rides" ? (
        <RideModal
          isOpen={isOpen}
          onClose={onClose}
          ride={ride}
          color={color}
        />
      ) : (
        <HostModal
          isOpen={isOpen}
          onClose={onClose}
          ride={ride}
          color={color}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

const TooltipAvatar = (props: any) => (
  <Tooltip label={props.name}>
    <Avatar {...props} />
  </Tooltip>
);

const RideModal = ({ isOpen, onClose, ride, color }) => {
  const { rideId, status, origin, destination, host, when } = ride;
  return (
    <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <ModalOverlay />
      <ModalContent height="80vh" width="90vw" bg="gray.900">
        <ModalHeader>
          <Flex justifyContent="space-between">
            <Text>Ride Details</Text>
            <Text>{when}</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Heading size="2xl">{rideId}</Heading>
            <Box>
              <Badge p={2} colorScheme={color}>
                {status}
              </Badge>
            </Box>
          </Flex>
          <Divider orientation="horizontal" mb={4} />
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
              <Heading size="md">{origin}</Heading>
            </Box>
            <Heading>-</Heading>
            <Box>
              <Heading size="sm" mb={2}>
                Destination
              </Heading>
              <Heading size="md">{destination}</Heading>
            </Box>
          </Flex>

          {/* RIDE: host data */}

          {status === "accepted" ? (
            <>
              <Flex
                bg="gray.800"
                p={4}
                height="60%"
                rounded="md"
                justifyContent="flex-start"
                flexDirection="column"
              >
                <Flex justifyContent="space-between" mb={4}>
                  <VStack alignItems="flex-start">
                    <Heading size="sm">Your Host</Heading>
                    <Heading size="lg">{host.name.split(" ")[0]}</Heading>
                  </VStack>

                  <VStack alignItems="flex-end">
                    <Heading size="sm">Phone</Heading>
                    <Heading size="lg">{host.phone}</Heading>
                  </VStack>
                </Flex>
                <Divider orientation="horizontal" mb={4} />
                {/* Passengers Section */}
                <PassengerCard host={host} ride={host} />

                <Flex
                  height="max"
                  mt="auto"
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button colorScheme="green" width="30%">
                    CALL
                  </Button>
                </Flex>
              </Flex>
            </>
          ) : null}
          {status === "pending" ? (
            // Waiting on Host
            <Flex
              bg="gray.800"
              p={4}
              height="60%"
              rounded="md"
              justifyContent="center"
            >
              <VStack alignItems="center" justifyContent="center">
                <Heading size="md">Waiting on Host</Heading>
                <Heading size="sm">
                  Your request has not been accepted yet.
                </Heading>
              </VStack>
            </Flex>
          ) : null}
          {status === "rejected" ? (
            // Request Declined
            <Flex
              bg="gray.800"
              p={4}
              height="60%"
              rounded="md"
              justifyContent="center"
            >
              <VStack alignItems="center" justifyContent="center">
                <Heading size="md">Sorry</Heading>
                <Heading size="sm">
                  The host has rejected your request to ride.
                </Heading>
              </VStack>
            </Flex>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const PassengerCard = ({ host, ride, ...rest }) => {
  return (
    <Flex bg="gray.800" pt={2} height="60%" rounded="md" {...rest}>
      <Flex flexDirection="column" mb={3}>
        <Heading size="md" mb={4}>
          Passengers
        </Heading>
        <AvatarGroup size="md" max={4}>
          <TooltipAvatar name={host.name} />
          {ride.passengers.map((name, i) => {
            return <TooltipAvatar name={name} key={i} />;
          })}
        </AvatarGroup>
      </Flex>
    </Flex>
  );
};

const RequestCard = ({ username }) => {
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
      <Heading size="md">{username}</Heading>
      <HStack spacing={3}>
        <IconButton
          variant="solid"
          colorScheme="green"
          aria-label="Accept Request"
          fontSize="20px"
          isLoading={false}
          size="sm"
          icon={<CheckIcon />}
        />
        <IconButton
          variant="solid"
          colorScheme="red"
          aria-label="Reject Request"
          fontSize="20px"
          isLoading={false}
          size="sm"
          icon={<CloseIcon />}
        />
      </HStack>
    </Flex>
  );
};

const HostModal = ({ isOpen, onClose, ride, color, currentUser }) => {
  const { rideId, origin, destination, when, status } = ride;
  return (
    <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <ModalOverlay />
      <ModalContent height="80vh" width="90vw" bg="gray.900">
        <ModalHeader>
          <Flex justifyContent="space-between">
            <Text>Ride Details</Text>
            <Text>{when}</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Heading size="2xl">{rideId}</Heading>
            <Box>
              <Badge p={2} colorScheme={color}>
                {status}
              </Badge>
            </Box>
          </Flex>
          <Divider orientation="horizontal" mb={4} />
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
              <Heading size="md">{origin}</Heading>
            </Box>
            <Heading>-</Heading>
            <Box>
              <Heading size="sm" mb={2}>
                Destination
              </Heading>
              <Heading size="md">{destination}</Heading>
            </Box>
          </Flex>

          {/* HOST: requests incoming */}

          {status === "requests" ? (
            <Flex
              bg="gray.800"
              p={4}
              height="40vh"
              rounded="md"
              justifyContent="flex-start"
              overflow="auto"
              flexDirection="column"
            >
              {ride.requests.map((request, i) => {
                if (request.status === "rejected") return;
                return <RequestCard username={request.username} key={i} />;
              })}
            </Flex>
          ) : (
            <Flex
              bg="gray.800"
              p={4}
              rounded="md"
              justifyContent="space-evenly"
              mt="auto"
              flexDirection="column"
            >
              <Heading
                alignSelf="center"
                mb={4}
              >{`Seats ${ride.passengers.length}/${ride.capacity}`}</Heading>
              <Divider orientation="horizontal" />
              <PassengerCard host={currentUser} ride={ride} />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Profile);
