import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useApiProgress(apiMethod, apiPath) {
  const [pendingApiCall, setPendinApiCall] = useState(false);

  useEffect(() => {
    console.log("first");
    let requestInterceptor, responseInterceptor;
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

    const updateApiCallFor = (method, url, inProgress) => {
      if (method === apiMethod && url.startsWith(apiPath)) {
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
  }, [apiMethod, apiPath]);

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
