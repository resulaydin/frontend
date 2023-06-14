import React from "react";
import { useState } from "react";
import { login, changeLanguage } from "../api/apiCalls";
import Input from "../components/Input";
import Button from "../components/Button";
import { useTranslation, getI18n } from "react-i18next";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: null,
    password: null,
  });

  const [error, setError] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    const { username, password } = form;

    const auth = {
      username,
      password,
    };

    try {
      const response = await login(auth);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.validationErrors);
      setError({ ...error.response.data.validationErrors });
    }
  };

  const handleChangeLanguage = (language) => {
    getI18n().changeLanguage(language);
    changeLanguage(language);
  };

  const { username, password } = form;
  const { t } = useTranslation();

  return (
    <div className="border border-3 border-top container-sm mt-5 p-5 rounded-5 w-50 text-start">
      <h1 className="text-center">{t("Login")}</h1>
      <form>
        <Input
          name="username"
          label={t("Username")}
          error={username}
          onChange={handleOnChange}
        />
        <Input
          name="password"
          label={t("Password")}
          error={password}
          onChange={handleOnChange}
          type="password"
        />
        <Button text={t("Submit")} onClick={handleOnClick} />
      </form>
      <div className="flags">
        <img
          src="https://flagsapi.com/TR/flat/24.png"
          alt="Turkey Flag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleChangeLanguage("tr");
          }}
        />
        <img
          src="https://flagsapi.com/US/shiny/24.png"
          alt="America Flag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleChangeLanguage("en");
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
