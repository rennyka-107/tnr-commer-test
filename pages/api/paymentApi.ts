import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListPaymenListById = async() => {
	return HttpClient.get<any, CommonResponse>(`/api/v1/payment/get-payment-method`)
}

export const apiSavePaymentInformation = async(data: any) => {
	return HttpClient.post<any, CommonResponse>(`api/v1/payment/save-payment-info`, data)
}

export const apiGetQrCode = async(code: any) => {
	return HttpClient.post<any, CommonResponse>(`api/v1/payment/get-qrcode/${code}`)
}
