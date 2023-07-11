import { login } from "../../api/apiCalls";
import SecureLS from "secure-ls";
import { signUp } from "../../api/apiCalls";
import {
  onLoginSuccess,
  onLogoutSuccess,
  onChangeStateSuccess,
} from "./auth-slice";

const secureLs = new SecureLS();

const updateStateStorage = (newState) => {
  secureLs.set("hoax-auth", newState);
};

export const loginHandler = (creds) => {
  return async (dispatch) => {
    const sendAuthRequest = async () => {
      const response = await login(creds);

      const authState = {
        userInfo: {
          ...response.data,
          password: creds.password,
        },
        isLoggedIn: true,
      };

      dispatch(onLoginSuccess(authState));
      updateStateStorage(authState);
      return response;
    };

    await sendAuthRequest();
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    const newAuthState = {
      userInfo: {},
      isLoggedIn: false,
    };

    updateStateStorage(newAuthState);

    dispatch(onLogoutSuccess(newAuthState));
  };
};

export const signupHanler = (body) => {
  return async (dispatch) => {
    const response = await signUp(body);
    await dispatch(loginHandler(body));
    return response;
  };
};

export const stateController = () => {
  return (dispatch) => {
    const secureLs = new SecureLS();

    let initialState = {
      isLoggedIn: false,
      userInfo: {
        username: "",
        dislayName: "",
        image: "",
        password: "",
      },
    };

    const authInfo = secureLs.get("hoax-auth");
    if (authInfo.isLoggedIn) {
      initialState = { ...authInfo };
    }
    dispatch(onChangeStateSuccess(initialState));
  };
};
