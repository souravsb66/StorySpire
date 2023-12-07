import { GET_ALL_BLOGS_FAILURE, GET_ALL_BLOGS_REQUEST, GET_ALL_BLOGS_SUCCESS } from "./actionType";

const initalState = {
    isLoading: false,
    isError: false,
    blogs: []
}

export const reducer = (state=initalState, {type, payload}) => {
    switch(type) {
        case GET_ALL_BLOGS_REQUEST:
            return {...state, isLoading: true};
        case GET_ALL_BLOGS_FAILURE:
            return {...state, isLoading: false, isError: true};
        case GET_ALL_BLOGS_SUCCESS:
            return {...state, isLoading: false, isError: false, blogs: [...payload]};
        default: 
            return {...state};
    }
}