import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { withRouter } from "react-router-dom";
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
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, AtSignIcon } from "@chakra-ui/icons";

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

const Profile = (props: any) => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);
  const { currentUser, history } = props;
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
  const { name, username, phone, email } = state;
  return (
    <Flex justifyContent="center" alignItems="center" height="75vh">
      <Flex
        textAlign="center"
        fontSize="md"
        p={8}
        bgColor={bg}
        borderRadius="md"
        flexDirection="column"
        height="65vh"
        width="30vw"
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
        <Button colorScheme="green">Update</Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(Profile);
