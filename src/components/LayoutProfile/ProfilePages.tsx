import BoxContainer from "@components/CustomComponent/BoxContainer";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconArrowRight from "@components/Icons/IconArrowRight";
import IconBasket from "@components/Icons/IconBasket";
import IconBell from "@components/Icons/IconBell";
import IconPen from "@components/Icons/IconPen";
import IconShield from "@components/Icons/IconShield";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

const DynamicContractManage = dynamic(() =>
    import("./ContractManage").then(
        (m) => m.default,
        (e) => null as never
    )
);

const DynamicChangePassword = dynamic(() =>
    import("./ChangePassword").then(
        (m) => m.default,
        (e) => null as never
    )
);

const DynamicEditProfile = dynamic(() =>
    import("./EditProfile").then(
        (m) => m.default,
        (e) => null as never
    )
);

const DynamicNotification = dynamic(() =>
    import("./Notification").then(
        (m) => m.default,
        (e) => null as never
    )
);

const Container = styled.div`
    padding:29px 0px;
    margin-top: 127px;
    display:flex;
`;

const ItemLeft = styled.div`
    padding-right:15px;
    width:255px;
`;

const ItemRight = styled.div`
    padding-left:15px;
    width:824px;
`;

const ItemMenu = styled.div<{ isLast?: boolean }>`
    display:flex;
    margin-bottom:${(props) => { return props.isLast ? '0px' : '33px' }};
    align-items:center;
    cursor:pointer;
`
const ItemLabel = styled.span<{ isActive: boolean }>`
    color:${({ isActive }) => isActive ? "#1B3459" : "#8190A7"};
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21.09px;
    margin-left:10.5px;
    margin-right:15px;
`;

const ProfilePages = () => {

    const [activeTab, setActiveTab] = useState<'contract' | 'notification' | 'changePassword' | 'editProfile'>('contract');

    const renderRightContent = useMemo(() => {
        switch (activeTab) {
            case 'contract':
                return <DynamicContractManage />
            case 'notification':
                return <DynamicNotification />
            case 'changePassword':
                return <DynamicChangePassword />
            case 'editProfile':
                return <DynamicEditProfile />
            default:
                return null;
        }
    }, [activeTab])


    return (
        <FlexContainer>
            <Container>
                <ItemLeft>
                    <BoxContainer styleCustom={{ backgroundColor: '#F3F4F6', padding: "21px 24px" }}>
                        <ItemMenu onClick={() => setActiveTab('contract')}>
                            <IconBasket />
                            <ItemLabel isActive={activeTab == "contract"}>Quản lý giao dịch</ItemLabel>
                            {activeTab == "contract" && <IconArrowRight />}
                        </ItemMenu>
                        <ItemMenu onClick={() => setActiveTab('notification')}>
                            <IconBell />
                            <ItemLabel isActive={activeTab == "notification"}>Thông báo</ItemLabel>
                            {activeTab == "notification" && <IconArrowRight />}
                        </ItemMenu>
                        <ItemMenu onClick={() => setActiveTab('changePassword')}>
                            <IconShield />
                            <ItemLabel isActive={activeTab == "changePassword"}>Đổi mật khẩu</ItemLabel>
                            {activeTab == "changePassword" && <IconArrowRight />}
                        </ItemMenu>
                        <ItemMenu onClick={() => setActiveTab('editProfile')} isLast>
                            <IconPen />
                            <ItemLabel isActive={activeTab == "editProfile"}>Chỉnh sửa hồ sơ</ItemLabel>
                            {activeTab == "editProfile" && <IconArrowRight />}
                        </ItemMenu>
                    </BoxContainer>
                </ItemLeft>
                <ItemRight>
                    {renderRightContent}
                </ItemRight>
            </Container>
        </FlexContainer>
    )
}

export default ProfilePages