import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/v1.0/users", body);
};

export const login = (creds) => {
  return axios.post("/api/v1.0/auth", {}, { auth: creds });
};

export const getUsers = (page = 0, size = 5) => {
  return axios.get(`/api/v1.0/users?page=${page}&size=${size}`);
};

export const getUser = (username) => {
  return axios.get(`/api/v1.0/users/${username}`);
};

export const updateUser = (body, username) => {
  return axios.put(`/api/v1.0/users/${username}`, body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};

export const setAuthorizationHeader = ({ username, password }) => {
  const authorizationHeaderValue = `Basic ${btoa(username + ":" + password)}`;
  axios.defaults.headers["Authorization"] = authorizationHeaderValue;
};

export const clearAuthorizationHeader = () => {
  delete axios.defaults.headers["Authorization"];
};
