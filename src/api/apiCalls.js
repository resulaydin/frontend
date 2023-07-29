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

export const setAuthorizationHeader = (data) => {
  const { username, password, isLoggedIn } = data.authStore;
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ":" + password)}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const postHoax = (body) => {
  return axios.post("/api/v1.0/hoaxes", body);
};

export const getHoaxes = (username, page = 0, size = 1) => {
  let path = username
    ? `/api/v1.0/users/${username}/hoaxes?page=`
    : "/api/v1.0/hoaxes?page=";
  return axios.get(path + `${page}&size=${size}`);
};

export const getOldHoaxes = (id, page = 0, size = 2) => {
  return axios.get(`/api/v1.0/hoaxes/${id}?page=${page}&size=${size}`);
};
