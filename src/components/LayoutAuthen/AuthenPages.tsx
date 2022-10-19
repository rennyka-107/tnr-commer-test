import styled from "@emotion/styled";
import { Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const DynamicLogin = dynamic(() =>
  import("./Login").then(
    (m) => m.default,
    (e) => null as never
  )
);

const DynamicRegister = dynamic(() =>
  import("./Register/index").then(
    (m) => m.default,
    (e) => null as never
  )
);

const DynamicForgetPassword = dynamic(() =>
  import("./ForgetPassword/index").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ContainerRegister = styled.div`
  background-image: url("/images/bg_register.png"),
    linear-gradient(
      180deg,
      rgba(2, 23, 98, 0) 0%,
      rgba(3, 10, 77, 0.47) 47.92%,
      rgba(0, 4, 10, 0.67) 98.96%
    );
  width: 100%;
  //   min-height: 898px;
  height: 1100px;
  margin-top: 127px;
  align-items: flex-start;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
    display: inline-flex;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  width: 500px;
  flex: 1;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
  }
  margin-top: 150px;
  margin-left: 50px;
`;

const SpanTextIntro = styled.p`
  font-weight: 500;
  font-size: 42px;
  line-height: 49px;
  color: #fff;
  width: 70%;
  margin: auto;
`;

const SpanTextSmall = styled.p`
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  color: #fff;
  width: 100%;
  margin: auto;
  padding-top: 12px;
  margin-left: 100px;
`;

const ItemRight = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  flex: 1;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ContainForm = styled.div`
  background: #fff;
  margin-top: 88px;
  margin-bottom: 88px;
  padding: 38px 85px;
  width: 70%;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);

  @media (max-width: 1440px) {
    width: 551px;
    padding: 38px 77px;
  }

  @media (max-width: 1024px) {
    padding: 20px;
  }
`;
const LinkLabel = styled.a`
  color: #1f70e8;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const AuthenPages = () => {
  const Route = useRouter();
  const [tab, setTab] = useState<
    "login" | "register" | "forgetPassword" | "confirm"
  >("login");
  const [loading, setLoading] = useState(false);

  const renderTab = useMemo(() => {
    switch (tab) {
      case "login":
        return <DynamicLogin />;
      case "register":
        return <DynamicRegister />;
      case "forgetPassword":
        return <DynamicForgetPassword />;
      case "confirm":
        return <DynamicRegister />;

      default:
        return null;
    }
  }, [tab]);

  useEffect(() => {
    if (Route.isReady) {
      setLoading(true);
      if (Route.query.tabIndex) {
        setLoading(false);
      }
      if (!!Route.query.tabIndex && Route.query.tabIndex == "login") {
        setTab("login");
      }
      if (
        (!!Route.query.tabIndex && Route.query.tabIndex == "register") ||
        Route.query.tabIndex === "confirmRegister"
      ) {
        setTab("register");
      }
      if (!!Route.query.tabIndex && Route.query.tabIndex == "forgetPassword") {
        setTab("forgetPassword");
      }
      if (!!Route.query.tabIndex && Route.query.tabIndex == "confirm") {
        setTab("confirm");
      }
    }
  }, [Route.query]);

  const handleChangeTab = (value: any) => {
    if (value === "register") {
      Route.replace(`/authen?prePath=%2Fprofile&tabIndex=register`);
    } else if (value === "login") {
      Route.replace(`/authen?prePath=%2Fprofile&tabIndex=login`);
    }
    setTab(value);
  };

  const fetchTab = () => {
    return (
      <>
        {loading === true ? (
          <></>
        ) : (
          <>
            {tab === "forgetPassword" || tab === "confirm" ? null : (
              <Tabs
                value={tab}
                onChange={(event, value) => {
                  if (tab !== value) {
                    handleChangeTab(value);
                  }
                }}
                indicatorColor="secondary"
                TabIndicatorProps={{
                  style: {
                    background: "#FEC83C",
                    maxWidth: "102px",
                    height: "3px",
                    marginLeft: tab == "register" ? 0 : "20px",

                  },
                }}
                scrollButtons
                allowScrollButtonsMobile
              >
                <Tab
                  value="register"
                  label="Đăng ký tài khoản"
                  style={{
                    fontWeight: tab == "register" ? 700 : 400,
                    textTransform: "none",
                    fontSize: 26,
					padding: 0,
                    color: tab == "register" ? "#48576D" : "#8190A7",
                  }}
                />
                <Tab
                  value="login"
                  label="Đăng nhập"
                  style={{
                    fontWeight: tab == "login" ? 700 : 400,
                    textTransform: "none",
                    fontSize: 26,
					
                    color: tab == "login" ? "#48576D" : "#8190A7",
                  }}
                />
              </Tabs>
            )}
            {renderTab}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchTab();
  }, [loading]);
  return (
    <ContainerRegister>
      <ItemLeft>
        <div>
          <SpanTextIntro>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </SpanTextIntro>
          <SpanTextSmall>Ornare euismod egestas tempor netus.</SpanTextSmall>
        </div>
      </ItemLeft>
      <ItemRight>
        <ContainForm>{fetchTab()}</ContainForm>
      </ItemRight>
    </ContainerRegister>
  );
};

export default AuthenPages;
