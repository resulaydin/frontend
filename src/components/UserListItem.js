import React from "react";
import DefaultPicture from "../assets/img/avatars/avatar2.jpg";
import { NavLink } from "react-router-dom";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";

const UserCard = ({ user, onDeleteUser }) => {
  const { username, displayName, image } = user;
  return (
    <div className="card lg-3 shadow mt-2">
      <div className="row g-0 p-4">
        <div className="col-lg-3 text-center p-2" style={{ height: "115px" }}>
          <NavLink to={`/user/${username}`}>
            <ProfileImageWithDefault
              className="img-fluid rounded-circle mt-2"
              image={image}
              alt={`${username} profile`}
              style={{
                height: "100%",
                width: "auto",
              }}
            />
          </NavLink>
        </div>
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-9">
              <div className="card-body">
                <h5 className="card-title text-center text-lg-start">
                  {username} - {displayName}
                </h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="buttons d-grid gap-2 d-lg-flex-column justify-content-lg-center pe-2">
                <button
                  className="btn btn-danger rounded-pill my-3"
                  onClick={() => {
                    onDeleteUser(username);
                  }}
                >
                  Delete
                </button>
                <button className="btn btn-outline-warning rounded-pill">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
