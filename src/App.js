import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/signup" exact element={<UserSignUpPage />} />
        <Route path="/" exact element={<LoginPage />} />
      </Routes>
      <LanguageSelector />
    </div>
  );
}

export default App;
