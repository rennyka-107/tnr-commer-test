import React from "react";
import styled from "@emotion/styled";
import Input from "@mui/material/Input";
import CustomButton from "@components/CustomButton";

const WrapContainerFooterTop = styled.div`
  background: #fec83c;
  width: 100%;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

const ChildWrapFooterTop = styled.div`
  font-size: 16px;
  min-height: 110px;
  color: #1b3459;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;

  @media (max-width: 1000px) {
    gap: 2rem;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    display: inline-flex;
  }
`;

const RegisterInfoLine = styled.span`
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`;

const DivInput = styled.div`
  min-width: 276px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const DivButton = styled.div`
  @media (max-width: 900px) {
    margin-bottom: 21px;
    width: 100%;
  }
`;

const WrapFlexOne = styled.div`
  display: flex;
  gap: 66px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 13px;
    margin-top: 21px;
  }
`;

type Props = {};

export default function FooterTop(props: Props) {
  return (
    <WrapContainerFooterTop>
      <ChildWrapFooterTop>
        <WrapFlexOne>
          <RegisterInfoLine>
            Đăng ký để nhận thông tin dự án sớm nhất
          </RegisterInfoLine>
          <DivInput>
            <Input sx={{ width: "100%", mb: 2 }} placeholder="Email" />
          </DivInput>
        </WrapFlexOne>
        <DivButton>
          <CustomButton style={{ width: "100%" }} label="Đăng ký" />
        </DivButton>
      </ChildWrapFooterTop>
    </WrapContainerFooterTop>
  );
}
