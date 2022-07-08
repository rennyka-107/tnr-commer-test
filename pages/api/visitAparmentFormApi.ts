import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const saveInforVisitApament = async (data: any) => {
    return HttpClient.post<any, CommonResponse>(
      "/api/customer/visit-schedule/save",
      data,
      { withToken: false }
    );
  };