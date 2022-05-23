import Breadcrumbs from "@components/Breadscrumbs";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    rightContent?: React.ReactNode;
}
const ContainerWrapper = styled.div`
    padding:29px 164px;
    margin-top: 127px;
    width:100%;
`;

const HeaderView = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
`;

const Container: React.FC<Props> = ({ children, title, rightContent }) => {
    return (
        <ContainerWrapper>
            <Breadcrumbs title={title} />
            <Row customStyle={{ marginBottom: 52, marginTop: 22 }}>
                <Column customStyle={{ padding: 0, alignItems: "center", display: 'flex', }}>
                    {title && <HeaderView>{title}</HeaderView>}
                </Column>
                <Column customStyle={{ padding: 0 }}>
                    {rightContent && rightContent}
                </Column>
            </Row>
            {children}
        </ContainerWrapper>
    )
}

export default Container