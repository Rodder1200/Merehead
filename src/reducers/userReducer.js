import { FETCH_USERS, SET_PAGE, ERROR } from "../actions/types";

const initialState = {
  users: [],
  page: 0,
  error: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
