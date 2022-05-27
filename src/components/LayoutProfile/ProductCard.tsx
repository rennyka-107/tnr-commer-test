import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ProductI } from "./ContractManage";

const DynamicHorizontalLine = dynamic(() =>
    import("@components/CustomComponent/HorizontalLine").then(
        (m) => m.default,
        (e) => null as never
    )
);


const ImageProduct = styled(Image)`
    border-radius:8px;
`
const HeaderContainer = styled.div`
    display:flex;
    justify-content:space-between
`;

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

interface Props {
    item: ProductI,
    isLast?: boolean
}

const ProductCard = (props: Props) => {
    const { item, isLast } = props;
    return (
        <BoxContainer styleCustom={{ padding: 18, borderRadius: 8, marginBottom: isLast ? 0 : 23, marginTop: 18, display: "flex" }} key={item?.id}>
            <div>
                <ImageProduct src={"/images/Product4.png"} width={159} height={96} alt="" />
            </div>
            <ContentProduct>
                <HeaderContainer>
                    <TitleProduct>{item?.titleLeft}</TitleProduct>
                    <TitleProduct>{item?.titleRight}</TitleProduct>
                </HeaderContainer>
                <CodeProduct>{item?.codeProduct}</CodeProduct>
                <Row>
                    <Column col={1}><TextProduct>Khách hàng</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.customer}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Mã đặt chỗ</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.code}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Thời gian đặt chỗ</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.timeBooking}</TextProduct></Column>
                </Row>
                <DynamicHorizontalLine />
                <Row>
                    <Column col={1}><TextProduct>Đã cọc</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.deposited}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Đã thanh toán</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.payment}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1}><TextProduct>Còn lại</TextProduct></Column>
                    <Column col={3}><TextProduct>{item?.res}</TextProduct></Column>
                </Row>
                <DynamicHorizontalLine />
                <Row>
                    <Column col={1}><TextProduct>Trạng thái</TextProduct></Column>
                    <Column col={3}>
                        {item?.status ?
                            <TextProduct color="#06C270"> <div style={{ marginRight: 10 }}><IconCircleChecked /></div> Đã hoàn thành</TextProduct>
                            : <TextProduct color="#FF3B3B"><div style={{ marginRight: 10 }}> <IconCircleClose /></div>Chưa hoàn thành</TextProduct>
                        }
                    </Column>
                </Row>
            </ContentProduct>
        </BoxContainer>
    )
}

export default ProductCard