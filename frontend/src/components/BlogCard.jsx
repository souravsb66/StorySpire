import React from "react";
import { useSelector } from "react-redux";
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
  Button,
  ButtonGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const BlogCard = ({ props }) => {
  const { user } = useSelector((store) => store.authReducer);

  return (
    <Card maxW="md" boxShadow="dark-lg" cursor="pointer" mb={5}>
      <CardHeader>
        <Grid templateColumns="1fr 3fr 1fr" gap={5}>
          <GridItem >
            <Flex justifyContent="center" alignItems="center" height="100%">
              <Image src={props.avatar} width={50} height={50} />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" justifyContent='space-between' alignItems='flex-start'>
              <Text size='md' fontWeight='600'>
                {props.username}
              </Text>
              <Flex direction="column" mt={3} justifyContent='center' alignItems='flex-start'>
                <Text fontSize='14px' fontWeight='400' color='#888282'>{props.category}</Text>
                <Text fontSize='13px' fontWeight='400' color='#888282'>{props.date}</Text>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction="column" rowGap={1} >
              {user.username == props.username && (
                <Button backgroundColor="#ee6031" color="white" size="xs">
                  Edit
                </Button>
              )}
              {user.username == props.username && (
                <Button backgroundColor="#d83f98" color="white" size="xs">
                  Delete
                </Button>
              )}
            </Flex>
          </GridItem>
        </Grid>
      </CardHeader>

      <CardBody>
        <Text>{props.content}</Text>
      </CardBody>

      {/* <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost">
          Like
        </Button>
        <Button flex="1" variant="ghost">
          Comment
        </Button>
        <Button flex="1" variant="ghost">
          Share
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default BlogCard;
