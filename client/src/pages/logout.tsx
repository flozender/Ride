import React from "react";
import { Redirect } from "react-router-dom";

const Logout = ({ setCurrentUser }) => {
  setCurrentUser(null);
  return <Redirect to="/" />;
};

export default Logout;
