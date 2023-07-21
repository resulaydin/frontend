import React from "react";
import DefaultPicture from "../assets/img/avatars/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, tempimage, alt } = props;
  let imageSource = DefaultPicture;
  if (image) {
    imageSource = "/images/" + image;
  }

  return (
    <img
      src={tempimage || imageSource}
      alt={alt}
      {...props}
      onError={(event) => (event.target.src = DefaultPicture)}
    />
  );
};
