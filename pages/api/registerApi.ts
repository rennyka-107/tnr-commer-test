import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const registerApi = async (data: any) => {
  return HttpClient.post<any,CommonResponse>(`api/user/create`, data, {
    withToken: false,
  });
};
