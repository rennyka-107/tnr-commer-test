import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import {
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
} from "@components/Icons";
import { currencyFormat } from "utils/helper";

interface Props {
  src?: any;
  data?: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const WrapperContent = styled(Box)`
  width: 100%;
  height: auto;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  background: #fff;
  box-shadow: none;
  position: relative;
  padding: 197px 25px 0px;
  margin-top: 15px;
  cursor: pointer;
`;
const WrapperImg = styled(Box)`
  width: 100%;
  height: 195px;
  border-radius: 20px 20px 0px 0px;
  position: absolute;
  top: -15px;
  left: 0;
`;
const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
`;
const TextStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;
const DividerLine = styled.div`
  width: 100%;
  height: 0px;
  border: 0.5px solid #c7c9d9;
  margin-bottom: 15px;
`;
// const TicketTag = styled(Box)`
//   padding: 7px 14px;
//   position: absolute;
//   top: 150px;
//   right: 0px;
//   background: #fec83c;
//   color: white;
//   font-family: "Roboto";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 16px;
// `;

const TextBottomStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  /* Brand */

  color: #1b3459;
`;

const NumberBottomStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #d60000;
`;

const ItemProductMap = ({ onClick, data }: Props) => {
  return (
    <WrapperContent onClick={onClick}>
      <WrapperImg>
        <CardMedia
          component="img"
          height={195}
          image={data.thumbnail ? data.thumbnail : "/images/product_1.png"}
          alt="img product"
          style={{ borderRadius: "20px 20px 0px 0px" }}
        />
      </WrapperImg>
      <TitleStyled>{data.name ?? "N/A"}</TitleStyled>
      <div
        style={{ display: "flex", margin: "14px 0", alignItems: "flex-end" }}
      >
        <TextBottomStyled style={{ marginRight: 40 }}>
          Giá niêm yết{" "}
        </TextBottomStyled>
        <NumberBottomStyled>
          {currencyFormat(data.price ?? 0)}đ
        </NumberBottomStyled>
      </div>
      <DividerLine />
      <Grid sx={{ pb: 2 }} container rowSpacing={1}>
        {data.type === "1" && (
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBedDouble />
            &nbsp;&nbsp;<TextStyled>{data.numBed ?? "N/A"}</TextStyled>
          </Grid>
        )}
        <Grid item xs={6} display={"flex"} alignItems={"center"}>
          <IconFrame />
          &nbsp;&nbsp;
          <TextStyled>
            {data.landArea ?? "N/A"} m<sup>2</sup>
          </TextStyled>
        </Grid>
        {data.type === "1" && (
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBath />
            &nbsp;&nbsp;<TextStyled>{data.numBath ?? "N/A"}</TextStyled>
          </Grid>
        )}
        <Grid item xs={6} display={"flex"} alignItems={"center"}>
          <IconCompass />
          &nbsp;&nbsp;<TextStyled>{data.doorDirection ?? "N/A"}</TextStyled>
        </Grid>
      </Grid>
    </WrapperContent>
  );
};

export default ItemProductMap;
