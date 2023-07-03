import React, { createContext } from "react";
import { login } from "../api/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthenticationContext({ children }) {
  const [errors, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const LoginControl = async (username, password) => {
    const creds = {
      username,
      password,
    };
    try {
      const response = await login(creds);
      onLoginSuccess(response.data, password);
      navigate("/home");
      console.log(response);
    } catch (apiError) {
      console.log(apiError);
      if (apiError) {
        setError((previous) => ({
          ...previous,
          errorMessage: apiError.response.data.message,
        }));
      }
    }
  };

  const onLoginSuccess = (authState, password) => {
    setIsLoggedIn(true);
    setUserInfo({
      ...authState,
      password,
    });
  };
  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUserInfo({});
  };

  const sharedValuesAndMethods = {
    errors,
    setError,
    LoginControl,
    isLoggedIn,
    onLogoutSuccess,
    userInfo,
  };

  return (
    <AuthContext.Provider value={sharedValuesAndMethods}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthenticationContext };

export default AuthContext; // Dikkat bizim createContext nesnemiz default olarak seçildi.
