import BoxContainer from "@components/CustomComponent/BoxContainer";
import Row from "@components/CustomComponent/Row";
import IconNotifiType1 from "@components/Icons/IconNotifiType1";
import IconNotifiType2 from "@components/Icons/IconNotifiType2";
import IconNotifiType3 from "@components/Icons/IconNotifiType3";
import styled from "@emotion/styled";
import { getNotificationByUser, NotiI } from "@service/Profile";
import React, { useEffect, useState } from "react";
import { convertDateToString } from "utils/helper";
import FormatFns from 'utils/DateFns';


const ItemContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
`;

const LeftItem = styled.div`
    display:flex;
`;

const RightItem = styled.span`
    color:#8190A7;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14.48px;
`;

const TitleItem = styled.span<{ color: string }>`
    color:${({ color }) => color};
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16.41px;
`;

const ContentItem = styled.span`
    color:#0E1D34;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14.48px;
`;

const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
`;

const IconContainer = styled.div`
    margin-right:11.37px;
`;

const Notification = () => {

    // const notifications: NotiI[] = [
    //     {
    //         id: 0,
    //         titile: "Hoàn thiện hồ sơ mua bán",
    //         content: "Hệ thống ghi nhận bạn chưa hoàn thành hồ sơ mua bán.",
    //         time: "09:24 | thứ 2, 09/11",
    //         type: 1,
    //     },
    //     {
    //         id: 2,
    //         titile: "Hoàn thiện hồ sơ mua bán",
    //         content: "Hệ thống ghi nhận bạn chưa hoàn thành hồ sơ mua bán.",
    //         time: "09:24 | thứ 2, 09/11",
    //         type: 2,
    //     },
    //     {
    //         id: 3,
    //         titile: "Hoàn thiện hồ sơ mua bán",
    //         content: "Hệ thống ghi nhận bạn chưa hoàn thành hồ sơ mua bán.",
    //         time: "09:24 | thứ 2, 09/11",
    //         type: 3,
    //     },
    // ]

    const [notifications, setNotifications] = useState<NotiI[]>([]);



    const getNotifications = async () => {
        const response = await getNotificationByUser();
        setNotifications(response.responseData);
    }

    useEffect(() => {
        getNotifications();
    }, [])

    const renderIcon = (type: number) => {
        switch (type) {
            case 1:
                return <IconNotifiType1 />;
            case 2:
                return <IconNotifiType2 />;
            case 3:
                return <IconNotifiType3 />;
            default:
                return null;
        }
    }

    const ItemCard = (item: NotiI, isLast?: boolean) => (
        <BoxContainer styleCustom={{ padding: "13.1px 15.95px", borderRadius: 8, marginBottom: isLast ? 0 : 23, marginTop: 18 }} key={item.id}>
            <ItemContainer>
                <LeftItem>
                    <IconContainer>
                        {renderIcon(item.status)}
                    </IconContainer>
                    <ContentContainer>
                        <TitleItem color="#FFCC00">{item.status}</TitleItem>
                        <ContentItem>{item.type}</ContentItem>
                    </ContentContainer>
                </LeftItem>
                <RightItem>{convertDateToString(new Date(item?.notiTime) ?? new Date())}</RightItem>
            </ItemContainer>
        </BoxContainer>
    )
    return (
        <BoxContainer titleHeader="Quản lý thông báo" styleCustom={{ padding: "21px 24px" }}>
            {notifications.map((item) => ItemCard(item))}
        </BoxContainer>
    )
}
export default Notification;