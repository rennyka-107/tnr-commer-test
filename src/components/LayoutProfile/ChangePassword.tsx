import BoxContainer from "@components/CustomComponent/BoxContainer";
import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "@service/Profile";
import React from "react";
import { useForm } from "react-hook-form";
import { InputProps, validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from 'yup';


export interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPass: string;
}


const ChangePassword = () => {
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
        alert(response.responseMessage)
    }

    const onSubmit = (values) => {
        const { confirmPass, ...newValues } = values;
        updatePassword(newValues);
    }

    return (
        <BoxContainer titleHeader="Đổi mật khẩu" styleCustom={{ padding: "21px 24px" }}>
            <form onSubmit={handleSubmit((values) => onSubmit(values))}>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordTextField
                        name="oldPassword"
                        control={control}
                        placeholder="Mật khẩu hiện tại"
                        required
                        fullWidth
                        label="Mật khẩu hiện tại"
                        InputProps={InputProps}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
                    <PasswordTextField
                        name="newPassword"
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