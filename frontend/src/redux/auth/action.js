import axios from "axios";
import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS } from "./actionType"
import { baseURL } from "../store";


export const register = (payload) => (dispatch) => {
    dispatch({type: CREATE_USER_REQUEST});
    axios.post(`${baseURL}/users/register`, payload)
    .then((res) => {
        alert("Registered Succesfully")
        dispatch({type: CREATE_USER_SUCCESS, payload: res.data.user});
    })
    .catch((err) => {
        dispatch({type: CREATE_USER_FAILURE});
    })
}

export const loginUser = (payload) => (dispatch) => {
    console.log(payload);

    dispatch({type: CREATE_USER_REQUEST});
    axios.post(`${baseURL}/users/login`, payload)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        dispatch({type: CREATE_USER_FAILURE})
    })
}