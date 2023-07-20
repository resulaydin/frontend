import React from "react";
import DefaultPicture from "../assets/img/avatars/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, tempImage, alt } = props;
  let imageSource = DefaultPicture;
  if (image) {
    imageSource = image;
  }

  return <img src={tempImage || imageSource} alt={alt} {...props} />;
};
