import { CardMedia, Box, Typography } from "@mui/material";
import React from "react";
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
import { isEmpty } from "lodash";

type Props = {
  item?: any;
};

const BoxDetailStyled = styled(Box)({
  margin: "10px 12px",
});
const RowStyledAgain = styled(RowStyled)({
  marginBottom: 10,
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

const ItemDetailCol = ({ item }: Props) => {
  const { cart } = useSelector((state: RootState) => state.carts);

  return (
    <WrapperBoxBorderStyled mw={349} padding={"15px 12px 3px"}>
      <CardMedia
        style={{ borderRadius: 15, marginBottom: 20 }}
        component={"img"}
        width={325}
        height={200}
        image={
          (!isEmpty(item) ? item.thumbnail : cart.thumbnail) ??
          "images/product_1.png"
        }
        alt={"Product photo"}
      />
      <BoxDetailStyled>
        <Title28Styled style={{ marginBottom: 15 }}>
          {(!isEmpty(item) ? item.name : cart.name) ?? "N/A"}
        </Title28Styled>
        {!isEmpty(item) ? (
          <RowStyledAgain jContent={"start"}>
            {item.projectTypeCode === "2" ? (
              <div
                style={{
                  display: "flex",
                  gap: 37,
                }}
              >
                <SubRightText>{item?.levelDetailParentName}</SubRightText>
                <SubRightText>{item?.levelDetailName}</SubRightText>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 37,
                }}
              >
                <SubRightText>{item?.levelDetailParentName}</SubRightText>
              </div>
            )}
          </RowStyledAgain>
        ) : (
          <RowStyledAgain jContent={"start"}>
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
                <SubRightText>{cart?.levelDetailName}</SubRightText>
              </div>
            )}
          </RowStyledAgain>
        )}

        <LinedStyled style={{ margin: "5px 0px 20px" }} />

        <RowStyledAgain>
          <Text14Styled>Diện tích</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) ? item.landArea : cart.landArea) ?? "N/A"} m
            <sup>2</sup>
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng ngủ</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) ? item.numBed : cart.numBed) ?? "N/A"}
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phòng tắm</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) ? item.numBath : cart.numBath) ?? "N/A"}
          </Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Hướng</Text14Styled>
          <Text14Styled>
            {(!isEmpty(item) ? item.doorDirection : cart.doorDirection) ??
              "N/A"}
          </Text14Styled>
        </RowStyledAgain>
      </BoxDetailStyled>
    </WrapperBoxBorderStyled>
  );
};

export default ItemDetailCol;
