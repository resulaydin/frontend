import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useApiProgress(apiPath) {
  const [pendingApiCall, setPendinApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        updateApiCallFor(request.url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    };
    registerInterceptors();

    const updateApiCallFor = (url, inProgress) => {
      if (apiPath === url) {
        setPendinApiCall(inProgress);
      }
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    return () => {
      unregisterInterceptors();
    };
  }, []);

  return pendingApiCall;
}
