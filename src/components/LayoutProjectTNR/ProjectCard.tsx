import {
    IconHeartProduct,
    IconMuaOnline,
    IconPlusProduct
} from "@components/Icons";
import {
    BoxTextOver
} from "@components/StyledComponents";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { MouseEventHandler } from "react";

export interface ProjectI {
    src?: any;
    title?: string;
    subTitle?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ticketCard?: string;
    description?: string;
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

const TextDescription = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18.2px;
  min-height:90px;
  
  /* Brand/Text */

  color: #0e1d34;
`;

export default function ItemProjectCard({
    src,
    title,
    subTitle,
    onClick,
    ticketCard,
    description
}: ProjectI) {
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
                image={src?.src}
                alt="green iguana"
                style={{
                    borderRadius: "20px 20px 0px 0px",
                }}
            />

            <CardContentStyled>
                <div style={{ marginBottom: 7 }}>
                    <Link href="/products/1">
                        <TextTitleStyled style={{ marginBottom: 9 }}>
                            {title}
                        </TextTitleStyled>
                    </Link>
                    <TextitleBottom>{subTitle}</TextitleBottom>
                </div>
                <LineStyled />
                <BoxTextOver numberLine={5}>
                    <TextDescription aria-multiline>{description}</TextDescription>
                </BoxTextOver>
            </CardContentStyled>
            <CardActions style={{ flexDirection: "column", marginBottom: 24 }}>
                <ButtonStyled
                    onClick={() => {
                        onClick;
                    }}
                >
                    Xem dự án&nbsp;
                    <IconMuaOnline />
                </ButtonStyled>
            </CardActions>
        </CardStyled>
    );
}