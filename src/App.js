import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.authStore.isLoggedIn);

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
