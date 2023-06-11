import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./style/main.css";
import UserSignUpPage from "./pages/UserSignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/user-signup" exact element={<UserSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
