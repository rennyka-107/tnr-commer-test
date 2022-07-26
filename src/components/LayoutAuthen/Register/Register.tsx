import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import PasswordTextField from "@components/Form/PasswordTextField";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircleOutline, CircleOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import useNotification from "hooks/useNotification";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validateLine } from "utils/constants";
import { validateVietnameseName } from "utils/helper";
import PathRoute from "utils/PathRoute";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import { registerApi } from "../../../../pages/api/registerApi";
import { registerAcc } from "../../../../store/registerSlice";

const Form = styled.div`
  margin-top: 10px;
`;
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
export interface RegisterParam {
  fullName: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
  accept: boolean;
  email: string;
}
export interface Props {
  setUserId?: (value: string) => void;
  setTransKey?: (value: string) => void;
  setNumberPhone?: (value: string) => void;
  setKey?: (value: string) => void;
  next?: () => void;
}

const Index = (props: Props) => {
  const Route = useRouter();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .min(3, "Họ tên không được chứa ít hơn 3 ký tự")
      .matches(validateVietnameseName(), "Họ và tên không đúng định dạng")
      .max(255)
      .default(""),
    password: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .min(8, "Mật khẩu không được chứa ít hơn 8 ký tự")
      .max(255, "Mật khẩu không được chứa quá 255 ký tự")
      .matches(Regexs.password, validateLine.regexPassword)
      // .test('passwords-match', 'Mật khẩu không khớp', function (value) {       return this.parent?.rePassword === value     })
      .default(""),
    rePassword: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
      .default(""),
    phoneNumber: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "Số điện thoại không đúng")
      .min(10, "Số điện thoại không được dưới 10 số")
      .max(10, "Số điện thoại không được nhiều hơn 10 số")
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
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const notification = useNotification();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const checkField = useMemo(() => {
    return (
      !!getValues("fullName") &&
      !!getValues("phoneNumber") &&
      !!getValues("email") &&
      !!getValues("password") &&
      !!getValues("rePassword")
    );
  }, [
    watch("email"),
    watch("fullName"),
    watch("phoneNumber"),
    watch("password"),
    watch("rePassword"),
  ]);

  const onSubmit = async (data: any) => {
    const body = {
      id: null,
      fullName: data.fullName,
      password: data.password,
      email: data.email,
      phone: data.phoneNumber,
    };
    (async () => {
      try {
        setLoading(true);
        const response = await registerApi(body);

        dispatch(registerAcc(response.responseData));
        if (response.responseCode === "00") {
          reset();
          props.setUserId(response.responseData?.id);
		  props.setTransKey(response.responseData?.transKey);
		  props.setNumberPhone(response.responseData?.phone);
          props.setKey(response.responseData?.keycloakId);
          props.next();
          Route.push({
            pathname: PathRoute.Login,
            query: {
              prePath: Route.pathname,
              tabIndex: "confirm",
            },
          });
          notification({
            message:
              "Đăng ký tài khoản thành công. Vui lòng chọn phương thức xác thực!",
            severity: "success",
            title: "Đăng ký tài khoản",
          });
          setLoading(false);
        } else {
          notification({
            severity: "error",
            title: `Đăng ký thất bại`,
            message:
              "Email hoặc số điện thoại đã được sử dụng. Vui lòng thay đổi để tiếp tục!",
          });
		  setLoading(false);
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
          name="fullName"
          control={control}
          placeholder="Họ và tên"
          required
          fullWidth
          label="Họ và tên"
		  disabled={loading}
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
		  disabled={loading}
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
		  disabled={loading}
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
		  disabled={loading}
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
		  disabled={loading}
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
        <ButtonStyled
          style={{
            background:
              !checked || !isEmpty(errors) || !checkField
                ? "#D6000080"
                : "#D60000",
            marginTop: 30,
          }}
          type="submit"
          disabled={!checked || !isEmpty(errors) || !checkField}
        >
          {loading === false ? (
            "Tiếp Tục"
          ) : (
            <CircularProgress
              style={{ height: 25, width: 25, color: "#ffffff" }}
            />
          )}
        </ButtonStyled>
        {/* <CustomButton
          label="Tiếp tục"
          style={{
            background:
              !checked || !isEmpty(errors) || !checkField
                ? "#D6000080"
                : "#D60000",
          }}
          type="submit"
          disabled={!checked || !isEmpty(errors)|| !checkField}
        /> */}
      </div>
    </form>
  );
};

export default Index;
