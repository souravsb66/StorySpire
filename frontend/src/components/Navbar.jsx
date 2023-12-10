import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Link as ChakraLink,
  Flex,
  Spacer,
  Button,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { logoutUser } from "../redux/auth/action";
import { LogoB } from "../assets";

const Navbar = () => {
  const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logoutUser(toast));
  };

  return (
    <Flex p={3} pr={5} boxShadow="lg" bg="white">
      <ChakraLink as={ReactRouterLink} to="/">
        <Image src={LogoB} width={130} />
      </ChakraLink>
      <Flex w='100%' justifyContent='flex-end' >
        {!token && (
          <ChakraLink as={ReactRouterLink} to="/login" mr={10}>
            <Button colorScheme="blue" size="sm">
              Login
            </Button>
          </ChakraLink>
        )}
        {!token && (
          <ChakraLink as={ReactRouterLink} to="/register">
            <Button colorScheme="blue" size="sm">
              Register
            </Button>
          </ChakraLink>
        )}
        {token && (
          <ChakraLink as={ReactRouterLink} to="/register">
            <Button colorScheme="blue" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </ChakraLink>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
