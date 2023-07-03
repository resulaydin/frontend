import React, { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import Navbar from "./pages/Navbar";
// import UserDetailPage from "./pages/UserDetailPage";
import AuthContext from "./context/AuthenticationContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <LanguageSelector />
      <div className="app-sub border border-3 container-sm mt-5 p-5 rounded-5 w-50 text-start">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<UserSignUpPage />} />
            </>
          ) : (
            <>
              <Route path="/user/:username" element={<UserPage />} />
              {/* <Route path="/user/:username" element={<UserDetailPage />} /> */}
            </>
          )}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
