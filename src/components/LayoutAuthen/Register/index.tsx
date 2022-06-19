import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import PathRoute from "utils/PathRoute";
import Confirm from "./Confirm";
import OTP from "./OTP";
import Register from "./Register";

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

  const [type, setType] = useState("register");
  const [key, setKey] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if(type==='register'){
      Route.push({
        pathname: PathRoute.Login,
        query: {
          prePath: Route.pathname,
          tabIndex: "register",
        },
      });
    }
  }, [type]);

  const render = useMemo(() => {
    switch (type) {
      case "register":
        return (
          <Register
            next={() => setType("confirm")}
            setKey={setKey}
            setUserId={setUserId}
          />
        );
      case "confirm":
        return (
          <Confirm
            userId={userId}
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
            next={() => setType("OTP")}
          />
        );
      case "OTP":
        return (
          <OTP
            keycloakId={key}
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
