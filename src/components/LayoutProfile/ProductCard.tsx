import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import { ContractI } from "@service/Profile";
import dynamic from "next/dynamic";
import Image from "next/image";
import FormatFns from 'utils/DateFns';
import { dayOfWeekToString, getDateFromStringDMY } from "utils/helper";

const DynamicHorizontalLine = dynamic(() =>
    import("@components/CustomComponent/HorizontalLine").then(
        (m) => m.default,
        (e) => null as never
    )
);


const ImageProduct = styled(Image)`
    border-radius:8px;
`
const HeaderTitle = styled.div`
    display:flex;
    justify-content:space-between
`;

const ContentProduct = styled.div`
    padding-left:31px;
    width:582px;
`;

const Title = styled.span`
    color:#8190A7;
    font-family: Roboto;
    font-style: normal;
`;

const TitleProject = styled(Title)`
    font-weight: 400;
    font-size: 14px;
    line-height: 16.41px;
`;

const TitleTime = styled(Title)`
    font-weight: 400;
    font-size: 12px;
    line-height: 14.84px;
`;

const TitleProduct = styled(Title)`
    font-weight: 500;
    font-size: 18px;
    line-height: 21.09px;
    color:#0E1D34;

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
    item: ContractI,
    isLast?: boolean
}

const ProductCard = (props: Props) => {
    const { item, isLast } = props;

    const convertDateToString = (date: Date) => {
        const house = FormatFns.format(date, 'HH:mm');
        const day = FormatFns.format(date, 'dd/MM/yyyy');
        const dateOfWeek = date.getDay();
        return house + ' | ' + dayOfWeekToString(dateOfWeek) + ',' + day;
    }
    return (
        <BoxContainer styleCustom={{ padding: 18, borderRadius: 8, marginBottom: isLast ? 0 : 23, marginTop: 18, display: "flex" }} key={item?.id}>
            <div>
                {item?.avatar ?
                    <ImageProduct
                        loader={({ src, width, quality }) => {
                            return `${src}?w=${width}&q=${quality}`
                        }}
                        src={item?.avatar ?? 'https://tse3.mm.bing.net/th?id=OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5&pid=Api&P=0&w=277&h=183'}
                        width={159}
                        height={96}
                        alt=""
                    />
                    :
                    <ImageProduct src={'/images/Product4.png'} width={159} height={96} alt="" />
                }
            </div>
            <ContentProduct>
                <HeaderTitle>
                    <TitleProject>{item?.projectName || 'TNR'}</TitleProject>
                    <TitleTime>Cập nhật: {convertDateToString(getDateFromStringDMY(item?.bookingTime) ?? new Date())}</TitleTime>
                </HeaderTitle>
                <HeaderTitle>
                    <TitleProduct>{item?.productName || 'Lô A06'}</TitleProduct>
                </HeaderTitle>
                <CodeProduct>{item?.bookingCode}</CodeProduct>
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Khách hàng</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{item?.fullname}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Mã đặt chỗ</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{item?.orderId}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Thời gian đặt chỗ</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{convertDateToString(getDateFromStringDMY(item?.bookingTime) ?? new Date())}</TextProduct></Column>
                </Row>
                <DynamicHorizontalLine />
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Đã cọc</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{item?.deposited}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Đã thanh toán</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{item?.paid}</TextProduct></Column>
                </Row>
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Còn lại</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}><TextProduct>{item?.remaining}</TextProduct></Column>
                </Row>
                <DynamicHorizontalLine />
                <Row>
                    <Column col={1} customStyle={{ paddingLeft: 0 }}><TextProduct>Trạng thái</TextProduct></Column>
                    <Column col={3} customStyle={{ paddingLeft: 0 }}>
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