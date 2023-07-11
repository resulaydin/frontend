import React from "react";
import DefaultPicture from "../assets/img/avatars/avatar2.jpg";
import { NavLink } from "react-router-dom";

const UserCard = ({ user, onDeleteUser }) => {
  const { username, displayName, image } = user;
  return (
    <div className="card mb-3 shadow">
      <div className="row g-0">
        <div className="col-md-3 text-center p-2" style={{ height: "115px" }}>
          <NavLink to={`/user/${username}`}>
            <img
              src={!image && DefaultPicture}
              className="img-fluid rounded-circle mt-2"
              alt={`${username} profile`}
              style={{
                height: "100%",
                width: "auto",
              }}
            />
          </NavLink>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title text-center text-md-start">
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
            <div className="col-md-3">
              <div className="buttons d-flex flex-column justify-content-center pe-2">
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
