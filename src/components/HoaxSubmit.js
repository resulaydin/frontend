import React, { useEffect, useState } from "react";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { postHoax } from "../api/apiCalls";
import useApiProgress from "../hook/use-snipper";
import ButtonWithProgress from "./ButtonWithProgress";

const HoaxSubmit = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hoax, setHoax] = useState("");
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();
  const image = useSelector((state) => state.authStore.image);
  const pendingApiCall = useApiProgress("post", "/api/v1.0/hoaxes");

  useEffect(() => {
    if (!isFocused) {
      setHoax("");
      setErrors({});
    }
  }, [isFocused]);

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
    };
    try {
      await postHoax(body);
      setIsFocused(false);
    } catch (error) {
      const responseError = error.response.data.validationErrors;
      console.log(responseError.content);
      if (responseError) {
        setErrors(responseError);
      }
    }
  };

  // console.log(hoax.length);
  const { content: hoaxErrorContent } = errors;

  let classNameSource = "form-control mb-3";
  if (hoaxErrorContent) {
    classNameSource += " is-invalid";
  }

  return (
    <div className="card shadow">
      <div className="card-header d-flex">
        {isFocused && (
          <ProfileImageWithDefault
            className="rounded-circle me-3"
            image={image}
            alt="hoax-user-img"
            width="64"
            height="64"
          />
        )}
        <div className="flex-fill">
          <textarea
            value={hoax}
            className={classNameSource}
            name="text-hoaxes"
            id="text-hoaxes"
            rows={isFocused ? "5" : "2"}
            onFocus={() => setIsFocused(true)}
            onChange={(event) => setHoax(event.target.value)}
          />

          <div className="invalid-feedback">{hoaxErrorContent}</div>
          {isFocused && (
            <div className="d-grid g-5 d-lg-flex justify-content-lg-end ">
              <ButtonWithProgress
                className="btn btn-primary me-2"
                onClick={onClickHoaxify}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text="Hoaxify"
              />
              <button
                className="btn btn-secondary"
                onClick={() => setIsFocused(false)}
                disabled={pendingApiCall}
              >
                {t("Cancel")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoaxSubmit;
