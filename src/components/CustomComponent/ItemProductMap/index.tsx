import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import {
	FloorIcon,
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
} from "@components/Icons";
import { currencyFormat } from "utils/helper";
import IconCoXay from "@components/Icons/IconCoXay";
import IconChuaXay from "@components/Icons/IconChuaXay";

interface Props {
  src?: any;
  data?: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const WrapperContent = styled(Box)`
  width: 15vw;
  height: auto;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  background: #fff;
  box-shadow: none;
  position: relative;
  padding: 6rem 25px 0px;
  margin-top: 15px;
  cursor: pointer;
`;
const WrapperImg = styled(Box)`
  width: 100%;
  height: 6rem;
  border-radius: 20px 20px 0px 0px;
  position: absolute;
  top: -15px;
  left: 0;
`;
const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  color: #1b3459;
  margin-bottom: 1rem;
`;
const TextStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: .8rem;
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
  font-size: .8rem;
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
          // height={195}
          image={data.thumbnail ? data.thumbnail : "/images/product_1.png"}
          alt="img product"
          style={{ borderRadius: "20px 20px 0px 0px", height: "6rem" }}
        />
      </WrapperImg>
      <TitleStyled>{data.name ?? "N/A"}</TitleStyled>
      {/* <div
        style={{ display: "flex", margin: "14px 0", alignItems: "flex-end" }}
      >
        <TextBottomStyled style={{ marginRight: 40 }}>
          Giá niêm yết{" "}
        </TextBottomStyled>
        <NumberBottomStyled>
          {currencyFormat(data.price ?? 0)}đ
        </NumberBottomStyled>
      </div>
      <DividerLine /> */}
      <Grid sx={{ pb: 2 }} container rowSpacing={1}>
        <Grid item xs={6} display={"flex"} alignItems={"center"}>
          <IconFrame />
          &nbsp;&nbsp;
          <TextStyled>
            {data.landArea ?? "N/A"} m<sup>2</sup>
          </TextStyled>
        </Grid>
        {data.buildType === "1" && (
          <>
            {data.build ? (
              <>
                <Grid item xs={6} display={"flex"} alignItems={"center"}>
                  <IconCoXay /> &nbsp;&nbsp;
                  <TextStyled>Có xây</TextStyled>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} display={"flex"} alignItems={"center"}>
                  <IconChuaXay /> &nbsp;&nbsp;
                  <TextStyled>Chưa xây</TextStyled>
                </Grid>
              </>
            )}
          </>
        )}
	
        {data.buildType === "2" && (
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBedDouble />
            &nbsp;&nbsp;<TextStyled>{data.numBed ?? "N/A"}</TextStyled>
          </Grid>
        )}
        <Grid item xs={6} display={"flex"} alignItems={"center"}>
          <IconCompass />
          &nbsp;&nbsp;<TextStyled>{data.doorDirection ?? "N/A"}</TextStyled>
        </Grid>

        {data.buildType === "2" && (
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBath />
            &nbsp;&nbsp;<TextStyled>{data.numBath ?? "N/A"}</TextStyled>
          </Grid>
        )}
			 {data.buildType === "1" && data.build && (
			  <Grid item xs={6} display={"flex"} alignItems={"center"}>
			  <FloorIcon />
			  &nbsp;&nbsp;<TextStyled>{data.maxFloor ?? "N/A"} Tầng</TextStyled>
			</Grid>
		 ) }
      </Grid>
    </WrapperContent>
  );
};

export default ItemProductMap;
