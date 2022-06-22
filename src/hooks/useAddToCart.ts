import useNotification from 'hooks/useNotification';
import LocalStorage from "utils/LocalStorage";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getProducById } from "../../pages/api/productsApi";
import { getCart } from "../../store/cartSlice";

const useAddToCart = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const notification = useNotification();

  function handleAddToCart(idProduct?: string, redirect: boolean = true) {
    const id = idProduct ? idProduct : LocalStorage.get("cart");
    if (!isEmpty(id)) {
      getProducById(id)
        .then((res) => {
          if (
            !isEmpty(res.responseData) &&
            res.responseData?.paymentStatus === 2
          ) {
            dispatch(getCart(res.responseData));
            if (LocalStorage.get("cart") !== res.responseData.id) {
              LocalStorage.set("cart", res.responseData.id);
            }
            if (!isEmpty(idProduct) && redirect) {
              notification({
                severity: "success",
                title: "Giỏ hàng",
                message: "Thêm vào giỏ hàng thành công"
              })
              Router.push("/payment-cart");
            }
          } else {
            if(isEmpty(res.responseData)) {
              notification({
                error: res.responseData,
                title: "Giỏ hàng",
              })
            }
            if(res.responseData?.paymentStatus !== 2) {
              notification({
                error: "Sản phẩm này đang bị khóa hoặc đã hết",
                title: "Giỏ hàng",
              })
            } 
          }
        })
        .catch((err) => notification({
          error: "Có lỗi xảy ra",
          title: "Giỏ hàng",
        }));
    } else {
      dispatch(getCart({}));
    }
  }
  return handleAddToCart;
};

export default useAddToCart;
