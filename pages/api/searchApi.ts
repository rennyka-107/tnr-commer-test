import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

type SearchParams = {
  page: number;
  size: number;
};

type SearchAdvand = {
  areaFrom: number;
  areaTo: number;
  priceFrom: string;
  priceTo: string;
  projectId: string;
  projectTypeId: string;
  provinceId: string;
  textSearch: string;
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
  const newDataSearch = {
    areaFrom: data.areaFrom === 0 ? null : data.areaFrom,
    areaTo: data.areaTo === 0 ? null : data.areaTo,
    priceFrom: data.priceFrom === "0000000000" ? "" : data.priceFrom,
    priceTo: data.priceTo === "0000000000" ? "" : data.priceTo,
    projectId: data.projectId === "1" ? "" : data.projectId,
    projectTypeId: data.projectTypeId === "1" ? "" : data.projectTypeId,
    provinceId: data.provinceId === "1" ? "" : data.provinceId,
	categoryId: data.categoryId === "1" ? "" : data.categoryId,
    textSearch: data.textSearch,
  };

  return HttpClient.post<any, CommonResponse>(
    `api/product/information/advance/search?page=${search.page}&size=${search.size}`,
    newDataSearch,
    {
      withToken: false,
    }
  );
};

export const searchAdvandedHotProduct = async (data: any, search: SearchParams) => {
	return HttpClient.post<any, CommonResponse>(
		`api/product/information/advance/search?page=${search.page}&size=${search.size}`,
		data,
		{
		  withToken: false,
		}
	  );
}
