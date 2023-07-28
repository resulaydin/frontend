import React from "react";
import { ProfileImageWithDefault } from "./ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { getI18n } from "react-i18next";

const HoaxView = ({ hoax }) => {
  const { content, user, timestamp } = hoax;
  const { username, displayName, image } = user;

  const formatted = format(timestamp, getI18n().language);

  return (
    <div className="card-body">
      <div className=" d-flex p-2">
        <ProfileImageWithDefault
          className="rounded-circle me-4"
          image={image}
          width="64"
          heigth="64"
        />
        <div className="hoax-title my-auto">
          <Link
            to={`/user/${username}`}
            className=" link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            <h4 className="text-secondary-emphasis">
              {displayName}@{username}
              <span> - {formatted}</span>
            </h4>
          </Link>
        </div>
      </div>
      <div className="hoax-content ms-5">
        <span className="d-block ps-5">{content}</span>
      </div>
      <hr />
    </div>
  );
};

export default HoaxView;
