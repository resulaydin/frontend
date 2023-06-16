import React from "react";

const ButtonWithProgress = (props) => {
  const { text, onClick, disabled, pendingApiCall } = props;
  return (
    <button className="btn btn-primary " onClick={onClick} disabled={disabled}>
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {text}
    </button>
  );
};

export default ButtonWithProgress;
