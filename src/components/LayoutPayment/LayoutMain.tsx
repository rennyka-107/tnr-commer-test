import Container from "@components/Container";
import { IconEmptyShoppingCart } from "@components/Icons";
import styled from "@emotion/styled";
import { Button, Grid, Stack, Typography } from "@mui/material";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReferenceCode } from "../../../store/paymentSlice";
import { RootState } from "../../../store/store";
import CardItemProduct from "./components/CardItemProduct";
import CartPayment from "./components/CartPayment";
import TableQuote from "./components/TableQuote";

type Props = {
  setScopeRender: Dispatch<SetStateAction<string>>;
  scopeRender?: string;
};

const StyledButton = styled(Button)`
  padding: 16px 32px;
  gap: 32px;
  background: #1b3459;
  border-radius: 8px;
  width: 339px;
  height: 53px;
  text-transform: none;
  :hover {
    background: #1b3459;
  }
`;

const StyledTitle = styled(Typography)`
  color: #1b3459;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;

const LayoutPayment = ({ setScopeRender, scopeRender }: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReferenceCode(null));
  }, []);

  const onAdd = () => {
    router.push(
      `/search?Type=Advanded&textSearch=&provinceId=&projectTypeId=&projectId=&priceFrom=&priceTo=&areaFrom=0&areaTo=200`
    );
  };

  return isEmpty(cart) ? (
    <Container title={"Giỏ hàng"}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <IconEmptyShoppingCart />
        <StyledTitle>Chưa có bất động sản nào trong giỏ hàng</StyledTitle>
        <StyledButton variant="contained" onClick={onAdd}>
          Tìm bất động sản ngay
        </StyledButton>
      </Stack>
    </Container>
  ) : (
    <Container title={"Giỏ hàng"}>
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
            scopeRender={scopeRender}
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
