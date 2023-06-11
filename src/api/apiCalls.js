import axios from "axios";

export const apiSignUpPost = (body) => {
  return axios.post("/api/v1.0/users", body);
};
