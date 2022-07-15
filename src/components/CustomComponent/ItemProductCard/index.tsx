import * as React from "react";
import { MouseEventHandler } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Product3 from "../../../../public/images/product3.png";
import Router, { useRouter } from "next/router";

import {
  FloorIcon,
  IconAddHearProduct,
  IconBath,
  IconBedDouble,
  IconCompass,
  IconDienTichProductTable,
  IconFrame,
  IconHeartProduct,
  IconMuaOnline,
  IconPlusProduct,
} from "@components/Icons";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import useFavourite from "hooks/useFavourite";

type Props = {
  id?: string;
  projectName?: string;
  src?: any;
  title?: string;
  subTitle?: string;
  dataItem?: {
    item1?: any;
    item2?: any;
    item3?: any;
    item4?: any;
  };
  priceListed?: string;
  priceSub?: number;
  favouriteStatus?: number;
  activeSoSanh?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onCompare?: MouseEventHandler<HTMLButtonElement>;
  ticketCard?: string;
  projectTypeCode?: string;
  minFloor?: number;
  maxFloor?: number;
  buyDisabled?: boolean;
  activeFavourite?: boolean;
};

const CardStyled = styled(Card)`
  background: #ffffff;
  width: 350px;
  /* Line/stroke */
  position: relative;
  border: 0.5px solid #D8D8D8;
  border-radius: 20px 20px 20px 20px;
  box-shadow: none !important;
`;
const CardContentStyled = styled(CardContent)`
  padding: 10px 0px 0px 20px;
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

  color: #0063f7;
`;

const TextProjectStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 3px;
  /* identical to box height, or 24px */

  letter-spacing: 0.005em;

  /* Shades/Dark 2 */

  color: #48576d;
`;
const TextFloorStyled = styled(Typography)`
  margin-left: 5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Shades/Dark 2 */

  color: #48576d;
