import React from "react";
import UserListItem from "./UserListItem";
import { getUsers } from "../api/apiCalls";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useApiProgress from "../hook/use-snipper";
import Spinner from "./Spinner";

function UserList() {
  const [pagination, setPagination] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("get", "/api/v1.0/users?page");

  useEffect(() => {
    loadUsers();
  }, []);

  const onDeleteUser = (username) => {
    const remainedUser = pagination.content.filter((user) => {
      return user.username !== username;
    });
    setPagination({ ...pagination, content: remainedUser });
  };

  const onNextPageHandler = () => {
    const nextPage = pagination.number + 1;
    loadUsers(nextPage);
  };
  const onPreviousPageHandler = () => {
    const nextPage = pagination.number - 1;
    loadUsers(nextPage);
  };

  const loadUsers = async (page) => {
    try {
      setLoadFailure(false);
      const response = await getUsers(page);
      setPagination(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();

  const { content: users, first, last } = pagination;

  return (
    <div className="card border-0">
      <div className="row g-0">
        <div className="card-header">
          <h3 className="text-center">{t("Users")}</h3>
        </div>
        <div>
          {users.map((user, index) => {
            return (
              <UserListItem
                key={index}
                user={user}
                onDeleteUser={onDeleteUser}
              />
            );
          })}
        </div>
        <div className="card-footer mb-4">
          <div>
            {pendingApiCall ? (
              <Spinner />
            ) : (
              <div>
                {first === false && (
                  <button
                    className="btn btn-sm btn-primary "
                    onClick={onPreviousPageHandler}
                  >
                    {t("Previous")}
                  </button>
                )}
                {last === false && (
                  <button
                    className="btn btn-sm btn-primary float-end "
                    onClick={onNextPageHandler}
                  >
                    {t("Next")}
                  </button>
                )}
              </div>
            )}
          </div>
          {loadFailure && (
            <div className="alert alert-danger text-center" role="alert">
              {t("Load Failure")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;

// try {
//   const response = await getUsers(page);
//   setPagination(response.data);
// } catch (error) {

// }
