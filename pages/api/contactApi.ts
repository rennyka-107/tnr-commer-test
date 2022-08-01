import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

interface CreateContactParams {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  content: string;
}

export const createContactAPI = async (params: CreateContactParams) => {
  return HttpClient.post<CreateContactParams, CommonResponse>(
    `/api/contact`,
    params,
    {
      withToken: false,
    }
  );
};

export interface GeneralInfo {
  address: string;
  companyName: string;
  id: string;
  phoneNumber: string;
  email: string;
}

export const getGenralInfoAPI = async () => {
  return HttpClient.get<null, CommonResponse<any>>(
    `/api/static-content/get-all`,
    {
      withToken: false,
    }
  );
};
