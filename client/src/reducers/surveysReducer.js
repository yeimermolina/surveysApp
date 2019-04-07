import { FETCH_SURVEYS } from "../actions/types";

const initialState = {
  surveys: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    default:
      return state;
  }
};
