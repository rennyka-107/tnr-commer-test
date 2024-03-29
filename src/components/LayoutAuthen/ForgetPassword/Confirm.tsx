import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerRadio from "@components/Form/ControllerRadio";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CommonResponse } from "type/common";
import { validateLine } from "utils/constants";
import HttpClient from "utils/HttpClient";
import * as yup from "yup";

const Form = styled.div`
  margin-top: 10px;
`;
const ConFirm = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  color: #48576d;
  margin: 30px 0px 10px 0px;
`;
const TypeConFirm = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #48576d;
  margin-bottom: 30px;
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
  confirm: string;
}
export interface Props {
  username?: String;
  setKeyForgot?: (value: string) => void;
  setKeyTrans?:(value:string) => void;
  emailUser?: string;
  next?: () => void;
}

const Confirm = (props: Props) => {
	const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    // confirm: yup
    //   .string()
    //   .strict(true)
    //   .required(validateLine.required)
    //   .default(""),
  });
  const { control, handleSubmit, setValue, getValues } = useForm<Param>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async () => {
	setLoading(true);
    HttpClient.post<any, CommonResponse>(
      `/api-account/v1/account/forget-password?username=${props.username}`,
      {},
      {
        withToken: false,
      }
    ).then((response) => {
      if (response.responseCode === "00") {
		props.setKeyTrans(response.responseData)
		props.setKeyForgot(response.responseData)
        props.next();
		setLoading(false)
      }
    });
  };


  return (
    <Form>
      <form onSubmit={handleSubmit((values) => onSubmit())}>
        <ConFirm>Xác thực</ConFirm>
		<TypeConFirm>Gửi mã xác thực qua email {props.emailUser}</TypeConFirm>
        {/* <RadioGroup>
          <Grid container>
            <ControllerRadio
              name="confirm"
              control={control}
			  disabled={loading}
              options={[
                { value: 1, label: "Nhận mã qua email" },
                { value: 2, label: "Nhắn tin tới số ..." },
              ]}
            />
          </Grid>
        </RadioGroup> */}
        <FormGroup sx={{ mb: 2 }} fullWidth>
          <ButtonStyled
            style={{ background: "#D60000", marginTop: 30 ,}}
            type="submit"
          >
           {loading === false ? 'Gửi mã' : <CircularProgress style={{height: 25, width: 25, color: '#ffffff'}}/>}
          </ButtonStyled>
          {/* <CustomButton
            label="Tiếp tục"
        
            type="submit"
			
          /> */}
        </FormGroup>
      </form>
    </Form>
  );
};
export default Confirm;
