import { TextField, Box } from "@mui/material";
import React from "react";
import {
  ButtonStyled,
  RowStyled,
  Text18Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";

type Props = {};

const CartPayment = (props: Props) => {
  return (
    <Box width={637} mt={"10px"}>
      <WrapperBoxBorderStyled padding={"20px"} margin={"0px 0px 16px"}>
        <RowStyled>
          <Text18Styled mw={109}>Mã giới thiệu</Text18Styled>
          <TextField fullWidth style={{ maxWidth: 317, marginLeft: 21 }} />
          <ButtonStyled bg={"#e0e0e0"} border={"1px solid #e0e0e0"} mw={112}>
            <Text18Styled>Áp dụng</Text18Styled>
          </ButtonStyled>
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"}>
        <RowStyled>
          <Text18Styled mw={132}>Chọn chiết khấu</Text18Styled>
          <TextField fullWidth style={{ maxWidth: 317 }} />
          <ButtonStyled bg={"#e0e0e0"} border={"1px solid #e0e0e0"} mw={112}>
            <Text18Styled>Áp dụng</Text18Styled>
          </ButtonStyled>
        </RowStyled>
      </WrapperBoxBorderStyled>
    </Box>
  );
};

export default CartPayment;
