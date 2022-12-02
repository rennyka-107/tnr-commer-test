import { CommonResponse, ResponseTypeAPI } from "type/common";
import HttpClient from "utils/HttpClient";

const FAVOURITE_API = '/api/favourite'


export const addProductToFavourite = async(body: any) => {
	return HttpClient.post<any,any>(`${FAVOURITE_API}/favourite-product-action?productionId=${body.productionId}&action=${body.action}`,{})
}

export const getListFavourite = async () => {
	return HttpClient.get<any,any>(`${FAVOURITE_API}/get-list-favourite-product-of-user`)
}

export const searchAdvandedFavorite = async (data: any, search: any) => {
	const newDataSearch = {
	  areaFrom: data.areaFrom === 0 ? null : data.areaFrom,
	  areaTo: data.areaTo === 0 ? null : data.areaTo,
	  priceFrom:
		data.priceFrom === "0" ? "0" : data.priceFrom + "000000000",
	  priceTo: data.priceTo === "0" ? "0" : data.priceTo + "000000000",
	  projectId: data.projectId === "1" ? "" : data.projectId,
	  projectTypeId: data.projectTypeId === "1" ? "" : data.projectTypeId,
	  provinceId: data.provinceId === "1" ? "" : data.provinceId,
	  categoryId: data.categoryId === "1" ? "" : data.categoryId,
	  textSearch: "",
	  provinceIdList: data.provinceIdList ? data.provinceIdList : [],
	  projectTypeIdList: data.projectTypeIdList ? data.projectTypeIdList : [],
	  projectIdList: data.projectIdList ? data.projectIdList : [],
	  isPayment: Number(data.isPayment),
	  sortType: Number(data.sortType),
	  favouriteSearch: data.favouriteSearch ? data.favouriteSearch : 0
	};
  
	return HttpClient.post<any, CommonResponse>(
	  `api/product/information/advance/search?page=${search.page}&size=${search.size}`,
	  newDataSearch,
	  {
		withToken: false,
	  }
	);
  };