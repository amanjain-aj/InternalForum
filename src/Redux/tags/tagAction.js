import axios from "axios";
import {
  FETCH_TAG_FAILURE,
  FETCH_TAG_SUCCESS,
  FETCH_TAG_REQUEST,
} from "./tagTypes";

export const fetchTagRequest = () => {
  return {
    type: FETCH_TAG_REQUEST,
  };
};

export const fetchTagSuccess = (tags) => {
  return {
    type: FETCH_TAG_SUCCESS,
    payload: tags,
  };
};

export const fetchTagFailure = (error) => {
  return {
    type: FETCH_TAG_FAILURE,
    payload: error,
  };
};

export const FetchTag = (fetchSearch) => {
  return async (dispatch) => {
    dispatch(fetchTagRequest());
    let token = window.localStorage.getItem("userdata").split(" ")[2];
    try {
      const response = await axios.get(
        `https://internalforum.herokuapp.com/api/get/questions/${fetchSearch}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      const tags = response.data;
      console.log(tags);
      dispatch(fetchTagSuccess(tags));
    } catch (error) {
      dispatch(fetchTagFailure(error.message));
    }
  };
};
