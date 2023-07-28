import React from "react";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import { getUser } from "../api/apiCalls";
import { useParams } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { useTranslation } from "react-i18next";
import useApiProgress from "../hook/use-snipper";
import Spinner from "../components/Spinner";
import HoaxFeed from "../components/HoaxFeed";

const UserPage = (props) => {
  const { username: pathUsername } = useParams();
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  const pendingApiCall = useApiProgress(
    "get",
    "/api/v1.0/users/" + pathUsername
  );

  useEffect(() => {
    setNotFound(false);
  }, [pathUsername]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(pathUsername);
        setUser(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    fetchUser();
  }, [pathUsername]);

  if (pendingApiCall) {
    return <Spinner />;
  }

  if (notFound) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <div className="text-center ">
          <ErrorIcon style={{ fontSize: "50px" }} />
        </div>
        {t("User not found")}
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-6">
        <ProfileCard user={user} />
      </div>
      <div className="col-6">
        <HoaxFeed />
      </div>
    </div>
  );
};

export default UserPage;
