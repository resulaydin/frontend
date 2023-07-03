import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthenticationContext";

const ProfileCard = () => {
  const { username } = useParams();
  const { userInfo } = useContext(AuthContext);
  let message = "we cannot edit";
  if (username === userInfo.username) {
    message = "we can edit";
  }
  return <div>{message}</div>;
};

export default ProfileCard;
