import Container from "@components/Container";
import { Grid } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import CardItemProduct from "./CardItemProduct";
import CartPayment from "./CartPayment";
import TableQuote from "./TableQuote";

type Props = {
  setScopeRender: Dispatch<SetStateAction<string>>;
};

const LayoutPayment = ({ setScopeRender }: Props) => {
  return (
    <Container title={"Thanh toán"}>
      <Grid container columnSpacing={"30px"}>
        <Grid
          item
          xs={7}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"end"}
        >
          <CardItemProduct />
          <CartPayment />
        </Grid>
        <Grid item xs={5}>
          <TableQuote
            width={445}
            urlPayment={"info_custom"}
            setScopeRender={setScopeRender}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LayoutPayment;
