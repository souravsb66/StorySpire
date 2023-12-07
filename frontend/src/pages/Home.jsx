import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Container,
  Heading,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Text,
  IconButton,
  CardBody,
  Image,
  CardFooter,
  Button
} from "@chakra-ui/react";
import { getAllBlogs } from "../redux/blog/action";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcxYTgxNmMzZTFiY2VjYTJjMzg1NzAiLCJ1c2VybmFtZSI6InJpc2hhdiIsImlhdCI6MTcwMTk1MTIxM30.NWPIqFxQ_Nch6Vvfn6gd8w1XmG_rzE4UZZx-zP9R_mI";
  const { blogs } = useSelector((store) => store.blogReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs(token));
  }, []);

  console.log(blogs.length);

  return (
    <Container>
      <Heading>Home</Heading>

      <Container>
        {blogs.length > 0 &&
          blogs.map((ele) => {
            return (
              <Card maxW="md">
                <CardHeader>
                  <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar src={ele.avatar} />

                      <Box>
                        <Heading size="sm">{ele.username}</Heading>
                      </Box>
                    </Flex>
                    {/* <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                    /> */}
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{ele.content}</Text>
                </CardBody>

                <CardFooter
                  justify="space-between"
                  flexWrap="wrap"
                  sx={{
                    "& > button": {
                      minW: "136px",
                    },
                  }}
                >
                  <Button flex="1" variant="ghost" >
                    Like
                  </Button>
                  <Button flex="1" variant="ghost" >
                    Comment
                  </Button>
                  <Button flex="1" variant="ghost" >
                    Share
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </Container>
    </Container>
  );
};

export default Home;
