import Container from "@components/Container";
import { Grid, Typography } from "@mui/material";
import isEmpty from "lodash.isempty";
import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CardItemProduct from "./components/CardItemProduct";
import CartPayment from "./components/CartPayment";
import TableQuote from "./components/TableQuote";

type Props = {
  setScopeRender: Dispatch<SetStateAction<string>>;
};

const LayoutPayment = ({ setScopeRender }: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);

  return isEmpty(cart) ? (
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
  ) : (
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
