import React from "react";
import { getI18n } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const handleChangeLanguage = (language) => {
    getI18n().changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="flags text-end mt-2 me-2">
      <button
        className="rounded-circle me-2 btn btn-outline-warning"
        onClick={() => {
          handleChangeLanguage("tr");
        }}
      >
        TR
      </button>
      <button
        className="rounded-circle btn btn-outline-warning"
        onClick={() => {
          handleChangeLanguage("en");
        }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
