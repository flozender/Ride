import React from "react";
import { Heading, Flex, Image } from "@chakra-ui/react";
import Screen from "../assets/green.png";

const Splash = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="80vh"
      position="relative"
    >
      <Image height="90%" src={Screen} />
      <Heading
        fontSize="90px"
        position="absolute"
        top="33vh"
        left="28vw"
        textShadow="4px 2px green"
        fontFamily="Allan"
        transform="rotate(-10deg)"
        color="#D3FFDE"
      >
        POOLING MADE EASY!
      </Heading>
    </Flex>
  );
};

export default Splash;
