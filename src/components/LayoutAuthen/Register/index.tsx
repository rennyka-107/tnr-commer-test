import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import PathRoute from "utils/PathRoute";
import Confirm from "./Confirm";
import OTP from "./OTP";
import Register from "./Register";
import { Base64 } from "js-base64";

const Form = styled.div`
  margin-top: 10px;
`;

export interface RegisterParam {
  username: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
  accept: boolean;
  email: string;
}

const Index = () => {
	const Route = useRouter();

  const [type, setType] = useState<any>("register");
  const [key, setKey] = useState("");
  const [userId, setUserId] = useState("");
  const [transKey, setTransKey] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [paramsEndcode, setParamsEndcode] = useState({
    key: "",
    OTP: "",
  });
  const { tabIndex } = Route.query;

  useEffect(() => {
    setType(tabIndex);
    if (Route.query.key !== undefined && Route.query.otp !== undefined) {
      const key = Route.query.key as string;
      const otp = Route.query.otp as string;
      setParamsEndcode({
        key: key,
        OTP: otp,
      });
    }
  }, [Route]);

  //   useEffect(() => {
  //     if(tabIndex === 'register'){
  //       Route.push({
  //         pathname: PathRoute.Login,
  //         query: {
  //           prePath: Route.pathname,
  //           tabIndex: "register",
  //         },
  //       });
  //     }
  //   }, [Route]);

  const render = useMemo(() => {
    switch (type) {
      case "register":
        return (
          <Register
            next={() => setType("confirm")}
            setKey={setKey}
            setUserId={setUserId}
			setTransKey={setTransKey}
			setNumberPhone={setNumberPhone}
          />
        );
      case "confirm":
        return (
          <Confirm
            userId={userId}
			transKey={transKey}
			numberPhone={numberPhone}
            back={() => {
              Route.push({
                pathname: PathRoute.Login,
                query: {
                  prePath: Route.pathname,
                  tabIndex: "register",
                },
              });
              setType("register");
            }}
            next={() => setType("confirmRegister")}
          />
        );
      case "confirmRegister":
        return (
          <OTP
            keycloakId={transKey}
            paramsEndcode={paramsEndcode.OTP}
            keyWidthOTPParams={paramsEndcode.key}
            userId={userId}
            back={() => setType("confirm")}
            next={() => setType("ChangeNewPass")}
          />
        );

      default:
        return null;
    }
  }, [type]);

  return <Form>{render}</Form>;
};

export default Index;
