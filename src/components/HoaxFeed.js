import React, { useEffect, useState } from "react";
import { getHoaxes } from "../api/apiCalls";
import HoaxView from "./HoaxView";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "./ButtonWithProgress";
import useApiProgress from "../hook/use-snipper";
import Spinner from "./Spinner";

const HoaxFeed = () => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("get", "/api/v1.0/hoaxes");

  useEffect(() => {
    loadHoaxes();
  }, []);

  const loadHoaxes = async (page) => {
    try {
      const response = await getHoaxes(page);
      // setHoaxPage(response.data);
      setHoaxPage((previous) => ({
        ...response.data,
        content: [...previous.content, ...response.data.content],
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const { content: hoaxes, last, number } = hoaxPage;

  if (hoaxes.length === 0) {
    return (
      <div className="alert alert-light text-center mt-2" role="alert">
        {pendingApiCall ? <Spinner /> : t("There are no hoaxes")}
      </div>
    );
  }

  return (
    <div className="card mb-5">
      <div className="card-header">
        <h3 className="text-center" style={{ cursor: "pointer" }}>
          Hoaxes
        </h3>
      </div>
      {hoaxes.map((hoax) => {
        return <HoaxView key={hoax.id} hoax={hoax} />;
      })}
      <div className="text-center">
        {!last && (
          // <ButtonWithProgress
          //   className="btn btn-secondary w-100 p-3"
          //   onClick={() => loadHoaxes(number + 1)}
          //   disabled={pendingApiCall}
          //   pendingApiCall={pendingApiCall}
          //   text={t("Load old hoaxes")}
          // />
          <div
            className="alert alert-light text-center mt-2"
            style={{ cursor: pendingApiCall ? "not-allowed" : "pointer" }}
            onClick={pendingApiCall ? () => {} : () => loadHoaxes(number + 1)}
            role="alert"
          >
            {pendingApiCall ? <Spinner /> : t("Load old hoaxes")}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoaxFeed;
