import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import React, { useState } from "react";
import {
  LayoutInfoCustom,
  LayoutPayment,
  LayoutQRCode,
} from "@components/LayoutPayment";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { isEmpty } from "lodash";
import Container from "@components/Container";

const PaymentLogin = () => {
  const [scopeRender, setScopeRender] = useState<string>("payment");
  const { getCart } = useSelector((state: RootState) => state.carts);

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
        {!isEmpty(getCart) ? (
          scopePayment(scopeRender)
        ) : (
          <Container title={"Thanh toán"}>Empty data</Container>
        )}
      </FlexContainer>
    </Page>
  );
};

export default PaymentLogin;
