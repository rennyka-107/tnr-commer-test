import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerRadio from "@components/Form/ControllerRadio";
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
import axios from "axios";
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

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const Route = useRouter();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState<string | null>("de tam"); //bat capcha thi set token = null
  const [verifySuccess, setVerifySuccess] = useState<boolean>(true); //bat capcha thi setVerifySuccess = false

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .max(255, "T??i kho???n kh??ng ???????c ch???a qu?? 255 k?? t???")
      .required(validateLine.required)
      .default(""),
    password: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .min(8, "M???t kh???u kh??ng ???????c ch???a ??t h??n 8 k?? t???")
      .max(255, "M???t kh???u kh??ng ???????c ch???a qu?? 255 k?? t???")
      // .matches(Regexs.password, validateLine.regexPassword)
      .required(validateLine.required)
      .default(""),
    remember: yup.boolean().default(false),
  });

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
    if (!token) return;

    if (!verifySuccess) {
      const verifyResponse = await verifyCapchaToken({
        captchaResponse: token,
      });

      if(verifyResponse.responseData) {
        setVerifySuccess(true)
      }
    }

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
            message: "????ng nh???p th??nh c??ng!",
            severity: "success",
            title: "????ng Nh???p",
          });
          //reset token when submit
          captchaRef.current.reset();
          setLoading(false);
        }
      } catch (error) {
        const AxiosError: { message: string } = error;
        notification({
          severity: "error",
          title: `Login Fail`,
          message: "C?? l???i x???y ra",
        });
      }
    } else {
      captchaRef.current.reset();
      setToken(null);
    }
  };

  const handleChangeCapcha = (token: string | null) => {
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
            placeholder="T??n ????ng nh???p"
            required
            fullWidth
            label="T??n ????ng nh???p"
            labelColor="#666666"
          />
        </FormGroup>
        <FormGroup sx={{ mb: 2 }} fullWidth>
          <PasswordTextField
            name="password"
            control={control}
            placeholder="Nh???p m???t kh???u"
            required
            fullWidth
            label="M???t kh???u"
            labelColor="#666666"
          />
        </FormGroup>
        <FormGroup sx={{ mt: 2 }} fullWidth>
          <ControllerCheckbox
            name="remember"
            control={control}
            labelCustom={<SpanRadio>Ghi nh??? ????ng nh??p</SpanRadio>}
            label=""
            icon={<CircleOutlined />}
            checkedIcon={<CheckCircleOutline />}
          />
          {/* <ControllerRadio
              name="remember"
              control={control}
			  disabled={loading}
              options={[
                { value: 1, label: "Nh???n m?? qua email" },
                { value: 2, label: "Nh???n tin t???i s??? ..." },
              ]}
            /> */}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }} fullWidth>
          {/* <CustomButton
            label="????ng nh???p"
            style={{ background: "#D60000" }}
            type="submit"
          /> */}
          <ButtonStyled
            style={{ background: "#D60000", marginTop: 10 }}
            type="submit"
            disabled={token ? false : true}
          >
            {loading === false ? (
              "????ng nh???p"
            ) : (
              <CircularProgress
                style={{ height: 25, width: 25, color: "#ffffff" }}
              />
            )}
          </ButtonStyled>
          {/* capcha - khong xoa doan comment nay */}
          {/* <ReCAPTCHA
            style={{ marginTop: "20px" }}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            ref={captchaRef}
            onChange={handleChangeCapcha}
          /> */}
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
              Qu??n m???t kh???u
            </LinkLabel>
          </Link>
        </FormGroup>
      </form>
    </Form>
  );
};

export default Login;
