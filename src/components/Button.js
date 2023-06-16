import React from "react";

const Button = (props) => {
  const { text, onClick, disabled, isSpining } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <button
        className="btn btn-primary "
        onClick={onClick}
        disabled={disabled}
      >
        {isSpining && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
        {text}
      </button>
    </div>
  );
};

export default Button;
