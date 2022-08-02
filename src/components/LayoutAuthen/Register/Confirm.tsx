import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerRadio from "@components/Form/ControllerRadio";
import FormGroup from "@components/Form/FormGroup";
import IconArrowLeft from "@components/Icons/IconArrowLeft";
import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Grid, RadioGroup } from "@mui/material";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CommonResponse } from "type/common";
import { validateLine } from "utils/constants";
import HttpClient from "utils/HttpClient";
import * as yup from "yup";
import { getOTP } from "../../../../pages/api/registerApi";

const Form = styled.div`
  margin-top: 10px;
`;

const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  display: flex;
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
  userId?: String;
  transKey?: String;
  numberPhone?: string;
  emailRegister?: string;
  back: () => void;
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
  const { control, handleSubmit} = useForm<Param>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (values: any) => {
	setLoading(true);

    getOTP(props.transKey,0).then((response) => {
      if (response.responseCode === "00") {
        props.next();
		setLoading(false);
      }else {
		setLoading(false)
	  }
	  
    });
  };

  return (
    <Form>
      <LinkLabel onClick={() => props.back()}>
        <IconArrowLeftBlue />
        &nbsp; Trở lại
      </LinkLabel>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <ConFirm>Xác thực</ConFirm>
        <TypeConFirm>Gửi mã xác thực qua email {props.emailRegister}</TypeConFirm>
        {/* <RadioGroup>
          <Grid container>
            <ControllerRadio
              name="confirm"
              control={control}
			  disabled={loading}
              options={[
                { value: 0, label: "Nhận mã qua email" },
                { value: 1, label: `Nhắn tin tới số ${props.numberPhone}` },
              ]}
            />
          </Grid>
        </RadioGroup> */}

        <FormGroup sx={{ mb: 2 }} fullWidth>
          {/* <CustomButton
            label="Tiếp tục"
            style={{ background: "#D60000", marginTop: 30 }}
            type="submit"
          /> */}
		    <ButtonStyled
            style={{ background: "#D60000", marginTop: 30 ,height: 50}}
            type="submit"
          >
           {loading === false ? 'Gửi mã' : <CircularProgress style={{height: 25, width: 25, color: '#ffffff'}}/>}
          </ButtonStyled>
        </FormGroup>
      </form>
    </Form>
  );
};
export default Confirm;
