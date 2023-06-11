import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignupPage = () => {
  const [user, setUser] = useState({});

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ name: value });
  };

  return (
    <div className="container">
      <div className="login-page">
        <form className="login-form">
          <h3>Lütfen giriş yapınız</h3>
          <div>
            <label htmlFor="username">
              Kullanıcı adı veya email: <span className="spn-star">*</span>
            </label>
            <input type="text" name="username" className="user" id="username" />
          </div>
          <div>
            <label htmlFor="password">
              Şifre: <span className="spn-star">*</span>
            </label>
            <input type="password" className="password" id="password" />
          </div>
          <div className="show-password">
            <div>
              <label
                htmlFor="chk-show-pass"
                className="lbl-show-pass login-chek-info"
              >
                <input
                  type="checkbox"
                  className="chk-show-pass"
                  id="chk-show-pass"
                />
                <span>şifre göster:</span>
              </label>
              <label
                htmlFor="chk-remember"
                className="lbl-remember login-chek-info"
              >
                <span>beni hatırla</span>
                <input
                  type="checkbox"
                  className="chk-remember"
                  id="chk-remember"
                />
              </label>
            </div>
            <button className="btn btn-sm btn-primary btn-login" id="login">
              Giriş Yap
            </button>
          </div>
          <Link to="" className="lnk-lost-password">
            Şifremi unuttum
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserSignupPage;
