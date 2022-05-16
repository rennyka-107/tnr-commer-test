import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import HorizontalLine from "@components/CustomComponent/HorizontalLine";
import Row from "@components/CustomComponent/Row";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import MenuDropdown from "ItemComponents/MenuDropdown";
import Image from "next/image";
import React from "react";

const HeaderContainer = styled.div`
    display:flex;
    justify-content:space-between
`;

const HeaderTitle = styled.span`
    color:#1B3459;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
`;

const ImageProduct = styled(Image)`
    border-radius:8px;
`
const ContentProduct = styled.div`
    padding-left:31px;
    width:582px;
`;

const TitleProduct = styled.span`
    color:#8190A7;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.41px;
`;
const CodeProduct = styled.span`
    color:#0E1D34;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.09px;
    margin-bottom:20px;
`;


const TextProduct = styled.span<{ color?: string }>`
    color:#1B3459;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16.41px;
    color:${({ color }) => color};
    display: inline-flex;
    align-items: center;
`;


interface ProductI {
    id: number,
    titleRight?: string;
    titleLeft?: string;
    codeProduct?: string;
    customer?: string;
    code?: string;
    deposited?: string;
    payment?: string;
    res?: string;
    status?: boolean;
    timeBooking: string;
}

const ContractManage = () => {

    const products: ProductI[] = [
        {
            id: 0,
            titleLeft: "TNR Lam Sơn",
            titleRight: "Cập nhật: 09:24 | Thứ 2, 09/11/2021",
            codeProduct: "Lô A06 ",
            customer: "Nguyễn Văn A",
            code: "LÔ A06",
            deposited: "50.000.000 đ ",
            payment: "50.000.000 đ ",
            res: "50.000.000 đ ",
            status: false,
            timeBooking: " 09:24 | Thứ 2, 09/11/2021",
        },
        {
            id: 1,
            titleLeft: "TNR Lam Sơn",
            titleRight: "Cập nhật: 09:24 | Thứ 2, 09/11/2021",
            codeProduct: "Lô A06 ",
            customer: "Nguyễn Văn A",
            code: "LÔ A06",
            deposited: "50.000.000 đ ",
            payment: "50.000.000 đ ",
            res: "50.000.000 đ ",
            status: false,
            timeBooking: " 09:24 | Thứ 2, 09/11/2021",
        }, {
            id: 2,
            titleLeft: "TNR Lam Sơn",
            titleRight: "Cập nhật: 09:24 | Thứ 2, 09/11/2021",
            codeProduct: "Lô A06 ",
            customer: "Nguyễn Văn A",
            code: "LÔ A06",
            deposited: "50.000.000 đ ",
            payment: "50.000.000 đ ",
            res: "50.000.000 đ ",
            status: true,
            timeBooking: " 09:24 | Thứ 2, 09/11/2021",
        }
    ]

    const ProductCard = (item: ProductI, isLast?: boolean) => (
        <BoxContainer styleCustom={{ padding: 18, borderRadius: 8, marginBottom: isLast ? 0 : 23, marginTop: 18, display: "flex" }} key={item.id}>
            <div>
                <ImageProduct src={"/images/Product4.png"} width={159} height={96} alt="" />
            </div>
            <ContentProduct>
                <HeaderContainer>
                    <TitleProduct>{item.titleLeft}</TitleProduct>
                    <TitleProduct>{item.titleRight}</TitleProduct>
                </HeaderContainer>
                <CodeProduct>{item.codeProduct}</CodeProduct>
                <Row>
                    <Column col={1}><TextProduct>Khách hàng</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.customer}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Mã đặt chỗ</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.code}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Thời gian đặt chỗ</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.timeBooking}</TextProduct></Column>
                </Row>
                <HorizontalLine />
                <Row>
                    <Column col={1}><TextProduct>Đã cọc</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.deposited}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Đã thanh toán</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.payment}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Còn lại</TextProduct></Column>
                    <Column col={3}><TextProduct>{item.res}</TextProduct></Column>
                </Row>
                <HorizontalLine />
                <Row>
                    <Column col={1}><TextProduct>Trạng thái</TextProduct></Column>
                    <Column col={3}>
                        {item.status ?
                            <TextProduct color="#06C270"> <div style={{ marginRight: 10 }}><IconCircleChecked /></div> Đã hoàn thành</TextProduct>
                            : <TextProduct color="#FF3B3B"><div style={{ marginRight: 10 }}> <IconCircleClose /></div>Chưa hoàn thành</TextProduct>
                        }
                    </Column>
                </Row>
            </ContentProduct>
        </BoxContainer>
    )



    return (
        <BoxContainer
            HeaderCustom={
                <HeaderContainer>
                    <HeaderTitle>Quản lý giao dịch</HeaderTitle>
                    <BoxContainer styleCustom={{ display: "flex", padding: "12px 20px", borderRadius: 8 }}>
                        <MenuDropdown title={"Dự án"} />
                        <MenuDropdown title={"Trạng thái"} />
                    </BoxContainer>
                </HeaderContainer>
            }
        >
            {products.map((item: ProductI, index) => ProductCard(item, index == products.length - 1))}
        </BoxContainer>
    )
}

export default ContractManage;