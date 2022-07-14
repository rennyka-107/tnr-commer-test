import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { addProductToFavourite } from "../../pages/api/FavouriteApi";
import { setProductFavourite } from "../../store/productFavouriteSlice";
import useNotification from "./useNotification";

const useFavourite = () => {
  const [productId, setProductId] = useState("");
  const [checkReload, setCheckReload] = useState(false);
  const dispatch = useDispatch();
  const Router = useRouter();
  const notification = useNotification();
  //  const [action,setAction] = useState(0);

  const addProductToFavouriteFunction = async (id: any, action: any) => {
    const body = {
      productionId: id,
      action: action,
    };
    if (LocalStorage.get("accessToken") || SessionStorage.get("accessToken")) {
      if (id) {
        const response: any = await addProductToFavourite(body);
        if (response.responseCode === "00") {
          dispatch(setProductFavourite(true));
          setCheckReload(true);
          if (!isEmpty(response.responseData)) {
            dispatch(setProductFavourite(true));
            notification({
              severity: "success",
              title: `Bỏ sản phẩm yêu thích`,
              message: `Bỏ sản phẩm khỏi danh sách yêu thích thành công`,
            });
          } else {
            dispatch(setProductFavourite(false));
            notification({
              severity: "success",
              title: `Thêm vào yêu thích`,
              message: `Thêm sản phẩm vào yêu thích thành công`,
            });
          }
        } else if (response.responseCode === "9999") {
          notification({
            severity: "error",
            title: `Thêm sản phẩm thất bại`,
            message: `Thêm sản phẩm vào yêu thích thất bại`,
          });
        }
      } else {
      }
    } else {
      Router.push(`/authen?prePath=%2Fprofile&tabIndex=register`);
    }
  };
  return { addProductToFavouriteFunction, setProductId, checkReload };
};
export default useFavourite;
