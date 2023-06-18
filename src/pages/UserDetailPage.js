import React from "react";
import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const params = useParams();
  const username = params.username;

  // Bu şeklide bu değeri alırız
  return <div>UserDetailPage - username : {username}</div>;
};

export default UserDetailPage;
