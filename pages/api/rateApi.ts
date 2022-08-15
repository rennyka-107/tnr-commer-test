import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const apiRateTransaction = async (body: any) => {
  return HttpClient.post<any, CommonResponse>(`/api/rate-service/rate`, body);
};
