import { IconInfoCircle } from "@components/Icons";
import styled from "@emotion/styled";
import { Box, Button, Dialog, Typography } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
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
import PhieuTinhGia from "@components/LayoutProduct/PhieuTinhGia";
import LocalStorage from "utils/LocalStorage";

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
  scopeRender?: string;
};

const TableQuote = ({
  width,
  urlPayment,
  setScopeRender,
  item,
  scopeRender,
}: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);
  const [openPtg, setOpenPtg] = useState(false);
  const [dataDownloadPtg, setDataDownloadPtg] = useState({
    ProjectId: 0,
    ProductId: 0,
    DepositDate: "",
    PriceID: 0,
    ScheduleID: 0,
  });
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title28Styled>Báo giá</Title28Styled>
        {scopeRender && scopeRender === "payment" && (
          <Button
            sx={{
              p: 0,
              textTransform: "unset",
              fontSize: "16px",
              color: "#0063F7",
              fontWeight: 400,
            }}
            onClick={() => setOpenPtg(true)}
          >
            Xem chi tiết báo giá
          </Button>
        )}
      </Box>
      <BoxDetailInfo>
        {((!isEmpty(item) && item.projectTypeCode === "1") ||
          (!isEmpty(cart) && cart.projectTypeCode === "1")) && (
          <RowStyledAgain>
            <Text14Styled>Đơn giá QSDĐ</Text14Styled>
            <Text14Styled>
              {(!isEmpty(productItem) &&
              // productItem.LandPrice !== 0 &&
              productItem.PreLandPrice !== null
                ? productItem.PreLandPrice !== 0 ? currencyFormat(productItem.PreLandPrice) : "0"
                : !isEmpty(item)
                ? currencyFormat(item.landPrice)
                : currencyFormat(cart.totalVatPrice)) ?? "0"}
              &nbsp;đ/m<sup>2</sup>
            </Text14Styled>
          </RowStyledAgain>
        )}
        {((!isEmpty(item) && item.projectTypeCode === "2") ||
          (!isEmpty(cart) && cart.projectTypeCode === "2")) && (
          <RowStyledAgain>
            <Text14Styled>Đơn giá thông thủy</Text14Styled>
            <Text14Styled>
              {(!isEmpty(productItem) &&
              // productItem.LandPrice !== 0 &&
              productItem.PreLandPrice !== null
                ? productItem.PreLandPrice !== 0 ? currencyFormat(productItem.PreLandPrice) : "0"
                : !isEmpty(item)
                ? currencyFormat(item.landPrice)
                : currencyFormat(cart.totalVatPrice)) ?? "0"}
              &nbsp;đ/m<sup>2</sup>
            </Text14Styled>
          </RowStyledAgain>
        )}
        {((!isEmpty(item) && item.projectTypeCode === "1") ||
          (!isEmpty(cart) && cart.projectTypeCode === "1")) && (
          <RowStyledAgain>
            <Text14Styled>Giá trị QSDĐ</Text14Styled>
            <Text14Styled>
              {(!isEmpty(productItem) &&
              // productItem.LandMoney !== 0 &&
              productItem.PreLandMoney !== null
                ? productItem.PreLandMoney !== 0 ? currencyFormat(productItem.PreLandMoney) : "0"
                : !isEmpty(item) && item.landMoney
                ? currencyFormat(item.landMoney)
                : currencyFormat(cart.vat)) ?? "0"}
              &nbsp;đ
            </Text14Styled>
          </RowStyledAgain>
        )}
        {((!isEmpty(item) &&
          item.buildType === "1" &&
          !item.build &&
          productItem.FoundationMoney !== 0) ||
          (!isEmpty(cart) &&
            cart.buildType === "1" &&
            !cart.build &&
            productItem.FoundationMoney !== 0)) && (
          <RowStyledAgain>
            <Text14Styled>Giá trị móng</Text14Styled>
            <Text14Styled>
              {currencyFormat(productItem.FoundationMoney)}
              &nbsp;đ
            </Text14Styled>
          </RowStyledAgain>
        )}
        {((!isEmpty(item) && item.buildType === "1" && item.build) ||
          (!isEmpty(cart) && cart.buildType === "1" && cart.build)) && (
          <RowStyledAgain>
            <Text14Styled>Đơn giá xây dựng</Text14Styled>
            <Text14Styled>
              {(!isEmpty(productItem) &&
              // productItem.PreLandPrice !== 0 &&
              productItem.PreLandPrice !== null
                ? productItem.PreLandPrice !== 0 ? currencyFormat(productItem.PreLandPrice) : "0"
                : !isEmpty(item)
                ? currencyFormat(item.landPrice)
                : currencyFormat(cart.totalVatPrice)) ?? "0"}
              &nbsp;đ/m<sup>2</sup>
            </Text14Styled>
          </RowStyledAgain>
        )}
        {((!isEmpty(item) && item.buildType === "1" && item.build) ||
          (!isEmpty(cart) && cart.buildType === "1" && cart.build)) && (
          <RowStyledAgain>
            <Text14Styled>Giá trị xây dựng</Text14Styled>
            <Text14Styled>
              {(!isEmpty(productItem) &&
              // productItem.PreLandMoney !== 0 &&
              productItem.PreLandMoney !== null
                ? productItem.PreLandMoney !== 0 ? currencyFormat(productItem.PreLandMoney) : "0"
                : !isEmpty(item) && item.landMoney
                ? currencyFormat(item.landMoney)
                : currencyFormat(cart.vat)) ?? "0"}
              &nbsp;đ
            </Text14Styled>
          </RowStyledAgain>
        )}
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled fw={500}>
            {/* {(!isEmpty(item) && item.projectTypeCode === "1") ||
            (!isEmpty(cart) && cart.projectTypeCode === "1")
              ? "Tổng giá bán nhà ở"
              : "Tổng giá trị căn hộ"} */}
            Tổng giá trị hợp đồng trước chiết khấu
          </Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            // productItem.PreTotalMoney !== 0 &&
            productItem.PreTotalMoney !== null
              ? productItem.PreTotalMoney !== 0 ? currencyFormat(productItem.PreTotalMoney) : "0"
              : !isEmpty(item) && item.totalPrice
              ? currencyFormat(item.totalPrice)
              : currencyFormat(cart.totalPrice)) ?? "0"}
            &nbsp;đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Giảm giá</Text14Styled>
          <Text14Styled>
            {(!isEmpty(productItem) &&
            // productItem.PromotionMoney !== 0 &&
            productItem.PromotionMoney !== null
              ? productItem.PromotionMoney !== 0 ? currencyFormat(productItem.PromotionMoney) : "0"
              : !isEmpty(item) && item.promotionMoney
              ? currencyFormat(item.promotionMoney)
              : currencyFormat(cart.sales)) ?? "0"}
            &nbsp;đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled fw={500}>
            {(!isEmpty(item) && item.projectTypeCode === "1") ||
            (!isEmpty(cart) && cart.projectTypeCode === "1")
              ? "Tổng giá trị hợp đồng "
              : "Tổng giá trị căn hộ "}
            sau chiết khấu
          </Text14Styled>
          <Text18Styled fw={500} style={{ color: "#ea242a" }}>
            {(!isEmpty(productItem) &&
            // productItem.TotalMoney !== 0 &&
            productItem.TotalMoney !== null
              ? productItem.TotalMoney !== 0 ? currencyFormat(productItem.TotalMoney) : "0"
              : !isEmpty(item) && item.totalOnlinePrice
              ? currencyFormat(item.totalOnlinePrice)
              : currencyFormat(cart.totalPrice)) ?? "0"}
            &nbsp;đ
          </Text18Styled>
        </RowStyledAgain>
      </BoxDetailInfo>
      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tiền đặt chỗ tối thiểu</Text14Styled>
          <Text14Styled fw={500}>
            {(!isEmpty(productItem) &&
            // productItem.DepositMoneyMin !== 0 &&
            productItem.DepositMoneyMin !== null
              ? productItem.DepositMoneyMin !== 0 ? currencyFormat(productItem.DepositMoneyMin) : "0"
              : !isEmpty(item) && item.minEarnestMoney
              ? currencyFormat(item.minEarnestMoney)
              : currencyFormat(cart.minEarnestMoney)) ?? "0"}
            &nbsp;đ
          </Text14Styled>
        </RowStyledAgain>
        <RowStyled>
          <Text14Styled>Tiền đặt cọc quy định</Text14Styled>
          <Text14Styled fw={500}>
            {(!isEmpty(productItem) &&
            // productItem.DepositMoney !== 0 &&
            productItem.DepositMoney !== null
              ? productItem.DepositMoney !== 0 ? currencyFormat(productItem.DepositMoney) : "0"
              : !isEmpty(item) && item.regulationOrderPrice
              ? currencyFormat(item.regulationOrderPrice)
              : currencyFormat(cart.regulationOrderPrice)) ?? "0"}
            &nbsp;đ
          </Text14Styled>
        </RowStyled>
      </BoxDetailInfo>
      <BoxDetailInfo>
        <RowStyled>
          <Text14Styled fontStyle="italic !important">
            *Giá trên đã bao gồm VAT
          </Text14Styled>
        </RowStyled>
      </BoxDetailInfo>
      {(!isEmpty(item) && item.projectTypeCode === "2") ||
        (!isEmpty(cart) && cart.projectTypeCode === "2" && (
          <BoxDetailInfo>
            <RowStyled>
              <Text14Styled
                color="#D60000"
                fontSize={12}
                fontStyle="italic !important"
              >
                2% kinh phí bảo trì căn hộ Bên mua thanh toán ngay khi bàn giao
                căn hộ
              </Text14Styled>
            </RowStyled>
          </BoxDetailInfo>
        ))}
      <Dialog
        open={openPtg}
        onClose={() => setOpenPtg(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="lg"
        sx={{ borderRadius: "20px" }}
      >
        <div
          style={{
            height: 53,
            width: "100%",
            background: "#1B3459",
            textAlign: "center",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "22px",
              lineHeight: "26px",
              color: "#FFFFFF",
            }}
          >
            Phiếu tính giá
          </Typography>
        </div>
        <Box sx={{ pl: "39px", pr: "39px" }}>
          <PhieuTinhGia
            dataProduct={cart}
            setDataDownloadPtg={setDataDownloadPtg}
            scheduleId={LocalStorage.get("filterPtg")?.scheduleId}
            promotions={LocalStorage.get("filterPtg")?.promotions}
            priceID={LocalStorage.get("filterPtg")?.priceID}
          />
        </Box>
      </Dialog>
      {urlPayment && (
        <BoxDetailInfo>
          {!isAuthenticated && (
            <RowStyledAgain justifyContent={"start"}>
              <IconInfoCircle />
              <Text12ItalicStyled>
                Nếu đã có tài khoản, vui lòng{" "}
                <Link href={"/authen?prePath=payment-cart&tabIndex=login"}>
                  <a style={{ color: "#0063F7", textDecoration: "underline" }}>
                    ĐĂNG NHẬP
                  </a>
                </Link>{" "}
                để lưu thông tin thanh toán
              </Text12ItalicStyled>
            </RowStyledAgain>
          )}
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
