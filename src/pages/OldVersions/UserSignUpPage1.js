import React from "react";
import { useState } from "react";
import { SignUp } from "../api/apiCalls";
import { async } from "q";
import Input from "../components/Input";

const UserSignUpPage = () => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordPrepeat: null,
  });
  const [errors, setErrors] = useState({});

  const [pandingApiCall, setPandingApiCall] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // setUser({ ...user, [name]: value });
    // setErrors({ ...errors, [name]: undefined });

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && form.password !== form.passwordPrepeat) {
      }
    }
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = form;
    const body = {
      username,
      displayName,
      password,
    };

    setPandingApiCall(true);
    try {
      const response = await SignUp(body);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.validationErrors);
      setErrors(error.response.data.validationErrors); // Yakaladım oğlum seni
    }
    setPandingApiCall(false);
  };
  const { username, displayName, password, passwordPrepeat } = errors;

  return (
    <div className="container-sm">
      <form>
        <h1>Sign Up</h1>
        <Input
          label="Username"
          name="username"
          error={username}
          handleOnChange={handleOnChange}
        />
        <Input
          label="Display Name"
          name="displayName"
          error={displayName}
          handleOnChange={handleOnChange}
        />
        <Input
          label="Password"
          name="password"
          error={password}
          type="password"
          handleOnChange={handleOnChange}
        />
        <Input
          label="Password Repeat"
          name="passwordRepeat"
          error={passwordPrepeat}
          type="password"
          handleOnChange={handleOnChange}
        />
        {/* <div className="mb-3 form-group">
          <label>Display Name</label>
          <input
            name="displayName"
            className={displayName ? "form-control is-invalid" : "form-control"}
            onChange={handleOnChange}
          />
          <div className="invalid-feedback">{displayName}</div>
        </div> */}
        {/* <div className="mb-3 form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleOnChange}
             const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
          />
        </div> */}
        {/* <div className="mb-3 form-group">
          <label>Password Repeat</label>
          <input
            type="password"
            name="passwordRepeat"
            className="form-control"
            onChange={handleOnChange}
          />
        </div> */}
        <div className="mb-3 form-group">
          <button
            className="btn btn-primary"
            disabled={pandingApiCall}
            onClick={onClickSignUp}
          >
            {pandingApiCall && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSignUpPage;
