import React from "react";
import DefaultPicture from "../assets/img/avatars/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, tempimage, alt, className } = props;
  let imageSource = DefaultPicture;
  if (image) {
    imageSource = "/images/" + image;
  }

  return (
    <img
      className={className}
      src={tempimage || imageSource}
      alt={alt}
      {...props}
      onError={(event) => (event.target.src = DefaultPicture)}
    />
  );
};
