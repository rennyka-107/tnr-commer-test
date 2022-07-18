import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";


export const apiGetBanner  = async () => {
	return HttpClient.get<any, CommonResponse>(
		`/api/banner`
	  );
}