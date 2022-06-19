import IconArrowLeftBlue from "@components/Icons/IconArrowLeftBlue";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
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
  const [username, setUsername] = useState("");

  const render = useMemo(() => {
    switch (type) {
      case "forgetPassword":
        return (
          <ForgetPassword
            setUsername={(value: string) => setUsername(value)}
            next={() => setType("confirm")}
          />
        );
      case "confirm":
        return <Confirm username={username} next={() => setType("OTP")} />;
      case "OTP":
        return (
          <OTP username={username} next={() => setType("ChangeNewPass")} />
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
  }, [type]);

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
          &nbsp; Quay lại
        </LinkLabel>
      ) : null}
      {render}
    </Form>
  );
};
export default Index;
