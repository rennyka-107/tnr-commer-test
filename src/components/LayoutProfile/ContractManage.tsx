import BoxContainer from "@components/CustomComponent/BoxContainer";
import styled from "@emotion/styled";
import { ContractI, getContractByUser } from "@service/Profile";
import MenuDropdown from "ItemComponents/MenuDropdown";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";


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

const ContractManage = () => {
    const [contracts, setContracts] = useState<ContractI[]>([])
    const getContract = async () => {
        const response = await getContractByUser();
        setContracts(response?.responseData ?? []);
    }

    useEffect(() => {
        getContract();
    }, [])
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
            {(contracts || []).map((item: ContractI, index) => <DynamicProductCard item={item} isLast={index == contracts.length - 1} key={item.id} />)}
        </BoxContainer>
    )
}

export default ContractManage;