`;
const TextFloorValue = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand/Main color */

  color: #1b3459;
`;
export default function ItemProductCard({
  src,
  title,
  subTitle,
  dataItem,
  priceListed,
  priceSub,
  projectName,
  onClick,
  onCompare,
  projectTypeCode,
  minFloor,
  maxFloor,
  ticketCard,
  activeSoSanh,
  id,
  buyDisabled,
  favouriteStatus,
  activeFavourite,
}: Props) {
  const router = useRouter();

  const { addProductToFavouriteFunction } = useFavourite();

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <CardStyled sx={{ maxWidth: 350 }}>
      {activeFavourite ? (
        <>
          {favouriteStatus === 0 ? (
            <IconHeartProduct
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 0,
                margin: 20,
                zIndex: 10,
              }}
              onClick={() => addProductToFavouriteFunction(id, 1)}
            />
          ) : (
            <IconAddHearProduct
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 0,
                margin: 20,
                zIndex: 10,
              }}
              onClick={() => addProductToFavouriteFunction(id, 0)}
            />
          )}
        </>
      ) : (
        <></>
      )}

      {ticketCard ? (
        <>
          <div
            style={{
              background: "#FEC83C",
              width: "auto",
              height: "auto",
              position: "absolute",
              marginTop: 160,
              right: 0,
              padding: 3,
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "roboto",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "16px",
                color: "#48576D",
              }}
            >
              {ticketCard}
            </span>
          </div>
        </>
      ) : (
        <></>
      )}

      <ImageWithHideOnError
        className="logo"
        src={src}
        fallbackSrc={Product3}
        height={190}
        width={350}
        title={"Logo "}
        alt={"Logo "}
        priority
        unoptimized={true}
      />

      <CardContentStyled>
        <div>
          <span onClick={() => Router.push(`/products/${id}`)}>
            <TextTitleStyled style={{ marginBottom: 9 }}>
              {title}
            </TextTitleStyled>
            <TextProjectStyled>{projectName}</TextProjectStyled>
          </span>
          <TextitleBottom>{subTitle ? subTitle : "N/A"}</TextitleBottom>
        </div>
        {/* <LineStyled /> */}
        <CenterIntemWrap>
          {/* <WrapItemCenter>
            <IconBath />
            <TextCenterItem>
              {dataItem.item2 ? dataItem?.item2 : "N/A"}
            </TextCenterItem>
          </WrapItemCenter> */}
          {projectTypeCode === "2" ? (
            <>
              <WrapItemCenter>
                <IconBath />
                <TextCenterItem>
                  {dataItem.item2 ? dataItem?.item2 : "N/A"}
                </TextCenterItem>
              </WrapItemCenter>
            </>
          ) : (
            <>
              <WrapItemCenter>
                <FloorIcon />
                <TextFloorStyled>min</TextFloorStyled>
                <TextCenterItem>
                  <TextFloorValue>{minFloor} tầng</TextFloorValue>
                </TextCenterItem>
              </WrapItemCenter>
            </>
          )}

          <WrapItemCenter>
            <IconFrame />

            <TextCenterItem>
              {dataItem.item1 ? dataItem?.item1 : "N/A"} m²
            </TextCenterItem>
          </WrapItemCenter>
          {/* <WrapItemCenter>
            <IconBedDouble />
            <TextCenterItem>
              {dataItem.item3 ? dataItem?.item3 : "N/A"}
            </TextCenterItem>
          </WrapItemCenter> */}

          {projectTypeCode === "2" ? (
            <>
              <WrapItemCenter>
                <IconBedDouble />
                <TextCenterItem>
                  {dataItem.item3 ? dataItem?.item3 : "N/A"}
                </TextCenterItem>
              </WrapItemCenter>
            </>
          ) : (
            <>
              <>
                <WrapItemCenter>
                  <FloorIcon />
                  <TextFloorStyled>max</TextFloorStyled>
                  <TextCenterItem>
                    <TextFloorValue>{maxFloor} tầng</TextFloorValue>
                  </TextCenterItem>
                </WrapItemCenter>
              </>
            </>
          )}

          <WrapItemCenter>
            <IconCompass />
            <TextCenterItem>
              {dataItem.item4 ? dataItem?.item4 : "N/A"}
            </TextCenterItem>
          </WrapItemCenter>
        </CenterIntemWrap>
        {/* <LineStyled /> */}
        {/* <div style={{ marginTop: 12 }}> */}
        {/* <div style={{ display: "flex" }}>
            <TextBottomStyled style={{ marginRight: 40 }}>
              Giá niêm yết{" "}
            </TextBottomStyled>
            <NumberBottomStyled>
              {currencyFormat(priceListed)}đ
            </NumberBottomStyled>
          </div> */}
        {/* <div style={{ display: "flex" }}>
            <TextBottomStyled2 style={{ marginRight: 19 }}>
              Đơn giá thông thuỷ{" "}
            </TextBottomStyled2>
            <NumberBottomStyled2>
              {currencyFormat(priceSub)}đ/m2
            </NumberBottomStyled2>
          </div> */}
        {/* </div> */}
      </CardContentStyled>
      {activeSoSanh === true ? (
        <CardActions
          style={{
            flexDirection: "row",
            marginBottom: 24,
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(`/compare-product?idCompare=${id}`);
            }}
          >
            <IconPlusProduct />
            <TextButtonStyled onClick={onCompare}>So sánh</TextButtonStyled>
          </div>
          <ButtonStyled
            onClick={onClick}
            disabled={buyDisabled}
            style={{ backgroundColor: buyDisabled ? "#FFFF" : " #ea242a" }}
          >
            Mua Online&nbsp;
            <IconMuaOnline />
          </ButtonStyled>
        </CardActions>
      ) : (
        <CardActions style={{ flexDirection: "column", marginBottom: 24 }}>
          <ButtonStyled
            onClick={onClick}
            disabled={buyDisabled}
            style={{ backgroundColor: buyDisabled ? "#FFFF" : " #ea242a" }}
          >
            Mua Online&nbsp;
            <IconMuaOnline />
          </ButtonStyled>
        </CardActions>
      )}
    </CardStyled>
  );
}
