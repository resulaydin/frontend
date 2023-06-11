import React from "react";
import { useState } from "react";
import { SignUp } from "../api/apiCalls";
import { async } from "q";

const UserSignUpPage = () => {
  const [user, setUser] = useState({
    username: null,
    displayName: null,
    password: null,
  });
  const [errors, setErrors] = useState({});

  const [pandingApiCall, setPandingApiCall] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = user;
    const body = {
      username,
      displayName,
      password,
    };

    setPandingApiCall(true);
    try {
      const response = await SignUp(body);
      console.log(response);
      console.log(response.data);
    } catch (error) {
      const value = error.response.data.validationErrors;
      setErrors({ ...value }); // Yakaladım oğlum seni
      console.log({ ...value });
    }
    setPandingApiCall(false);
  };
  const { username } = errors;

  return (
    <div className="container-sm">
      <form>
        <h1>Sign Up</h1>
        <div className="mb-3">
          <label>Username</label>
          <input
            name="username"
            className={username ? "form-control is-invalid" : "form-control"}
            onChange={handleOnChange}
            required
          />
          <div className="invalid-feedback">{username}</div>
        </div>
        <div className="mb-3 form-group">
          <label>Display Name</label>
          <input
            name="displayName"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3 form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3 form-group">
          <label>Password Repeat</label>
          <input
            type="password"
            name="passwordRepeat"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>
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
