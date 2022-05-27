import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { validateLine } from 'utils/constants';
import Regexs from "utils/Regexs";
import * as yup from 'yup';


const Form = styled.div`
    margin-top:10px
`;

const LinkLabel = styled.a`
    color:#1F70E8;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration: underline;
`

export interface LoginParams {
    username: string;
    password: string;
}

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const Route = useRouter();
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
            // .matches(Regexs.password, validateLine.regexPassword)
            .required(validateLine.required)
            .default(''),
    });

    useEffect(() => {
        console.log(isAuthenticated, 'isAuthenticated');

        if (isAuthenticated) {

            Route.push({
                pathname: Route.query?.prePath?.toString() || '/',
            });
        }
    }, [isAuthenticated, Route])

    const { control, handleSubmit } = useForm<LoginParams>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: validationSchema.getDefault(),
    });

    const onSubmit = async (values) => {
        try {
            const response = await login(values);
        } catch (error) {
            console.log(error, '-------error--------');
        }

    }

    // if(isAuthenticated) return 

    return (
        <Form>
            <form onSubmit={handleSubmit((values) => onSubmit(values))}>
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
                    <CustomButton label="Đăng nhập"
                        style={{ background: "#D60000" }}
                        type="submit"
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }} fullWidth style={{ alignItems: 'center' }}>
                    <Link href={"#"} passHref ><LinkLabel>Quên mật khẩu</LinkLabel></Link>
                </FormGroup>
            </form>

        </Form>
    )
}
export default Login;