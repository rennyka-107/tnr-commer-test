import {
  IconCardPlusOSS,
  IconClipBoardOSS,
  IconSearchOSS,
  IconUserOSS,
  IconYellowStepOSS,
} from "@components/Icons";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

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

export default function OnlineSupportSale() {
  return (
	  <>
      <TexTopStyled>HƯỚNG DẪN MUA ONLINE</TexTopStyled>
    <WrapOSS>
      <ContainerOSS>
        <CardItem>
          <TextCard>Đăng ký/Đăng nhập</TextCard>
          <IconUserOSS />
        </CardItem>
		  <IconYellowStepOSS style={{position: 'absolute', right: '-15px', top: '39%'}}/>
      </ContainerOSS>
      <ContainerOSS>
        <CardItem>
          <TextCard>Tìm kiếm BĐS</TextCard>
          <IconSearchOSS />
        </CardItem>
		<IconYellowStepOSS style={{position: 'absolute', right: '-15px', top: '39%'}}/>
      </ContainerOSS>
      <ContainerOSS>
        <CardItem>
          <TextCard>Đặt mua</TextCard>
          <IconCardPlusOSS />
        </CardItem>
		<IconYellowStepOSS style={{position: 'absolute', right: '-15px', top: '39%'}}/>
      </ContainerOSS>
      <ContainerOSS>
        <CardItem>
          <TextCard>Hoàn tất đơn hàng</TextCard>
          <IconClipBoardOSS />
        </CardItem>
      </ContainerOSS>
    </WrapOSS>
   </>
  );
}
