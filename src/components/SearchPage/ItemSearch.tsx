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
import LocalStorage from "utils/LocalStorage";
import useNotification from "hooks/useNotification";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { isEmpty } from "lodash";

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
  const { cart } = useSelector((state: RootState) => state.carts);
  const notification = useNotification();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [tempCart, setTempCart] = useState<searchLocationResponse | null>(null);

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

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleAddToCart = (product: searchLocationResponse) => () => {
    // addToCart(product.productId);
    console.log("addd", product);
    console.log("cart123123", cart, isEmpty(cart));
    if (cart && cart.id === product.productId) {
      notification({
        severity: "success",
        message: "Sản phẩm này đã có sẵn trong giỏ hàng",
      });
    } else if (isEmpty(cart)) {
      addToCart(product.productId);
    } else {
      setTempCart(product);
      setOpenConfirmDialog(true);
    }
  };

  const handleChangeCartITem = (product: searchLocationResponse) => () => {
    addToCart(product.productId);
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => {
          return (
            <ProductCardSearch
              onClick={handleAddToCart(product)}
              key={index}
              id={product.productId}
              src={product.thumbnail}
              projectName={product.projectName}
              title={product.name}
              subTitle={product.location}
              build={product.build}
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
          );
        })}
      </ProductWrap>
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleChangeCartITem}
        tempCart={tempCart}
      />
    </>
  );
};
export default ItemSearch;
