import { stringify } from "querystring";
import { convertCamelCaseKeysToSnakeCase, convertToQuery } from "utils/helper";
import HttpClient from "utils/HttpClient";
export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginSuccess {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginFailed {
  error?: string;
  error_description?: string;
}

export interface ResponseLoginModel<T> {
  responseCode: string;
  responseData: T;
  responseMessage: string;
}

export const Login = (params: LoginParams) => {
  return HttpClient.post<typeof params, any>(
    `/api/user/get-token${convertToQuery(params)}`
  );
};

export const refreshAccessToken = async (refreshToken: string) => {
  return HttpClient.post<string, any>(
    // "http://auth.tnr-online.com:1993/auth/realms/tnr-customersite/protocol/openid-connect/token",
    "/api/user/refresh-token",
    stringify(
      convertCamelCaseKeysToSnakeCase({
        refreshToken,
        clientId: "customer-site",
        grantType: "refresh_token",
      })
    ),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const sendNotificationToken = async ({
  deviceToken,
  action,
}: {
  deviceToken: string;
  action: number;
}) => {
  return HttpClient.put<any, any>(
    `api-noti/notification/update-device-token?deviceToken=${deviceToken}&action=${action}`
  );
};

interface VerifyParams {
  name?: string;
  captchaResponse: string;
}

export const verifyCapchaToken = (body: VerifyParams) => {
  return HttpClient.post<VerifyParams, any>(`api/re-captcha/verify`, body);
};
