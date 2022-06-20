import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import * as yup from "yup";

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

export interface Params {
  username: string;
  password: string;
}
export interface Props {
  setUsername?: (value: String) => void;
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

  const { control, handleSubmit } = useForm<Params>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = (values) => {
    props.setUsername(values.username);
    props.next();
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
    </Form>
  );
};
export default ForgetPassword;