import CustomButton from "@components/CustomComponent/CustomButton";
import FormGroup from "@components/Form/FormGroup";
import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import IconCodeFail from "@components/Icons/IconCodeFail";
import styled from "@emotion/styled";
import { Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";
import PathRoute from "utils/PathRoute";
import { activeAccount, getOTP } from "../../../../pages/api/registerApi";

const Form = styled.div`
  margin-top: 10px;
`;
const ConFirm = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  color: #48576d;
  margin: 30px 0px 30px 0px;
`;
const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  display: flex;
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
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
`;
const Send = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
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
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  padding: 14px 70px;
  cursor: pointer;
  border: unset;
  width: 100%;
`;
const TypeConFirm = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #48576d;
  margin-bottom: 30px;
`;
export interface Param {
  username: string;
  password: string;
}
export interface Props {
  keycloakId?: String;
  userId?: String;
  paramsEndcode?: string;
  transKey?: String;
  emailRegister?: string;
  keyWidthOTPParams?: string;
  back?: () => void;
  next?: () => void;
}

const OTP = (props: Props) => {
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const Route = useRouter();
  const paramsOTP = props.paramsEndcode;
  const keyWidthOTP = props.keyWidthOTPParams;

  const [checked, setChecked] = useState(true);
  const [time, setTime] = useState<number>(120);
  const interval = useRef<any>(null);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    if (keyWidthOTP !== "") {
      activeAccount(keyWidthOTP, OTP).then((response) => {
        if (response.responseCode === "00" && response.responseData) {
          setSuccess(true);
          setLoading(false);
        } else {
          setChecked(false);
          setLoading(false);
        }
      });
    } else {
      activeAccount(props.keycloakId, OTP).then((response) => {
        if (response.responseCode === "00" && response.responseData) {
          setSuccess(true);
        } else {
          setChecked(false);
          setLoading(false);
        }
      });
    }
  };

  const reSend = () => {
	getOTP(props.transKey,0).then((response) => {
		if (response.responseCode === "00") {
			setTime(120);
			countDown();
		}
		
	  });
    // getOTP(props.userId).then((response) => {
    //   if (response.responseCode === "00") {
    //     setTime(120);
    //     countDown();
    //   }
    // });
	
  };

  return (
    <Form>
      {!success ? (
        <>
          <LinkLabel onClick={() => props.back()}>
            <IconArrowLeftBlue />
            &nbsp; Trở lại
          </LinkLabel>
          <ConFirm>Nhập mã xác thực</ConFirm>
          {checked ? (
            <>
              {" "}
              <TypeConFirm>
                Mã xác nhận đã được gửi tới email {props.emailRegister} của quý
                khách hàng. Nhập mã xác thực quý khách hàng nhận được dưới đây{" "}
              </TypeConFirm>
            </>
          ) : (
            <></>
          )}

          <OtpInput
            value={OTP}
            onChange={(otp) => setOTP(otp)}
            numInputs={6}
            focusStyle={{
              outline: "none",
              border: "2px solid #FEC83C",
              borderRadius: "8px",
            }}
            containerStyle={{ justifyContent: "center", gap: 18 }}
            inputStyle={{
              width: 48,
              height: 48,
              border: checked ? "1.5px solid #C7C9D9" : "1.5px solid #FF3B3B",
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 600,
            }}
          />
          {checked ? (
            <Content>
              {`Bạn chưa nhận được mã?${
                time ? ` Vui lòng nhấn nhận mã xác thực sau ${time}s` : ""
              }`}
              <br />
              {time ? "" : <Send style={{cursor: 'pointer'}} onClick={reSend}>Gửi lại mã xác thực</Send>}
            </Content>
          ) : (
            <NotiFailed>
              {" "}
              <IconCodeFail />
              Mã xác thực không chính xác
            </NotiFailed>
          )}
          <FormGroup sx={{ mb: 2 }} fullWidth>
            {/* <CustomButton
              label="Hoàn tất đăng ký"
              style={{ background: "#D60000" }}
              type="button"
              onClick={checkOTP}
            /> */}
            <ButtonStyled
              style={{
                background: OTP.length < 6 ? "#DBDEE3" : "#D60000",
                marginTop: 30,
                color: OTP.length < 6 ? "#8190A7" : "#ffffff",
              }}
              type="button"
              onClick={checkOTP}
              disabled={OTP.length < 6 ? true : false}
            >
              {loading === false ? (
                "Hoàn Tất đăng ký"
              ) : (
                <CircularProgress
                  style={{ height: 25, width: 25, color: "#ffffff" }}
                />
              )}
            </ButtonStyled>
          </FormGroup>
        </>
      ) : (
        <NoticeContainer>
          <Image
            src={"/images/success.png"}
            alt=""
            width={125}
            height={125}
            style={{ borderRadius: 20 }}
          />
          <TextNotice style={{ display: "flex", justifyContent: "center" }}>
            <Typography style={{ maxWidth: 350 }}>
              {" "}
              Chào mừng bạn đến với nền tảng mua BĐS hàng đầu của TNR Holdings
            </Typography>
          </TextNotice>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            <CustomButton
              label="Bắt đầu trải nghiệm"
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
export default OTP;
