import LocalStorage from "utils/LocalStorage";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getProducById } from "../../pages/api/productsApi";
import { getCart } from "../../store/cartSlice";

const useAddToCart = () => {
  const Router = useRouter();
  const dispatch = useDispatch();

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
              Router.push("/payment-cart");
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(getCart({}));
    }
  }
  return handleAddToCart;
};

export default useAddToCart;
