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
  const [error, setError] = useState({});
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

  const onChangeDisplayNameHandler = (event) => {
    const { value } = event.target;
    setUpdatedDisplayName(value);
    // delete error.displayName;
    // setError(error);
    // setError((previous) => ({ ...previous, displayName: undefined }));
    // setError({});
  };

  useEffect(() => {
    setError((previous) => ({ ...previous, displayName: undefined }));
  }, [updatedDisplayName]);

  const onChangeFileHandler = (event) => {
    setError((previous) => ({ ...previous, image: undefined }));
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onSaveHandler = async () => {
    try {
      let image;
      if (newImage) {
        image = newImage.split(",")[1];
      }
      const body = {
        displayName: updatedDisplayName,
        image,
      };
      const response = await updateUser(body, username);
      // setUser({ ...response.data });
      setUser(response.data);
      setInEditMode(false);
    } catch (error) {
      const responseError = error.response.data.validationErrors;
      if (reportError) {
        setError(responseError);
      }
      console.log(responseError);
    }
  };

  const { displayName: displayNameError, image: imageError } = error || {};

  return (
    <div className="container-sm">
      {
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
              tempimage={newImage}
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
                  onChange={onChangeDisplayNameHandler}
                  error={displayNameError}
                  defaultValue={updatedDisplayName}
                />
                <div className="my-4">
                  <Input
                    type="file"
                    className="form-control-file"
                    onChange={onChangeFileHandler}
                    error={imageError}
                  />
                </div>
                <ButtonWithProgress
                  className="btn btn-sm btn-primary me-2"
                  onClick={onSaveHandler}
                  // disabled={
                  //   (updatedDisplayName === displayName ||
                  //     !(updatedDisplayName && displayName) ||
                  //     pendingApiCall) &&
                  //   "disabled"
                  // }
                  disabled={pendingApiCall}
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
      }
      {/* {error && (
        <div className="alert alert-danger text-center" role="alert">
          <div className="text-center ">
            <ErrorIcon style={{ fontSize: "50px" }} />
          </div>
          {t("User not found")}
        </div>
      )} */}
    </div>
  );
};

export default ProfileCard;
