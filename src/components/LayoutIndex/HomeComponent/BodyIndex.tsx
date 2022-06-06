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
import { useRouter } from "next/router";
import PathRoute from "utils/PathRoute";
import { Button, Typography } from "@mui/material";
import { TBOUTStanding } from "interface/product";
import { useDispatch, useSelector } from "react-redux";
import Product1 from "../../../../public/images/product1.png";
import Product2 from "../../../../public/images/product2.png";
import Product3 from "../../../../public/images/product3.png";
import { RootState } from "../../../../store/store";
import { getListProductApi } from "../../../../pages/api/productsApi";
import { getListProduct } from "../../../../store/productSlice";
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
  :hover {
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
  const dispatch = useDispatch();

  const router = useRouter();
  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const { productTopByOutStanding } = useSelector(
    (state: RootState) => state.products
  );

  const sizeOfArray = _.size(productTopByOutStanding);

  const onClickProduct = async (projectTypeId) => {
    const paramsSearch = {
      page: 1,
      size: 10,
    };

    const searchList = {
      projectId: "",
      location: "",
      projectTypeId: projectTypeId,
    };
    try {
      const response = await getListProductApi(paramsSearch, searchList);
      dispatch(getListProduct(response.responseData));

      if (response.responseCode === "00") {
        console.log("response", response);
        router.replace(`/${PathRoute.ProductTNR}?type=${projectTypeId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexContainer>
      <WrapContainer>
        {(listMenuBarProjectType || []).map((item, index) => {
          return (
            <WrapIconContainer
              key={index}
              onClick={() => {
                onClickProduct(item.id);
              }}
            >
              <WrapIcon>
                <IconChungCu />
              </WrapIcon>
              <TextBottomIcon>{item.name}</TextBottomIcon>
            </WrapIconContainer>
          );
        })}
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
            marginBottom: 33,
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
                      Router.push("/payment-cart");
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
