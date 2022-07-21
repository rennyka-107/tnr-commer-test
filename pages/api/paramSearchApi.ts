import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

const URL_PARAMS_SEARCH = '/api/param/v1'

export const getListProjectTypeByListIdProvince = async(data: any) => {
	return HttpClient.post<any, any>(`${URL_PARAMS_SEARCH}/project-type`, data);
}

export const getListProjectByProjectType = async(data:any) => {
	return HttpClient.post<any, any>(`${URL_PARAMS_SEARCH}/project`, data);
}