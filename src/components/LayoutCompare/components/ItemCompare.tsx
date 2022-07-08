import { IconHeartProduct, IconRemove } from "@components/Icons";
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
import React, { MouseEventHandler } from "react";
import LocalStorage from "utils/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  data?: object | any;
  onRemove?: MouseEventHandler<SVGSVGElement>;
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

const ItemCompare = ({ onClick, data, onRemove }: Props) => {
  const { compareParams } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  // const onRemove = () => {
  //   const local = LocalStorage.get("compare-item");
  //   if(local){
  //     console.log(local.map(item => item.productId).indexOf(data.productId));
  //     // const items = JSON.parse(local);
  //     const index = local.map(item => item.productId).indexOf(data.productId);
  //     if(index !== -1){
  //       local.splice(index, 1);
  //     }
  //     console.log(local);
  //     LocalStorage.set("compare-item", local);
  //   }
  // }

  return (
    <Box width={289}>
      <WrapperContent
        width={289}
        height={285}
        padding={"0px"}
        marginBottom={"20px"}
      >
        <Box style={{ position: "absolute", left: "210px", top: "10px" }}>
          <IconHeartProduct />
        </Box>
        <Box style={{ position: "absolute", left: "249px", top: "10px" }}>
          <IconRemove style={{ stroke: 'white', width: '27px', height: '27px'}} onClick={onRemove}/>
        </Box>
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
            TNR Star
          </Text14Styled>
        </Box>
        <CardMedia
          component={"img"}
          height={160}
          style={{ borderRadius: "20px 20px 0px 0px" }}
          image={data?.thumbnail ?? "https://picsum.photos/308/200"}
          alt={"green image"}
        />
        <ColStyled aItems="center" margin={"11px 0px 23px"}>
          <Title22Styled color={"#1b3459"}>{data?.name ?? "N/A"}</Title22Styled>
          <ButtonAction
            style={{
              width: 164,
              height: 48,
              borderRadius: 60,
              marginTop: 19,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: data?.paymentStatus!==2 ? "#FFFF" : " #ea242a"
            }}
            onClick={onClick}
            disabled={data?.paymentStatus!==2}
          >
            <Text16Styled color={"white"}>Mua Online</Text16Styled>
            <Box width={19} height={19}>
              <IconArrowRight color={"white"} />
            </Box>
          </ButtonAction>
        </ColStyled>
      </WrapperContent>

      {compareParams.filter(item => item.type === 'Thông tin chung').map(item => (
                <BoxInputStyled key={item.id}>
                <TitleMoneyStyled>{data[item.keyMap.trim()] ?? 'N/A'}</TitleMoneyStyled>
              </BoxInputStyled>
              ))}
              {/* {compareParams.filter(item => item.type === 'Tiện ích').map(item => (
                <BoxInputStyled key={item.id}>
                <TitleMoneyStyled>{data[item.keyMap.trim()] ?? 'N/A'}</TitleMoneyStyled>
              </BoxInputStyled>
              ))} */}
              {/* {compareParams.filter(item => item.type === 'Chi tiết').map(item => (
                <BoxInputStyled key={item.id}>
                <TitleMoneyStyled>{data[item.keyMap.trim()] ?? 'N/A'}</TitleMoneyStyled>
              </BoxInputStyled>
              ))} */}

      {/* <BoxInputStyled>
        <TitleMoneyStyled>{data?.totalPrice ?? "N/A"} đ</TitleMoneyStyled>
      </BoxInputStyled>

      <BoxInputStyled>
        <TextMoneyStyled>
          {data?.landArea ?? "N/A"} m<sup>2</sup>
        </TextMoneyStyled>
      </BoxInputStyled>

      <BoxInputStyled>
        <TextMoneyStyled>{data?.numBed ?? "N/A"}</TextMoneyStyled>
      </BoxInputStyled>

      <BoxInputStyled>
        <TextMoneyStyled>{data?.numBath ?? "N/A"}</TextMoneyStyled>
      </BoxInputStyled>

      <BoxInputStyled>
        <TextMoneyStyled>{data?.doorDirection ?? "N/A"}</TextMoneyStyled>
      </BoxInputStyled>

      <BoxInputStyled>
        <TextMoneyStyled>{data?.doorDirection ?? "N/A"}</TextMoneyStyled>
      </BoxInputStyled> */}
    </Box>
  );
};

export default ItemCompare;
