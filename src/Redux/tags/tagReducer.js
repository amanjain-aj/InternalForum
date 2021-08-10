import {
    FETCH_TAG_FAILURE,
    FETCH_TAG_SUCCESS,
    FETCH_TAG_REQUEST,
  } from "./tagTypes";
  
  const initialState = {
    loading: false,
    tags: [],
    error: "",
  };
  
  const TagReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TAG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_TAG_SUCCESS:
        return {
          loading: false,
          tags: action.payload,
          error: "",
        };
      case FETCH_TAG_FAILURE:
        return {
          loading: false,
          tags: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default TagReducer;