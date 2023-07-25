import {
  login,
  signUp,
  setAuthorizationHeader,
  clearAuthorizationHeader,
} from "../../api/apiCalls";
import SecureLS from "secure-ls";
import {
  onLoginSuccess,
  onLogoutSuccess,
  onChangeStateSuccess,
  onUpdateSuccess,
} from "./auth-slice";

const secureLs = new SecureLS();

const updateStateStorage = (newState) => {
  const authInfo = secureLs.get("hoax-auth");
  if (authInfo) {
    newState = { ...authInfo, ...newState };
  }

  secureLs.set("hoax-auth", newState);
};

export const loginHandler = (creds) => {
  return async (dispatch) => {
    const sendAuthRequest = async () => {
      const response = await login(creds);

      const authState = {
        ...response.data,
        password: creds.password,
        isLoggedIn: true,
      };
      console.log(authState);
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
      isLoggedIn: false,
      username: "",
      displayName: "",
      image: "",
      password: "",
    };

    updateStateStorage(newAuthState);
    dispatch(onLogoutSuccess(newAuthState));
    clearAuthorizationHeader();
  };
};

export const updateSuccessHandler = ({ displayName, image }) => {
  return (dispatch) => {
    const userInfo = {
      displayName,
      image,
    };
    dispatch(onUpdateSuccess(userInfo));
    updateStateStorage(userInfo);
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

    // console.log("state-control");

    let initialState = {
      isLoggedIn: false,
      username: "",
      displayName: "",
      image: "",
      password: "",
    };

    const authInfo = secureLs.get("hoax-auth");
    if (authInfo.isLoggedIn) {
      console.log("authInfo");
      initialState = { ...authInfo };
      setAuthorizationHeader(initialState);
    }
    dispatch(onChangeStateSuccess(initialState));
  };
};
