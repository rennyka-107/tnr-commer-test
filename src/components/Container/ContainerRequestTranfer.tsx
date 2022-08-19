import Breadcrumbs from "@components/Breadscrumbs";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import { IconBackTransation } from "@components/Icons";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  rightContent?: React.ReactNode;
  style?: React.CSSProperties;
}
const ContainerWrapper = styled.div`
  padding: 29px 164px;
  margin-top: 127px;
  width: 100%;
`;

const HeaderView = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
`;

const ContainerRequestTranfer: React.FC<Props> = ({
  children,
  title,
  rightContent,
  style,
}) => {
	const router = useRouter();
  return (
    <>
      {typeof title !== undefined && (
        <>
          <ContainerWrapper>
            {/* <Breadcrumbs title={title} /> */}
            <Row customStyle={{ marginBottom: 52, marginTop: 22, display: 'flex' , gap: 21, alignItems: 'center'}} >
              <IconBackTransation
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/profile")}
              />
              <Column
                customStyle={{
                  padding: 0,
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {title && <HeaderView>{title}</HeaderView>}
              </Column>
              <Column customStyle={{ padding: 0 }}>
                {rightContent && rightContent}
              </Column>
            </Row>
            <Box style={style}>{children}</Box>
          </ContainerWrapper>
        </>
      )}
    </>
  );
};

export default ContainerRequestTranfer;
