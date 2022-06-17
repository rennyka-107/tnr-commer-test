import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export interface BodyRequest {
    projectId: string | null;
    projectTypeId: string | null;
    projectLevel1: string | null;
    saleProductStatus: (string | number)[] | string;
}

const LIST_PRODUCT = "/api/board/find-board";

export const getListProductTable = (body: BodyRequest) => { return HttpClient.post<any, CommonResponse>(`${LIST_PRODUCT}`, body); };
