import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo/artemis.jpeg";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* 
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            
          </nav>
      */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary container p-4">
        <div className="container-fluid d-flex justify-content-even">
          <div className="">
            <NavLink className="navbar-brand" aria-current="page" to="/">
              <img
                src={logo}
                alt="Logo"
                width="40"
                height="100%"
                className="d-inline-block align-text-top rounded-2 mb-1"
              />
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* <div className="nav-bar" id="navbarNavAltMarkup"> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  {t("Home")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  {t("Login")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  {t("Register")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user">
                  {t("User")}
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
