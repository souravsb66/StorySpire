import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Heading,
  Card,
  CardHeader,
  Flex,
  Text,
  CardBody,
  Image,
  Button,
  Grid,
  GridItem,
  useToast
} from "@chakra-ui/react";
import { deleteBlog } from "../redux/blog/action";

const BlogCard = ({ props }) => {

  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = () => {
    dispatch(deleteBlog(props._id, toast)); 
  }
  
  return (
    <Card maxW="md" boxShadow="dark-lg" cursor="pointer" mb={5} textAlign='left'>
      <CardHeader>
        <Grid templateColumns="1fr 3fr 1fr" gap={5}>
          <GridItem >
            <Flex justifyContent="center" alignItems="center" height="100%">
              <Image src={props.avatar} width={50} height={50} borderRadius='50%' objectFit='contain' />
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
              {user.username === props.username && (
                <Button backgroundColor="#6979f8" color="white" size="xs">
                  Edit
                </Button>
              )}
              {user.username === props.username && (
                <Button backgroundColor="#f86969" color="white" size="xs" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </Flex>
          </GridItem>
        </Grid>
      </CardHeader>

      <CardBody>
        <Heading as='h4' size='md' mb={2}>{props.title}</Heading>
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
