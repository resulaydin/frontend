import React from "react";
import { useState } from "react";
import axios from "axios";

const UserSignUpPage = () => {
  const [user, setUser] = useState({
    username: null,
    displayName: null,
    password: null,
  });

  const [pandingApiCall, setPandingApiCall] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onClickSignUp = (event) => {
    event.preventDefault();
    const { username, displayName, password } = user;
    const body = {
      username,
      displayName,
      password,
    };

    setPandingApiCall(true);

    axios
      .post("/api/v1.0/users", body)
      .then((response) => {
        console.log("basarili");
        setPandingApiCall(false);
      })
      .catch((error) => {
        console.log("error");
        setPandingApiCall(false);
      });
  };

  return (
    <div className="container-sm">
      <form>
        <h1>Sign Up</h1>
        <div className="mb-3">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            onChange={handleOnChange}
            required
          />
          <div class="invalid-feedback">username can not be empty</div>
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
