import {
  IconAddHearProduct,
  IconDontHaveItem,
  IconHaveItem,
  IconHeartProduct,
  IconX,
} from "@components/Icons";
import IconArrowRight from "@components/Icons/IconArrowRight";
import {
  ButtonAction,
  ColStyled,
  Text14Styled,
  Text16Styled,
  Text18Styled,
  Title22Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { Box, Button, CardMedia } from "@mui/material";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { CompareValueFormat } from "utils/CompareValueFormat";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import {
  getComparePopUpItem,
  removeComparePopUpItem,
} from "../../../../store/productCompareSlice";
import useFavourite from "hooks/useFavourite";
import useAddToCart from "hooks/useAddToCart";
import { CompareParamsI } from "../../../../pages/api/compareApi";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import Product3 from "../../../../public/images/product3.png";
import LocalStorage from "utils/LocalStorage";
import { isArray, isEmpty } from "lodash";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  data?: object | any;
};

const TitleMoneyStyled = styled(Title28Styled)({
  fontSize: 24,
  lineHeight: "31px",
  fontWeight: 700,
  color: "#D60000",
});

const WrapperContent = styled(WrapperBoxBorderStyled)({
  position: "relative",
});

const TextMoneyStyled = styled(Text18Styled)({
  lineHeight: "31px",
});

const BoxInputStyled = styled(Box)({
  minHeight: 59,
  height: "auto",
  padding: "10px 0px 4px 12px",
  borderBottom: "1px solid #dcdcdc",
  display: "flex",
  alignItems: "end",
});

const IconWrapper = styled(Box)`
  position: absolute;
  cursor: pointer;
  background: rgba(185, 189, 195, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  display: flex;
  padding: 8px;
  width: 30px;
  height: 28px;
`;

const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
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

  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 19px 4px 0 4px;
