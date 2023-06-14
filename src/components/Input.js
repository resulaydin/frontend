import React from "react";

const Input = (props) => {
  const { name, label, error, onChange, type } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="mb-3" style={{ textAlign: "left" }}>
      <label className="mb-2">{label}</label>
      <input
        name={name}
        className={className}
        onChange={onChange}
        type={type}
        required
      />
    </div>
  );
};

export default Input;
