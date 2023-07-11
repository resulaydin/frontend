import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/v1.0/users", body);
};

export const login = (creds) => {
  return axios.post("/api/v1.0/auth", {}, { auth: creds });
};

export const getUsers = (page=0, size=5) => {
  return axios.get(
    `/api/v1.0/users?page=${page}&size=${size}`
  );
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
