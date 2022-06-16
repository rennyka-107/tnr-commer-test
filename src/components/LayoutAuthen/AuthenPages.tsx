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
  import("./Reigster").then(
    (m) => m.default,
    (e) => null as never
  )
);

const Dynamicforgetpassword = dynamic(() =>
  import("./ForgetPassword").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ContainerRegister = styled.div`
  background-image: url("/images/bg_register.png");
  width: 100%;
  min-height: 898px;
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
  width: 50%;
  flex: 1;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
  }
  margin: auto;
`;

const SpanTextIntro = styled.p`
  font-weight: 500;
  font-size: 42px;
  line-height: 49px;
  color: #fff;
  width: 80%;
  margin: auto;
`;

const SpanTextSmall = styled.p`
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  color: #fff;
  width: 80%;
  margin: auto;
  padding-top: 12px;
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
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);

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
  const [tab, setTab] = useState<"login" | "register" | "forgetPassword">(
    "register"
  );
  const { tabIndex } = useRouter().query;
  const { query } = useRouter();
  const renderTab = useMemo(() => {
    switch (tab) {
      case "login":
        return <DynamicLogin />;
      case "register":
        return <DynamicRegister />;
      case "forgetPassword":
        return <Dynamicforgetpassword />;
      default:
        return null;
    }
  }, [tab]);

  useEffect(() => {
    if (!!query.tabIndex && query.tabIndex == "login") {
      setTab("login");
    }
    if (!!query.tabIndex && query.tabIndex == "forgetPassword") {
      setTab("forgetPassword");
    }
  }, [query]);
  return (
    <ContainerRegister>
      <ItemLeft>
        <div>
          <SpanTextIntro>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </SpanTextIntro>
          <SpanTextSmall>Ornare euismod egestas tempor netus..</SpanTextSmall>
        </div>
      </ItemLeft>
      <ItemRight>
        <ContainForm>
          {tab === "forgetPassword" ? (
            <>
              {/* <OTP /> */}
              {/* <Tabs
                        value={tab}
                        onChange={(event, value) => {
                            if (tab !== value) {
                                setTab(value)
                            }
                        }}
                        indicatorColor="secondary"
                        TabIndicatorProps={{ style: { background: '#FEC83C' } }}
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab value="forgetPassword"
                        label="Quên mật khẩu"
                        style={{
                            fontSize: 20,
                            color: tab == "forgetPassword" ? '#48576D' : '#8190A7',
    
                        }} />
                    </Tabs> */}
            </>
          ) : (
            <Tabs
              value={tab}
              onChange={(event, value) => {
                if (tab !== value) {
                  setTab(value);
                }
              }}
              indicatorColor="secondary"
              TabIndicatorProps={{ style: { background: "#FEC83C" } }}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                value="register"
                label="Đăng ký tài khoản"
                style={{
                  // fontWeight: '700',
                  fontSize: 20,
                  color: tab == "register" ? "#48576D" : "#8190A7",
                }}
              />
              <Tab
                value="login"
                label="Đăng nhập"
                style={{
                  // fontWeight: '700',
                  fontSize: 20,
                  color: tab == "login" ? "#48576D" : "#8190A7",
                }}
              />
            </Tabs>
          )}
          {renderTab}
        </ContainForm>
      </ItemRight>
    </ContainerRegister>
  );
};

export default AuthenPages;
