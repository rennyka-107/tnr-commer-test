import BoxContainer from "@components/CustomComponent/BoxContainer";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconArrowRight from "@components/Icons/IconArrowRight";
import IconBell from "@components/Icons/IconBell";
import IconPen from "@components/Icons/IconPen";
import IconShield from "@components/Icons/IconShield";
import styled from "@emotion/styled";
import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import { useMemo, useState } from "react";

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;
const ItemLeft = styled.div`
  padding-right: 15px;
  width: 300px;
`;
const ItemRight = styled.div`
  padding-left: 15px;
  width: 824px;
`;
const ItemMenu = styled.div<{ isLast?: boolean }>`
  display: flex;
  margin-bottom: ${(props) => {
    return props.isLast ? "0px" : "33px";
  }};
  align-items: center;
  cursor: pointer;
`;
const ItemLabel = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#1B3459" : "#8190A7")};
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  margin-left: 10.5px;
  margin-right: 15px;
`;

const BuyingGuide = () => {
  const [activeTab, setActiveTab] = useState<
    "useMap" | "compare" | "tradingGuide"
  >("useMap");

  const renderRightContent = useMemo(() => {
    switch (activeTab) {
      case "useMap":
        return <div>Sử dụng bản đồ</div>;
      case "compare":
        return <div>So sánh sản phẩm</div>;
      case "tradingGuide":
        return <div>Hướng dẫn giao dịch</div>;

      default:
        return null;
    }
  }, [activeTab]);
  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container>
          <ItemLeft>
            <BoxContainer
              styleCustom={{ backgroundColor: "#F3F4F6", padding: "21px 24px" }}
            >
              <ItemMenu onClick={() => setActiveTab("useMap")}>
                <IconBell />
                <ItemLabel isActive={activeTab == "useMap"}>
                  Sử dụng bản đồ
                </ItemLabel>
                {activeTab == "useMap" && <IconArrowRight />}
              </ItemMenu>
              <ItemMenu onClick={() => setActiveTab("compare")}>
                <IconShield />
                <ItemLabel isActive={activeTab == "compare"}>
                  So sánh sản phẩm
                </ItemLabel>
                {activeTab == "compare" && <IconArrowRight />}
              </ItemMenu>
              <ItemMenu onClick={() => setActiveTab("tradingGuide")} isLast>
                <IconPen />
                <ItemLabel isActive={activeTab == "tradingGuide"}>
                  Hướng dẫn giao dịch
                </ItemLabel>
                {activeTab == "tradingGuide" && <IconArrowRight />}
              </ItemMenu>
            </BoxContainer>
          </ItemLeft>
          <ItemRight>
            <BoxContainer styleCustom={{ minHeight: 1000, padding: 10 }}>
              {renderRightContent}
            </BoxContainer>
          </ItemRight>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default WithAuth(BuyingGuide);
