import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo/artemis.jpeg";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/js/bootstrap.bundle";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../store/slices/auth-actions";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const {
    isLoggedIn,
    userInfo: { username, displayName, image },
  } = useSelector(({ authStore: { isLoggedIn, userInfo } }) => {
    return {
      isLoggedIn,
      userInfo,
    };
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const menuArea = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    // if (menuArea.current === null || !menuArea.current.contains(event.target)) { hata olursa kullan
    if (!menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const handleLogoutSuccess = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  let dropDownClass;
  if (isLoggedIn) {
    dropDownClass = "dropdown-menu p-0 shadow";
    if (menuVisible) {
      dropDownClass += " show";
    }
  }

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
            <ul className="navbar-nav ms-auto" ref={menuArea}>
              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown">
                    <div
                      className="d-flex"
                      onClick={() => setMenuVisible(true)}
                      style={{ cursor: "pointer" }}
                    >
                      <ProfileImageWithDefault
                        className="rounded-circle m-auto"
                        image={image}
                        width="32"
                        height="32"
                      />
                      <span className="nav-link dropdown-toggle">
                        {displayName}
                      </span>
                    </div>
                    <div className={dropDownClass}>
                      <NavLink
                        className="nav-link dropdown-item pb-0 d-flex"
                        to={`/user/${username}`}
                        onClick={() => setMenuVisible(false)}
                      >
                        <PersonIcon className="me-2 text-info" />
                        {t("My Profile")}
                      </NavLink>
                      <span
                        className="nav-link dropdown-item d-flex"
                        onClick={handleLogoutSuccess}
                        style={{ cursor: "pointer" }}
                      >
                        <PowerSettingsNewIcon className="me-2 text-danger" />
                        {t("Logout")}
                      </span>
                    </div>
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
