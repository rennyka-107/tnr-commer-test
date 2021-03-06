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
  setEmailRegister?:(value: string) => void;
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
      .min(3, "H??? t??n kh??ng ???????c ch???a ??t h??n 3 k?? t???")
      .matches(validateVietnameseName(), "H??? v?? t??n kh??ng ????ng ?????nh d???ng")
      .max(255)
      .default(""),
    password: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .min(8, "M???t kh???u kh??ng ???????c ch???a ??t h??n 8 k?? t???")
      .max(255, "M???t kh???u kh??ng ???????c ch???a qu?? 255 k?? t???")
      .matches(Regexs.password, validateLine.regexPassword)
      // .test('passwords-match', 'M???t kh???u kh??ng kh???p', function (value) {       return this.parent?.rePassword === value     })
      .default(""),
    rePassword: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .oneOf([yup.ref("password"), null], "M???t kh???u kh??ng kh???p")
      .default(""),
    phoneNumber: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "S??? ??i???n tho???i kh??ng ????ng")
      .min(10, "S??? ??i???n tho???i kh??ng ???????c d?????i 10 s???")
      .max(10, "S??? ??i???n tho???i kh??ng ???????c nhi???u h??n 10 s???")
      .required(validateLine.required)
      .default(""),
    accept: yup.boolean().default(false),
    email: yup
      .string()
      .trim(validateLine.trim)
      .required(validateLine.required)
      .strict(true)
      .matches(Regexs.email, "Email kh??ng ????ng")
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
		  props.setEmailRegister(response.responseData?.email);
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
              "????ng k?? t??i kho???n th??nh c??ng. Vui l??ng ch???n ph????ng th???c x??c th???c!",
            severity: "success",
            title: "????ng k?? t??i kho???n",
          });
          setLoading(false);
        } else {
          notification({
            severity: "error",
            title: `????ng k?? th???t b???i`,
            message:
              "Email ho???c s??? ??i???n tho???i ???? ???????c s??? d???ng. Vui l??ng thay ?????i ????? ti???p t???c!",
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
          ????? ???????c h??? tr??? t???t nh???t trong qu?? tr??nh giao d???ch B??S t???i TNR, vui
          l??ng nh???p ?????y ????? v?? ch??nh x??c.
        </SpanHeaderForm>
      </div>
      <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
        <ControllerTextField
          variant="outlined"
          hiddenLabel
          name="fullName"
          control={control}
          placeholder="H??? v?? t??n"
          required
          fullWidth
          label="H??? v?? t??n"
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
          placeholder="S??? ??i???n tho???i"
          fullWidth
          label="S??? ??i???n tho???i"
          labelColor="#666666"
          disabled={loading}
          required
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
          disabled={loading}
        />
      </FormGroup>
      <FormGroup sx={{ mb: 2 }} fullWidth>
        <PasswordTextField
          name="rePassword"
          control={control}
          placeholder="Nh???p l???i m???t kh???u"
          required
          fullWidth
          label="Nh???p l???i m???t kh???u"
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
              T??i ?????ng ?? v???i <LinkLabel>??i???u ki???n v?? ??i???u kho???n</LinkLabel> c???a
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
				color: '#ffffff',
            marginTop: 30,
			height: 50
          }}
          type="submit"
          disabled={!checked || !isEmpty(errors) || !checkField}
        >
          {loading === false ? (
            "Ti???p T???c"
          ) : (
            <CircularProgress
              style={{ height: 25, width: 25, color: "#ffffff" }}
            />
          )}
        </ButtonStyled>
        {/* <CustomButton
          label="Ti???p t???c"
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
