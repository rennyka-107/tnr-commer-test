import FlexContainer from "@components/CustomComponent/FlexContainer";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import {
  IconBatDongSan,
  IconCanHo,
  IconChungCu,
  IconKhuDoThi,
} from "@components/Icons";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Product1 from "../../../../public/images/product1.png";
import Product2 from "../../../../public/images/product2.png";
import Product3 from "../../../../public/images/product3.png";

const WrapContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 50px;
  height: 200px;
  align-items: flex-start;
`;
const WrapIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 150px;
`;
const WrapIcon = styled.div`
  width: 111px;
  height: 111px;
  background: #fec83c;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
`;

const TextBottomIcon = styled(Typography)`
  margin-top: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  /* Brand/Main color */

  color: #1b3459;
`;

const TextBDS = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;

  /* Brand/Main color */

  color: #1b3459;
`;
const LinkStyled = styled.a`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  text-align: right;

  color: #1f70e8;
`;

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  width: 1115px;
  height: auto;
`;
export default function BodyIndex() {
  return (
    <FlexContainer>
      <WrapContainer>
        <WrapIconContainer>
          <WrapIcon>
            <IconChungCu />
          </WrapIcon>
          <TextBottomIcon>Chung cư</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer>
          <WrapIcon>
            <IconCanHo />
          </WrapIcon>
          <TextBottomIcon>Căn hộ dịch vụ</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer>
          <WrapIcon>
            <IconBatDongSan />
          </WrapIcon>
          <TextBottomIcon>Bất động sản nghỉ dưỡng</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer>
          <WrapIcon>
            <IconKhuDoThi />
          </WrapIcon>
          <TextBottomIcon>Khu đô thị</TextBottomIcon>
        </WrapIconContainer>
      </WrapContainer>
      <ContainerProduct>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            marginTop: 75,
			marginBottom: 33
          }}
        >
          <TextBDS>BẤT ĐỘNG SẢN NỔI BẬT</TextBDS>
          <LinkStyled href="">Xem tất cả</LinkStyled>
        </div>
        <div style={{ display: "flex", gap: 31 }}>
          <ItemProductCard
            src={Product1}
            title="TNR The Nosta"
            subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
            dataItem={{
              item1: "02",
              item2: "02",
              item3: "80",
              item4: "Đông Nam",
            }}
            priceListed={3018933000}
            priceSub={40580174}
            ticketCard="TRN Gold"
          />
          <ItemProductCard
            src={Product2}
            title="TNR Stars Lam Sơn"
            subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
            dataItem={{
              item1: "02",
              item2: "02",
              item3: "80",
              item4: "Đông Nam",
            }}
            priceListed={3018933000}
            priceSub={40580174}
            ticketCard="TRN Star"
          />
          <ItemProductCard
            src={Product3}
            title="TNR GoldSeason"
            subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
            dataItem={{
              item1: "02",
              item2: "02",
              item3: "80",
              item4: "Đông Nam",
            }}
            priceListed={3018933000}
            priceSub={40580174}
            ticketCard="TNR Grand Palace"
          />
        </div>
	
      </ContainerProduct>
    </FlexContainer>
  );
}
