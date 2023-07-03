import React, { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthenticationContext({ children }) {
  const [errors, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  });

  const onLoginSuccess = (authState) => {
    setIsLoggedIn(true);
    setUserInfo({
      ...authState,
    });
  };
  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUserInfo({});
    navigate("/home");
  };

  const sharedValuesAndMethods = {
    errors,
    setError,
    isLoggedIn,
    onLoginSuccess,
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
