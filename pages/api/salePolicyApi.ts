import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListSalePolicyById = async (id: string) => {
  return HttpClient.get<any, CommonResponse>(
    `/api/sale-policy/find-by-project/${id}`
  );
};