import BoxContainer from "@components/CustomComponent/BoxContainer";
import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { InputProps, validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from 'yup';


export interface ChangePasswordForm {
    currentPass: string;
    newPass: string;
    confirmPass: string;
}


const ChangePassword = () => {
    const validationSchema = yup.object().shape({
        currentPass: yup
            .string()
            .trim(validateLine.trim)
            .strict(true)
            .required(validateLine.required)
            .default(''),
        newPass: yup
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
            .oneOf([yup.ref('newPass'), null], 'Mật khẩu không khớp')
            .default(''),
    });
    const { control, handleSubmit } = useForm<ChangePasswordForm>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: validationSchema.getDefault(),
    });

    const onSubmit = (values) => {
        console.log(values, '------values------');

    }

    return (
        <BoxContainer titleHeader="Đổi mật khẩu" styleCustom={{ padding: "21px 24px" }}>
            <form onSubmit={handleSubmit((values) => onSubmit(values))}>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordTextField
                        name="currentPass"
                        control={control}
                        placeholder="Mật khẩu hiện tại"
                        required
                        fullWidth
                        label="Tên đăng nhập"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordTextField
                        name="newPass"
                        control={control}
                        placeholder="Mật khẩu mới"
                        required
                        fullWidth
                        label="Mật khẩu mới"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordTextField
                        name="confirmPass"
                        control={control}
                        placeholder="Xác minh mật khẩu"
                        required
                        fullWidth
                        label="Xác minh mật khẩu"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <CustomButton label="Cập nhật"
                    style={{ background: "#1B3459", width: 255 }}
                    type="submit"
                />
            </form>
        </BoxContainer>
    )
}
export default ChangePassword;