import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getCart } from "../../store/cartSlice";
import { getProducById } from "../api/productsApi";
import { CircularProgress } from "@mui/material";

const DynamicLayoutPayment = dynamic(
  () => import("../../src/components/LayoutPayment/LayoutMain"),
  { loading: () => <p>...</p> }
);
const DynamicLayoutInfoCustom = dynamic(
  () => import("../../src/components/LayoutPayment/LayoutInfoCustom"),
  { loading: () => <p>...</p> }
);
const DynamicLayoutQRCode = dynamic(
  () => import("../../src/components/LayoutPayment/LayoutQRCode"),
  { loading: () => <p>...</p> }
);

const PaymentLogin = () => {
  const [scopeRender, setScopeRender] = useState<string>("payment");

  const dispatch = useDispatch();
  const { getCart: dataCart } = useSelector((state: RootState) => state.carts);
  const id =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart-id"))
      : null;

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const data = await getProducById(id);
          dispatch(getCart(data.responseData));
        }
      } catch (error) {
        // throw new Error(error)
        console.log("error", error);
      }
    })();
  }, [id, dispatch]);

  const scopePayment = (_scope) => {
    switch (_scope) {
      case "payment":
        return <DynamicLayoutPayment setScopeRender={setScopeRender} />;
      case "info_custom":
        return <DynamicLayoutInfoCustom setScopeRender={setScopeRender} />;
      case "transaction_message":
        return <DynamicLayoutQRCode />;
    }
  };

  return (
    <Page
      meta={{
        title: "TNR E-commerce Payment",
        description: "TNR E Payment",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        {!isEmpty(dataCart) ? (
          scopePayment(scopeRender)
        ) : (
          <Container title={"Thanh toán"}>
            <div style={{ textAlign: "center", margin: "200px 0px" }}>
              <CircularProgress />
            </div>
          </Container>
        )}
      </FlexContainer>
    </Page>
  );
};

export default PaymentLogin;
