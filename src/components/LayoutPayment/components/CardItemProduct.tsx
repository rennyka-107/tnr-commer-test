import { IconRadio, IconTimes } from "@components/Icons";
import styled from "@emotion/styled";
import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getCart } from "../../../../store/cartSlice";
import {
  Title28Styled,
  RowStyled,
  Text14Styled,
  LinedStyled,
} from "../../StyledLayout/styled";
import LocalStorage from "utils/LocalStorage";
import Router, { useRouter } from "next/router";
import Link from "next/link";

const WrapperCardStyled = styled(Box)(
  {
    cursor: "pointer",
    border: "1px solid #FEC83C",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  (props: { mw?: number; padding?: string | number; height?: number }) => ({
    maxWidth: props.mw ?? 635,
    padding: props.padding ?? "15px 20px 15px 42px",
    height: props.height ?? 230,
  })
);

const BoxIconClose = styled(Box)({
  width: 25,
  height: 25,
  borderRadius: "50%",
  background: "#EA242A",
  position: "absolute",
  top: -10,
  right: -10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const BoxIconRadio = styled(Box)({
  position: "absolute",
  width: 20,
  height: 20,
  top: "50%",
  left: "14px",
  transform: "translate(0px, -50%)",
});

const SubRightText = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;

const RowStyledAgain = styled(RowStyled)({ marginTop: 11 });

type Props = {};

const CardItemProduct = (props: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleViewDetail = () => {
    if (!cart || !cart?.id) return;
    Router.push(`products/${cart.id}`);
  };

  return (
    <WrapperCardStyled onClick={handleViewDetail}>
      <BoxIconClose
        onClick={(e) => {
          e.stopPropagation();
          dispatch(getCart({}));
          LocalStorage.remove("cart");
        }}
      >
        <IconTimes style={{ color: "white", width: 12, height: 12 }} />
      </BoxIconClose>
      <BoxIconRadio>
        <IconRadio />
      </BoxIconRadio>
      <CardMedia
        style={{ borderRadius: 15, width: 308, cursor: "pointer" }}
        component={"img"}
        width={308}
        height={200}
        image={cart.thumbnail ?? "images/product_1.png"}
        alt={"photo product"}
        onClick={() => {
          router.push(`/products/${cart?.id}`);
        }}
      />
      <Box style={{ width: 235, marginLeft: 30 }}>
        <Title28Styled>{cart.name ?? "N/A"}</Title28Styled>

        <RowStyledAgain>
          {cart.projectTypeCode === "2" ? (
            <div
              style={{
                display: "flex",
                gap: 37,
              }}
            >
              <SubRightText>{cart?.levelDetailParentName}</SubRightText>
              <SubRightText>{cart?.levelDetailName}</SubRightText>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 37,
               
              }}
            >
              <SubRightText>{cart?.levelDetailParentName}</SubRightText>
            </div>
          )}
          {/* <Text14Styled>{cart.lot_code ?? "N/A"}</Text14Styled>
          <Text14Styled>{cart.code}</Text14Styled> */}
        </RowStyledAgain>

        <LinedStyled borderColor={"#1b3459"} style={{ marginTop: 15 }} />
        <RowStyledAgain>
          <Text14Styled>Diện tích</Text14Styled>
          {cart.projectTypeCode === "1" ? (
            <>
              {" "}
              <Text14Styled>
                {cart.buildArea ?? "N/A"} m<sup>2</sup>
              </Text14Styled>
            </>
          ) : (
            <>
              {" "}
              <Text14Styled>
                {cart.clearArea ?? "N/A"} m<sup>2</sup>
              </Text14Styled>
            </>
          )}
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng ngủ</Text14Styled>
          <Text14Styled>{cart.numBed ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng tắm</Text14Styled>
          <Text14Styled>{cart.numBath ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Hướng</Text14Styled>
          <Text14Styled>{cart.doorDirection ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
      </Box>
    </WrapperCardStyled>
  );
};

export default CardItemProduct;
