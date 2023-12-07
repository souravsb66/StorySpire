import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Input,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { register } from "../redux/auth/action";

const Register = () => {
  const initialData = {
    username: "",
    avatar:
      "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialData);
  const { token } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    dispatch(register(userData));
    setUserData(initialData);
    navigate("/login");
  };

  if(token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Container>
      <Heading size="md">Register User</Heading>

      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          id="username"
          placeholder="Username"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <FormLabel>Avatar</FormLabel>
        <Input
          id="avatar"
          placeholder="Avatar"
          type="text"
          name="avatar"
          value={userData.avatar}
          onChange={handleChange}
        />
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

        <Button colorScheme="blue" onClick={handleSubmit}>
          Register
        </Button>
      </FormControl>
    </Container>
  );
};

export default Register;
