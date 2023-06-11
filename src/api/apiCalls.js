import axios from "axios";

export const SignUp = (body) => {
  return axios.post("/api/v1.0/users", body);
};
