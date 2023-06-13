import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/v1.0/users", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