`;

const ItemCompare = ({ onClick, data }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState<boolean>(
    data.favouriteStatus === "0" ? false : true
  );
  const [checked, setChecked] = useState([]);

  const { compareParams, compareItems, comparePopUpItem } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  const { isAuthenticated } = useAuth();
  const { addProductToFavouriteFunction } = useFavourite();

  useEffect(() => {
    setFavorite(data.favouriteStatus === "0" ? false : true);
  }, [data.favouriteStatus]);

  const onRemove = () => {
    dispatch(removeComparePopUpItem(data.productId));
    router.push({
      pathname: "/compare-product",
      query: {
        productId: compareItems
          .map((item) => item.productId)
          .filter((item: string) => item !== data.productId),
      },
    });
  };
  useEffect(() => {
    if (!isArray(router.query.productId)) {
      const param = LocalStorage.get("compare-url");
      const projectIdLS = LocalStorage.get("listParamsIdProject");
      const projectTypeIDLs = LocalStorage.get("listParamsLSProjectType");
      if (!param) return;

      dispatch(
        getComparePopUpItem([
          {
            projectName: compareItems[0].projectName,
            thumbnail: compareItems[0].thumbnail,
            name: compareItems[0].productName,
            productId: compareItems[0].productId,
            projectId: projectIdLS[0],
            projectType: projectTypeIDLs[0],
          },
        ])
      );
      router.push({
        pathname: `/compare-search`,
        query: {
          ...param,
        },
      });
    }
  }, [router.query.productId]);

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const ValueCompare = (item: CompareParamsI) => {
	
    if (
      item.keyMap.trim() === "totalPrice" ||
      item.keyMap.trim() === "landArea" ||
      item.keyMap.trim() === "clearArea" ||
      item.keyMap.trim() === "buildArea" ||
      item.keyMap.trim() === "doorDirection" ||
      item.keyMap.trim() === "barconyDirection" ||
	  item.keyMap.trim() === "airConditioner" ||
      item.keyMap.trim() === "buildArea"||
	  item.keyMap.trim() === "numBath" ||
	  item.keyMap.trim() === "numBed"
    ) {
      if (item.keyMap.trim() === "totalPrice")
        return (
          <TitleMoneyStyled>
            {currencyFormat(data[item.keyMap])} đ
          </TitleMoneyStyled>
        );
      //   if (item.keyMap.trim() === "parking")
      // 	return (
      // 	  <span>
      // 		{data[item.keyMap] >= 1 ? <IconHaveItem /> : <IconDontHaveItem />}
      // 	  </span>
      // 	);
	  if(item.keyMap.trim() === "airConditioner"){
		{data[item.keyMap] >= 1 ? CompareValueFormat(data[item.keyMap], item.keyMap) : <IconDontHaveItem />}
	  }
      if (item.keyMap.trim() === "landArea")
        return (
          <TextMoneyStyled>
            {" "}
            {CompareValueFormat(data[item.keyMap], item.keyMap)} m2
          </TextMoneyStyled>
        );
      if (
        item.keyMap.trim() === "clearArea" ||
        item.keyMap.trim() === "buildArea"
      )
        return (
          <TextMoneyStyled>
            {" "}
            {CompareValueFormat(data[item.keyMap], item.keyMap)} m2
          </TextMoneyStyled>
        );
      else
        return (
          <TextMoneyStyled>
            {CompareValueFormat(data[item.keyMap], item.keyMap)}
          </TextMoneyStyled>
        );
    } else
      return (
        <TextMoneyStyled>
          {/* {CompareValueFormat(data[item.keyMap], item.keyMap)} */}
          {data[item.keyMap] >= 1 ? <IconHaveItem /> : <IconDontHaveItem />}
        </TextMoneyStyled>
      );
  };

  return (
    <Box width={289}>
      <WrapperContent
        width={289}
        height={285}
        padding={"0px"}
        marginBottom={"20px"}
      >
        {isAuthenticated && (
          <IconWrapper style={{ left: "210px", top: "10px" }}>
            {favorite ? (
              <IconAddHearProduct
                style={{
                  cursor: "pointer",
                  width: "14px",
                  height: "12px",
                }}
                onClick={() => {
                  addProductToFavouriteFunction(data.productId, 0);
                  setFavorite(false);
                }}
              />
            ) : (
              <IconHeartProduct
                style={{
                  cursor: "pointer",
                  width: "14px",
                  height: "12px",
                }}
                onClick={() => {
                  addProductToFavouriteFunction(data.productId, 1);
                  setFavorite(true);
                }}
              />
            )}
          </IconWrapper>
        )}
        <IconWrapper
          style={{ left: "249px", top: "10px", zIndex: 300 }}
          onClick={onRemove}
        >
          <IconX style={{ stroke: "white", width: "12px", height: "12px" }} />
        </IconWrapper>
        {/* <Box
          style={{
            position: "absolute",
            top: "135px",
            left: "215px",
            padding: "5px 8px",
			right: 0,
			height: 25,
            background: "#FEC83C",
			textAlign: 'center'
          }}
        >
          <Text14Styled color={"#0E1D34"} style={{ whiteSpace: "pre" , fontWeight: 400, fontSize: 14}}>
            {data?.categoryName}
          </Text14Styled>
        </Box> */}
        {data?.categoryName && (
          <div
            style={{
              background: "#FEC83C",
              width: "auto",
              height: "auto",
              position: "absolute",
              marginTop: 130,
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
                color: "#0E1D34",
              }}
            >
              {data?.categoryName}
            </span>
          </div>
        )}

        {/* <CardMedia
          component={"img"}
          height={160}
          style={{ borderRadius: "20px 20px 0px 0px" }}
          image={data?.thumbnail ?? "https://picsum.photos/308/200"}
          alt={data?.productName ?? "N/A"}
        /> */}
        <ImageWithHideOnError
          className="logo"
          src={data.thumbnail ? data.thumbnail : Product3}
          fallbackSrc={Product3}
          height={195}
          width={350}
          title={"Logo "}
          alt={data?.productName ?? "N/A"}
          priority
          unoptimized={true}
          style={{ borderRadius: "20px 20px 0px 0px" }}
          objectFit="cover"
        />
        <ColStyled aItems="center" margin={"11px 0px 23px"}>
          <Title22Styled
            color={"#1b3459"}
            style={{
              width: "250px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {data?.productName ?? "N/A"}
          </Title22Styled>
          <ButtonStyled
            sx={{
              backgroundColor: data?.paymentStatus === "2" && "#ea242a",
            }}
            onClick={onClick}
            disabled={data?.paymentStatus !== "2"}
          >
            <Text16Styled
              style={{
                color: data?.paymentStatus === "2" ? "#ffffff" : "gray",
              }}
            >
              Mua Online
            </Text16Styled>
            <Box width={19} height={19}>
              <IconArrowRight color={"white"} />
            </Box>
          </ButtonStyled>
        </ColStyled>
      </WrapperContent>

      {compareParams
        .filter((item) => item.type === "Thông tin chung")
        .map((item) => (
          <BoxInputStyled key={item.id}>{ValueCompare(item)}</BoxInputStyled>
        ))}
    </Box>
  );
};

export default ItemCompare;
