import React, { ReactNode, StyleHTMLAttributes } from "react";
import styled from "@emotion/styled";

type PageProps = {
  children?: ReactNode;
  styleCustom?: React.CSSProperties;
  titleHeader?: string;
  HeaderCustom?: JSX.Element;
};

const BoxWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px -4px 32px 16px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  width: 759px;
`;

const Header = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;

const BoxQLGD: React.FC<PageProps> = ({
  children,
  titleHeader,
  HeaderCustom,
  styleCustom,
}) => {
  return (
    <BoxWrapper style={styleCustom}>
      {HeaderCustom && HeaderCustom}
      {titleHeader && !HeaderCustom && (
        <Header style={{ justifyContent: "space-around" }}>
          {titleHeader}
        </Header>
      )}
      {children}
    </BoxWrapper>
  );
};
export default BoxQLGD;
