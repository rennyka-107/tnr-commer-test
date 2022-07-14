import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

const API_SPECIALOFFER = "/api/project-offers";

type SearchParams = {
  page: number;
  size: number;
};

export const getTop10Special = async () => {
  return HttpClient.get<any, CommonResponse>(
    `${API_SPECIALOFFER}/find-top10-offers`,
    {
      withToken: false,
    }
  );
};

export const getTopAllSpecial = async (params: SearchParams) => {
  return HttpClient.get<any, CommonResponse>(
    `${API_SPECIALOFFER}/find-all-offers?page=${params.page}&size=${params.size}`,
    {
      withToken: false,
    }
  );
};

export const getSpecialById = async (id: any,params: SearchParams) => {
  return HttpClient.get<any, any>( `/api/project-offers/find-by-offers/${id}`,
  {
	withToken: false,
  });
};
