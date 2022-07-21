import { ParamsProjects } from "interface/project";
import {
  CommonResponse,
  ResponseTypeAPI,
  TabProjectResponse,
} from "type/common";
import HttpClient from "utils/HttpClient";

export const getListProjectApi = async (params: ParamsProjects, data: any) => {
  return HttpClient.post<ResponseTypeAPI, CommonResponse>(
    `/api/project/information/search?page=${params.page}&size=${params.size}`,
    data,
    { withToken: false }
  );
};

export const getListTabsProjectApi = async (id: string) => {
  return HttpClient.post<TabProjectResponse, CommonResponse>(
    `/api/project/information/tab/${id}`,
    { withToken: false }
  );
};

export const getProjectByType = async (body: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/param/v1/project`,
     body, 
    { withToken: true }
  );
};
