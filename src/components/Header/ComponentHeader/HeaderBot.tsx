import { IconBag, IconHeart, IconUser, Logo } from "@components/Icons";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import MenuDropdown from "ItemComponents/MenuDropdown";
import Link from "next/link";

const ContainerNavTop = styled.div`
  height: 93px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  box-shadow: 0px -4px 20px 1px rgba(0, 0, 0, 0.15);
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0px 50px 0px 50px;
  justify-content: space-between;
`;
const WrapMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextLink = styled.span`
  text-transform: none;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0e1d34;
`;
const WrapRightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
const ButtonBuyHelp = styled(Button)`
  height: 39px;
  width: 145px;
  background: #ffffff;
  border: 1px solid #ea242a;
  border-radius: 8px;
  padding: 8px 25px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #0e1d34;
  text-transform: none;

  :hover {
    background: #ea242a;
    color: #ffffff;
  }
`;
const IconAccountWrap = styled.div`
  display: flex;
  gap: 30px;
`;
// const TextBuyHelp = styled.span`
//   width: auto;

// `;
const HeaderBot = () => {
  return (
    <ContainerNavTop>
      <BodyContainer>
        <WrapMenuItem>
          <Logo />
          <MenuDropdown title={"Loại bất động sản"} />
          <MenuDropdown title={"Dự Án"} />
          <Button>
            <TextLink>Khuyến mãi</TextLink>
          </Button>
          <Button>
            <TextLink>Tin tức</TextLink>
          </Button>
        </WrapMenuItem>
        <WrapRightItem>
          <ButtonBuyHelp>Hướng dẫn mua online</ButtonBuyHelp>
          <IconAccountWrap>
            <IconUser />
            <IconHeart />
            <IconBag total={10} />
          </IconAccountWrap>
        </WrapRightItem>
      </BodyContainer>
    </ContainerNavTop>
  );
};

export default HeaderBot;
