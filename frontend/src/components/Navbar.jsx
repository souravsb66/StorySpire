import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Link as ChakraLink,
  Flex,
  Button,
  Image,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { logoutUser } from "../redux/auth/action";
import { LogoB } from "../assets";


const Navbar = () => {
  const { token, user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logoutUser(toast));
  };

  return (
    <Flex p={3} pr={5} boxShadow="lg" bg="white" alignItems='center'>
      <ChakraLink as={ReactRouterLink} to="/">
        <Image src={LogoB} width={130} />
      </ChakraLink>
      <Flex w="100%" justifyContent="flex-end">
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
          <Button
            backgroundColor="#f86969"
            color="white"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}

        {token && (
          <ChakraLink as={ReactRouterLink} to="/register">
            <Image src={user.avatar} width={35} ml={5} onClick={onOpen} borderRadius='50%'  />
          </ChakraLink>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex padding={1} direction="column">
                <Text display="inline" fontSize="20px">
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    color="#888282"
                    display="inline"
                  >
                    Username:
                  </Text>{" "}
                  {user.username}
                </Text>

                <Text display="inline" fontSize="20px">
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    color="#888282"
                    display="inline"
                  >
                    Email:
                  </Text>{" "}
                  {user.email}
                </Text>

              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex gap={2}>
                <Button backgroundColor="#6979f8" color="white" size="xs">
                  Edit
                </Button>
                <Button backgroundColor="#f86969" color="white" size="xs">
                  Reset Password
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Navbar;
