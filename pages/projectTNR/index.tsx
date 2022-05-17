import Breadcrumbs from "@components/Breadscrumbs";
import Container from "@components/Container";
import Column from "@components/CustomComponent/Column";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import { Grid } from "@mui/material";
import React, { MouseEventHandler } from "react";
import Filter from "./components/filter";

const ContainerProduct = styled.div`
    display: flex;
    justify-content:center;
`;

export interface ItemI {
    src?: any;
    title?: string;
    subTitle?: string;
    dataItem?: {
        item1?: string;
        item2?: string;
        item3?: string;
        item4?: string;
    };
    priceListed?: number;
    priceSub?: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ticketCard?: string;
};


const ProjectTNR = () => {

    const dummyData: ItemI[] = [
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        },
        {
            src: { src: "/images/product2.png" },
            title: "TNR Stars Lam Sơn",
            subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
            dataItem: { item1: "02", item2: "02", item3: "80", item4: "Đông Nam" },
            priceListed: 3018933000,
            priceSub: 40580174,
            ticketCard: "TRN Star"
        }
    ]

    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <FlexContainer>
                <Container
                    title="Danh sách sản phẩm"
                    rightContent={<Filter />}
                >
                    <Grid container spacing={4}>
                        {dummyData.map((el, index) => (
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                                <ContainerProduct>
                                    <ItemProductCard
                                        src={el.src}
                                        title={el.title}
                                        subTitle={el.subTitle}
                                        dataItem={el.dataItem}
                                        priceListed={el.priceListed}
                                        priceSub={el.priceSub}
                                        ticketCard={el.ticketCard}
                                    />
                                </ContainerProduct>
                            </Grid>
                        ))}
                    </Grid>
                    <Row customStyle={{ marginTop: 84, justifyContent: 'center' }}>
                        <PaginationComponent count={10} onChange={(event, page) => { }} />
                    </Row>
                </Container>
            </FlexContainer>
        </Page>
    )
}

export default ProjectTNR;