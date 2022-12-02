import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router, { useRouter } from "next/router";
import { Grid } from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getComparePopUpItem } from "../../../store/productCompareSlice";
import LocalStorage from "utils/LocalStorage";
import { RootState } from "../../../store/store";

interface ProductsProps {
  data?: ProductsResponse[];
}

const DynamicProductCard = dynamic(() =>
  import("./ProjectCard").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
`;
const ItemProduct = ({ data }: ProductsProps) => {
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
      //   console.log(dataProjectType, dataProject);
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
          priceTo: "50",
          priceFrom: "0",
          areaTo: "1000",
          areaFrom: "0",
        },
      });
      LocalStorage.set("compare-url", {
        projectId: projectId,
        projectTypeId: projectType,
        priceTo: "50",
        priceFrom: "0",
        areaTo: "1000",
        areaFrom: "0",
        categoryId: "",
      });
    };

  return (
    <>
      <ProductWrap>
        {data?.map((product: any, index) => {
          // if (!projectId) {
          //   return (
          //     <ContainerProduct>
          //       <DynamicProductCard
          //         id={product.id}
          //         el={product}
          //         src={product.avatar}
          //         title={product?.name}
          //         subTitle={product?.location}
          //         ticketCard={product?.name}
          //         description={product?.description}
          //       />
          //     </ContainerProduct>
          //   );
          // } else {
          return (
            <ItemProductCard
              key={index}
              id={product.productionId}
              src={product.thumbnail}
              title={product.name}
              subTitle={product.projectName}
              dataItem={{
                item1: product.landArea,
                item2: product.numBath,
                item3: product.numBed,
                item4: product.doorDirection,
              }}
              projectTypeCode={product.projectTypeCode}
              minFloor={product.minFloor}
              maxFloor={product.maxFloor}
              floorHeight={product.floorHeight}
              priceListed={product.totalPrice}
              priceSub={product.unitPrice}
              ticketCard={product.category}
              activeSoSanh={true}
              onCompare={onCompare(
                product.projectId,
                product.projectTypeId,
                product.thumbnail,
                product.name,
                product.projectName,
                product.productionId
              )}
            />
          );
          // }
        })}
      </ProductWrap>
    </>
  );
};
export default ItemProduct;
