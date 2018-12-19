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
  console.log("value: ", value);
  if (value || value === 0) {
    console.log("SET storageValue");
    sessionStorage.setItem("page", value);
  }
  console.log("storageValue: ", storageValue);
  dispatch({
    type: SET_PAGE,
    payload: value ? parseInt(value) : parseInt(storageValue)
  });
  if (!value && !storageValue) {
    console.log("!value && !storageValue");
    dispatch({
      type: SET_PAGE,
      payload: 0
    });
  }
};
