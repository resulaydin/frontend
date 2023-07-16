import React from "react";

const Input = (props) => {
  const { name, label, error, onChange, type, defaultValue } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="mb-3" style={{ textAlign: "left" }}>
      <label className="mb-2">{label}</label>
      <input
        name={name}
        className={className}
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
        required
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
