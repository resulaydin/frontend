import React from "react";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import { getUser } from "../api/apiCalls";
import { useParams } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { useTranslation } from "react-i18next";
import useApiProgress, { useApiProgressTemp } from "../hook/use-snipper";
import Spinner from "../components/Spinner";

const UserPage = (props) => {
  const { username: pathUsername } = useParams();
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  const pendingApiCall = useApiProgressTemp("/api/v1.0/users/" + pathUsername);

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
    <div>
      <ProfileCard user={user} />
    </div>
  );
};

export default UserPage;
