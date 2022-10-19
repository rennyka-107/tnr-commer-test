import { IconHeartProduct, IconMuaOnline } from "@components/Icons";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import Link from "next/link";
import * as React from "react";
import { MouseEventHandler } from "react";
import Product3 from "../../../../public/images/product3.png";

type Props = {
  src?: any;
  title?: string;
  ticketCard?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabledBuy?: boolean;
};

const WrapperContent = styled.div`
  position: relative;
  width: 289px;
  height: 274px;
  margin-top: 12px;
`;
const WrapperImg = styled(Card)`
  position: absolute;
  height: 161px;
  top: -12px;
  left: 0px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  box-shadow: none;
`;
const TicketTag = styled.div`
  background: #fec83c;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #ffffff;
  position: absolute;
  right: 0px;
  top: 122px;
  padding: 5px 8px;
`;
const CardContentStyled = styled(CardContent)`
  border: 1px solid #d8d8d8;
  height: 274px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border-radius: 20px;
`;
const TextTitleStyled = styled.a`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  cursor: pointer;
  color: #0e1d34;
  margin-bottom: 6px;
`;
const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  margin-bottom: -10px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #FEC83C;
    // box-shadow: 4px 8px 24px #f2f2f5;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    border-radius: 60px;
    color: #ffffff;
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
`;

const ItemCompareProduct = ({
  src,
  title,
  onClick,
  ticketCard,
  disabledBuy,
}: Props) => {
  return (
    <WrapperContent>
      <IconHeartProduct
        style={{ position: "absolute", top: 0, right: 14.5, zIndex: 9 }}
      />
      <WrapperImg>
        <ImageWithHideOnError
          className="logo"
          src={src}
		  style={""}
          fallbackSrc={Product3}
          height={190}
          width={350}
          title={"Logo "}
          alt={"Logo "}
          priority
          unoptimized={true}
          objectFit="cover"
        />
      </WrapperImg>
      <TicketTag>{ticketCard}</TicketTag>
      <CardContentStyled>
        <Link href="/products/1">
          <TextTitleStyled>{title ?? ""}</TextTitleStyled>
        </Link>
        <CardActions>
          <ButtonStyled
            onClick={onClick}
            style={{
              backgroundColor: !!disabledBuy ? "#FFFF" : "",
            }}
            disabled={!!disabledBuy}
          >
            Mua Online&nbsp;
            <IconMuaOnline />
          </ButtonStyled>
        </CardActions>
      </CardContentStyled>
    </WrapperContent>
  );
};

export default ItemCompareProduct;
