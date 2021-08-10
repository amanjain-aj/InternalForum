import {
  FETCH_QUESTION_FAILURE,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
} from "./questionTypes";

const initialState = {
  loading: false,
  questions: [],
  error: "",
};

const Questionreducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUESTION_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
        error: "",
      };
    case FETCH_QUESTION_FAILURE:
      return {
        loading: false,
        questions: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Questionreducer;