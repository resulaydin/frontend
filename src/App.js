import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserSignUpPage from "./pages/UserSignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<UserSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
