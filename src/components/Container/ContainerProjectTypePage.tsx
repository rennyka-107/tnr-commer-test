import Breadcrumbs from "@components/Breadscrumbs";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  rightContent?: React.ReactNode;
  style?: React.CSSProperties;
}
const ContainerWrapper = styled.div`
  padding: 29px 97px;
  margin-top: 127px;
  width: 100%;
  @media screen and (max-width: 1440px) {
  padding:29px 162px 30px 164px;
  }
`;

const HeaderView = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
`;

const ContainerProjectTypePage: React.FC<Props> = ({
  children,
  title,
  rightContent,
  style,
}) => {
	const matches = useMediaQuery("(max-width:1440px)");
  return (
    <>
      {typeof title !== undefined && (
        <>
          <ContainerWrapper>
            <Breadcrumbs title={title ? title : "Tất cả dự án"} />
            <Row customStyle={{ marginBottom: 25, marginTop: 22 , flexDirection: matches ? 'column' : 'row'}}>
              <Column
                // customStyle={{
                //   padding: 0,
                //   alignItems: "center",
                //   display: "flex",
                // }}
              >
                {/* {title && <HeaderView>{title}</HeaderView>} */}
                {rightContent && rightContent}
              </Column>
              <Column customStyle={{ padding: 0 }}></Column>
            </Row>
            <Box style={style}>{children}</Box>
          </ContainerWrapper>
        </>
      )}
    </>
  );
};

export default ContainerProjectTypePage;
