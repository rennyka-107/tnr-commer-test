import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export interface BodyRequest {
    projectId?: string | null;
    categoryId?: string | null;
    projectLevel1?: string | null;
	projectTypeId?: string | null;
    saleProductStatus?: (string | number)[] | string;
	projectTypeCode?: string | null;
	floorName?: string | null;
	levelDetailName?: string | null;
}

const LIST_PRODUCT = "/api/board/find-board";

export const getListProductTable = (body: BodyRequest,cancelToken:any) => { return HttpClient.post<any, CommonResponse>(`${LIST_PRODUCT}`, body,{cancelToken:cancelToken}); };
