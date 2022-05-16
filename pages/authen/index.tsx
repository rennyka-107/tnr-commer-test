import React, { useState } from 'react';
import styled from '@emotion/styled';
import Page from "@layouts/Page";
import { Tab, Tabs } from '@mui/material';
import Login from './components/Login';
import Register from './components/Reigster';

const ContainerRegister = styled.div`
    background-image: url("/images/bg_register.png");
    width:100%;
    min-height:898px;
    margin-top: 127px;
    align-items: flex-start;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display:flex;
    
    @media (max-width: 900px) {
        flex-direction: column;
        display: inline-flex;
      }
`;

const ItemLeft = styled.div`
    display:flex;
    width:50%;
    flex:1;
    justify-content: center;
    @media (max-width: 900px) {
        width:100%;
      }
    margin:auto;
`;

const SpanTextIntro = styled.p`
    font-weight: 500;
    font-size: 42px;
    line-height: 49px;
    color:#FFF;
    width:80%;
    margin:auto;
`;

const SpanTextSmall = styled.p`
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    color:#FFF;
    width:80%;
    margin:auto;
    padding-top:12px;
`;

const ItemRight = styled.div`
    display:flex;
    justify-content: center;
    width:50%;
    flex:1;

    @media (max-width: 900px) {
        width:100%;
      }
`;

const ContainForm = styled.div`
    background:#FFF;
    margin-top:88px;
    margin-bottom:88px;
    padding:38px 85px;
    width:70%;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);

    @media (max-width: 1024px) {
        padding:20px;
      }
`;

const Authen = () => {
    const [tab, setTab] = useState<'login' | 'register'>('register');
    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <ContainerRegister>
                <ItemLeft>
                    <div>
                        <SpanTextIntro>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </SpanTextIntro>
                        <SpanTextSmall>
                            Ornare euismod egestas tempor netus..
                        </SpanTextSmall>
                    </div>
                </ItemLeft>
                <ItemRight>
                    <ContainForm>
                        <Tabs
                            value={tab}
                            onChange={(event, value) => {
                                if (tab !== value) {
                                    setTab(value)
                                }
                            }}
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            TabIndicatorProps={{ style: { background: '#FEC83C' } }}
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab value="register"
                                label="Đăng ký tài khoản"
                                style={{
                                    // fontWeight: '700',
                                    fontSize: 20,
                                    color: tab == "register" ? '#48576D' : '#8190A7',

                                }} />
                            <Tab
                                value="login"
                                label="Đăng nhập"
                                style={{
                                    // fontWeight: '700',
                                    fontSize: 20,
                                    color: tab == "login" ? '#48576D' : '#8190A7',

                                }}
                            />
                        </Tabs>
                        {tab == "login" && (
                            <Login />
                        )}
                        {tab == "register" && (
                            <Register />
                        )}
                    </ContainForm>
                </ItemRight>
            </ContainerRegister>
        </Page>
    )
}

export default Authen;


