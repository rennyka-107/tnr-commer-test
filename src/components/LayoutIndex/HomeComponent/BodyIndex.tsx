import FlexContainer from "@components/CustomComponent/FlexContainer";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import {
  IconBatDongSan,
  IconCanHo,
  IconChungCu,
  IconKhuDoThi,
} from "@components/Icons";
import _ from "lodash";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { TBOUTStanding } from "interface/product";
import { useSelector } from "react-redux";
import Product1 from "../../../../public/images/product1.png";
import Product2 from "../../../../public/images/product2.png";
import Product3 from "../../../../public/images/product3.png";
import { RootState } from "../../../../store/store";
import Router from "next/router";

interface ProductsIndexProps {
  listProductOutOfStanding?: TBOUTStanding[];
}

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
  cursor: pointer;
  max-width: 150px;
`;
const WrapIcon = styled(Button)`
  width: 111px;
  height: 111px;
  background: #fec83c;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
  :hover{
	background: #1b3459;
  }
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

  height: auto;
`;
export default function BodyIndex() {
  const { productTopByOutStanding } = useSelector(
    (state: RootState) => state.products
  );

  const sizeOfArray = _.size(productTopByOutStanding);
  return (
    <FlexContainer>
      <WrapContainer>
        <WrapIconContainer >
          <WrapIcon className="icon-chungcu-hover">
            <IconChungCu className="icon-chungcu-hover" />
          </WrapIcon>
          <TextBottomIcon>Chung cư</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer >
          <WrapIcon className="icon-canho-hover">
            <IconCanHo className="icon-canho-hover" />
          </WrapIcon>
          <TextBottomIcon>Căn hộ dịch vụ</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer>
          <WrapIcon className="icon-batdongsan-hover">
            <IconBatDongSan className="icon-batdongsan-hover" />
          </WrapIcon>
          <TextBottomIcon>Bất động sản nghỉ dưỡng</TextBottomIcon>
        </WrapIconContainer>
        <WrapIconContainer >
          <WrapIcon className="icon-khudothi-hover">
            <IconKhuDoThi className="icon-khudothi-hover" />
          </WrapIcon>
          <TextBottomIcon>Khu đô thị</TextBottomIcon>
        </WrapIconContainer>
      </WrapContainer>
      <ContainerProduct
        style={{
          width: sizeOfArray >= 4 ? "100%" : 1115,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            marginTop: 75,
            marginBottom: 33
          }}
        ></div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <TextBDS>BẤT ĐỘNG SẢN NỔI BẬT</TextBDS>
            <LinkStyled href="">Xem tất cả</LinkStyled>
          </div>
          <div
            style={{
              display: "grid",
              gap: 31,
              gridTemplateColumns: "repeat(4, auto)",
              justifyContent: sizeOfArray >= 4 ? "center" : "",
            }}
          >
            {productTopByOutStanding.length > 0 ? (
              <>
                {productTopByOutStanding.map((item, index) => (
                  <ItemProductCard
                    key={index}
                    id={item.id}
                    src={Product1}
                    title={item.name}
                    subTitle={item.projectLocation}
                    dataItem={{
                      item1: item.landArea,
                      item2: item.numBath,
                      item3: item.numBed,
                      item4: item.doorDirection,
                    }}
                    priceListed={item.price}
                    priceSub={item.unitPrice}
                    ticketCard="TRN Gold"
                    onClick={() => {
                      Router.push('/payment-cart')
                    }}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          {/* <ItemProductCard
            src={Product2}
            title="TNR AMALUNA - TRÀ VINH - LK.08.32"
            subTitle="Hải Phòng"
            dataItem={{
              item1: "1",
              item2: "1",
              item3: "1",
              item4: "Tây",
            }}
            priceListed={3018933000}
            priceSub={40580174}
            ticketCard="TRN Star"
            onClick={() => Router.push('/payment-cart')}
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
          /> */}
        </div>
      </ContainerProduct>
    </FlexContainer>
  );
}
