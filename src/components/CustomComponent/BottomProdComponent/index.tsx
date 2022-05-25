import React, { MouseEventHandler } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styled from "@emotion/styled";

import { Card, Typography } from "@mui/material";
import Link from "next/link";
import {
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
  IconHeartProduct,
} from "@components/Icons";

interface PropsData {
	title?: string;
	src?: any;
	subTitle?: string;
	image?: any,
	item1?: string;
    item2?: string;
    item3?: string;
    item4?: string;
	priceListed?: number;
	priceSub?: number;
	ticketCard?: string;
}

interface Props {
  style?: React.CSSProperties;
  data?: Array<PropsData>;

  activeSoSanh?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;

}

const CardStyled = styled(Card)`
  background: #ffffff;
  width: 350px;
  /* Line/stroke */
  position: relative;
  border: 1px solid #c7c9d9;
  border-radius: 20px;
`;
const CardContentStyled = styled(CardContent)`
  padding: 25px;
`;
const TextTitleStyled = styled.a`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  cursor: pointer;
  /* identical to box height */

  /* Brand/Main color */

  color: #1b3459;
`;
const TextitleBottom = styled(Typography)`
  font-family: "Roboto";
  width: 85%;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand/Text */

  color: #0e1d34;
`;
const LineStyled = styled.div`
  width: 302px;
  height: 0px;
  left: 27px;
  top: 362px;

  /* Line/stroke */

  border: 1px solid #c7c9d9;
`;
const CenterIntemWrap = styled.div`
  display: grid;
  grid-template-columns: 125px 100px;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 13px;
  margin-top: 19px;
  margin-bottom: 19px;
`;
const TextCenterItem = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 7px;
  /* Brand/Main color */

  color: #1b3459;
`;
const WrapItemCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;



const BottomProdComponent = ({
  style,
  data,
  onClick,
}: Props) => {

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  return (
    <div style={style}>
      <Typography
        style={{
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: 28,
          color: "#1B3459",
        }}
      >
        Có thể bạn quan tâm
      </Typography>

		<div style={{display: "flex", justifyContent: 'space-between', marginTop: 50}}>
		{data.map((item, index) => (
			      <CardStyled sx={{ maxWidth: 350 }} key={index}>
				  <IconHeartProduct
					style={{
					  cursor: "pointer",
					  position: "absolute",
					  right: 0,
					  margin: 20,
					}}
				  />
				  <div
					style={{
					  background: "#FEC83C",
					  width: 'auto',
					  height: 30,
					  position: "absolute",
					  marginTop: 160,
					  right: 0,
					  padding: 4,
					  textAlign: "center",
					}}
				  >
					<span
					  style={{
						fontFamily: "roboto",
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: 14,
						lineHeight: "16px",
						color: "#FFFFFF",
					  }}
					>
					  {item.ticketCard}
					</span>
				  </div>
				  <CardMedia
					component="img"
					height="190"
					image={item?.src.src}
					alt="green iguana"
					style={{
					  borderRadius: "20px 20px 0px 0px",
					}}
				  />
				  <CardContentStyled>
					<div style={{ marginBottom: 7 }}>
					  <Link href="/products/1" key={index} >
						<TextTitleStyled style={{ marginBottom: 9 }}>
						  {item.title}
						</TextTitleStyled>
					  </Link>
					  <TextitleBottom>{item.subTitle}</TextitleBottom>
					</div>
					<LineStyled />
					<CenterIntemWrap>
					  <WrapItemCenter>
						<IconFrame />
						<TextCenterItem>{item?.item1}</TextCenterItem>
					  </WrapItemCenter>
					  <WrapItemCenter>
						<IconBath />
						<TextCenterItem>{item?.item2}</TextCenterItem>
					  </WrapItemCenter>
					  <WrapItemCenter>
						<IconBedDouble />
						<TextCenterItem>{item?.item3} m²</TextCenterItem>
					  </WrapItemCenter>
					  <WrapItemCenter>
						<IconCompass />
						<TextCenterItem>{item?.item4}</TextCenterItem>
					  </WrapItemCenter>
					</CenterIntemWrap>
				  </CardContentStyled>
				</CardStyled>
		))}
		</div>
    </div>
  );
}
export default BottomProdComponent;