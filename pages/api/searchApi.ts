import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

type SearchParams = {
  page: number;
  size: number;
};

export const searchLocationHome = async (data: any, search: SearchParams) => {
  return HttpClient.post<any, CommonResponse>(
    `api/product/information/home-page/search?page=${search.page}&size=${search.size}`,
    data,
    {
      withToken: false,
    }
  );
};

export const searchAdvanded = async (data: any, search: SearchParams) => {
  return HttpClient.post<any, CommonResponse>(
    `api/product/information/advance/search?page=${search.page}&size=${search.size}`,
    data,
    {
      withToken: false,
    }
  );
};
