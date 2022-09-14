import { IconInfoCircle } from "@components/Icons";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { apiValidReferenceCode } from "../../../../pages/api/paymentApi";
import useNotification from "hooks/useNotification";
import { setReferenceCode } from "../../../../store/paymentSlice";
import useAuth from "hooks/useAuth";

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
  const { isAuthenticated } = useAuth();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const referenceCode = useSelector(
    (state: RootState) => state.payments.referenceCode
  );
  const notification = useNotification();
  return (
    <WrapperBoxBorderStyled mw={width ?? 350} padding={"20px 20px 25px"}>
      <Title28Styled>Báo giá</Title28Styled>

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Đơn giá QSDĐ</Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            productItem.LandPrice !== 0 &&
            productItem.LandPrice !== null
              ? currencyFormat(productItem.LandPrice)
              : !isEmpty(item)
              ? currencyFormat(item.landPrice)
              : currencyFormat(cart.totalVatPrice)) ?? "0"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Tổng giá trị QSDĐ</Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            productItem.LandMoney !== 0 &&
            productItem.LandMoney !== null
              ? currencyFormat(productItem.LandMoney)
              : !isEmpty(item) && item.landMoney
              ? currencyFormat(item.landMoney)
              : currencyFormat(cart.vat)) ?? "N/A"}
          </Text14Styled>
        </RowStyledAgain>
        {/* <RowStyledAgain>
          <Text14Styled>Phí bảo trì</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) && item.maintainPrice
              ? currencyFormat(item.maintainPrice)
              : currencyFormat(cart.maintainPrice)) ?? "0"}
          </Text14Styled>
        </RowStyledAgain> */}
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền niêm yết</Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            productItem.PreTotalMoney !== 0 &&
            productItem.PreTotalMoney !== null
              ? currencyFormat(productItem.PreTotalMoney)
              : !isEmpty(item) && item.totalPrice
              ? currencyFormat(item.totalPrice)
              : currencyFormat(cart.totalPrice)) ?? "0"}
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Giảm giá</Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            productItem.PromotionMoney !== 0 &&
            productItem.PromotionMoney !== null
              ? currencyFormat(productItem.PromotionMoney)
              : !isEmpty(item) && item.promotionMoney
              ? currencyFormat(item.promotionMoney)
              : currencyFormat(cart.sales)) ?? "0"}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền mua online</Text14Styled>
          <Text18Styled fw={500} style={{ color: "#ea242a" }}>
            {(!isEmpty(productItem) &&
            productItem.TotalMoney !== 0 &&
            productItem.TotalMoney !== null
              ? currencyFormat(productItem.TotalMoney)
              : !isEmpty(item) && item.totalOnlinePrice
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
            {!isEmpty(item) && item.minEarnestMoney
              ? currencyFormat(item.minEarnestMoney)
              : currencyFormat(cart.minEarnestMoney)}
            đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyled>
          <Text14Styled>Tiền đặt hàng quy định</Text14Styled>
          <Text14Styled fw={500}>
            {!isEmpty(item) && item.regulationOrderPrice
              ? currencyFormat(item.regulationOrderPrice)
              : currencyFormat(cart.regulationOrderPrice)}
            đ
          </Text14Styled>
        </RowStyled>
      </BoxDetailInfo>

      {urlPayment && (
        <BoxDetailInfo>
          {!isAuthenticated && <RowStyledAgain justifyContent={"start"}>
            <IconInfoCircle />
            <Text12ItalicStyled>
              Nếu đã có tài khoản, vui lòng{" "}
              <Link href={"/authen?prePath=payment-cart&tabIndex=login"}>
                <a style={{ color: "#0063F7", textDecoration: "underline" }}>
                  ĐĂNG NHẬP
                </a>
              </Link>
              để lưu thông tin thanh toán
            </Text12ItalicStyled>
          </RowStyledAgain>}
          <RowStyled>
            <ButtonAction
              sx={{
                "&:hover": {
                  background: "#FEC83C !important",
                  // box-shadow: 4px 8px 24px #f2f2f5;
                  boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                  // borderRadius: "60px",
                  color: "#ffffff",
                },
              }}
              onClick={() => {
                if (!isEmpty(referenceCode)) {
                  apiValidReferenceCode(referenceCode)
                    .then((res) => {
                      if (res.responseData) {
                        setScopeRender(urlPayment);
                      } else {
                        notification({
                          severity: "error",
                          title: "Xác thực mã giới thiệu",
                          message: "Mã giới thiệu không hợp lệ!",
                        });
                      }
                    })
                    .catch((err) =>
                      notification({
                        severity: "error",
                        title: "Xác thực mã giới thiệu",
                        message: "Có lỗi xảy ra",
                      })
                    );
                } else {
                  notification({
                    severity: "error",
                    title: "Xác thực mã giới thiệu",
                    message: "Mã giới thiệu không được trống!",
                  });
                }
              }}
            >
              <Text18Styled color={"white"}>Tiếp tục thanh toán</Text18Styled>
            </ButtonAction>
          </RowStyled>
        </BoxDetailInfo>
      )}
    </WrapperBoxBorderStyled>
  );
};

export default TableQuote;
