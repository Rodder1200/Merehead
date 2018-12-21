import { FETCH_USERS, SET_PAGE, ERROR } from "./types";
import axios from "axios";

export const fetchUsers = value => dispatch => {
  axios
    .get(
      `${"https://cors-anywhere.herokuapp.com/"}http://dev.frevend.com/json/users.json`
    )
    .then(response => {
      dispatch({
        type: FETCH_USERS,
        payload: response.data.users
      });
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        payload: error.message
      });
    });
};

export const setPage = value => dispatch => {
  let storageValue = sessionStorage.getItem("page");
  if (value === "init") {
    dispatch({
      type: SET_PAGE,
      payload:
        storageValue && storageValue !== "undefined"
          ? parseInt(storageValue)
          : 0
    });
  } else {
    sessionStorage.setItem("page", value);
    dispatch({
      type: SET_PAGE,
      payload: parseInt(value)
    });
  }
};
