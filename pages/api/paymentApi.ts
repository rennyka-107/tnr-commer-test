import { PTGType, ProductsType, ParamsProducts } from "interface/product";
import { CommonResponse, ResponseTypeAPI } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListPaymenListById = async(id: any) => {
	return HttpClient.post<any, CommonResponse>(`/api/v1/landsoft/get-payment-list${id}`)
}
