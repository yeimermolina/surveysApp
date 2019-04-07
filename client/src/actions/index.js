import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (e) {
    console.log("error on fetch user", e);
  }
};

export const handleToken = token => async dispatch => {
  try {
    const response = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (e) {
    console.log("error on handling stripe token", e);
  }
};

export const submitSurvey = (values, history) => async dispatch => {
  try {
    const response = await axios.post("/api/surveys", values);

    dispatch({ type: FETCH_USER, payload: response.data });
    history.push("/surveys");
  } catch (e) {
    console.log("error on creating survey", e);
  }
};

export const fetchSurveys = () => async dispatch => {
  try {
    const response = await axios.get("/api/surveys");
    dispatch({ type: FETCH_SURVEYS, payload: response.data });
  } catch (e) {
    console.log("error loading surveys", e);
  }
};
