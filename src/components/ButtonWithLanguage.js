import React from "react";

const ButtonWithLanguage = (props) => {
  const { onChangeLanguage } = props;
  return (
    <div className="flags">
      <img
        src="https://flagsapi.com/TR/flat/24.png"
        alt="Turkey Flag"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onChangeLanguage("tr");
        }}
      />
      <img
        src="https://flagsapi.com/US/shiny/24.png"
        alt="America Flag"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onChangeLanguage("en");
        }}
      />
    </div>
  );
};

export default ButtonWithLanguage;
