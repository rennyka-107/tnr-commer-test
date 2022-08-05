import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import useNotification from "hooks/useNotification";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import * as yup from "yup";
import { getEmailRegister } from "../../../../pages/api/changePassword";

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
export interface Params {
  username: string;
  password: string;
}
export interface Props {
  setUsername?: (value: String) => void;
  setEmailUser?: (value: string) => void;
  next?: () => void;
}
const ForgetPassword = (props: Props) => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .max(255)
      .required(validateLine.required)
      .default(""),
  });
  const [loading, setLoading] = useState(false);
  const notification = useNotification();
  const { control, handleSubmit } = useForm<Params>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = (values) => {
    setLoading(true);
    getEmailRegister(values.username).then((response) => {
      if (response.responseCode === "00") {
        props.setEmailUser(response.responseData);
        props.setUsername(values.username);
        setLoading(false);
        props.next();
      } else {
        notification({
          severity: "error",
          title: `Email hoặc số điện thoại không đúng`,
          message:
            "Email hoặc số điện thoại không được sử dụng để đăng ký. Vui lòng thay đổi để tiếp tục!",
        });
        setLoading(false);
      }
    });
  };

  return (
    <Form>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <Label>Quên mật khẩu</Label>
        <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
          <ControllerTextField
            variant="outlined"
            hiddenLabel
            name="username"
            control={control}
            placeholder="Số điện thoại hoặc Email đã đăng ký"
            required
            fullWidth
            label="Nhập Số điện thoại hoặc Email đã đăng ký"
            labelColor="#666666"
          />
        </FormGroup>
        <FormGroup sx={{ mb: 2 }} fullWidth>
          <ButtonStyled
            style={{ background: "#D60000", marginTop: 30, height: 50 }}
            type="submit"
          >
            {loading === false ? (
              "Tiếp Tục"
            ) : (
              <CircularProgress
                style={{ height: 25, width: 25, color: "#ffffff" }}
              />
            )}
          </ButtonStyled>
        </FormGroup>
      </form>
    </Form>
  );
};
export default ForgetPassword;
  