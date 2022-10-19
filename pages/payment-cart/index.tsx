import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { CircularProgress} from "@mui/material";
import { useRouter } from "next/router";

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
  const {
    query: { transactionCode },
  } = useRouter();
  const [scopeRender, setScopeRender] = useState<string>("payment");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(transactionCode)) {
      setScopeRender("info_custom");
    }
  }, [transactionCode]);

  const scopePayment = (_scope) => {
    switch (_scope) {
      case "payment":
        return <DynamicLayoutPayment scopeRender={scopeRender} setScopeRender={setScopeRender} />;
      case "info_custom":
        return <DynamicLayoutInfoCustom scopeRender={scopeRender} setScopeRender={setScopeRender} />;
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
        {!loading ? (
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
