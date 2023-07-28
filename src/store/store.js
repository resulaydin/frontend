import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth-slice";
import SecureLS from "secure-ls";
import { setAuthorizationHeader } from "../api/apiCalls";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const hoaxAuth = secureLs.get("hoax-auth");

  let stateInLocalStorage = {
    authStore: {
      isLoggedIn: false,
      username: undefined,
      displayName: undefined,
      image: undefined,
      password: undefined,
    },
  };

  if (hoaxAuth) {
    return { authStore: hoaxAuth };
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLs.set("hoax-auth", newState.authStore);
};

const rootReducer = combineReducers({
  authStore: authReducer,
});

export default function configureAppStore() {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
}
