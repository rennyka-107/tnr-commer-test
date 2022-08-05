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

export const apiGetListDistrict = async (params: { provinceId: number, pageNumber: number, pageSize: number }) => {
    return HttpClient.get<string, CommonResponse<DistricI[]>>(
        `api/v1/cadastral/district/${convertToQuery(params)}`
    );
};

export interface Commune {
    CommuneID: number;
    CommuneName: string;
    districtID: number;
    syncDate: any
    syncFrom: any
}

export const apiGetListCommune = async (districtId: number) => {
    return HttpClient.get<string, CommonResponse<Commune[]>>(
        `api/v1/cadastral/commune?districtId=${districtId}`

    );
};