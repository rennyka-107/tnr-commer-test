import Breadcrumbs from "@components/Breadscrumbs";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import { IconBackTransation } from "@components/Icons";
import IconBackPage from "@components/Icons/IconBackPage";
import styled from "@emotion/styled";
import { Router, useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  rightContent?: React.ReactNode;
  checkBread?: boolean;
}
const ContainerWrapper = styled.div`
  padding: 29px 164px;
  margin-top: 127px;
  width: 100%;
  @media screen and (max-width: 1500px) {
    padding: 20px 50px 20px 50px;
  }
  @media screen and (max-width: 1440px) {
    padding: 29px 150px 150px 150px;
  }
`;

const HeaderView = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
`;

const ContainerProductFavorite: React.FC<Props> = ({
  children,
  title,
  rightContent,
  checkBread,
}) => {
  const router = useRouter();
  return (
    <ContainerWrapper>
      {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
      <Breadcrumbs title={title} />

      {/* </div> */}
      <Row
        customStyle={{
          marginBottom: 10,
          marginTop: 22,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10}}>
	  <IconBackPage
          style={{ cursor: "pointer", marginTop: 7 }}
          onClick={() => router.push("/")}
        />
        <Column customStyle={{ padding: 0, alignItems: "center" }}>
          {title && <HeaderView>{title}</HeaderView>}
        </Column>
	  </div>

        <div>{rightContent && rightContent}</div>
      </Row>
      {children}
    </ContainerWrapper>
  );
};

export default ContainerProductFavorite;
