import { baseURL } from "../store";
import {
  DELETE_BLOG_SUCCESS,
  GET_ALL_BLOGS_FAILURE,
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  POST_BLOG_FAILURE,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
} from "./actionType";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllBlogs = (token, query) => (dispatch) => {
  dispatch({ type: GET_ALL_BLOGS_REQUEST });
  axios({
    method: "GET",
    url: `${baseURL}/blogs`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query
  })
    .then((res) => {
      // console.log(res);
      dispatch({ type: GET_ALL_BLOGS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_ALL_BLOGS_FAILURE });
    });
};

export const postNewBlog = (postData, toast) => (dispatch) => {

    const token = Cookies.get("token");

  dispatch({ type: POST_BLOG_REQUEST });
  axios({
    method: "POST",
    url: `${baseURL}/blogs`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: postData,
  })
    .then((res) => {
      console.log(res.data);

      toast({
        title: "Blog Posted",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      dispatch({ type: POST_BLOG_SUCCESS, payload: res.data.blog });
    })
    .catch((err) => {
      toast({
        title: 'Post Unsuccesful.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
    })
      dispatch({ type: POST_BLOG_FAILURE });
    });
};

export const deleteBlog = (blogId, toast) => (dispatch) => {
  const token = Cookies.get("token");
  dispatch({type: POST_BLOG_REQUEST});
  axios({
    method: 'DELETE',
    url: `${baseURL}/blogs/${blogId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => {
    console.log(res.data);

    toast({
      title: "Blog Deleted",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });

    console.log(res.data);
    dispatch({ type: DELETE_BLOG_SUCCESS, payload: blogId});
  })
  .catch((err) => {
    toast({
      title: 'Post Unsuccesful.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right'
  })
    dispatch({ type: POST_BLOG_FAILURE });
  });
}