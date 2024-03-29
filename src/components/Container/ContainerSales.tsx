import Breadcrumbs from "@components/Breadscrumbs";
import BreadCrumsComponent from "@components/Breadscrumbs/BreadCrumsComponent";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
	breaditem?: {
		id: number;
		value: string;
		href: string;
	  }[];
    rightContent?: React.ReactNode;
	checkBread?: boolean;
}
const ContainerWrapper = styled.div`
    padding:29px 307px;
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

const ContainerSales: React.FC<Props> = ({ children, title, rightContent,checkBread,breaditem }) => {
    return (
        <ContainerWrapper>
            <BreadCrumsComponent breaditem={breaditem} activePage={title} />
            <Row customStyle={{ marginBottom: 50, marginTop: 22 , display: 'flex', justifyContent: 'space-between' }}>
                <Column customStyle={{ padding: 0, alignItems: "center"}} >
                    {title && <HeaderView>{title}</HeaderView>}
                </Column>
                <div >
                    {rightContent && rightContent}
                </div>
            </Row>
            {children}
        </ContainerWrapper>
    )
}

export default ContainerSales