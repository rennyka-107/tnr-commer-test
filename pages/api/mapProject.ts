import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const apiGetListLevelProject = async (id: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/customer/project-level-dictionary/find-by-project-id/${id}`
  );
};

export const apiGetInformationProject = async (id: string) => {
  return HttpClient.post<string, CommonResponse>(
    `/api/project/information/${id}`
  );
};

export const apiGetProjectTabs = async (id: string) => {
  return HttpClient.post<string, CommonResponse>(
    `/api/project/information/tab/${id}`
  );
};

export const apiGetListChildMapByIdLevel = async (id: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/customer/project-level-detail/find-by-level-id/${id}`
  );
};

export const apiGetListChildMapByIdParent = async (id: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/customer/project-level-detail/find-by-parent-id/${id}`
  );
};