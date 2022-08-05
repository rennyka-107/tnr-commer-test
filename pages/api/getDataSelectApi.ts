import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const apiGetPropductCategory = async (idProject: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/category/find-by-project/${idProject}`
  );
};

export const apiGetLOT = async (idProject: string,idProjectType: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/param/board/level-detail-name/${idProject}/${idProjectType}`
  );
};

export const apiGetListProjectByProjectType = async (idProjectType: string) => {
	return HttpClient.get<string, CommonResponse>(
		`/api/param/board/project/${idProjectType}`
	  );
} 

export const apiGetProjectTypeBoard = async () => {
	return HttpClient.get<string, CommonResponse>(
	  `/api/param/board/project-type`
	);
  };
  