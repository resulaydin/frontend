import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import Navbar from "./pages/Navbar";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="app-sub border border-3 border-top container-sm mt-5 p-5 rounded-5 w-50 text-start">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:username" element={<UserDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
