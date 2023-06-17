import React from "react";
import { useState } from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import useApiProgress from "../hook/use-snipper";

const UserSignUpPage = () => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  // const [pendingApiCall, setPendingApiCall] = useState(false);

  const pendingApiCall = useApiProgress("/api/v1.0/users");

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // setForm({ ...form, [name]: value });
    // setErrors({ ...errors, [name]: undefined });

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));

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
      // setPendingApiCall(true);
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
    // setPendingApiCall(false);
  };
  const { username, displayName, password, passwordRepeat } = errors;
  const { t } = useTranslation();

  return (
    <div className="container-sm">
      <form>
        <h1 className="text-center">{t("Sign Up")}</h1>
        <Input
          label={t("Username")}
          name="username"
          error={username}
          onChange={handleOnChange}
        />
        <Input
          label={t("Display Name")}
          name="displayName"
          error={displayName}
          onChange={handleOnChange}
        />
        <Input
          label={t("Password")}
          name="password"
          error={password}
          type="password"
          onChange={handleOnChange}
        />
        <Input
          label={t("Password Repeat")}
          name="passwordRepeat"
          error={passwordRepeat}
          type="password"
          onChange={handleOnChange}
        />
        <div className="mb-3 form-group text-center">
          <ButtonWithProgress
            text={t("Submit")}
            onClick={onClickSignUp}
            disabled={pendingApiCall || passwordRepeat !== undefined}
            pendingApiCall={pendingApiCall}
          />
        </div>
      </form>
    </div>
  );
};

export default UserSignUpPage;
