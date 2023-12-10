import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Heading, Button, Flex } from "@chakra-ui/react";
import { getAllBlogs } from "../redux/blog/action";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const { token, user } = useSelector((store) => store.authReducer);
  const { blogs } = useSelector((store) => store.blogReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs(token));
  }, []);

  return (
    <Container mt={5}>

      <Container>
        <Flex>

        </Flex>
      </Container>

      <Container>
        {blogs.length > 0 &&
          blogs.map((ele) => {
            return <BlogCard props={ele} key={ele.id} />;
          })}
      </Container>
    </Container>
  );
};

export default Home;
