import { LoginSuccess, refreshAccessToken } from "@service/auth";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { baseURL } from "./constants";
import LocalStorage from "./LocalStorage";
import SessionStorage from "./SessionStorage";

declare module "axios" {
  export interface AxiosRequestConfig {
    withToken?: boolean;
  }
}

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};

class Axios {
  private httpInstance: AxiosInstance;

  constructor() {
    const httpInstance = axios.create({
      baseURL,
      headers,
    });

    // Request interceptor
    httpInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // if (config?.withToken === true) {
        const accessToken =
          LocalStorage.get("accessToken") || SessionStorage.get("accessToken");
        if (config.headers) {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          } else {
            delete config.headers.Authorization;
          }
        }
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    httpInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          const refreshToken =
            LocalStorage.get("refreshToken") ||
            SessionStorage.get("refreshToken");
          try {
            const { responseData: response } = await refreshAccessToken(
              refreshToken
            );
            if ((response as LoginSuccess).access_token) {
              if (!isEmpty(LocalStorage.get("accessToken"))) {
                LocalStorage.set(
                  "accessToken",
                  (response as LoginSuccess).access_token
                );
                LocalStorage.set(
                  "refreshToken",
                  (response as LoginSuccess).refresh_token
                );
              }
              if (!isEmpty(SessionStorage.get("accessToken"))) {
                SessionStorage.set(
                  "accessToken",
                  (response as LoginSuccess).access_token
                );
                SessionStorage.set(
                  "refreshToken",
                  (response as LoginSuccess).refresh_token
                );
              }
              let newConfig = error.config;
              if (newConfig && newConfig.headers) {
                newConfig.headers.Authorization = `Bearer ${
                  (response as LoginSuccess).access_token
                }`;
              }
              return httpInstance(error.config);
            }
          } catch (err) {
            LocalStorage.remove("accessToken");
            LocalStorage.remove("refreshToken");
            SessionStorage.remove("accessToken");
            SessionStorage.remove("refreshToken");
            window.location.reload();
          }
        }
        return Promise.reject(error);
      }
    );

    this.httpInstance = httpInstance;
  }

  public get HttpClient(): AxiosInstance {
    return this.httpInstance;
  }

  public post<T = any, R = T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.post<T, R>(url, data, config);
  }

  public get<T = any, R = T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.get<T, R>(url, config);
  }

  public delete<T = any, R = T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.delete<T, R>(url, config);
  }
}

const { HttpClient } = new Axios();

export default HttpClient;
