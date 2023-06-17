import React from "react";
import { getI18n } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const handleChangeLanguage = (language) => {
    getI18n().changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="flags text-start">
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
  );
};

export default LanguageSelector;
