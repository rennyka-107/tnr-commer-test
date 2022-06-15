export interface TabProjectResponse {
	id: string,
	name: string,
	projectId: string,
	text: string,
	position: number,
	updateDate: string
}

export interface CommonResponse<D = any> {
	responseData: D | null;
	responseCode: string;
	httpStatusCode: number;
	success: boolean;
	total: number;
	headers: D;
	totalElement: number
  }

export interface ResponseTypeAPI {
	responseCode: string,
    responseMessage: string,
    responseData: any
	headers: any
	totalElement: number
}

