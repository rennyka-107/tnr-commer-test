import { IconInfoCircle } from "@components/Icons";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Link from "next/link";
import { isEmpty } from "lodash";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  ButtonAction,
  LinedStyled,
  RowStyled,
  Text12ItalicStyled,
  Text14Styled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import { currencyFormat } from "utils/helper";

const BoxDetailInfo = styled(Box)({
  marginTop: 15,
});

const RowStyledAgain = styled(RowStyled)({
  marginBottom: 10,
});

type Props = {
  width?: number;
  urlPayment?: string;
  setScopeRender: Dispatch<SetStateAction<string>>;
};

const TableQuote = ({ width, urlPayment, setScopeRender }: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);

  return (
    <WrapperBoxBorderStyled mw={width ?? 350} padding={"20px 20px 25px"}>
      <Title28Styled>Báo giá</Title28Styled>

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Giá BĐS</Text14Styled>
          <Text14Styled>{cart.totalVatPrice ? currencyFormat(cart.totalVatPrice) : "N/A"} đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Thuế VAT</Text14Styled>
          <Text14Styled>{cart.vat ? currencyFormat(cart.vat) : "N/A"} đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phí bảo trì</Text14Styled>
          <Text14Styled>{cart.maintainPrice ? currencyFormat(cart.maintainPrice) : "N/A"} đ</Text14Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền niêm yết</Text14Styled>
          <Text14Styled>{cart.totalPrice ? currencyFormat(cart.totalPrice) : "N/A"} đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Giảm giá</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Chiết khấu NPP</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền mua online</Text14Styled>
          <Text18Styled fw={500} style={{ color: "#ea242a" }}>
            {cart.totalPrice ? currencyFormat(cart.totalPrice) : "N/A"} đ
          </Text18Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tiền đặt chỗ tối thiểu</Text14Styled>
          <Text14Styled fw={500}>1.000.000 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyled>
          <Text14Styled>Tiền đặt hàng quy định</Text14Styled>
          <Text14Styled fw={500}>50.000.000 đ</Text14Styled>
        </RowStyled>
      </BoxDetailInfo>

      {urlPayment && (
        <BoxDetailInfo>
          <RowStyledAgain justifyContent={"start"}>
            <IconInfoCircle />
            &nbsp;
            <Text12ItalicStyled>
              Nếu đã có tài khoản, vui lòng{" "}
              <Link href={"/home"}>
                <a style={{ color: "#0063F7", textDecoration: "underline" }}>
                  ĐĂNG NHẬP
                </a>
              </Link>{" "}
              để lưu thông tin thanh toán
            </Text12ItalicStyled>
          </RowStyledAgain>
          <RowStyled>
            <ButtonAction onClick={() => setScopeRender(urlPayment)}>
              <Text18Styled color={"white"}>Tiếp tục thanh toán</Text18Styled>
            </ButtonAction>
          </RowStyled>
        </BoxDetailInfo>
      )}
    </WrapperBoxBorderStyled>
  );
};

export default TableQuote;
