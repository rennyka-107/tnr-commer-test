import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutline, CircleOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import {
  LoginSuccess,
  ResponseLoginModel,
  verifyCapchaToken,
} from "@service/auth";
import useAuth from "hooks/useAuth";
import useNotification from "hooks/useNotification";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import LocalStorage from "utils/LocalStorage";
import PathRoute from "utils/PathRoute";
import * as yup from "yup";

const Form = styled.div`
  margin-top: 10px;
`;

const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration: underline;
`;

const SpanRadio = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
const ButtonStyled = styled(Button)`
  text-transform: none;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  padding: 14px 70px;
  cursor: pointer;
  border: unset;
  width: 100%;
`;
export interface LoginParams {
  username: string;
  password: string;
  remember?: any;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required(validateLine.required)
    .trim(validateLine.trim)
    .strict(true)
    .max(255, "Tài khoản không được chứa quá 255 ký tự")
    .default(""),
  password: yup
    .string()
    .required(validateLine.required)
    .trim(validateLine.trim)
    .strict(true)
    .min(8, "Mật khẩu không được chứa ít hơn 8 ký tự")
    .max(255, "Mật khẩu không được chứa quá 255 ký tự")
    // .matches(Regexs.password, validateLine.regexPassword)
    .default(""),
  remember: yup.boolean().default(false),
});

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const Route = useRouter();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      Route.push({
        pathname: Route.query?.prePath?.toString() || "/",
      });
    }
  }, [isAuthenticated, Route]);
  const notification = useNotification();
  const { control, handleSubmit } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (values) => {
    if (verifySuccess) {
      setLoading(true);
      setVerifySuccess(true);
      try {
        if (values.remember) {
          LocalStorage.set("rememberMe", "1");
        } else {
          LocalStorage.remove("rememberMe");
        }
        const response: ResponseLoginModel<LoginSuccess> = await login(values);

        if (!response?.responseData?.access_token) {
          notification({
            severity: "error",
            title: `Login Fail`,
            message: `${response?.responseMessage}`,
          });
          setLoading(false);
        } else {
          notification({
            message: "Đăng nhập thành công!",
            severity: "success",
            title: "Đăng Nhập",
          });
          //reset token when submit
          captchaRef.current.reset();
          setLoading(false);
        }
      } catch (error) {
        notification({
          severity: "error",
          title: `Lỗi`,
          message: "Có lỗi xảy ra",
        });
      }
    } else {
      // captchaRef.current.reset();
      setToken(null);
    }
  };

  const handleChangeCapcha = async (token: string | null) => {
    if (!token) return;

    if (!verifySuccess) {
      const verifyResponse = await verifyCapchaToken({
        captchaResponse: token,
      });

      if (verifyResponse.responseData) {
        setVerifySuccess(true);
      }
    }
    setToken(token);
  };

  return (
    <Form>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
          <ControllerTextField
            variant="outlined"
            hiddenLabel
            name="username"
            control={control}
            placeholder="Nhập SĐT / Email của quý khách hàng"
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
        <FormGroup sx={{ mt: 2 }} fullWidth>
          <ControllerCheckbox
            name="remember"
            control={control}
            labelCustom={<SpanRadio>Ghi nhớ đăng nhâp</SpanRadio>}
            label=""
            icon={<CircleOutlined />}
            checkedIcon={<CheckCircleOutline />}
          />
          {/* <ControllerRadio
              name="remember"
              control={control}
			  disabled={loading}
              options={[
                { value: 1, label: "Nhận mã qua email" },
                { value: 2, label: "Nhắn tin tới số ..." },
              ]}
            /> */}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }} fullWidth>
          {/* <CustomButton
            label="Đăng nhập"
            style={{ background: "#D60000" }}
            type="submit"
          /> */}
          <ButtonStyled
            // style={{
            //   // background: "#D60000",
            //   marginTop: 10,
            // }}
            sx={{
              background: "#ea242a",
              "&:hover": {
                background: "#FEC83C !important",
                // box-shadow: 4px 8px 24px #f2f2f5;
                boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                // borderRadius: "60px",
                color: "#ffffff",
              },
              marginTop: "10px",
            }}
            type="submit"
            disabled={token ? false : true}
          >
            {loading === false ? (
              "Đăng nhập"
            ) : (
              <CircularProgress
                style={{ height: 25, width: 25, color: "#ffffff" }}
              />
            )}
          </ButtonStyled>
          {/* check login false 3 lan thi moi dung captcha */}
          <ReCAPTCHA
            style={{ marginTop: "20px" }}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            ref={captchaRef}
            onChange={handleChangeCapcha}
          />
        </FormGroup>

        <FormGroup sx={{ mb: 2 }} fullWidth style={{ alignItems: "center" }}>
          <Link href={"#"} passHref>
            <LinkLabel
              onClick={() =>
                Route.push({
                  pathname: PathRoute.Login,
                  query: {
                    prePath: Route.pathname,
                    tabIndex: "forgetPassword",
                  },
                })
              }
            >
              Quên mật khẩu
            </LinkLabel>
          </Link>
        </FormGroup>
      </form>
    </Form>
  );
};

export default Login;
