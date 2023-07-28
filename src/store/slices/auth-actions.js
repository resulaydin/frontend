import { login, signUp } from "../../api/apiCalls";
import { onLoginSuccess, onLogoutSuccess, onUpdateSuccess } from "./auth-slice";

export const loginHandler = (creds) => {
  return async (dispatch) => {
    const sendAuthRequest = async () => {
      const response = await login(creds);
      const authState = {
        ...response.data,
        password: creds.password,
        isLoggedIn: true,
      };
      dispatch(onLoginSuccess(authState));
      return response;
    };

    await sendAuthRequest();
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    dispatch(onLogoutSuccess());
  };
};

export const updateSuccessHandler = ({ displayName, image }) => {
  return (dispatch) => {
    const userInfo = {
      displayName,
      image,
    };
    dispatch(onUpdateSuccess(userInfo));
  };
};

export const signupHanler = (body) => {
  return async (dispatch) => {
    const response = await signUp(body);
    await dispatch(loginHandler(body));
    return response;
  };
};
