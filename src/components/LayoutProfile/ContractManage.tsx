import BoxContainer from "@components/CustomComponent/BoxContainer";
import styled from "@emotion/styled";
import MenuDropdown from "ItemComponents/MenuDropdown";
import dynamic from "next/dynamic";
import React from "react";


const DynamicProductCard = dynamic(() =>
    import("./ProductCard").then(
        (m) => m.default,
        (e) => null as never
    )
);


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
export interface ProductI {
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
            styleCustom={{ padding: "21px 24px" }}
        >
            {products.map((item: ProductI, index) => <DynamicProductCard item={item} isLast={index == products.length - 1} key={item.id} />)}
        </BoxContainer>
    )
}

export default ContractManage;