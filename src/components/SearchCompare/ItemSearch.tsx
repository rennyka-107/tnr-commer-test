import _ from "lodash";

import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ProductCardSearch from "@components/CustomComponent/ItemProductCard/ProductCardSearch";
import ItemCompareSearch from "@components/CustomComponent/ItemProductCard/ItemCompareSearch";
import LocalStorage from "utils/LocalStorage";
import { useEffect, useState } from "react";
import ComparePopUp from "@components/CustomComponent/ComparePopup";
import { useDispatch, useSelector } from "react-redux";
import {
  getComparePopUpItem,
  comparePopUpItemI,
} from "../../../store/productCompareSlice";
import { RootState } from "../../../store/store";
import { useRouter } from "next/router";

interface searchProps {
  data?: searchLocationResponse[];
}
const ContainerProduct = styled.div`
  @media screen and (max-width: 1440px) {
    display: flex;
    justify-content: center;
  }
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const ItemSearch = ({ data }: searchProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { comparePopUpItem, isValid } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  const onCompare = (product: searchLocationResponse) => () => {
    const local: comparePopUpItemI[] = _.cloneDeep(comparePopUpItem);
    if (local) {
      if (
        local.length >= 3 ||
        local.find((item) => item.productId === product.productId)
      )
        return;
      local.push({
        thumbnail: product.thumbnail,
        projectName: product.projectName,
        name: product.name,
        productId: product.productId,
        projectId: product.projectId,
        projectType: product.projectTypeId,
      });
      LocalStorage.set("compare-url", {
        projectId: product.projectId,
        projectTypeId: product.projectTypeId,
        priceTo: "50",
        priceFrom: "0",
        areaTo: "1000",
        areaFrom: "0",
        categoryId: "",
      });
      dispatch(getComparePopUpItem(local));
    } else {
      dispatch(getComparePopUpItem([product]));
    }
  };

  return (
    <ContainerProduct>
      <ProductWrap>
        {data?.map((product, index) => (
          <ItemCompareSearch
            key={index}
            id={product.productId}
            src={product.thumbnail}
            title={product.name}
            projectName={product.projectName}
            subTitle={product.location}
            activeFavourite={true}
            favouriteStatus={product.favouriteStatus}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.doorDirection,
            }}
            build={product.build}
            priceListed={product.totalPrice}
            projectTypeCode={product.projectTypeCode}
            floor={product.floor}
            minFloor={product.minFloor}
            maxFloor={product.maxFloor}
            floorHeight={product.floorHeight}
            priceSub={product.unitPrice}
            ticketCard={product.category}
            onCompare={onCompare(product)}
            isCompare={
              comparePopUpItem?.filter(
                (item) => item.productId === product.productId
              ).length > 0
            }
          />
        ))}
        <ComparePopUp />
      </ProductWrap>
    </ContainerProduct>
  );
};
export default ItemSearch;
