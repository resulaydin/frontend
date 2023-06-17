import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <div className="App">
      <div className="app-sub border border-3 border-top container-sm mt-5 p-5 rounded-5 w-50 text-start">
        <Routes>
          <Route path="/signup" exact element={<UserSignUpPage />} />
          <Route path="/" exact element={<LoginPage />} />
        </Routes>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default App;
