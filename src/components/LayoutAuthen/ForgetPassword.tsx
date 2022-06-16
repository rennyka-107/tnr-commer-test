import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import PathRoute from "utils/PathRoute";
import * as yup from "yup";
import ChangeNewPass from "./ChangeNewPass";
import ConfirmOTP from "./ConfirmOTP";
import OTP from "./OTP";

const Form = styled.div`
  margin-top: 10px;
`;

const Label = styled.div`
  color: #48576d;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  margin: 30px 0px;
`;
const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  display: flex;
`;

export interface Props {
  username: string;
  password: string;
}

const ForgetPassword = () => {
  const { login, isAuthenticated } = useAuth();
  const Route = useRouter();
  const [type, setType] = useState("forgetPassword");
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .max(255)
      .required(validateLine.required)
      .default(""),
  });

  useEffect(() => {
    if (isAuthenticated) {
      Route.push({
        pathname: Route.query?.prePath?.toString() || "/",
      });
    }
  }, [isAuthenticated, Route]);

  const { control, handleSubmit, setValue, getValues } = useForm<Props>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = (values) => {
    setType("Xác thực");
  };

  const render = useMemo(() => {
    switch (type) {
      case "forgetPassword":
        return (
          <form onSubmit={handleSubmit((values) => onSubmit(values))}>
            <Label>Quên mật khẩu</Label>
            <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="username"
                control={control}
                placeholder="Số điện thoại hoặc tên đăng nhập"
                required
                fullWidth
                label="Nhập số điện thoại hoặc tên đăng nhập"
                labelColor="#666666"
              />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <CustomButton
                label="Tiếp tục"
                style={{ background: "#D60000" }}
                type="submit"
              />
            </FormGroup>
          </form>
        );
      case "Xác thực":
        return (
          <ConfirmOTP
            username={getValues("username")}
            next={() => setType("OTP")}
          />
        );
      case "OTP":
        return (
          <OTP
            username={getValues("username")}
            next={() => setType("ChangeNewPass")}
          />
        );
      case "ChangeNewPass":
        return (
          <ChangeNewPass
            username={getValues("username")}
            next={() => setType("ChangeNewPass")}
          />
        );
      default:
        return null;
    }
  }, [type]);

  return (
    <Form>
      {type !== "ChangeNewPass" ? (
        <LinkLabel
          onClick={() => {
            if (type === "forgetPassword") {
              Route.push({
                pathname: PathRoute.Login,
                query: {
                  prePath: Route.pathname,
                  tabIndex: "login",
                },
              });
            } else if (type === "Xác thực") {
              setType("forgetPassword");
            } else if (type === "OTP") {
              setType("Xác thực");
            } else if (type === "ChangeNewPass") {
              setType("OTP");
            }
          }}
        >
          <IconArrowLeftBlue />
          &nbsp; Trở lại
        </LinkLabel>
      ) : null}
      {render}
    </Form>
  );
};
export default ForgetPassword;
