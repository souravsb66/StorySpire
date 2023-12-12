import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  Input,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Button,
  useToast
} from "@chakra-ui/react";
import { loginUser } from "../redux/auth/action";

const Home = () => {
  const initialData = {
    email: "",
    password: ""
};
  const [userData, setUserData] = useState(initialData);
  const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const toast = useToast();
  // const toastIdRef = useRef();

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    // console.log(userData);
    dispatch(loginUser(userData, toast));
  };

  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container mt={5}>
      <Heading size="md">Login</Heading>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <Button colorScheme="blue" onClick={handleSubmit} size='md' mt={5}>
          Login
        </Button>
      </FormControl>
    </Container>
  );
};

export default Home;
