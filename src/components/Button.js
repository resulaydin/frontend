import React from "react";

const Button = (props) => {
  const { text, onClick } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <button className="btn btn-primary" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
