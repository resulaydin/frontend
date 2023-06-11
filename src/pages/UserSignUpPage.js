import React from "react";

const UserSignUpPage = () => {
  return (
    <div className="container-sm">
      <form>
        <h1>Sign Up</h1>
        <div className="mb-3 input-group">
          <label>Username</label>
          <input name="username" className="form-control" />
        </div>
        <div className="mb-3 form-group">
          <label>Display Name</label>
          <input name="displayName" className="form-control" />
        </div>
        <div className="mb-3 form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" />
        </div>
        <div className="mb-3 form-group">
          <label>Password Repeat</label>
          <input
            type="password"
            name="passwordRepeat"
            className="form-control"
          />
        </div>
        <div className="mb-3 form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UserSignUpPage;
