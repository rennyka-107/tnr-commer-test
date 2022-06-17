import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListCustomerType = async () => {
  return HttpClient.post<any, CommonResponse>(
    `/api-profile/profile/list/customer-type`,
    {}
  );
};

export const postChangeInfoApi = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api-profile/profile/update`,
    data
  );
};

export const getUserInfoApi = async () => {
  return HttpClient.post<any, CommonResponse>(`/api-profile/profile/username`);
};
export const postImage = async (formData: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api-profile/upload/image`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};
export const postFile = async (formData: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api-profile/upload/document`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};