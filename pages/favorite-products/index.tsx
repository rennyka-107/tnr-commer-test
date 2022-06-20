import BoxContainer from "@components/CustomComponent/BoxContainer";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconArrowLeft from "@components/Icons/IconArrowLeft";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductFavorite,
  getProductLocation,
  getProductOrderCondition,
  getProductType,
} from "../../store/productSlice";
import { RootState } from "../../store/store";
import {
  getProductFavoriteApi,
  getProductLocationApi,
  getProductOrderConditionApi,
  getProductTypeApi,
} from "../api/productsApi";

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  padding: 29px 164px;
  margin-top: 127px;
  width: 100%;
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

const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const DynamicBreadcrumsComponent = dynamic(
  () => import("../../src/components/CustomComponent/BreadcrumsComponent"),
  { loading: () => <p>...</p> }
);

const DynamicMenuDropdown = dynamic(() =>
  import("ItemComponents/MenuDropdown").then(
    (m) => m.default,
    (e) => null as never
  )
);

const listBread = [
  {
    id: 1,
    value: "Trang chủ",
  },
];

const FavoriteProducts = () => {
  const [bodySearch, setBodySearch] = useState<any>();
  const {
    productFavorite,
    productFavoriteType,
    productLocation,
    productCondition,
  } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductFavoriteApi(bodySearch);
        dispatch(getProductFavorite(response.responseData));
        const responseType = await getProductTypeApi();
        dispatch(getProductType(responseType.responseData));
        const responseLocation = await getProductLocationApi();
        dispatch(getProductLocation(responseLocation.responseData));
        const responseOrder = await getProductOrderConditionApi();
        dispatch(getProductOrderCondition(responseOrder.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bodySearch]);

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Compare",
        description: "TNR Ecommerce Compare",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <ContainerProduct>
          <DynamicBreadcrumsComponent
            breaditem={listBread}
            activePage="Sản phẩm yêu thích"
          />
          <ContentWrapper>
            <Link href={"/"} passHref>
              <ContentLeftWrapper>
                <IconArrowLeft />
                &nbsp;
                <TextProduct>Sản phẩm yêu thích</TextProduct>
              </ContentLeftWrapper>
            </Link>
            <div style={{ flex: 1 }}>
              <BoxContainer
                styleCustom={{
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <DynamicMenuDropdown
                  title="Vị trí"
                  data={productLocation}
                  onSelect={(values) =>
                    setBodySearch({ location: values.name })
                  }
                />
                <DynamicMenuDropdown
                  title="Loại"
                  data={productFavoriteType}
                  onSelect={(values) => setBodySearch({ type: values.name })}
                />
                <DynamicMenuDropdown
                  title="Khoảng giá"
                  data={[
                    { id: "1", name: "Khoảng từ 1 tỷ đến 5 tỷ" },
                    { id: "2", name: "Khoảng từ 5 tỷ đến 10 tỷ" },
                  ]}
                  onSelect={(values) => setBodySearch(values.name)}
                />
                <DynamicMenuDropdown
                  title="Sắp xếp theo"
                  data={(productCondition || []).map((elm) => ({
                    id: elm.value,
                    name: elm.key,
                  }))}
                  onSelect={(values) =>
                    setBodySearch({ orderCondition: values.name })
                  }
                />
              </BoxContainer>
            </div>
          </ContentWrapper>
          <div style={{ display: "flex", gap: 31 }}>
            <DynamicItemProductComponent data={productFavorite} />
          </div>
        </ContainerProduct>
      </FlexContainer>
    </Page>
  );
};

export default FavoriteProducts;
