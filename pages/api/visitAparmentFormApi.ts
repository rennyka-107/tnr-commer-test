import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const saveInforVisitApament = async (data: any) => {
    return HttpClient.post<any, CommonResponse>(
      "/api/customer/save",
      data,
      { withToken: false }
    );
  };