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
import { Route, Switch, withRouter } from "react-router-dom";

// Page imports
import Login from "./pages/login";
import Logout from "./pages/logout";
import SignUp from "./pages/signup";
import Splash from "./pages/splash";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";

// Component imports
import Fonts from "./components/Fonts";
import ResRoute from "./components/ResRoute";

const App = (props: any) => {
  let user = JSON.parse(localStorage.getItem("ride-user"));
  if (!user) user = null;
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <ChakraProvider theme={customTheme}>
      <Fonts />
      <Box textAlign="center" fontSize="xl" p={6} height="100vh">
        <Nav history={props.history} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route
            exact
            path="/join"
            render={() => <SignUp setCurrentUser={setCurrentUser} />}
          />
          <Route
            exact
            path="/logout"
            render={() => <Logout setCurrentUser={setCurrentUser} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login setCurrentUser={setCurrentUser} />}
          />
          <ResRoute
            path="/dashboard"
            currentUser={currentUser}
            component={<Dashboard currentUser={currentUser} />}
          />
          <ResRoute
            path="/rides"
            currentUser={currentUser}
            component={<Profile currentUser={currentUser} />}
          />
        </Switch>
      </Box>
    </ChakraProvider>
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
  initialColorMode: "light",
  useSystemColorMode: false,
});

const Nav = ({ history, currentUser }) => {
  return (
    <Flex>
      <Box>
        <Heading
          onClick={() => history.push("/")}
          size="2xl"
          fontFamily="Allan"
          cursor="pointer"
          textShadow="3px 1px green"
        >
          RIDE.
        </Heading>
      </Box>
      <Spacer />
      {currentUser ? (
        // Signed In User
        <Box>
          <Button mr="1rem" onClick={() => history.push("/rides")}>
            Your Rides
          </Button>
          <Button mr="1rem" onClick={() => history.push("/logout")}>
            Log out
          </Button>
        </Box>
      ) : (
        // No user
        <Box>
          <Button mr="1rem" onClick={() => history.push("/join")}>
            Sign Up
          </Button>
          <Button mr="1rem" onClick={() => history.push("/login")}>
            Log in
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default withRouter(App);
