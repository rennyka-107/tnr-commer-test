import { IconHeartFilled, IconHeartProduct, IconX } from "@components/Icons";
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
import { Box, CardMedia } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { CompareValueFormat } from "utils/CompareValueFormat";
import { useRouter } from "next/router";
import { ToggleProductFavorite } from "../../../../pages/api/favorite";
import useAuth from "hooks/useAuth";
import {
  removeCompareItem,
  removeComparePopUpItem,
} from "../../../../store/productCompareSlice";

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
  height: 59,
  padding: "0px 0px 4px 12px",
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

const ItemCompare = ({ onClick, data }: Props) => {
  const router = useRouter();
  const [favorite, setFavorite] = useState<boolean>(false);
  const { compareParams, compareItems } = useSelector(
    (state: RootState) => state.productCompareSlice
  );
  const { isAuthenticated } = useAuth();

  const onRemove = () => {
    router.push({
      pathname: "/compare-product",
      query: {
        productId: compareItems
          .map((item) => item.productId)
          .filter((item: string) => item !== data.productId),
      },
    });
  };

  const onFavorite = async () => {
    try {
      const res = await ToggleProductFavorite({
        productId: data.productId,
        action: favorite ? 0 : 1,
      });
      if (res.responseCode === "00") {
        setFavorite(!favorite);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
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
          <IconWrapper
            style={{ left: "210px", top: "10px" }}
            onClick={onFavorite}
          >
            {favorite ? (
              <IconHeartFilled style={{ width: "14px", height: "12px" }} />
            ) : (
              <IconHeartProduct style={{ width: "14px", height: "12px" }} />
            )}
          </IconWrapper>
        )}
        <IconWrapper style={{ left: "249px", top: "10px" }} onClick={onRemove}>
          <IconX style={{ stroke: "white", width: "12px", height: "12px" }} />
        </IconWrapper>
        <Box
          style={{
            position: "absolute",
            top: "138px",
            left: "215px",
            padding: "3px 8px",
            background: "#868686",
          }}
        >
          <Text14Styled color={"white"} style={{ whiteSpace: "pre" }}>
            {data?.categoryName}
          </Text14Styled>
        </Box>
        <CardMedia
          component={"img"}
          height={160}
          style={{ borderRadius: "20px 20px 0px 0px" }}
          image={data?.thumbnail ?? "https://picsum.photos/308/200"}
          alt={data?.productName ?? "N/A"}
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
          <ButtonAction
            style={{
              width: 164,
              height: 48,
              borderRadius: 60,
              marginTop: 19,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                data?.paymentStatus !== "2" ? "#FFFF" : " #ea242a",
            }}
            onClick={onClick}
            disabled={data?.paymentStatus !== "2"}
          >
            <Text16Styled color={"white"}>Mua Online</Text16Styled>
            <Box width={19} height={19}>
              <IconArrowRight color={"white"} />
            </Box>
          </ButtonAction>
        </ColStyled>
      </WrapperContent>

      {compareParams
        .filter((item) => item.type === "Thông tin chung")
        .map((item) => (
          <BoxInputStyled key={item.id}>
            {item.keyMap.trim() === "totalPrice" ? (
              <TitleMoneyStyled>
                {CompareValueFormat(data[item.keyMap], item.keyMap)}
              </TitleMoneyStyled>
            ) : (
              <TextMoneyStyled>
                {CompareValueFormat(data[item.keyMap], item.keyMap)}
              </TextMoneyStyled>
            )}
          </BoxInputStyled>
        ))}
    </Box>
  );
};

export default ItemCompare;
