import { CommonResponse } from 'type/common';
import HttpClient from "utils/HttpClient";

export interface CompareParamsI {
  id: string;
  name: string;
  compareParam: string;
  status: 1 | 0;
  type: string;
  keyMap: string;
  createAt: string;
}

export const GetCompareParam = async () => {
  return HttpClient.get<any, CommonResponse>(`/api/compare/get-list-compare-param`, {
    withToken: false,
  });
};
