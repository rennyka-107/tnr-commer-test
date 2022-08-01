import _ from "lodash";

import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ProductCardSearch from "@components/CustomComponent/ItemProductCard/ProductCardSearch";
import useAddToCart from "hooks/useAddToCart";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getComparePopUpItem } from "../../../store/productCompareSlice";

interface searchProps {
  data?: searchLocationResponse[];
  buyDisabled?: boolean;
}
const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
`;
const ItemSearch = ({ data, buyDisabled }: searchProps) => {
  const addToCart = useAddToCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const onCompare =
    (
      projectId: string,
      projectType: string,
      thumbnail: string,
      projectName: string,
      name: string,
      productId: string
    ) =>
    () => {
      const dataProjectType = listMenuBarProjectType.filter(
        (item) => item.id === projectType
      );
      const dataProject = listMenuBarType.filter(
        (item) => item.id === projectId
      );
      localStorage.setItem(
        "listDataLSProjectType",
        JSON.stringify([dataProjectType[0]])
      );
      localStorage.setItem(
        "listParamsLSProjectType",
        JSON.stringify([dataProjectType[0].id])
      );
      localStorage.setItem(
        "listDataLSProject",
        JSON.stringify([dataProject[0]])
      );
      localStorage.setItem(
        "listParamsIdProject",
        JSON.stringify([dataProject[0].id])
      );
      dispatch(
        getComparePopUpItem([
          {
            thumbnail: thumbnail,
            projectName: name,
            name: projectName,
            productId: productId,
            projectId: projectId,
            projectType: projectType,
          },
        ])
      );
      router.push({
        pathname: "/compare-search",
        query: {
          // projectId: projectId,
          // projectTypeId: projectType,
          priceTo: "20",
          priceFrom: "1",
          areaTo: "200",
          areaFrom: "30",
        },
      });
    };

  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ProductCardSearch
            onClick={() => addToCart(product.productId)}
            key={index}
            id={product.productId}
            src={product.thumbnail}
            projectName={product.projectName}
            title={product.name}
            subTitle={product.location}
            activeFavourite={true}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.doorDirection,
            }}
            priceListed={product.totalPrice}
            favouriteStatus={product.favouriteStatus}
            priceSub={product.unitPrice}
            ticketCard={product.category}
            projectTypeCode={product.projectTypeCode}
            minFloor={product.minFloor}
            maxFloor={product.maxFloor}
            activeSoSanh={true}
            buyDisabled={product?.paymentStatus !== 2}
            onCompare={onCompare(
              product.projectId,
              product.projectTypeId,
              product.thumbnail,
              product.name,
              product.projectName,
              product.productId
            )}
          />
        ))}
      </ProductWrap>
    </>
  );
};
export default ItemSearch;
