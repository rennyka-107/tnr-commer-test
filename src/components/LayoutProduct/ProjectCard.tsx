import { IconHeartProduct, IconMuaOnline } from "@components/Icons";
import { BoxTextOver } from "@components/StyledComponents";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { MouseEventHandler } from "react";
import Product3 from "../../../public/images/product3.png";

export interface ProjectI {
  id: string;
  src?: any;
  el?: any[];
  title?: string;
  subTitle?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ticketCard?: string;
  description?: string;
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
  padding: 17px 25px 25px 25px;
`;
const TextTitleStyled = styled.a`
  cursor: pointer;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  line-height: 28px;

  color: #1b3459;
  :hover {
    color: #ea242a;
  }
`;
const TextitleBottom = styled(Typography)`
  margin-top: 5px;
  width: 85%;
  font-family: "Roboto";
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
const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #fcb715;
    box-shadow: 4px 8px 24px #f2f2f5;
    // border: 1px solid #48576d;
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
  margin: 0px 4px;
`;

const TextDescription = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18.2px;
  min-height: 90px;

  /* Brand/Text */

  color: #0e1d34;
`;

export default function ItemProjectCard({
  id,
  src,
  title,
  subTitle,
  onClick,
  ticketCard,
  description,
  el,
}: ProjectI) {
  const router = useRouter();
  // function currencyFormat(num) {
  //     if (!num) {
  //         return;
  //     }
  //     return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  // }
  const handleChooseSearch = () => {
    const listDataLSProject: any = [];
    const listIdProject: any = [];
    listDataLSProject.push(el);
    listIdProject.push(id);
    localStorage.setItem(
      "listDataLSProject",
      JSON.stringify(listDataLSProject)
    );
    localStorage.setItem("listParamsIdProject", JSON.stringify(listIdProject));
    router.push(
      "/search?Type=Advanded&&textSearch=&&provinceId=&&projectTypeId=&&projectId=&&priceFrom=&&priceTo=&&areaFrom=0&&areaTo=200"
    );
  };
  return (
    <CardStyled sx={{ maxWidth: 350, minHeight: 500 }}>
      <ImageWithHideOnError
        className="logo"
		style={""}
        src={src ? src : Product3}
        fallbackSrc={Product3}
        height={190}
        width={350}
        title={"Logo "}
        alt={"Logo "}
        priority
        unoptimized={true}
        objectFit="cover"
      />
      <CardContentStyled>
        <div style={{ marginBottom: 7 }}>
          <div onClick={handleChooseSearch}>
            <TextTitleStyled style={{ marginBottom: 10 }}>
              {title}
            </TextTitleStyled>
          </div>
          <TextitleBottom>{subTitle}</TextitleBottom>
        </div>
        <LineStyled />
        <BoxTextOver numberLine={5}>
          <TextDescription aria-multiline>{description}</TextDescription>
        </BoxTextOver>
      </CardContentStyled>
      <CardActions style={{ flexDirection: "column" }}>
        <ButtonStyled
          onClick={() => {
            // onClick;
            router.push(`/recently-view/${id}?title=${title}`);
          }}
        >
          Xem dự án&nbsp;
          <IconMuaOnline />
        </ButtonStyled>
      </CardActions>
    </CardStyled>
  );
}
