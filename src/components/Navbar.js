import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo/artemis.jpeg";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/js/bootstrap.bundle";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../store/slices/auth-actions";

const Navbar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, userInfo } = useSelector(
    ({ authStore: { isLoggedIn, userInfo } }) => {
      return {
        isLoggedIn,
        userInfo,
      };
    }
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutSuccess = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 border-none position-relative">
        <div className="container ">
          <NavLink className="navbar-brand" aria-current="page" to="/">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="100%"
              className="d-inline-block"
            />
          </NavLink>
          <NavLink className="nav-link" to="/">
            {t("Home")}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-start"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/user/${userInfo.username}`}
                    >
                      {t(userInfo.username)}
                    </NavLink>
                  </li>
                  <li
                    className="nav-item nav-link"
                    onClick={handleLogoutSuccess}
                    style={{ cursor: "pointer" }}
                  >
                    {t("Logout")}
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      {t("Login")}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      {t("Sign Up")}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
