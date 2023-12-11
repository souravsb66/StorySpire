import { baseURL } from "../store";
import {
  GET_ALL_BLOGS_FAILURE,
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  POST_BLOG_FAILURE,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
} from "./actionType";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getAllBlogs = (token) => (dispatch) => {
  dispatch({ type: GET_ALL_BLOGS_REQUEST });
  axios({
    method: "GET",
    url: `${baseURL}/blogs`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

    // console.log(postData);
    // console.log(token);

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
      dispatch({ type: POST_BLOG_FAILURE });
    });
};
