import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Home</div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login sayfasına git
      </button>
    </div>
  );
};

export default HomePage;
