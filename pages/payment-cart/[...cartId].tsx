import FlexContainer from "@components/CustomComponent/FlexContainer";
import {
  LayoutInfoCustom,
  LayoutPayment,
  LayoutQRCode,
} from "@components/LayoutPayment";
import Page from "@layouts/Page";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../../store/cartSlice";
import { getProducById } from "../api/productsApi";

// const DynamicLayoutPayment = dynamic(
//   () => import("../../src/components/LayoutPayment")
// );

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
        return <LayoutPayment setScopeRender={setScopeRender} />;
      case "info_custom":
        return <LayoutInfoCustom setScopeRender={setScopeRender} />;
      case "transaction_message":
        return <LayoutQRCode />;
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
        {scopePayment(scopeRender)}
        {/* <DynamicLayoutPayment /> */}
      </FlexContainer>
    </Page>
  );
};

export default PaymentCart;
