import useAddToCart from "hooks/useAddToCart";
import { useEffect } from "react";

const CartProvider = ({ children }) => {
  const addToCart = useAddToCart();
  useEffect(() => {
    addToCart();
    const listenChangeStorage = ({ newValue, oldValue, key }) => {
      if (key === "cart" && oldValue !== newValue) {
        if (newValue) {
          addToCart(JSON.parse(newValue), false);
        } else {
          addToCart();
        }
      }
    };
    window.addEventListener("storage", listenChangeStorage);
    return () => {
      window.removeEventListener("storage", listenChangeStorage);
    };
  }, []);

  return children;
};

export default CartProvider;
