export interface CommonResponse<D = any> {
	responseData: D | null;
	httpStatusCode: number;
	success: boolean;
	total: number;
  }