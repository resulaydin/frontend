import React, { useEffect, useState } from "react";

export const ApiProgress = ({ apiMethod, apiPath, strictMode }) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    const updateApiCallFor = (method, url, strictMode) => {
      if (method !== apiMethod) {
        return;
      }
      if (method === apiMethod && strictMode) {
        setPendingApiCall(true);
      } else if (strictMode) {
        setPendingApiCall(false);
      }
    };
  });

  return pendingApiCall;
};
