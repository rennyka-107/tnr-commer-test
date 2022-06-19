import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const registerApi = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(`/api/user/create`, data, {
    withToken: false,
  });
};

export const getOTP = async (userId: any) => {
  return HttpClient.get<any, CommonResponse>(
    `/api/v1/verify/get-otp?key=${userId}`,
    { withToken: false }
  );
};

export const activeAccount = async (keycloakId: any, OTP: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api-account/v1/account/active?key=${keycloakId}&otp=${OTP}`,
    {}
  );
};
