import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutline, CircleOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import { registerApi } from "../../../pages/api/registerApi";
import { registerAcc } from "../../../store/registerSlice";

const SpanHeaderForm = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #666666;
  padding-top: 40px;
`;

const SpanRadio = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration: underline;
`;

export interface RegisterParam {
  username: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
  accept: boolean;
  email: string;
}

const Register = () => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .max(255)
      .required(validateLine.required)
      .default(""),
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
    phoneNumber: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "Số điện thoại không đúng")
      .required(validateLine.required)
      .default(""),
    accept: yup.boolean().default(false),
    email: yup
      .string()
      .trim(validateLine.trim)
      .required(validateLine.required)
      .strict(true)
      .matches(Regexs.email, "Email không đúng")
      .default(""),
  });
  const Router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { control, handleSubmit, reset } = useForm<RegisterParam>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: any) => {
    const body = {
      id: null,
      username: data.username,
      password: data.password,
      email: data.email,
      phone: data.phoneNumber,
      firstName: "",
      lastName: "",
    };
    (async () => {
      try {
        const response = await registerApi(body);

        dispatch(registerAcc(response.responseData));
        if (response.responseCode === "00") {
          reset();
          alert(
            "Đăng ký tài khoản thành công. Vui lòng truy cập vào Gmail để kích hoạt tài khoản!"
          );
        } else {
          alert(
            "Tên đăng nhập hoặc Email đã được sử dụng. Vui lòng thay đổi để tiếp tục!"
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => onSubmit(data))}
      autoComplete="off"
    >
      <div style={{ marginTop: 20 }}>
        <SpanHeaderForm>
          Để được hỗ trợ tốt nhất trong quá trình giao dịch BĐS tại TNR, vui
          lòng nhập đầy đủ và chính xác.
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
          name="email"
          control={control}
          placeholder="Email"
          required
          fullWidth
          label="Email"
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
          fullWidth
          label="Số điện thoại"
          labelColor="#666666"
          required
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
          labelCustom={
            <SpanRadio>
              Tôi đồng ý với <LinkLabel>Điều khoản và điều kiện</LinkLabel> của
              TNR
            </SpanRadio>
          }
          label=""
          icon={<CircleOutlined />}
          checkedIcon={<CheckCircleOutline />}
          onChange={() => setChecked(!checked)}
        />
      </FormGroup>
      <div style={{ width: "100%" }}>
        <CustomButton
          label="Đăng ký"
          style={{ background: !checked ? "#D6000080" : "#D60000" }}
          type="submit"
          disabled={!checked}
        />
      </div>
    </form>
  );
};

export default Register;
