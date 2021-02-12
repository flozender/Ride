import React, { useState } from "react";
import {
  Button,
  ChakraProvider,
  Box,
  Heading,
  Spacer,
  Flex,
  extendTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// Page imports
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Splash from "./pages/splash";

// Component imports
import Fonts from "./components/Fonts";

const Nav = (props: any) => {
  return (
    <Flex>
      <Box>
        <Heading
          onClick={() => props.history.push("/dashboard")}
          size="xl"
          fontFamily="Allan"
          cursor="pointer"
          textShadow="3px 1px green"
        >
          RIDE.
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button mr="1rem" onClick={() => props.history.push("/join")}>
          Sign Up
        </Button>
        <Button mr="1rem" onClick={() => props.history.push("/login")}>
          Log in
        </Button>
      </Box>
    </Flex>
  );
};

const customTheme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "md",
        bg: mode("white", "black")(props),
        lineHeight: "tall",
      },
      a: {
        color: "teal.500",
      },
    }),
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  components: {
    Button: {
      baseStyle: {},
    },
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});

const App = (props: any) => {
  const [state, setState] = useState({
    currentUser: true,
  });

  const { currentUser } = state;

  return (
    <ChakraProvider theme={customTheme}>
      <Fonts />
      <Box textAlign="center" fontSize="xl" p={6} height="100vh">
        <Nav history={props.history} />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/join" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/dashboard"
            render={() => (!currentUser ? <Redirect to="/" /> : <></>)}
          />
        </Switch>
      </Box>
    </ChakraProvider>
  );
};

export default withRouter(App);
