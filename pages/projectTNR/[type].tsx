import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import { Grid } from "@mui/material";
import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { ProjectI } from "./ProjectCard";


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


interface PropsI extends NextPageContext {
    data: ProjectI[];
}

export interface FilterI {
    locationId?: number;
    type?: number;
    sortBy?: number;
}


const ProjectTNR = (props: PropsI) => {
    const { data } = props;
    console.log(data, '-------------------data---------------');

    const onSubmit = (values: FilterI) => { }

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
                    rightContent={<DynamicFilter onSubmit={onSubmit} />}
                >
                    <Grid container spacing={4}>
                        {data.map((el, index) => (
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                                <ContainerProduct>
                                    <DynamicProductCard
                                        src={el.src}
                                        title={el.title}
                                        subTitle={el.subTitle}
                                        ticketCard={el.ticketCard}
                                        description={el.description}
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

const dummyData: ProjectI[] = [
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    },
    {
        src: { src: "/images/product2.png" },
        title: "TNR Stars Lam Sơn",
        subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
        ticketCard: "TRN Star",
        description: "ĐẠI ĐÔ THỊ KỲ QUAN – CÔNG NGHỆ - KẾT NỐI TINH HOA THẾ GIỚI đầu tiên tại Thanh Hóa tái hiện một hình ảnh thế giới đi kèm với những tinh hoa của nhân loại sang trọng, đẳng cấp “Vượng khí & Tài lộc” của dòng sông Tam Điệp"
    }
]

export async function getServerSideProps({ params, locale }: any) {
    console.log(params, '---params---');

    // Pass post data to the page via props
    return {
        props: {
            data: dummyData,
            //* serverSideTranslations must have for translation
            //(await serverSideTranslations(locale, ["common"])),
        },
    };
}


export default ProjectTNR;