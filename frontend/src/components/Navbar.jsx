import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Container, Button } from "@chakra-ui/react";
import { logoutUser } from "../redux/auth/action";

const Navbar = () => {
  const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container>
      <ChakraLink as={ReactRouterLink} to="/">
        Home
      </ChakraLink>
      {!token && (
        <ChakraLink as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
      )}
      {!token && (
        <ChakraLink as={ReactRouterLink} to="/register">
          Register
        </ChakraLink>
      )}
      {token && (
        <ChakraLink as={ReactRouterLink} to="/register">
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        </ChakraLink>
      )}
    </Container>
  );
};

export default Navbar;
