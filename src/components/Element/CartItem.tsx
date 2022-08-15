import {
  FloorIcon,
  IconAddHearProduct,
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
  IconHeartProduct,
} from "@components/Icons";
import styled from "@emotion/styled";
import { Button, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import useFavourite from "hooks/useFavourite";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { MouseEventHandler, ReactNode } from "react";
import { Product } from "type/common";
import Product3 from "../../../public/images/product3.png";

interface Props {
  item: any;
  children?: ReactNode;
}

const CartItem = ({ children, item }: Props) => {
  const { thumbnail, ticketCard, id, activeFavourite, favouriteStatus } = item;

  const { addProductToFavouriteFunction } = useFavourite();

  return (
    <CardStyled sx={{ maxWidth: 350, width: "100%" }}>
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
              color: "#FFFFFF",
            }}
          >
            {ticketCard}
          </span>
        </div>
      ) : (
        <></>
      )}
      <ImageWithHideOnError
        className="logo"
        src={thumbnail}
        fallbackSrc={Product3}
        height={190}
        width={350}
        title={"Logo "}
        alt={"Logo "}
        priority
        unoptimized={true}
        objectFit="cover"
      />
      {children && children}
    </CardStyled>
  );
};

export default CartItem;

CartItem.Title = ({ item }: Props) => {
  const { title, subTitle, projectName, id } = item;
  const router = useRouter();

  return (
    <div style={{ marginBottom: 7 }}>
      <span onClick={() => router.push(`/products/${id}`)}>
        <TextTitleStyled style={{ marginBottom: 9 }}>{title}</TextTitleStyled>
        <TextProjectStyled>{projectName}</TextProjectStyled>
      </span>
      <TextitleBottom>{subTitle ? subTitle : "N/A"}</TextitleBottom>
    </div>
  );
};

CartItem.GeneralInfo = ({ children, item }: Props) => {
  const { dataItem, projectTypeCode, minFloor, maxFloor } = item;
  return (
    <CenterIntemWrap>
      {projectTypeCode === "2" ? (
        <>
          <WrapItemCenter>
            <IconBath />
            <TextCenterItem>
              {item?.numBath ? item.numBath : "N/A"}
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
          {item?.landArea ? item.landArea : "N/A"} m²
        </TextCenterItem>
      </WrapItemCenter>

      {projectTypeCode === "2" ? (
        <>
          <WrapItemCenter>
            <IconBedDouble />
            <TextCenterItem>
              {item?.numBed ? item.numBed : "N/A"}
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
          {item?.doorDirection ? item.doorDirection : "N/A"}
        </TextCenterItem>
      </WrapItemCenter>
    </CenterIntemWrap>
  );
};

CartItem.ContentWrap = ({ children }: Props) => {
  return <CardContentStyled>{children}</CardContentStyled>;
};

CartItem.Price = ({ children, item }: Props) => {
  const { unitPrice, totalPrice } = item;
  return (
    <Box sx={{ mt: 2 }}>
      <StyledPrice>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              color: "#1B3459",
              fontSize: "14px",
              fontWeight: 400,
              flex: 2,
            }}
          >
            Giá niêm yết
          </Box>
          <Box
            sx={{
              color: "#D60000;",
              fontSize: "18px",
              fontWeight: 700,
              flex: 2,
            }}
          >
            {totalPrice ? totalPrice : "N/A"}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Box
            sx={{
              color: "#1B3459",
              fontSize: "14px",
              fontWeight: 400,
              flex: 2,
            }}
          >
            Đơn giá thông thuỷ
          </Box>
          <Box
            sx={{
              color: "#D60000;",
              fontSize: "12px",
              fontWeight: 400,
              flex: 2,
            }}
          >
            {unitPrice}đ/m2
          </Box>
        </Box>
      </StyledPrice>
    </Box>
  );
};

interface SelectProps extends Props {
  handleSelectItem: (item: any) => void;
  handleCloseModal: () => void;
}

CartItem.Select = ({
  item,
  handleSelectItem,
  handleCloseModal,
}: SelectProps) => {
  const handleSelect = () => {
    handleSelectItem(item);
    handleCloseModal();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        width: "fit-content",
        margin: "40px auto 0px auto",
      }}
      onClick={handleSelect}
    >
      <Image alt="" src="/icons/add_icon.svg" width={15} height={15} />
      <Box
        sx={{
          color: "#0063F7",
          fontSize: "14px",
          fontWeight: 400,
          ml: "12px",
        }}
      >
        Chọn sản phẩm để đổi
      </Box>
    </Box>
  );
};

interface ChangeSelectProps extends Props {
  handleOpenModal: () => void;
}

CartItem.ChangeSelect = ({ item, handleOpenModal }: ChangeSelectProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        width: "fit-content",
        margin: "40px auto 0px auto",
      }}
      onClick={handleOpenModal}
    >
      <Image alt="" src="/icons/add_icon.svg" width={15} height={15} />
      <Box
        sx={{
          color: "#0063F7",
          fontSize: "14px",
          fontWeight: 400,
          ml: "12px",
        }}
      >
        Đổi sản phẩm
      </Box>
    </Box>
  );
};

const StyledPrice = styled(Box)``;

const CardStyled = styled(Card)`
  background: #ffffff;
  width: 350px;
  /* Line/stroke */
  position: relative;
  border: 0.5px solid #d8d8d8;
  border-radius: 20px 20px 20px 20px;
  box-shadow: none !important;
`;
const CardContentStyled = styled(CardContent)`
  padding: 10px 20px 0px 20px;
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
    background: #fec83c;
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
