import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const apiGetPropductCategory = async (idProject: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/category/find-by-project/${idProject}`
  );
};

export const apiGetLOT = async (idProject: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/customer/project-level-dictionary/find-lv1-by-project-id/${idProject}`
  );
};

export const apiGetListProjectByProjectType = async (idProjectType: string) => {
	return HttpClient.get<string, CommonResponse>(
		`/api/param/board/project/${idProjectType}`
	  );
} 