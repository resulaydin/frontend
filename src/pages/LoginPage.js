import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import useApiProgress from "../hook/use-snipper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginHandler } from "../store/slices/auth-actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: null,
    password: null,
  });
  const [errors, setError] = useState({});

  const pendingApiCall = useApiProgress("/api/v1.0/auth");

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setError({});
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    setError({});
    const { username, password } = form;

    const creds = {
      username,
      password,
    };
    try {
      await dispatch(loginHandler(creds));
      navigate("/home");
    } catch (apiError) {
      console.log(apiError);
      if (apiError) {
        setError((previous) => ({
          ...previous,
          errorMessage: apiError.response.data.message,
        }));
      }
    }
  };

  const { username, password } = form;
  const { errorMessage } = errors;
  const { t } = useTranslation();

  return (
    <div className=" border border-3 p-5 rounded-5 w-50 m-auto ">
      <h1 className="text-center">{t("Login")}</h1>
      <form>
        <Input
          name="username"
          label={t("Username")}
          error={""}
          onChange={handleOnChange}
        />
        <Input
          name="password"
          label={t("Password")}
          error={""}
          onChange={handleOnChange}
          type="password"
        />
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="text-center">
          <ButtonWithProgress
            text={t("Submit")}
            onClick={handleOnClick}
            disabled={(!(username && password) || pendingApiCall) && "disabled"}
            pendingApiCall={pendingApiCall}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
