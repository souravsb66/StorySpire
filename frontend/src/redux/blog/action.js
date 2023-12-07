import { baseURL } from "../store";
import { GET_ALL_BLOGS_FAILURE, GET_ALL_BLOGS_REQUEST, GET_ALL_BLOGS_SUCCESS } from "./actionType"
import axios from "axios";

export const getAllBlogs = (token) => (dispatch) => {
    dispatch({type: GET_ALL_BLOGS_REQUEST});
    axios({
        method: "GET",
        url: `${baseURL}/blogs`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    .then((res) => {
        // console.log(res);
        dispatch({type: GET_ALL_BLOGS_SUCCESS, payload: res.data});
    })
    .catch((err) => {
        dispatch({type: GET_ALL_BLOGS_FAILURE})
    })
}