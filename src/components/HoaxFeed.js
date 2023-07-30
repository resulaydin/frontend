import React, { useEffect, useState } from "react";
import {
  getHoaxes,
  getNewHoaxes,
  getNewHoaxesCount,
  getOldHoaxes,
} from "../api/apiCalls";
import HoaxView from "./HoaxView";
import { useTranslation } from "react-i18next";
import useApiProgress from "../hook/use-snipper";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0, //page number
  });

  const [newHoaxesCount, setNewHoaxesCount] = useState(0);

  const { t } = useTranslation();
  const { username } = useParams();

  let lastHoaxId = 0;
  let firstHoaxId = 0;
  if (hoaxPage.content.length > 0) {
    const lastHoaxIndex = hoaxPage.content.length - 1;
    firstHoaxId = hoaxPage.content[0].id;
    lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
  }

  let path = username
    ? `/api/v1.0/users/${username}/hoaxes?page=`
    : "/api/v1.0/hoaxes?page=";
  const initialLoadHoaxProgress = useApiProgress("get", path);

  let loadOldHoaxesPath = username
    ? `/api/v1.0/users/${username}/hoaxes/${lastHoaxId}?page=`
    : `/api/v1.0/hoaxes/${lastHoaxId}?page=`;
  const loadOldHoaxProgress = useApiProgress("get", loadOldHoaxesPath, false);

  let loadNewHoaxesPath = username
    ? `/api/v1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after&page=`
    : `/api/v1.0/hoaxes/${firstHoaxId}?direction=after&page=`;
  const loadNewHoaxProgress = useApiProgress("get", loadNewHoaxesPath, false);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await getNewHoaxesCount(firstHoaxId, username);
        console.log(response.data);
        setNewHoaxesCount(response.data.count);
      } catch (error) {
        console.log("getCount: ");
        console.log(error);
      }
    };
    getCount();
    const looper = setInterval(getCount, 5000);
    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstHoaxId, username]);

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const response = await getHoaxes(username, page);
        setHoaxPage((previous) => ({
          ...response.data,
          content: [...previous.content, ...response.data.content],
        }));
      } catch (error) {
        console.log(error);
      }
    };
    loadHoaxes();
  }, [username]);

  const loadOldHoaxes = async (lastHoaxId) => {
    try {
      const response = await getOldHoaxes(
        username,
        lastHoaxId,
        hoaxPage.number
      );
      setHoaxPage((previous) => ({
        ...response.data,
        content: [...previous.content, ...response.data.content],
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const loadNewHoaxes = async (firstHoaxId) => {
    try {
      const response = await getNewHoaxes(
        username,
        firstHoaxId,
        hoaxPage.number
      );
      console.log(response.data);
      setHoaxPage((previous) => ({
        ...previous,
        content: [...response.data.content, ...previous.content],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const { content: hoaxes, last } = hoaxPage;

  const newHoaxesAlert = () => {
    if (newHoaxesCount !== 0) {
      return (
        <div
          className="alert alert-light text-center mt-2"
          style={{ cursor: loadNewHoaxProgress ? "not-allowed" : "pointer" }}
          onClick={
            loadNewHoaxProgress ? () => {} : () => loadNewHoaxes(firstHoaxId)
          }
          role="alert"
        >
          {loadNewHoaxProgress ? <Spinner /> : t("There are new hoaxes")}
        </div>
      );
    }
  };

  if (hoaxes.length === 0) {
    return (
      <div className="alert alert-light text-center mt-2" role="alert">
        {initialLoadHoaxProgress ? <Spinner /> : t("There are no hoaxes")}
      </div>
    );
  }

  return (
    <div className="card mb-5">
      <div className="card-header">
        <h3 className="text-center" style={{ cursor: "pointer" }}>
          Hoaxes
        </h3>
        {newHoaxesAlert()}
      </div>

      {hoaxes.map((hoax) => {
        return <HoaxView key={hoax.id} hoax={hoax} />;
      })}
      <div className="text-center">
        {!last && (
          // <ButtonWithProgress
          //   className="btn btn-secondary w-100 p-3"
          //   onClick={() => loadHoaxes(number + 1)}
          //   disabled={loadOldHoaxProgress}
          //   loadOldHoaxProgress={loadOldHoaxProgress}
          //   text={t("Load old hoaxes")}
          // />
          <div
            className="alert alert-light text-center mt-2"
            style={{ cursor: loadOldHoaxProgress ? "not-allowed" : "pointer" }}
            onClick={
              loadOldHoaxProgress ? () => {} : () => loadOldHoaxes(lastHoaxId)
            }
            role="alert"
          >
            {loadOldHoaxProgress ? <Spinner /> : t("Load old hoaxes")}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoaxFeed;
