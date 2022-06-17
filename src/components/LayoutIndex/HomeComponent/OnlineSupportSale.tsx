import {
  IconCardPlusOSS,
  IconClipBoardOSS,
  IconMuaOnline,
  IconSearchOSS,
  IconUserOSS,
  IconYellowStepOSS,
} from "@components/Icons";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import Router from "next/router";

const WrapOSS = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;
const TexTopStyled = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  /* identical to box height */
  text-align: center;
  color: #322f50;
  margin-bottom: 40px;
`;
const ContainerOSS = styled.div`
  position: relative;
  width: 255px;
  height: 161px;
  background: #ffffff;
  /* Brand/Sub 1 */

  border: 1px solid #fec83c;
  border-radius: 20px;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const TextCard = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 27px;
  margin-top: 19px;
  /* identical to box height */

  /* Brand/Text */

  color: #0e1d34;
`;
const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  margin-bottom: -10px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #ffffff;
    box-shadow: 4px 8px 24px #f2f2f5;
    border: 1px solid #48576d;
    border-radius: 60px;
    color: #48576d;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export default function OnlineSupportSale() {
  return (
    <div
      id="huongdan-online"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TexTopStyled>HƯỚNG DẪN MUA ONLINE</TexTopStyled>
      <WrapOSS>
        <ContainerOSS>
          <CardItem>
            <TextCard>Đăng ký/Đăng nhập</TextCard>
            <IconUserOSS />
          </CardItem>
          <IconYellowStepOSS
            style={{ position: "absolute", right: "-15px", top: "39%" }}
          />
        </ContainerOSS>
        <ContainerOSS>
          <CardItem>
            <TextCard>Tìm kiếm BĐS</TextCard>
            <IconSearchOSS />
          </CardItem>
          <IconYellowStepOSS
            style={{ position: "absolute", right: "-15px", top: "39%" }}
          />
        </ContainerOSS>
        <ContainerOSS>
          <CardItem>
            <TextCard>Đặt mua</TextCard>
            <IconCardPlusOSS />
          </CardItem>
          <IconYellowStepOSS
            style={{ position: "absolute", right: "-15px", top: "39%" }}
          />
        </ContainerOSS>
        <ContainerOSS>
          <CardItem>
            <TextCard>Hoàn tất đơn hàng</TextCard>
            <IconClipBoardOSS />
          </CardItem>
        </ContainerOSS>
      </WrapOSS>
      <div style={{ marginTop: 50 }}>
        <ButtonStyled onClick={() => {
			Router.replace(`/buyingGuide?idUserManual=3e63c59e-7995-4f8b-b553-740d131a052f&&selected=0`)
		}}>
         Xem Chi Tiết&nbsp;&nbsp;&nbsp;
          <IconMuaOnline />
        </ButtonStyled>
      </div>
    </div>
  );
}
