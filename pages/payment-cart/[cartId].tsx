import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../../store/cartSlice";
import { getProducById } from "../api/productsApi";

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

type Props = {};

const PaymentCart = (props: Props) => {
  const [scopeRender, setScopeRender] = useState<string>("payment");

  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.asPath.split("/")[2];

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
  }, [dispatch, id]);

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
        description: "TNR E-commerce Payment, Information Customer.",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        {scopePayment(scopeRender)}
        {/* <DynamicLayoutPayment /> */}
      </FlexContainer>
    </Page>
  );
};

export default PaymentCart;
