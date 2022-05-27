import * as React from "react";
import { MouseEventHandler } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { IconPlusProduct } from "../../Icons/index";
import Router from 'next/router'

import {
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
  IconHeartProduct,
  IconMuaOnline,
} from "@components/Icons";
import Link from "next/link";

type Props = {
	id?:string,
  src?: any;
  title?: string;
  subTitle?: string;
  dataItem?: {
    item1?: any;
    item2?: any;
    item3?: any;
    item4?: any;
  };
  priceListed?: number;
  priceSub?: number;
  activeSoSanh?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ticketCard?: string;
};

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
width: 85%;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;

/* Brand/Text */

color: #0E1D34;
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
const TextBottomStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

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
const TextBottomStyled2 = styled(Typography)`
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Brand */

  color: #1b3459;
`;
const NumberBottomStyled2 = styled(Typography)`
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: #d60000;
`;
const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #ffffff;
    box-shadow: 4px 8px 24px #f2f2f5;
    border: 1px solid #48576d;
    border-radius: 60px;
    color: #48576d;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
`;
const TextButtonStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand/Text */

  color: #0e1d34;
`;
export default function ItemProductCard({
  src,
  title,
  subTitle,
  dataItem,
  priceListed,
  priceSub,
  onClick,
  ticketCard,
  activeSoSanh,
  id
}: Props) {
  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  return (
    <CardStyled sx={{ maxWidth: 350 }}>
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
          {ticketCard}
        </span>
      </div>
      <CardMedia
        component="img"
        height="190"
        image={src.src}
        alt="green iguana"
        style={{
          borderRadius: "20px 20px 0px 0px",
        }}
      />

      <CardContentStyled>
        <div style={{ marginBottom: 7 }}>
          <span onClick={() => Router.push(`/products/${id}`)}>
            <TextTitleStyled style={{ marginBottom: 9 }}>
              {title}
            </TextTitleStyled>
          </span>
          <TextitleBottom>{subTitle ? subTitle : 'N/A'}</TextitleBottom>
        </div>
        <LineStyled />
        <CenterIntemWrap>
          <WrapItemCenter>
            <IconFrame />

            <TextCenterItem>{dataItem.item1 ? dataItem?.item1 : 'N/A'}</TextCenterItem>
          </WrapItemCenter>
          <WrapItemCenter>
            <IconBath />
            <TextCenterItem>{dataItem.item2 ? dataItem?.item2 : 'N/A'}</TextCenterItem>
          </WrapItemCenter>
          <WrapItemCenter>
            <IconBedDouble />
            <TextCenterItem>{dataItem.item3 ? dataItem?.item3 : 'N/A'} m²</TextCenterItem>
          </WrapItemCenter>
          <WrapItemCenter>
            <IconCompass />
            <TextCenterItem>{dataItem.item4 ? dataItem?.item4 : 'N/A'}</TextCenterItem>
          </WrapItemCenter>
        </CenterIntemWrap>
        <LineStyled />
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", marginBottom: 14 }}>
            <TextBottomStyled style={{ marginRight: 40 }}>
              Giá niêm yết{" "}
            </TextBottomStyled>
            <NumberBottomStyled>
              {currencyFormat(priceListed)}đ
            </NumberBottomStyled>
          </div>
          <div style={{ display: "flex" }}>
            <TextBottomStyled2 style={{ marginRight: 19 }}>
              Đơn giá thông thuỷ{" "}
            </TextBottomStyled2>
            <NumberBottomStyled2>
              {currencyFormat(priceSub)}đ/m2
            </NumberBottomStyled2>
          </div>
        </div>
      </CardContentStyled>
      {activeSoSanh === true ? (
        <CardActions
          style={{
            flexDirection: "row",
            marginBottom: 24,
            justifyContent: "space-around",
          }}
        >
          <div style={{ gap: 10, display: "flex", flexDirection: "row" }}>
            <IconPlusProduct />
            <TextButtonStyled>So sánh</TextButtonStyled>
          </div>
          <ButtonStyled
            onClick={() => {
              onClick;
            }}
          >
            Mua Online&nbsp;
            <IconMuaOnline />
          </ButtonStyled>
        </CardActions>
      ) : (
        <CardActions style={{ flexDirection: "column", marginBottom: 24 }}>
          <ButtonStyled
            onClick={() => {
              onClick;
            }}
          >
            Mua Online&nbsp;
            <IconMuaOnline />
          </ButtonStyled>
        </CardActions>
      )}
    </CardStyled>
  );
}
