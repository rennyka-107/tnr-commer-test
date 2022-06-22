import useAddToCart from "hooks/useAddToCart";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CartProvider = ({ children }) => {
  const addToCart = useAddToCart();
  const router = useRouter();
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
  }, [router.pathname === "/"]);

  return children;
};

export default CartProvider;
