import { CommonResponse } from "type/common";
import { convertToQuery } from "utils/helper";
import HttpClient from "utils/HttpClient";
import FormatFns from 'utils/DateFns';

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
  try {
    return HttpClient.post<any, CommonResponse>(
      `api-profile/upload/business-registration${convertToQuery({ businessRegistrationDate: FormatFns.formatDateTime(new Date, 'yyyy/MM/dd HH:ss') })}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    return error;
  }

};

export const getProjectRecenly = async () => {
  return HttpClient.get<any, CommonResponse>(
    `api-project/recently-viewed`,
    {}
  );
};