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
import useNotification from "hooks/useNotification";
import { Button, CircularProgress } from "@mui/material";

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
width:100%;
`
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
  const [loading, setLoading] = useState(false);
  const Route = useRouter();
  const {userName} = Route.query;
  const notification = useNotification();
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .min(8, "M???t kh???u kh??ng ???????c ch???a ??t h??n 8 k?? t???")
      .max(255, "M???t kh???u kh??ng ???????c ch???a qu?? 255 k?? t???")
      .matches(Regexs.password, validateLine.regexPassword)
      .required(validateLine.required)
      .default(""),
    rePassword: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .oneOf([yup.ref("password"), null], "M???t kh???u kh??ng kh???p")
      .default(""),
  });
  const { control, handleSubmit, getValues } = useForm<Param>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (values) => {
	setLoading(true);
	if(userName){
		forgetPassword(userName, getValues("password")).then(
			(response: any) => {
			  if (
				response.responseCode === "00" &&
				response.responseData === "Success!"
			  ) {
				  notification({
					  severity: "success",
					  title: "?????i m???t kh???u",
					  message: "?????i m???t kh???u th??nh c??ng"
				  })
				  setLoading(false);
				setSuccess(true);
			  } else {
				notification({
				  severity: "error",
				  title: "?????i m???t kh???u",
				  message: "?????i m???t kh???u th???t b???i!"
				})
			  }
			}
		  );
	}else {
		forgetPassword(props.username, getValues("password")).then(
			(response: any) => {
			  if (
				response.responseCode === "00" &&
				response.responseData === "Success!"
			  ) {
				  notification({
					  severity: "success",
					  title: "?????i m???t kh???u",
					  message: "?????i m???t kh???u th??nh c??ng"
				  })
				  setLoading(false);
				setSuccess(true);
			  } else {
				notification({
				  severity: "error",
				  title: "?????i m???t kh???u",
				  message: "?????i m???t kh???u th???t b???i!"
				})
			  }
			}
		  );
	}

  };

  return (
    <Form>
      {!success ? (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <NewPassword>M???t kh???u m???i</NewPassword>
          <TypeConFirm>M???i b???n nh???p m???t kh???u m???i</TypeConFirm>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <PasswordTextField
              name="password"
              control={control}
              placeholder="M???t kh???u m???i"
              required
              fullWidth
              label="M???t kh???u m???i"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <PasswordTextField
              name="rePassword"
              control={control}
              placeholder="M???t kh???u m???i"
              required
              fullWidth
              label="Nh???p l???i m???t kh???u m???i"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            {/* <CustomButton
              label="Ti???p t???c"
              style={{ background: "#D60000" }}
              type="submit"
            /> */}
			 <ButtonStyled
            style={{ background: "#D60000", marginTop: 30 ,}}
            type="submit"
          >
           {loading === false ? 'Ho??n t???t' : <CircularProgress style={{height: 25, width: 25, color: '#ffffff'}}/>}
          </ButtonStyled>
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
            B???n ???? thay ?????i m???t kh???u th??nh c??ng.
            <br /> ????ng nh???p ngay
          </TextNotice>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            <CustomButton
              label="????ng nh???p"
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
