import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CircularProgress, Typography, Grid } from "@mui/material";
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
  const { cart } = useSelector((state: RootState) => state.carts);
  
  useEffect(() => {
    if (!isEmpty(transactionCode)) {
      setScopeRender("info_custom");
    }
  }, [transactionCode]);

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
        {!loading ? (
          !isEmpty(cart) ? (
            scopePayment(scopeRender)
          ) : (
            <Container title={"Giỏ hàng"}>
              <Grid container columnSpacing={"30px"}>
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: "italic",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Giỏ hàng đang trống
                </Typography>
              </Grid>
            </Container>
          )
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
