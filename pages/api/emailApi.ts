import { PTGType, ProductsType, ParamsProducts } from "interface/product";
import { CommonResponse, ResponseTypeAPI } from "type/common";
import HttpClient from "utils/HttpClient";

export const postEmailRegister = async(email: any) => {
	return HttpClient.post<any, CommonResponse>(`/api/project/information/subscribe/email`,{
		email: email
	})
}
