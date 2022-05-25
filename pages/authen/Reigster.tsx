import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline, CircleOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { validateLine } from 'utils/constants';
import Regexs from "utils/Regexs";
import * as yup from 'yup';


const SpanHeaderForm = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color:#666666;
    padding-top:40px;
`;

const SpanRadio = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
`;

const LinkLabel = styled.a`
    color:#1F70E8;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration: underline;
`
export interface RegisterParam {
    username: string;
    password: string;
    rePassword: string;
    phoneNumber: string;
    accept: boolean;
}

const Register = () => {

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .max(255)
            .required(validateLine.required)
            .default(''),
        password: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .min(8, 'Mật khẩu không được chứa ít hơn 8 ký tự')
            .max(255, 'Mật khẩu không được chứa quá 255 ký tự')
            .matches(Regexs.password, validateLine.regexPassword)
            .required(validateLine.required)
            .default(''),
        rePassword: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
            .default(''),
        phoneNumber: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .matches(Regexs.phone, 'Số điện thoại không đúng')
            .required(validateLine.required)
            .default(''),
        accpept: yup.boolean().default(false),
    });


    const { control, handleSubmit, setValue } = useForm<RegisterParam>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: validationSchema.getDefault(),
    });

    const onSubmit = async (data: any) => {
        console.log(data, 'data');
    };



    return (
        <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
            <div style={{ marginTop: 20 }}>
                <SpanHeaderForm>
                    Để được hỗ trợ tốt nhất trong quá trình giao dịch BĐS tại TNR, vui lòng nhập đầy đủ và chính xác.
                </SpanHeaderForm>
            </div>
            <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                <ControllerTextField
                    variant="outlined"
                    hiddenLabel
                    name="username"
                    control={control}
                    placeholder="Tên đăng nhập"
                    required
                    fullWidth
                    label="Tên đăng nhập"
                    labelColor="#666666"
                />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
                <ControllerTextField
                    variant="outlined"
                    hiddenLabel
                    name="phoneNumber"
                    control={control}
                    placeholder="Số điện thoại"
                    required
                    fullWidth
                    label="Số điện thoại"
                    labelColor="#666666"
                />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
                <PasswordTextField
                    name="password"
                    control={control}
                    placeholder="Nhập mật khẩu"
                    required
                    fullWidth
                    label="Mật khẩu"
                    labelColor="#666666"
                />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
                <PasswordTextField
                    name="rePassword"
                    control={control}
                    placeholder="Nhập lại mật khẩu"
                    required
                    fullWidth
                    label="Nhập lại mật khẩu"
                    labelColor="#666666"
                />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
                <ControllerCheckbox
                    name="accept"
                    control={control}
                    labelCustom={<SpanRadio>Tôi đồng ý với <LinkLabel>Điều khoản và điều kiện</LinkLabel> của TNR</SpanRadio>}
                    label=""
                    icon={<CircleOutlined />}
                    checkedIcon={< CheckCircleOutline />}
                />
            </FormGroup>
            <div style={{ width: '100%' }}>
                <CustomButton label="Đăng ký"
                    style={{ background: "#D60000" }}
                    type="submit"
                />
            </div>
        </form>
    )
}

export default Register;