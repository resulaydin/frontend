import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultPicture from "../assets/img/avatars/profile.png";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";
import UserList from "./UserList";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { updateUser } from "../api/apiCalls";

const ProfileCard = (props) => {
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const { username: loggedInUsername } = useSelector(
    (state) => state.authStore.userInfo
  );
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({ ...props.user });
  const { username, displayName, image } = user;

  const { t } = useTranslation();

  const onEditHandler = () => {
    setUpdatedDisplayName(displayName);
    setInEditMode(true);
  };

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setUpdatedDisplayName(value);
  };

  const onSaveHandler = async () => {
    try {
      setError(false);
      setInEditMode(false);
      const body = {
        displayName: updatedDisplayName,
      };
      const response = await updateUser(body, username);
      setUser({ ...response.data });
    } catch (error) {
      setError(true);
      setInEditMode(false);
    }
  };

  const onCancelHandler = () => {
    setUpdatedDisplayName(undefined);
    setInEditMode(false);
  };

  // if (pathUsername !== loggedInUsername) {
  //   return (
  //     <div className="alert alert-danger text-center" role="alert">
  //       User can not editable
  //     </div>
  //   );
  // }
  return (
    <div className="container-sm">
      {!error && (
        <div className="card text-center">
          <div className="bg-light p-2">
            <ProfileImageWithDefault
              className="img-fluid rounded-circle mt-2 shadow"
              alt={`${username} profile`}
              style={{
                height: "200px",
                width: "auto",
              }}
              image={image}
            />
          </div>
          <div className="card-body">
            {!inEditMode ? (
              <>
                <h3>
                  {displayName}@{username}
                </h3>
                <button
                  className="btn btn-success btn-sm"
                  onClick={onEditHandler}
                >
                  <EditIcon style={{ fontSize: "20px" }} />
                  {t("Edit")}
                </button>
              </>
            ) : (
              <>
                <Input
                  label={t("Change Display Name")}
                  onChange={onChangeHandler}
                  defaultValue={updatedDisplayName}
                />
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={onSaveHandler}
                  disabled={
                    updatedDisplayName === displayName ||
                    (!(updatedDisplayName && displayName) && "disabled")
                  }
                >
                  <SaveIcon style={{ fontSize: "20px" }} />
                  {t("Save")}
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={onCancelHandler}
                >
                  <CloseIcon style={{ fontSize: "20px" }} />
                  {t("Cancel")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          <div className="text-center ">
            <ErrorIcon style={{ fontSize: "50px" }} />
          </div>
          {t("User not found")}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
