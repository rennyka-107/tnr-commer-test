import BoxContainer from "@components/CustomComponent/BoxContainer";
import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "@service/Profile";
import useNotification from "hooks/useNotification";
import styled from '@emotion/styled'
import React from "react";
import { useForm } from "react-hook-form";
import { InputProps, validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from 'yup';
import PasswordProfileTextField from "@components/Form/PasswordProfileTextField";


export interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPass: string;
}


const ChangePassword = () => {
    const notification = useNotification();
    const validationSchema = yup.object().shape({
        oldPassword: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .required(validateLine.required)
            .default(''),
        newPassword: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .min(8, 'Mật khẩu không được chứa ít hơn 8 ký tự')
            .max(255, 'Mật khẩu không được chứa quá 255 ký tự')
            .matches(Regexs.password, validateLine.regexPassword)
            .required(validateLine.required)
            .default(''),
        confirmPass: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .required(validateLine.required)
            .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp')
            .default(''),
    });
    const { control, handleSubmit } = useForm<ChangePasswordForm>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: validationSchema.getDefault(),
    });

    const updatePassword = async (params) => {
        const response = await changePassword(params);
        // console.log(response, 'response----------');
        notification({
            severity: response.responseCode === "00" ? "success" : "error",
            title: "Cập nhật mật khẩu",
            message: response?.responseMessage
        })
    }

    const onSubmit = (values) => {
        const { confirmPass, ...newValues } = values;
        updatePassword(newValues);
    }

    return (
        <BoxContainer titleHeader="Đổi mật khẩu" styleCustom={{ padding: "28px 28px" }}>
            <form onSubmit={handleSubmit((values) => onSubmit(values))} style={{maxWidth: 285, display: 'flex', flexDirection: 'column', margin: '34px 20px 37px 31px'}}>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordProfileTextField
                        name="oldPassword"
                        control={control}
                        placeholder="Nhập mật khẩu hiện tại"
                        required
                        fullWidth
                        labelText="Nhập mật khẩu hiện tại"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordProfileTextField
                        name="newPassword"
                        control={control}
                        placeholder="Nhập mật khẩu mới"
                        required
                        fullWidth
                        labelText="Nhập mật khẩu mới"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordProfileTextField
                        name="confirmPass"
                        control={control}
                        placeholder="Xác nhận mật khẩu mới"
                        required
                        fullWidth
                        labelText="Xác nhận mật khẩu mới"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <CustomButton label="Cập nhật"
                    style={{ width: 285 , fontSize: 18, fontWeight: 400, fontFamily: 'Roboto', fontStyle: 'normal', marginTop: 20}}
                    type="submit"
                />
            </form>
        </BoxContainer>
    )
}
export default ChangePassword;