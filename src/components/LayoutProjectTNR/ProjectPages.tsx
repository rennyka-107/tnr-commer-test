import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { BodyListProjectI } from "@service/ProjectList";
import useProjectList from "hooks/useProjectList";
import dynamic from "next/dynamic";
import React from "react";
import Container from "@components/Container";
export interface ProjectInforI {
    id: string,
    name: string,
    location: string,
    constructArea: number | null,
    density: number | null,
    type: string,
    scale: string,
    funcDivision: string,
    ownership: string,
    description: string,
    avatar: string,
    tongBanGhi: number
}

const DynamicFilter = dynamic(() =>
    import("./filter").then(
        (m) => m.default,
        (e) => null as never
    )
);

const DynamicProductCard = dynamic(() =>
    import("./ProjectCard").then(
        (m) => m.default,
        (e) => null as never
    )
);

const ContainerProduct = styled.div`
    display: flex;
    justify-content:center;
`;


const ProjectPages = () => {
    const { data, error, loading, changePageNumber, totalPage, changeBody, body, params } = useProjectList();
    const onSubmit = (values: BodyListProjectI) => {
        changeBody(values)
    }
    return (
        <FlexContainer>
            <Container
                title="Danh sách dự án"
                rightContent={<DynamicFilter onSubmit={onSubmit} body={body} />}
            >
                <Grid container spacing={4}>
                    {data?.map((el, index) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                            <ContainerProduct>
                                <DynamicProductCard
                                    src={{ src: '/images/product2.png' }}
                                    title={el.name}
                                    subTitle={el.location}
                                    ticketCard={el.name}
                                    description={el.description}
                                />
                            </ContainerProduct>
                        </Grid>
                    ))}
                </Grid>
                <Row customStyle={{ marginTop: 84, justifyContent: 'center' }}>
                    <PaginationComponent count={totalPage} onChange={(event, page) => { changePageNumber(page) }} page={params.pageNumber} />
                </Row>
            </Container>
        </FlexContainer>
    )
}

export default ProjectPages