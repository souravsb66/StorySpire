import React, { useState } from "react";
import { useSelector, useReducer } from "react-redux";
import { Button, Text, Textarea, Flex, Input, Select } from "@chakra-ui/react";

const CreateBlog = ({ closeModal }) => {
  const initialBlogData = {
    title: "",
    content: "",
    category: "",
  };
  const { user } = useSelector((store) => store.authReducer);

  const [blogData, setBlogData] = useState(initialBlogData);

  const handleChange = (e) => {
    setBlogData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePost = () => {
    let date = new Date().toISOString().slice(0, 10);

    let postData = {
      ...blogData,
      date,
    };
    console.log(postData);
    closeModal();
    setBlogData(initialBlogData);
  };
  return (
    <Flex direction="column" alignItems="flex-start" gap={2}>
      <Text display="inline" fontSize="20px">
        <Text fontSize="14px" fontWeight={500} color="#888282" display="inline">
          Username:
        </Text>{" "}
        {user.username}
      </Text>
      {/* <FormLabel>Blog Title</FormLabel> */}
      <Input
        id="title"
        placeholder="Blog Title"
        type="text"
        name="title"
        value={blogData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        id="content"
        placeholder="Blog Content"
        name="content"
        value={blogData.content}
        onChange={handleChange}
        required
      />
      <Select
        placeholder="Select Category"
        id="category"
        name="category"
        value={blogData.category}
        onChange={handleChange}
        required
      >
        <option value="Business">Business</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Entertainment">Entertainment</option>
      </Select>
      <Button
        backgroundColor="#6979f8"
        color="white"
        size="sm"
        mt={3}
        onClick={handlePost}
        isDisabled={
            blogData.category && blogData.content && blogData.title ? false : true
        }
      >
        Post
      </Button>
    </Flex>
  );
};

export default CreateBlog;
