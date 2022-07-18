import { CommonResponse, ResponseTypeAPI } from "type/common";
import HttpClient from "utils/HttpClient";

const FAVOURITE_API = '/api/favourite'


export const addProductToFavourite = async(body: any) => {
	return HttpClient.post<any,any>(`${FAVOURITE_API}/favourite-product-action?productionId=${body.productionId}&action=${body.action}`,{})
}

export const getListFavourite = async () => {
	return HttpClient.get<any,any>(`${FAVOURITE_API}/get-list-favourite-product-of-user`)
}