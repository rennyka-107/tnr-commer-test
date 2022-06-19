import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import PathRoute from "utils/PathRoute";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import Image from "next/image";
import { forgetPassword } from "../../../../pages/api/changePassword";

const Form = styled.div`
  margin-top: 10px;
  border-radius: 10px;
`;

const NewPassword = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  color: #48576d;
`;
const TypeConFirm = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #48576d;
  margin: 10px 0px;
`;

const NoticeContainer = styled.div`
  text-align: center;
`;

const TextNotice = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 170%;
  text-align: center;
  margin: 25px 0;
`;

export interface Param {
  password: string;
  rePassword: string;
}

export interface Props {
  username: String;
  next: () => void;
}

const ChangeNewPass = (props: Props) => {
  const [success, setSuccess] = useState(false);
  const Route = useRouter();

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .min(8, "Mật khẩu không được chứa ít hơn 8 ký tự")
      .max(255, "Mật khẩu không được chứa quá 255 ký tự")
      .matches(Regexs.password, validateLine.regexPassword)
      .required(validateLine.required)
      .default(""),
    rePassword: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
      .default(""),
  });
  const { control, handleSubmit, getValues } = useForm<Param>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (values) => {
    forgetPassword(props.username, getValues("password")).then(
      (response: any) => {
        if (
          response.responseCode === "00" &&
          response.responseData === "Success!"
        ) {
          setSuccess(true);
        } else {
          alert("Đổi mật khẩu thất bại");
        }
      }
    );
  };

  return (
    <Form>
      {!success ? (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <NewPassword>Mật khẩu mới</NewPassword>
          <TypeConFirm>Mời bạn nhập mật khẩu mới</TypeConFirm>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <PasswordTextField
              name="password"
              control={control}
              placeholder="Mật khẩu mới"
              required
              fullWidth
              label="Mật khẩu mới"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <PasswordTextField
              name="rePassword"
              control={control}
              placeholder="Mật khẩu mới"
              required
              fullWidth
              label="Nhập lại mật khẩu mới"
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
      ) : (
        <NoticeContainer>
          <Image
            src={"/images/confirm.png"}
            alt=""
            width={125}
            height={125}
            style={{ borderRadius: 20 }}
          />
          <TextNotice>
            Bạn đã thay đổi mật khẩu thành công.
            <br /> Đăng nhập ngay
          </TextNotice>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            <CustomButton
              label="Đăng nhập"
              style={{ background: "#D60000" }}
              type="button"
              onClick={() =>
                Route.push({
                  pathname: PathRoute.Login,
                  query: {
                    prePath: Route.pathname,
                    tabIndex: "login",
                  },
                })
              }
            />
          </FormGroup>
        </NoticeContainer>
      )}
    </Form>
  );
};
export default ChangeNewPass;
