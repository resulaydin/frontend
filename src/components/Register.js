import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
  });

  const [showPass, setShowPass] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleShowPass = (e) => {
    setShowPass(e.target.checked);
  };
  const handleBtnOnclick = (event) => {
    event.preventDefault();
    const url = "/api/v1.0/users";
    const { username, email, password } = user;
    const body = {
      username,
      email,
      password,
    };
    axios.post(url, body);
  };
  return (
    <div className="container">
      <div className="register-page">
        <form className="register-form">
          <h3>Lütfen bilgilerinizi giriniz</h3>
          <div>
            <label htmlFor="username">
              Kullanıcı adı: <span className="spn-star">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="user"
              id="username"
              onChange={onChange}
            />{" "}
            <p></p>
          </div>
          <div>
            <label htmlFor="email">
              Email: <span className="spn-star">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="user"
              id="email"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password">
              Şifre: <span className="spn-star">*</span>
            </label>
            <input
              type={`${showPass ? "text" : "password"}`}
              name="password"
              className="password"
              id="password"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="re-password">
              Şifre Tekrar: <span className="spn-star">*</span>
            </label>
            <input
              type={`${showPass ? "text" : "password"}`}
              name="repassword"
              className="re-password"
              id="re-password"
              onChange={onChange}
            />
          </div>
          <div className="show-password">
            <div>
              <label
                htmlFor="chk-show-pass"
                className="lbl-show-pass register-chek-info"
              >
                <input
                  type="checkbox"
                  className="chk-show-pass"
                  id="chk-show-pass"
                  onClick={handleShowPass}
                />
                <span>şifre göster:</span>
              </label>
              <label
                htmlFor="chk-remember"
                className="lbl-remember register-chek-info"
              >
                <span>beni hatırla</span>
                <input
                  type="checkbox"
                  className="chk-remember"
                  id="chk-remember"
                />
              </label>
            </div>
            <button
              className="btn btn-sm btn-primary btn-register"
              id="register"
              onClick={handleBtnOnclick}
            >
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
