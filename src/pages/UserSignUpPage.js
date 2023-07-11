import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import useApiProgress from "../hook/use-snipper";
import { useDispatch } from "react-redux";
import { signupHanler } from "../store/slices/auth-actions";
import { useNavigate } from "react-router-dom";

const UserSignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  // const [pendingApiCall, setPendingApiCall] = useState(false);

  const pendingApiCallForSignup = useApiProgress("/api/v1.0/users");
  const pendingApiCallForLogin = useApiProgress("/api/v1.0/auth");
  const pendingApiCall = pendingApiCallForSignup || pendingApiCallForLogin;

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
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
      await dispatch(signupHanler(body));
      navigate("/home");
    } catch (error) {
      const responseError = error.response.data.validationErrors;
      console.log(responseError);

      if (responseError) {
        setErrors(responseError);
      }
    }
  };
  const { username, displayName, password, passwordRepeat } = errors;
  const { t } = useTranslation();
  let passwordRepeatError = undefined;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = "Password mismatch";
  }

  return (
    <div className=" border border-3 p-5 rounded-5 w-50 m-auto ">
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
          error={passwordRepeatError}
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
