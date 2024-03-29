import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import PathRoute from "utils/PathRoute";
import ChangeNewPass from "./ChangeNewPass";
import Confirm from "./Confirm";
import ForgetPassword from "./ForgetPassword";
import OTP from "./OTP";

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

export interface Props {
  username: string;
  password: string;
}

const Index = () => {
  const Route = useRouter();
  const [type, setType] = useState("forgetPassword");
  const { key, otp } = Route.query;
  const [username, setUsername] = useState("");
  const [keyTrans, setKeyTrans] = useState("");
  const [keyForgot, setKeyForgot] = useState("");
  const [emailUser, setEmailUser] = useState("");

  const [paramsEndcode, setParamsEndcode] = useState({
    key: "",
    OTP: "",
  });

  useEffect(() => {
    if (key || otp) {
      setType("OTP");
    }
    if (Route.query.key !== undefined && Route.query.otp !== undefined) {
      const key = Route.query.key as string;
      const otp = Route.query.otp as string;
      setParamsEndcode({
        key: key,
        OTP: otp,
      });
    }
  }, [Route]);

  const render = useMemo(() => {
    switch (type) {
      case "forgetPassword":
        return (
          <ForgetPassword
            setUsername={(value: string) => setUsername(value)}
            setEmailUser={setEmailUser}
            next={() => setType("confirm")}
          />
        );
      case "confirm":
        return (
          <Confirm
            username={username}
            emailUser={emailUser}
            setKeyForgot={setKeyForgot}
            next={() => setType("OTP")}
            setKeyTrans={setKeyTrans}
          />
        );
      case "OTP":
        return (
          <OTP
            keyForgot={keyForgot}
            setKeyForgot={setKeyForgot}
            username={username}
            keyTrans={keyTrans}
            emailUser={emailUser}
            paramsEndcode={paramsEndcode.OTP}
            keyWidthOTPParams={paramsEndcode.key}
            next={() => setType("ChangeNewPass")}
          />
        );
      case "ChangeNewPass":
        return (
          <ChangeNewPass
            username={username}
            next={() => setType("ChangeNewPass")}
          />
        );
      default:
        return null;
    }
  }, [type,keyForgot]);

  return (
    <Form>
      {type !== "ChangeNewPass" ? (
        <LinkLabel
          onClick={() => {
            if (type === "forgetPassword") {
              Route.push({
                pathname: PathRoute.Login,
                query: {
                  prePath: Route.pathname,
                  tabIndex: "login",
                },
              });
            } else if (type === "confirm") {
              setType("forgetPassword");
            } else if (type === "OTP") {
              setType("confirm");
            } else if (type === "ChangeNewPass") {
              setType("OTP");
            }
          }}
        >
          <IconArrowLeftBlue />
          &nbsp; Trở lại
        </LinkLabel>
      ) : null}
      {render}
    </Form>
  );
};
export default Index;
