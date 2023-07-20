import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { updateUser } from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import useApiProgress from "../hook/use-snipper";

const ProfileCard = (props) => {
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const { username: loggedInUsername } = useSelector(
    (state) => state.authStore.userInfo
  );
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const { username, displayName, image } = user;

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress("put", "/api/v1.0/users/" + username);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setUpdatedDisplayName(value);
  };

  const onChangeFileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setNewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSaveHandler = async () => {
    try {
      setError(false);
      const body = {
        displayName: updatedDisplayName,
        image: newImage,
      };
      const response = await updateUser(body, username);
      // setUser({ ...response.data });
      setUser(response.data);
      setInEditMode(false);
    } catch (error) {
      setError(true);
    }
  };

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
              image={newImage || image}
            />
          </div>
          <div className="card-body">
            {!inEditMode ? (
              <>
                <h3>
                  {displayName}@{username}
                </h3>
                {editable && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => setInEditMode(true)}
                  >
                    <EditIcon style={{ fontSize: "20px" }} />
                    {t("Edit")}
                  </button>
                )}
              </>
            ) : (
              <>
                <Input
                  label={t("Change Display Name")}
                  onChange={onChangeHandler}
                  defaultValue={updatedDisplayName}
                />
                <div className="my-4">
                  <input type="file" onChange={onChangeFileHandler} />
                </div>
                <ButtonWithProgress
                  className="btn btn-sm btn-primary me-2"
                  onClick={onSaveHandler}
                  disabled={
                    (updatedDisplayName === displayName ||
                      !(updatedDisplayName && displayName) ||
                      pendingApiCall) &&
                    "disabled"
                  }
                  pendingApiCall={pendingApiCall}
                  text={
                    <>
                      <SaveIcon style={{ fontSize: "20px" }} />
                      {t("Save")}
                    </>
                  }
                />
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setInEditMode(false)}
                  disabled={pendingApiCall}
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
