import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerRadio from "@components/Form/ControllerRadio";
import FormGroup from "@components/Form/FormGroup";
import IconArrowLeft from "@components/Icons/IconArrowLeft";
import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, RadioGroup } from "@mui/material";
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

export interface Param {
  confirm: string;
}
export interface Props {
  userId?: String;
  back: () => void;
  next?: () => void;
}

const Confirm = (props: Props) => {
  
  const validationSchema = yup.object().shape({
    confirm: yup
      .string()
      .strict(true)
      .required(validateLine.required)
      .default(""),
  });
  const { control, handleSubmit} = useForm<Param>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async () => {
    getOTP(props.userId).then((response) => {
      if (response.responseCode === "00") {
        props.next();
      }
    });
  };

  return (
    <Form>
      <LinkLabel onClick={() => props.back()}>
        <IconArrowLeftBlue />
        &nbsp; Quay lại
      </LinkLabel>
      <form onSubmit={handleSubmit((values) => onSubmit())}>
        <ConFirm>Xác thực</ConFirm>
        <TypeConFirm>Mời bạn chọn phương thức xác thực</TypeConFirm>
        <RadioGroup>
          <Grid container>
            <ControllerRadio
              name="confirm"
              control={control}
              options={[
                { value: 1, label: "Nhận mã qua email" },
                { value: 2, label: "Nhắn tin tới số ..." },
              ]}
            />
          </Grid>
        </RadioGroup>

        <FormGroup sx={{ mb: 2 }} fullWidth>
          <CustomButton
            label="Tiếp tục"
            style={{ background: "#D60000", marginTop: 30 }}
            type="submit"
          />
        </FormGroup>
      </form>
    </Form>
  );
};
export default Confirm;
