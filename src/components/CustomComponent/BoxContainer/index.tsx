import React, { ReactNode, StyleHTMLAttributes } from "react";
import styled from "@emotion/styled";

type PageProps = {
  children?: ReactNode;
  styleCustom?: React.CSSProperties;
  titleHeader?: string;
  HeaderCustom?: JSX.Element;
};

const BoxWrapper = styled.div`
  border-radius: 20px;
  border: 1px solid #c7c9d9;
  padding: 2px 0px;
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

const BoxContainer: React.FC<PageProps> = ({
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
export default BoxContainer;
