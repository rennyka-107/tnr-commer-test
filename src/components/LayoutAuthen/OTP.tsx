import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import { Text18Styled } from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";
import * as yup from "yup";

const Form = styled.div`
  margin-top: 10px;
`;
const LabelInput = styled.div`
  color: #48576d;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  margin: 30px 0px;
`;
const Content = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #8190a7;
  margin: 30px 0;
`;
const NotiFailed = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #ff3b3b;
  text-align: center;
  margin: 30px 0;
`;
const Send = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

export interface Param {
  username: string;
  password: string;
}
export interface Props {
  username: String;
  next: () => void;
}

const OTP = (props: Props) => {
  const [OTP, setOTP] = useState("");
  const Route = useRouter();

  const [checked, setChecked] = useState(true);
  const [time, setTime] = useState<number>(120);
  const interval = useRef<any>(null);

  useEffect(() => {
    countDown();
  }, []);

  const countDown = () => {
    interval.current = setInterval(() => {
      setTime((time) => {
        if (time <= 1) {
          clearInterval(interval.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  const checkOTP = () => {
    HttpClient.get<any, CommonResponse>(
      `/api/v1/verify/check-otp-valid?username=${props.username}&otp=${OTP}`
    ).then((response) => {
      if (response.responseCode === "00" && response.responseData) {
        props.next();
      } else {
        setChecked(false);
      }
    });
  };

  const reSend = () => {
    HttpClient.post<any, CommonResponse>(
      `/api-account/v1/account/forget-password?username=${props.username}`,
      {},
      {
        withToken: false,
      }
    ).then((response) => {
      if (response.responseCode === "00") {
        setTime(120);
        countDown()
      }
    });
  };

  return (
    <Form>
      <LabelInput>Nhập mã xác thực</LabelInput>
      <OtpInput
        value={OTP}
        onChange={(otp) => setOTP(otp)}
        numInputs={6}
        containerStyle={{ justifyContent: "space-between" }}
        inputStyle={{
          width: 48,
          height: 48,
          border: "1px solid #C7C9D9",
          borderRadius: 8,
        }}
      />
      {checked ? (
        <Content>
          {`Bạn chưa nhận được mã?${
            time ? ` Vui lòng nhấn nhận mã xác thực sau ${time}s` : ""
          }`}
          <br />
          {time ? (
            ""
          ) : (
            <Send onClick={reSend}>
              <a>Gửi lại mã xác thực</a>
            </Send>
          )}
        </Content>
      ) : (
        <NotiFailed>Mã xác thực không chính xác</NotiFailed>
      )}
      <FormGroup sx={{ mb: 2 }} fullWidth>
        <CustomButton
          label="Tiếp tục"
          // disabled={OTP.length !== 6}
          // disabled={true}
          style={{ background: "#D60000" }}
          type="button"
          onClick={checkOTP}
        />
      </FormGroup>
    </Form>
  );
};
export default OTP;
