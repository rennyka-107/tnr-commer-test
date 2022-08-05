import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const forgetPassword = async (username: any, password: any) => {
  return HttpClient.get<any, CommonResponse>(
    `/api-account/v1/account/reset-password?username=${username}&password=${password}`
  );
};

export const checkValidOTP = async (key: any, OTP: any) => {
  return HttpClient.get<any, CommonResponse>(
    `/api/v1/verify/check-otp-valid?key=${key}&otp=${OTP}`
  );
};

export const getEmailRegister = async(param: string) => {
	return HttpClient.get<any, CommonResponse>(
		`/api-account/v1/account/get-email?param=${param}`
	)
}
