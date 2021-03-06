import { IconRadio, IconTimes } from "@components/Icons";
import styled from "@emotion/styled";
import { Box, CardMedia } from "@mui/material";
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

const WrapperCardStyled = styled(Box)(
  {
    width: "100%",
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

const RowStyledAgain = styled(RowStyled)({ marginTop: 11 });

type Props = {};

const CardItemProduct = (props: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch();

  return (
    <WrapperCardStyled>
      <BoxIconClose
        onClick={() => {
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
        style={{ borderRadius: 15 }}
        component={"img"}
        width={308}
        height={200}
        image={cart.thumbnail ?? "images/product_1.png"}
        alt={"photo product"}
      />
      <Box style={{ width: 235, marginLeft: 30 }}>
        <Title28Styled>{cart.name ?? "N/A"}</Title28Styled>

        <RowStyledAgain>
          <Text14Styled>{cart.lot_code ?? "N/A"}</Text14Styled>
          <Text14Styled>{cart.code}</Text14Styled>
        </RowStyledAgain>

        <LinedStyled borderColor={"#1b3459"} style={{ marginTop: 15 }} />
        <RowStyledAgain>
          <Text14Styled>Di???n t??ch</Text14Styled>
          <Text14Styled>
            {cart.landArea ?? "N/A"} m<sup>2</sup>
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Ph??ng ng???</Text14Styled>
          <Text14Styled>{cart.numBed ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Ph??ng t???m</Text14Styled>
          <Text14Styled>{cart.numBath ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>H?????ng</Text14Styled>
          <Text14Styled>{cart.doorDirection ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
      </Box>
    </WrapperCardStyled>
  );
};

export default CardItemProduct;
