import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListMenuBarProject = async () => {
  return HttpClient.get<CommonResponse>(`/api/menu/bar/project`, {
    withToken: false,
  });
};

export const getListMenuBarProjectTypeApi = async () => {
  return HttpClient.get<CommonResponse>(`/api/menu/bar/project/type`, {
    withToken: false,
  });
};

export const getListLocation = async () => {
  return HttpClient.get<any, any>(`/api/menu/bar/location`, {
    withToken: false,
  });
};

export const getListCategoryApi = async () => {
  return HttpClient.get<any, any>(`/api/category`, { withToken: false });
};
