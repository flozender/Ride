import React, { useState } from "react";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Image,
  Avatar,
  AvatarBadge,
  Box,
  Spacer,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
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
    {/* {Icon} */}
    {/* <Input ml={6} fontSize="xl" value={text} variant="filled" /> */}
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={Icon} />
      <Input type="tel" value={text} variant="filled" />
    </InputGroup>
  </Flex>
);

const Profile = ({ currentUser }) => {
  currentUser.email = "tayeeb.hasan@gmail.com";
  currentUser.phone = "9999999";
  const bg = useColorModeValue("gray.100", "gray.900");
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
          <Avatar size="lg" name={currentUser.name} mr={12}>
            <AvatarBadge boxSize="1em" bg="green.600" />
          </Avatar>
          <Heading size="lg">{currentUser.name}</Heading>
        </Flex>
        <Divider mb={10} />
        <DataBox
          text={currentUser.username}
          Icon={<AtSignIcon w={6} h={6} color="gray.300" />}
        />
        <DataBox text={currentUser.email} Icon={<EmailIcon w={6} h={6} />} />
        <DataBox text={currentUser.phone} Icon={<PhoneIcon w={6} h={6} />} />
        <Button colorScheme="green">Update</Button>
      </Flex>
    </Flex>
  );
};

export default Profile;
