import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListMenuBarProject = async () => {
	return HttpClient.get<CommonResponse>(
	  `/api/menu/bar/project`,
	  {withToken: false}
	);
  };
  
export const getListMenuBarProjectTypeApi = async () => {
	return HttpClient.get<CommonResponse>(
	  `/api/menu/bar/project/type`,
	  {withToken: false}
	);
  };
  