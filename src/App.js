import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" exact element={<UserSignUpPage />} />
        <Route path="/" exact element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
