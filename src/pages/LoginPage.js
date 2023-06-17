import React from "react";
import { useState } from "react";
import { login } from "../api/apiCalls";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: null,
    password: null,
  });

  const [errors, setError] = useState({});
  const [pendingApiCall, setPendinApiCall] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setError({});
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    setError({});
    setPendinApiCall((previous) => (previous = true));

    const { username, password } = form;
    const creds = {
      username,
      password,
    };

    try {
      const response = await login(creds);
      console.log(response);
    } catch (apiError) {
      console.log(apiError.response.data);
      setError((previous) => ({
        ...previous,
        errorMessage: apiError.response.data.message,
      }));
    }
    setPendinApiCall((previous) => (previous = false));
  };

  const { username, password } = form;
  // const { message } = errors;
  const { errorMessage } = errors;
  const { t } = useTranslation();

  return (
    <div className="border border-3 border-top container-sm mt-5 p-5 rounded-5 w-50 text-start">
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
      {/* <LanguageSelector onChangeLanguage={handleChangeLanguage} /> */}
    </div>
  );
};

export default LoginPage;
