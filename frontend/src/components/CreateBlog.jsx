import React from "react";
import { useSelector, useReducer } from "react-redux";
import {
  Container,
  Heading,
  Button,
  ButtonGroup,
  Text,
  Flex,
  Spacer,
  Box,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";

const CreateBlog = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.authReducer);
  return (
    <Flex direction="column" alignItems="flex-start" gap={2}>
      <Text display="inline" fontSize="20px">
        <Text fontSize="14px" fontWeight={500} color="#888282" display="inline">
          Username:
        </Text>{" "}
        {user.username}
      </Text>
      {/* <FormLabel>Blog Title</FormLabel> */}
      <Input id="title" placeholder="Blog Title" type="text" name="title" />
      <Button backgroundColor="#6979f8" color="white" size="sm" mt={3}>
        Post
      </Button>
    </Flex>
  );
};

export default CreateBlog;
