import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListSalePolicyById = async (id: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/sale-policy/find-by-project/${id}`
  );
};

export const getPolicyByIdApi = async (id: any) => {
	return HttpClient.get<any,any>(
		`/api/sale-policy/${id}`
	)
}