import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Heading,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Spacer,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure
} from "@chakra-ui/react";
import { getAllBlogs } from "../redux/blog/action";
import BlogCard from "../components/BlogCard";
import { IoSearch } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import CreateBlog from "../components/CreateBlog";
import Modal from "../components/cutom/Modal";

const Home = () => {
  
  const { token, user } = useSelector((store) => store.authReducer);
  const { blogs } = useSelector((store) => store.blogReducer);
  const dispatch = useDispatch();
 
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  } 

  useEffect(() => {
    dispatch(getAllBlogs(token));
  }, []);

  return (
    <Container mt={5} maxW="xxl">
      <Container maxW="100%">
        <Flex justifyContent='space-between'>
          <Flex columnGap={10} justifyContent="space-evenly">
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IoSearch fontSize="26px" />
                </InputLeftElement>
                <Input type="search" placeholder="Search Blogs" />
              </InputGroup>
            </Box>

            <Box>
              <Select placeholder="Filter By Category">
                <option value="Business">Business</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Entertainment">Entertainment</option>
              </Select>
            </Box>

            <Box>
              <Select placeholder="Sort By Date">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Box>
          </Flex>
          <Flex>
              <Button backgroundColor="#6979f8" color="white" leftIcon={<BsPencilSquare />} onClick={openModal}>
                Create Blog
              </Button>

              <Modal isOpen={isOpen} closeModal={closeModal} children={<CreateBlog />} />
          </Flex>
        </Flex>
      </Container>

      <Grid mt={5} templateColumns='repeat(3, 1fr)' gap={10} p={5}>
        {blogs.length > 0 &&
          blogs.map((ele) => {
            return <BlogCard props={ele} key={ele.id} />;
          })}
      </Grid>
    </Container>
  );
};

export default Home;
