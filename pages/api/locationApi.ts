import { CommonResponse } from "type/common";
import { convertToQuery } from "utils/helper";
import HttpClient from "utils/HttpClient";

export interface DistricI {
  DistrictID: number;
  DistrictName: string;
  provinceID: number;
  syncDate: string;
  syncFrom: string;
}

export const apiGetListProvinces = async () => {
  return HttpClient.get<string, CommonResponse>(
    `/api/v1/cadastral/provinces/all`
  );
};

export const apiGetListDistrict = async (params: {
  provinceName: string;
  pageNumber: number;
  pageSize: number;
}) => {
  return HttpClient.get<string, CommonResponse<DistricI[]>>(
    `api/v1/cadastral/district-name${convertToQuery(params)}`
  );
};

export interface Commune {
  CommuneID: number;
  CommuneName: string;
  districtID: number;
  syncDate: any;
  syncFrom: any;
}

export const apiGetListCommune = async (
  provinceName: string,
  districtName: string
) => {
  return HttpClient.get<string, CommonResponse<Commune[]>>(
    `api/v1/cadastral/commune-name${convertToQuery({
      provinceName,
      districtName,
    })}`
  );
};
