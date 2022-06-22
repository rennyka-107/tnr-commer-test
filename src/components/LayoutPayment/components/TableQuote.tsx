import { IconInfoCircle } from "@components/Icons";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
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
import { isEmpty } from "lodash";

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
  item?: any;
};

const TableQuote = ({ width, urlPayment, setScopeRender, item }: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);

  return (
    <WrapperBoxBorderStyled mw={width ?? 350} padding={"20px 20px 25px"}>
      <Title28Styled>Báo giá</Title28Styled>

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Giá BĐS</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.landPrice
              ? currencyFormat(item.landPrice)
              : currencyFormat(cart.totalVatPrice)) ?? "0"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Thuế VAT</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.vat
              ? currencyFormat(item.vat)
              : currencyFormat(cart.vat)) ?? "N/A"}
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phí bảo trì</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.maintainPrice
              ? currencyFormat(item.maintainPrice)
              : currencyFormat(cart.maintainPrice)) ?? "0"}
          </Text14Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền niêm yết</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.totalPrice
              ? currencyFormat(item.totalPrice)
              : currencyFormat(cart.totalPrice)) ?? "0"}
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Giảm giá</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.sales
              ? currencyFormat(item.sales)
              : currencyFormat(cart.sales)) ?? "0"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Chiết khấu NPP</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.nppDiscount
              ? currencyFormat(item.nppDiscount)
              : currencyFormat(cart.nppDiscount)) ?? "0"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền mua online</Text14Styled>
          <Text18Styled fw={500} style={{ color: "#ea242a" }}>
            {(!isEmpty(item) && item.totalOnlinePrice
              ? currencyFormat(item.totalOnlinePrice)
              : currencyFormat(cart.totalPrice)) ?? "0"}
            đ
          </Text18Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tiền đặt chỗ tối thiểu</Text14Styled>
          <Text14Styled fw={500}>
            {!isEmpty(item) && item.totalOnlinePrice
              ? currencyFormat(item.totalOnlinePrice)
              : "1.000.000"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyled>
          <Text14Styled>Tiền đặt hàng quy định</Text14Styled>
          <Text14Styled fw={500}>
            {!isEmpty(item) && item.totalOnlinePrice
              ? currencyFormat(item.totalOnlinePrice)
              : "50.000.000"}{" "}
            đ
          </Text14Styled>
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
