import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListUserManualApi = async () => {
  return HttpClient.get<any, any>(
    `/api/user-manual/get-all-user-manual`
  );
};

export const getUserManualContent = async (id: any) => {
	return HttpClient.get<any,any>(`/api/user-manual/get-user-manual-content/${id}`)
}