import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const forgetPassword = async (username: any, password: any) => {
  return HttpClient.get<any, CommonResponse>(
    `/​api-account​/v1​/account​/reset-password?username=${username}&password=${password}`
  );
};
