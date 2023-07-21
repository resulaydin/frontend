import React from "react";

const Input = (props) => {
  const { name, label, className, error, onChange, type, defaultValue } = props;
  let classNameSource = "form-control";
  classNameSource = className || classNameSource;
  classNameSource = error ? classNameSource + " is-invalid" : classNameSource;
  return (
    <div className="mb-3" style={{ textAlign: "left" }}>
      <label className="mb-2">{label}</label>
      <input
        name={name}
        className={classNameSource}
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
