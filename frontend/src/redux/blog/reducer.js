import {
  GET_ALL_BLOGS_FAILURE,
  GET_ALL_BLOGS_REQUEST,
  GET_ALL_BLOGS_SUCCESS,
  POST_BLOG_FAILURE,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
} from "./actionType";

const initalState = {
  isLoading: false,
  isError: false,
  crudLoading: true,
  crudError: true,
  blogs: [],
};

export const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BLOGS_REQUEST:
      return { ...state, isLoading: true };
    case GET_ALL_BLOGS_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        blogs: [...payload],
      };
    case POST_BLOG_REQUEST:
      return { ...state, crudLoading: true };
    case POST_BLOG_FAILURE:
      return { ...state, crudLoading: false, crudError: true };
    case POST_BLOG_SUCCESS:
        return {...state, crudLoading: false, crudError: false, blogs: [payload, ...state.blogs]}
    default:
      return { ...state };
  }
};
