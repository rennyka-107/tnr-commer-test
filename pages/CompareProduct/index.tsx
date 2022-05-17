import Container from "@components/Container";
import Column from "@components/CustomComponent/Column";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Row from "@components/CustomComponent/Row";
import Page from "@layouts/Page";
import React from "react";

const CompareProduct = () => {
    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <FlexContainer>
                <Container title="So sánh bất động sản" >
                    <Row>
                        <Column></Column>
                        <Column></Column>
                    </Row>
                </Container>
            </FlexContainer>
        </Page>
    )
}

export default CompareProduct;