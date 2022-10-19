import Breadcrumbs from "@components/Breadscrumbs";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    rightContent?: React.ReactNode;
	checkBread?: boolean;
}
const ContainerWrapper = styled.div`
    padding:29px 164px;
    margin-top: 127px;
    width:100%;
	@media screen and (max-width: 1500px) {
		padding:20px 50px 20px 50px;
	};
	@media screen and (max-width: 1440px) {
		padding:24px 161px 20px 164px;
	  }
	
`;

const HeaderView = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
`;

const RowStyled = styled(Row)`
	  display: flex;
	  flex-direction: space-between
`
const ContainerSearchPage: React.FC<Props> = ({ children, title, rightContent,checkBread }) => {
    return (
        <ContainerWrapper>
            {/* <Breadcrumbs title={title} /> */}
            <Row customStyle={{ marginTop: 22 , display: 'flex', justifyContent: 'space-between' }}>
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

export default ContainerSearchPage