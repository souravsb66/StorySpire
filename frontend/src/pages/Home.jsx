import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Button,
  Flex,
  Grid,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { getAllBlogs } from "../redux/blog/action";
import BlogCard from "../components/BlogCard";
import { IoSearch } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import CreateBlog from "../components/CreateBlog";
import Modal from "../components/cutom/Modal";

const Home = () => {
  
  const { token } = useSelector((store) => store.authReducer);
  const { blogs } = useSelector((store) => store.blogReducer);
  const dispatch = useDispatch();
 
  const [isModalOpen, setisModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  const openModal = () => {
    setisModalOpen(true);
  }

  const closeModal = () => {
    setisModalOpen(false);
  } 

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleOrder = (e) => {
    setOrder(e.target.value);
  }

  useEffect(() => {
    let query = {
      search,
      category,
      order
    }
    dispatch(getAllBlogs(token, query));
  }, [search, category, order]);

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
                <Input type="search" placeholder="Search Blogs" value={search} onChange={handleSearch}/>
              </InputGroup>
            </Box>

            <Box>
              <Select placeholder="Filter By Category" value={category} onChange={handleCategory}>
                <option value="Business">Business</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Entertainment">Entertainment</option>
              </Select>
            </Box>

            <Box>
              <Select placeholder="Sort By Date" value={order} onChange={handleOrder}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Box>
          </Flex>
          <Flex>
              <Button backgroundColor="#6979f8" color="white" leftIcon={<BsPencilSquare />} onClick={openModal}>
                Create Blog
              </Button>

              <Modal isModalOpen={isModalOpen} closeModal={closeModal} children={<CreateBlog closeModal={closeModal} />} />
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
