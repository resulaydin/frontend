import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useApiProgress(apiMethod, apiPath, strictPath) {
  const [pendingApiCall, setPendinApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (method, url, inProgress) => {
      // const isStrict = strictPath ? url === apiPath : url.startsWith(apiPath);
      // if (method === apiMethod && isStrict) {
      //   setPendinApiCall(inProgress);
      // }

      if (apiMethod !== method) {
        return;
      }
      if (strictPath && url === apiPath) {
        setPendinApiCall(inProgress);
      } else if (!strictPath && url.startsWith(apiPath)) {
        setPendinApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { method, url } = request;
        updateApiCallFor(method, url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { method, url } = response.config;
          updateApiCallFor(method, url, false);
          return response;
        },
        (error) => {
          const { method, url } = error.config;
          updateApiCallFor(method, url, false);
          throw error;
        }
      );
    };
    registerInterceptors();

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    return () => {
      unregisterInterceptors();
    };
  }, [apiMethod, apiPath, strictPath]);

  return pendingApiCall;
}

export function useApiProgressTemp(apiPath) {
  const [pendingApiCall, setPendinApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;
    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { url } = request;
        updateApiCallFor(url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { url } = response.config;
          updateApiCallFor(url, false);
          return response;
        },
        (error) => {
          const { url } = error.config;
          updateApiCallFor(url, false);
          throw error;
        }
      );
    };
    registerInterceptors();

    const updateApiCallFor = (url, inProgress) => {
      if (url.startsWith(apiPath)) {
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
  }, [apiPath]);

  return pendingApiCall;
}
