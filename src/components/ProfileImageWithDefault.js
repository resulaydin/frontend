import React from "react";
import DefaultPicture from "../assets/img/avatars/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, alt } = props;
  return <img src={!image && DefaultPicture} alt={alt} {...props} />;
};
