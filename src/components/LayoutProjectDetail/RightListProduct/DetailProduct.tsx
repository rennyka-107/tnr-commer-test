import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  FloorIcon,
  IconBath,
  IconBedDouble,
  IconCompass,
  IconFrame,
  IconMuaOnline,
  IconPlusCircle,
} from "@components/Icons";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import IconCoXay from "@components/Icons/IconCoXay";
import IconChuaXay from "@components/Icons/IconChuaXay";

type Props = {
  onBack?: Function;
};

const WrapperContent = styled(Box)`
  width: 500px;
  height: 100%;
  background: #fff;
  box-shadow: none;
  // padding: 0 16px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WrapperImg = styled(Box)`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`;
const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
`;
const TextStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;
const DividerLine = styled.div`
  width: 100%;
  height: 0px;
  border: 0.5px solid #c7c9d9;
  margin-bottom: 15px;
  margin-top: 10px;
`;
// const TicketTag = styled(Box)`
//   padding: 7px 14px;
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   background: #fec83c;
//   color: white;
//   font-family: "Roboto";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 16px;
// `;

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
  font-size: 16px;
  line-height: 14px;
  /* identical to box height */

  color: #d60000;
`;

const ButtonStyled1 = styled(Button)`
  width: 9rem;
  height: 48px;
  margin-top: 2rem;
  background: #ffffff;
  border-radius: 60px;
  border: 1px solid #1b3459;
  // :hover {
  //   background: #ea242a;
  //   box-shadow: 4px 8px 24px #f2f2f5;
  //   border: 1px solid #48576d;
  //   border-radius: 60px;
  //   color: #ffffff;
  //   border: unset;
  // }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #48576d;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ButtonStyled2 = styled(Button)`
  padding: 0 27px;
  // width: 9rem;
  height: 48px;
  margin-top: 2rem;
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
`;

const DetailProduct = ({ onBack }: Props) => {
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );
  const ListTarget = useSelector(
    (state: RootState) => state.projectMap.ListTarget
  );

  const [stringNameParent, setStringNameParent] = useState("N/A");
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(ListTarget)) {
      let nameParents = "";
      const arrayTarget = [...ListTarget];
      arrayTarget.sort((a, b) => a.level - b.level);
      arrayTarget.forEach((tg, idx) => {
        if (idx === 0) {
          nameParents = tg.levelName + " " + tg.name;
        } else {
          nameParents = nameParents + " - " + tg.levelName + " " + tg.name;
        }
      });
      setStringNameParent(nameParents);
    }
  }, [ListTarget]);

  return (
    <WrapperContent>
      <WrapperImg>
        <CardMedia
          component="img"
          height={250}
          image={Target.thumbnail ? Target.thumbnail : "/images/product_1.png"}
          alt="img product"
        />
      </WrapperImg>
      <Box sx={{ width: "80%" }}>
        <Box
          sx={{ display: "flex", marginLeft: `-13.5%`, alignItems: "center" }}
        >
          <IconButton onClick={() => onBack()}>
            <ArrowBackIosIcon />
          </IconButton>
          <TitleStyled sx={{ ml: 1.5}}>{Target.name ?? "N/A"}</TitleStyled>
        </Box>
        {/* {ListLevel.length > 0 && (
          <TextStyled style={{ margin: "10px auto" }}>
            {ListLevel[0].name}
          </TextStyled>
        )}
        <TextStyled style={{ margin: "10px auto" }}>
          {Target.location ? Target.location : "N/A"}
        </TextStyled>
        <DividerLine />
        <Grid sx={{ pb: 2 }} container rowSpacing={1}>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBedDouble />
            &nbsp;&nbsp;<TextStyled>{Target.numBed ?? "N/A"}</TextStyled>
          </Grid>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconFrame />
            &nbsp;&nbsp;
            <TextStyled>
              {Target.landArea ?? "N/A"} m<sup>2</sup>
            </TextStyled>
          </Grid>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconBath />
            &nbsp;&nbsp;<TextStyled>{Target.numBath ?? "N/A"}</TextStyled>
          </Grid>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconCompass />
            &nbsp;&nbsp;
            <TextStyled>
              {Target.doorDirection ? Target.doorDirection : "N/A"}
            </TextStyled>
          </Grid>
        </Grid> */}
        <DividerLine />
        <Grid sx={{ pb: 2 }} container rowSpacing={1}>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconFrame />
            &nbsp;&nbsp;
            <TextStyled>
              {Target.landArea ?? "N/A"} m<sup>2</sup>
            </TextStyled>
          </Grid>
          {Target.buildType === "1" && (
            <>
              {Target.build ? (
                <>
                  <Grid item xs={6} display={"flex"} alignItems={"center"}>
                    <IconCoXay /> &nbsp;&nbsp;
                    <TextStyled>Có xây</TextStyled>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6} display={"flex"} alignItems={"center"}>
                    <IconChuaXay /> &nbsp;&nbsp;
                    <TextStyled>Chưa xây</TextStyled>
                  </Grid>
                </>
              )}
            </>
          )}

          {Target.buildType === "2" && (
            <Grid item xs={6} display={"flex"} alignItems={"center"}>
              <IconBedDouble />
              &nbsp;&nbsp;<TextStyled>{Target.numBed ?? "N/A"}</TextStyled>
            </Grid>
          )}
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <IconCompass />
            &nbsp;&nbsp;<TextStyled>{Target.doorDirection ?? "N/A"}</TextStyled>
          </Grid>

          {Target.buildType === "2" && (
            <Grid item xs={6} display={"flex"} alignItems={"center"}>
              <IconBath />
              &nbsp;&nbsp;<TextStyled>{Target.numBath ?? "N/A"}</TextStyled>
            </Grid>
          )}
          {Target.buildType === "1" && Target.build && (
            <Grid item xs={6} display={"flex"} alignItems={"center"}>
              <FloorIcon />
              &nbsp;&nbsp;
              <TextStyled>{Target.maxFloor ?? "N/A"} Tầng</TextStyled>
            </Grid>
          )}
        </Grid>
        {/* <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", marginBottom: 14 }}>
            <TextBottomStyled style={{ marginRight: 40 }}>
              Giá niêm yết{" "}
            </TextBottomStyled>
            <NumberBottomStyled>
              {currencyFormat(3018933000)}đ
            </NumberBottomStyled>
          </div>
          <div style={{ display: "flex" }}>
            <TextBottomStyled2 style={{ marginRight: 19 }}>
              Đơn giá thông thuỷ{" "}
            </TextBottomStyled2>
            <NumberBottomStyled2>
              {currencyFormat(40580174)}đ/m2
            </NumberBottomStyled2>
          </div>
        </div> */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ButtonStyled1
            onClick={() => {
              router.push(`/compare-product?idCompare=${Target.id}`);
            }}
            startIcon={
              <IconPlusCircle
                style={{ width: 16, height: 16 }}
                stroke="#0063F7"
              />
            }
            sx={{ border: "none !important", color: "#0063F7 !important" }}
          >
            So sánh
          </ButtonStyled1>
          <ButtonStyled2
            onClick={() => {
              router.push(`/products/${Target.id}`);
            }}
            endIcon={<IconMuaOnline />}
          >
            Xem Chi Tiết
          </ButtonStyled2>
        </Box>
      </Box>
    </WrapperContent>
  );
};

export default DetailProduct;
