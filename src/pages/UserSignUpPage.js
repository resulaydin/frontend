import React from "react";
import { useState } from "react";
import { signUp, changeLanguage } from "../api/apiCalls";
import Input from "../components/Input";
import { useTranslation, getI18n } from "react-i18next";

const UserSignUpPage = () => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const [pandingApiCall, setPandingApiCall] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // setForm({ ...form, [name]: value });
    // setErrors({ ...errors, [name]: undefined });

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    console.log("form.passwordRepeat: " + form.passwordRepeat);

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== form.passwordRepeat) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          passwordRepeat: "Password mismatch",
        }));
      } else if (name === "passwordRepeat" && value !== form.password) {
        setErrors((previousErrors) => ({
          ...previousErrors,
          passwordRepeat: "Password mismatch",
        }));
      } else {
        setErrors((previousErrors) => ({
          ...previousErrors,
          passwordRepeat: undefined,
        }));
      }
    }
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = form;
    const body = {
      username,
      displayName,
      password,
    };

    try {
      setPandingApiCall(true);
      const response = await signUp(body);
      console.log(response);
    } catch (error) {
      const responseError = error.response.data.validationErrors;
      console.log(responseError);
      // Bu if koşulunu yazmamış olsaydık endpoint' e bağlanmada bir sıkıntı yaşanması durumunda
      // responseError sonucu undefined dönecek ve bunu errors nesnemize pars edecekti.
      // Aşağıda errors destructing işlemi yaptığımızdan undefined olan bir yapı destruct olamayacağı için
      // "UserSignUpPage.js:72 Uncaught TypeError: Cannot destructure property 'username' of 'errors' as it is undefined." hatası
      // alınacaktı.
      if (responseError) {
        setErrors(responseError);
      }
    }
    setPandingApiCall(false);
  };

  const handleChangeLanguage = (language) => {
    getI18n().changeLanguage(language);
    changeLanguage(language);
  };
  // console.log(getI18n());
  const { username, displayName, password, passwordRepeat } = errors;
  const { t } = useTranslation();

  return (
    <div className="container-sm">
      <form>
        <h1>{t("Sign Up")}</h1>
        <Input
          label={t("Username")}
          name="username"
          error={username}
          handleOnChange={handleOnChange}
        />
        <Input
          label={t("Display Name")}
          name="displayName"
          error={displayName}
          handleOnChange={handleOnChange}
        />
        <Input
          label={t("Password")}
          name="password"
          error={password}
          type="password"
          handleOnChange={handleOnChange}
        />
        <Input
          label={t("Password Repeat")}
          name="passwordRepeat"
          error={passwordRepeat}
          type="password"
          handleOnChange={handleOnChange}
        />
        <div className="mb-3 form-group">
          <button
            className="btn btn-primary"
            disabled={pandingApiCall || passwordRepeat !== undefined}
            onClick={onClickSignUp}
          >
            {pandingApiCall && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            {t("Submit")}
          </button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          columnGap: ".3125rem",
        }}
      >
        <img
          src="https://flagsapi.com/TR/flat/24.png"
          alt="Turkey Flag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleChangeLanguage("tr");
          }}
        ></img>
        <img
          src="https://flagsapi.com/US/flat/24.png"
          alt="US Flag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleChangeLanguage("en");
          }}
        ></img>
      </div>
    </div>
  );
};

export default UserSignUpPage;
