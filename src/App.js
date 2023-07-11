import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { stateController } from "./store/slices/auth-actions";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(({ authStore: { isLoggedIn } }) => isLoggedIn);
  useEffect(() => {
    dispatch(stateController());
  }, [isLoggedIn, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <LanguageSelector />
      <div className="container-sm mt-5 text-start">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
