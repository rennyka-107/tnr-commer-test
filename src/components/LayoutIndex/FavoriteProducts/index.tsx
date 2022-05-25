import FlexContainer from "@components/CustomComponent/FlexContainer";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import IconArrowLeft from "@components/Icons/IconArrowLeft";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Filter from "../../../../pages/projectTNR/filter";
import Product1 from "../../../../public/images/product1.png";
import Product2 from "../../../../public/images/product2.png";
import Product3 from "../../../../public/images/product3.png";
import Link from "next/link";
import dynamic from "next/dynamic";

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  width: 1115px;
  height: auto;
  margin-bottom: 120px;
  margin-top: 86px;
`;

const TextProduct = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand/Main color */

  color: #1b3459;
`;

const ContentWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  margin-bottom: 56px;
`;
const ContentLeftWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex: 1;
`;


const DynamicBreadcrumsComponent = dynamic(
	() =>
	  import("../../../../src/components/CustomComponent/BreadcrumsComponent"),
	{ loading: () => <p>...</p> }
  );

const listBread = [
  {
    id: 1,
    value: "Trang chủ",
  },
];

const FavoriteProducts = () => {
  return (
    <FlexContainer>
      <ContainerProduct>
        <DynamicBreadcrumsComponent
          breaditem={listBread}
          activePage="Sản phẩm yêu thích"
        />
        <Link href={"/"} passHref>
          <ContentWrapper>
            <ContentLeftWrapper>
              <IconArrowLeft />
              &nbsp;
              <TextProduct>Sản phẩm yêu thích</TextProduct>
            </ContentLeftWrapper>
            <div style={{ flex: 1 }}>
              <Filter />
            </div>
          </ContentWrapper>
        </Link>
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
};

export default FavoriteProducts;
