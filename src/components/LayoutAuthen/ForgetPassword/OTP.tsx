import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";
import { checkValidOTP } from "../../../../pages/api/changePassword";

const Form = styled.div`
  margin-top: 10px;
`;
const Label = styled.div`
  color: #48576d;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  margin-bottom: 30px;
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
  username: string;
  password: string;
}
export interface Props {
  username: String;
  paramsEndcode?: string;
  keyForgot?: string;
  keyWidthOTPParams?: string;
  keyTrans?: String;
  next: () => void;
}

const OTP = (props: Props) => {
  const [OTP, setOTP] = useState("");
  const Router = useRouter();
  const {link,key} = Router.query;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [time, setTime] = useState<number>(120);
  const paramsOTP = props.paramsEndcode;
  const keyWidthOTP = props.keyWidthOTPParams;
  const interval = useRef<any>(null);

  useEffect(() => {
    countDown();
  }, []);
  useEffect(() => {
    if (paramsOTP !== "") {
      setOTP(paramsOTP);
    }
  }, [paramsOTP]);

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
	setLoading(true)
	if(link === '1'){
		checkValidOTP(key, OTP).then((response) => {
			if (response.responseCode === "00") {
				setLoading(false)
				props.next();
			} else {
			  setChecked(false);
			  setLoading(false)
			}
		  });
	}else {
		checkValidOTP(props.keyForgot, OTP).then((response) => {
			if (response.responseCode === "00") {
				setLoading(false)
				props.next();
			} else {
			  setChecked(false);
			  setLoading(false)
			}
		  });
	}
    
  };

  const reSend = () => {
    checkValidOTP(props.username, OTP).then((response) => {
      if (response.responseCode === "00") {
        setTime(120);
        countDown();
      }
    });
  };

  return (
    <Form>
      <Label>Nhập mã xác thực</Label>
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
		isDisabled={loading}
      />
      {checked ? (
        <Content>
          {`Bạn chưa nhận được mã?${
            time ? ` Vui lòng nhấn nhận mã xác thực sau ${time}s` : ""
          }`}
          <br />
          {time ? "" : <Send onClick={reSend}>Gửi lại mã xác thực</Send>}
        </Content>
      ) : (
        <NotiFailed>Mã xác thực không chính xác</NotiFailed>
      )}
      <FormGroup sx={{ mb: 2 }} fullWidth>
        {/* <CustomButton
          label="Tiếp tục"
          style={{ background: "#D60000" }}
          type="button"
          onClick={checkOTP}
        /> */}
		 <ButtonStyled
            style={{ background: "#D60000", marginTop: 30 ,}}
            type="button" onClick={checkOTP}
          >
           {loading === false ? 'Tiếp Tục' : <CircularProgress style={{height: 25, width: 25, color: '#ffffff'}}/>}
          </ButtonStyled>
      </FormGroup>
    </Form>
  );
};
export default OTP;
