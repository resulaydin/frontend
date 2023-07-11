import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { username } = useParams();
  const userName = useSelector(
    ({
      authStore: {
        userInfo: { username },
      },
    }) => username
  );
  let message = "we cannot edit";
  if (username === userName) {
    message = "we can edit - " + userName;
  }
  return <div>{message}</div>;
};

export default ProfileCard;
