import React, { ReactNode } from "react";
import styled from "@emotion/styled";

type PageProps = {
  children?: ReactNode;
};

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexContainer: React.FC<PageProps> = ({ children }) => {
  return <FlexWrapper>{children}</FlexWrapper>;
};
export default FlexContainer;
