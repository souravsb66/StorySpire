import axios from "axios";
import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "./actionType"
import { baseURL } from "../store";

export const register = (payload, toast) => (dispatch) => {
    dispatch({type: CREATE_USER_REQUEST});
    axios.post(`${baseURL}/users/register`, payload)
    .then((res) => {
        
        const userData = {
            token: res.data.token,
            user: res.data.user
        }
        
        toast({
            title: 'Registration Succesful.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
        })
        dispatch({type: CREATE_USER_SUCCESS, payload: userData});
    })
    .catch((err) => {
        toast({
            title: 'Registration Unsuccesful.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
        })
        dispatch({type: CREATE_USER_FAILURE});
    })
}

export const loginUser = (payload, toast) => (dispatch) => {
    // console.log(payload);

    dispatch({type: CREATE_USER_REQUEST});
    axios.post(`${baseURL}/users/login`, payload)
    .then((res) => {
        console.log(res);
        const userData = {
            token: res.data.token,
            user: res.data.user
        }
        // alert("Login Succesful");
        toast({
            title: 'Login Succesful.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
        })

        dispatch({type: LOGIN_USER_SUCCESS, payload: userData});
    })
    .catch((err) => {
        toast({
            title: 'Login Unsuccesful.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right'
        })
        dispatch({type: CREATE_USER_FAILURE})
    })
}

export const logoutUser = (toast) => (dispatch) => {

    toast({
        title: 'Logout Succesful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
    })
    dispatch({type: LOGOUT_USER_SUCCESS});
}