import { CardMedia, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import {
  LinedStyled,
  RowStyled,
  Text14Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import Product1 from "../../../../public/images/product1.png";
import styled from "@emotion/styled";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

type Props = {};

const BoxDetailStyled = styled(Box)({
  margin: "10px 12px",
});
const RowStyledAgain = styled(RowStyled)({
  marginBottom: 10,
});

const ItemDetailCol = (props: Props) => {
  const { getCart } = useSelector((state: RootState) => state.carts);
  const [prod, setProd] = useState<object | any>({});
  useEffect(() => {
    if (!isEmpty(getCart)) {
      setProd(getCart);
    }
  }, [getCart]);
  return (
    <WrapperBoxBorderStyled mw={349} padding={"15px 12px 3px"}>
      <CardMedia
        style={{ borderRadius: 15, marginBottom: 20 }}
        component={"img"}
        width={325}
        height={200}
        image={Product1.src}
        alt={"Product photo"}
      />
      <BoxDetailStyled>
        <Title28Styled style={{ marginBottom: 15 }}>
          {prod.name ?? "N/A"}
        </Title28Styled>
        <RowStyledAgain jContent={"start"}>
          <Text14Styled style={{ marginRight: 37 }}>
            {prod.homeNul ?? "N/A"}
          </Text14Styled>
          <Text14Styled>Tầng 26</Text14Styled>
        </RowStyledAgain>

        <LinedStyled style={{ margin: "5px 0px 20px" }} />

        <RowStyledAgain>
          <Text14Styled>Diện tích</Text14Styled>
          <Text14Styled>
            {prod.landArea ?? "N/A"} m<sup>2</sup>
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng ngủ</Text14Styled>
          <Text14Styled>{prod.numBed ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng tắm</Text14Styled>
          <Text14Styled>{prod.numBath ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Hướng</Text14Styled>
          <Text14Styled>{prod.doorDirection ?? "N/A"}</Text14Styled>
        </RowStyledAgain>
      </BoxDetailStyled>
    </WrapperBoxBorderStyled>
  );
};

export default ItemDetailCol;
