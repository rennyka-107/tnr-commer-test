import Container from "@components/Container";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  ColStyled,
  RowStyled,
  Title22Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { IconTimes } from "@components/Icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { searchLocationResponse } from "interface/searchIF";
import LocalStorage from "utils/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {CompareValueFormat} from "utils/CompareValueFormat";
import _ from "lodash";

type Props = {};

const ItemCompareDynamic = dynamic(() => import("./components/ItemCompare"), {
  loading: () => <p>...</p>,
});
const ItemImportDynamic = dynamic(() => import("./components/ItemImport"), {
  loading: () => <p>...</p>,
});

const TitleMoneyStyled = styled(Title22Styled)({
  textAlign: "right",
  marginRight: "35px",
  width: "100%",
  whiteSpace: "pre",
  color: "#1b3459",
});
const BoxInputStyled = styled(Box)(
  {
    height: 59,
    paddingBottom: "6px",
    borderBottom: "1px solid #dcdcdc",
    display: "flex",
    alignItems: "end",
  },
  (props: { width?: number | string }) => ({
    width: props.width ?? 134,
  })
);

const LayoutCompare = (props: Props) => {
  const { compareParams, compareItems } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  const onAdd = () => {

  }


  const renderDataChildren = ({ data }) => {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <ColStyled style={{ width: 293 }} key={index}>
          <BoxInputStyled width={293} paddingLeft={"14px"} >
          <Text18Styled color={"#1b3459"} style={{lineHeight: "31px",}}>{CompareValueFormat(item.value, item.key)}</Text18Styled>
        </BoxInputStyled>
        </ColStyled>
        ))}
        {Array.from({ length: 3 - data.length }).map((item, index) => (
          <ColStyled style={{ width: 293 }} key={index}>
          <BoxInputStyled width={293} paddingLeft={"14px"}>
          <IconTimes style={{ width: 22.5 }} />
        </BoxInputStyled>
        </ColStyled>
        ))}
      </React.Fragment>
    );
  };

  const router = useRouter();

  const ArrayItemLocal = (product: any[]) => {
    if (typeof window !== "undefined") {
        const result = product.map((item, idx) => (
          <ColStyled style={{ width: 293 }} key={idx}>
            <ItemCompareDynamic
              data={item}
              onClick={() => router.push(`/payment-cart/${item.productId}`)}
            />
          </ColStyled>
        ));
        return result;
    }
    return <></>;
  };

  const ArrayItemImport = () => {
    if (typeof window !== "undefined") {
      if (compareItems !== null) {
        const items = 3 - compareItems.length;
        const result = Array.from({ length: items }, (_, i) => i).map((el) => (
          <ColStyled key={el} style={{ width: 293 }}>
            <ItemImportDynamic />
          </ColStyled>
        ));
        return result;
      }
    }
  };

  return (
    <Container title={"SO SÁNH BẤT ĐỘNG SẢN"}>
      <Box maxWidth={1108} margin={"0px auto"}>
        <RowStyled>
          <ColStyled style={{ width: 134, marginRight: 56 }}>
            <Box style={{ height: 305 }} />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                direction: "rtl",
              }}
            >
              {compareParams.filter(item => item.type === 'Thông tin chung').map(item => (
                <BoxInputStyled key={item.id}>
                <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
              </BoxInputStyled>
              ))}
            </Box>
          </ColStyled>
          {ArrayItemLocal(compareItems)}
          {ArrayItemImport()}
        </RowStyled>

        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          columns={1}
          style={{ marginTop: 36 }}
          maxWidth={"1108px"}
        >
          <Grid item xs={1}>
            <Accordion style={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                style={{ background: "#F3F3F3", marginLeft: 0 }}
              >
                <Box style={{ maxWidth: "35px" }}>
                  <TitleMoneyStyled>Tiện ích</TitleMoneyStyled>
                </Box>
              </AccordionSummary>

              <AccordionDetails style={{ padding: 0 }}>
              {compareParams.filter(item => item.type === 'Tiện ích').map(item => (
                <RowStyled key={item.id}>
                <ColStyled style={{ width: 134, marginRight: 56, direction: "rtl", }}>
                  <BoxInputStyled>
                    <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
                  </BoxInputStyled>
                </ColStyled>
                {renderDataChildren({ data: compareItems.map(product => { return { value: product[item.keyMap], key: item.keyMap}}) })}
              </RowStyled>
              ))}
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={1} style={{ maxWidth: 1108, marginTop: 15 }}>
            <Accordion style={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                style={{ background: "#F3F3F3", marginLeft: 0 }}
              >
                <Box style={{ maxWidth: "35px" }}>
                  <TitleMoneyStyled>Chi Tiết</TitleMoneyStyled>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
              {compareParams.filter(item => item.type === 'Chi tiết').map(item => (
                <RowStyled key={item.id}>
                <ColStyled style={{ width: 134, marginRight: 56, direction: "rtl", }}>
                  <BoxInputStyled>
                    <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
                  </BoxInputStyled>
                </ColStyled>
                {renderDataChildren({ data: compareItems.map(product => { return { value: product[item.keyMap], key: item.keyMap}}) })}
              </RowStyled>
              ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LayoutCompare;
