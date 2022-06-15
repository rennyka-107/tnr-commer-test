import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconArrowLeft from "@components/Icons/IconArrowLeft";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductFavorite } from "../api/productsApi";

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

const DynamicFilter = dynamic(
  () => import("../../src/components/LayoutProjectTNR/filter"),
  { loading: () => <p>...</p> }
);

const listBread = [
  {
    id: 1,
    value: "Trang chủ",
  },
];

const FavoriteProducts = () => {
  const [listProduct, setListProduct] = useState([]);
  const [bodySearch, setBodySearch] = useState<any>();
  
  const onFilter = (values) => {
    let formData = new FormData();
    formData.append("type", values?.projectTypeId);
    setBodySearch(formData);
    
  };


  useEffect(() => {
    (async () => {
      try {
        const response = await getProductFavorite(bodySearch);
        if (response.responseCode === "00") {
          setListProduct(response.responseData);
        } else {
          setListProduct(response.responseData);
        }
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
              <DynamicFilter onSubmit={onFilter} />
            </div>
          </ContentWrapper>
          <div style={{ display: "flex", gap: 31 }}>
            <DynamicItemProductComponent data={listProduct} />
          </div>
        </ContainerProduct>
      </FlexContainer>
    </Page>
  );
};

export default FavoriteProducts;
