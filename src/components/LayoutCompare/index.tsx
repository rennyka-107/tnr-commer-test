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
import { IconDontHaveItem, IconHaveItem, IconTimes } from "@components/Icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { searchLocationResponse } from "interface/searchIF";
import LocalStorage from "utils/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CompareValueFormat } from "utils/CompareValueFormat";
import _, { isEmpty } from "lodash";
import useAddToCart from "hooks/useAddToCart";
import { getComparePopUpItem } from "../../../store/productCompareSlice";

type Props = {};

const ItemCompareDynamic = dynamic(() => import("./components/ItemCompare"), {
  loading: () => <p>...</p>,
});
const ItemImportDynamic = dynamic(() => import("./components/ItemImport"), {
  loading: () => <p>...</p>,
});

const TitleMoneyStyled = styled(Title22Styled)({
  textAlign: "right",
  width: "100%",
  whiteSpace: "pre",
  color: "#1b3459",
  fontWeight: 500
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
  const { comparePopUpItem } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  const addToCart = useAddToCart();
  const dispatch = useDispatch();
  const [filterSearch, setFilterSearch] = useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: null,
    areaTo: null,
    categoryId: "",
  });

  const onChangeFilter = (value: any) => {
    setFilterSearch({
      ...filterSearch,
      ...value,
    });
  };
  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const renderDataChildren = ({ data }) => {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <ColStyled style={{ width: 293 }} key={index}>
            <BoxInputStyled width={293} paddingLeft={"14px"}>
              <Text18Styled color={"#1b3459"} style={{ lineHeight: "31px" , textAlign: 'end'}}>
                {item.key.trim() === "totalPrice" ? (
                  <>{currencyFormat(item.value)}đ</>
                ) : (
                  <div key={item.key}>
                    {item.key.trim() === "airConditioner" ? (
                      <>{CompareValueFormat(item.value, item.key)}</>
                    ) : (
                      <>
                      {Number(item.value) >= 1 ? (
                          <IconHaveItem />
                        ) : (
                          <IconDontHaveItem />
                        )}
                      </>
                    )}
                  </div>
                )}
              </Text18Styled>
            </BoxInputStyled>
          </ColStyled>
        ))}
        {Array.from({ length: 3 - data.length }).map((item, index) => (
          <ColStyled style={{ width: 293 }} key={index}>
            <BoxInputStyled width={293} paddingLeft={"14px"}></BoxInputStyled>
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
            onClick={() => addToCart(item.productId)}
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
            <ItemImportDynamic
              onChangeFilter={onChangeFilter}
              filter={filterSearch}
            />
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
              {compareParams
                .filter((item) => item.type === "Thông tin chung")
                .map((item) => (
                  <BoxInputStyled key={item.id}>
                    <TitleMoneyStyled style={{textAlign: 'end', whiteSpace: 'normal', maxWidth:135, height: 'auto',fontSize: 18, marginLeft: 10 }}>{item.name}</TitleMoneyStyled>
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
          {compareParams.map((item) => item.type).includes("Tiện ích") && (
            <Grid item xs={1}>
              <Accordion style={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  style={{ background: "#F3F3F3", marginLeft: 0 }}
                >
                  <Box style={{ maxWidth: "35px" }}>
                    <TitleMoneyStyled style={{fontSize: 18}}>Tiện ích</TitleMoneyStyled>
                  </Box>
                </AccordionSummary>

                <AccordionDetails style={{ padding: 0 }}>
                  {compareParams
                    .filter((item) => item.type === "Tiện ích")
                    .map((item) => (
                      <RowStyled key={item.id}>
                        <ColStyled
                          style={{
                            width: 134,
                            marginRight: 56,
                            direction: "rtl",
                          }}
                        >
                          <BoxInputStyled>
                            <TitleMoneyStyled style={{textAlign: 'end', whiteSpace: 'normal', maxWidth:135, height: 'auto',fontSize: 18, marginLeft: 10 }}>{item.name}</TitleMoneyStyled>
                          </BoxInputStyled>
                        </ColStyled>
                        {renderDataChildren({
                          data: compareItems.map((product) => {
                            return {
                              value: product[item.keyMap],
                              key: item.keyMap,
                            };
                          }),
                        })}
                      </RowStyled>
                    ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
          {compareParams.map((item) => item.type).includes("Chi tiết") && (
            <Grid item xs={1} style={{ maxWidth: 1108, marginTop: 15 }}>
              <Accordion style={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  style={{ background: "#F3F3F3", marginLeft: 0 }}
                >
                  <Box style={{ maxWidth: "35px" }}>
                    <TitleMoneyStyled style={{fontSize: 18}}>Chi tiết</TitleMoneyStyled>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {compareParams
                    .filter((item) => item.type === "Chi tiết")
                    .map((item) => (
                      <RowStyled key={item.id}>
                        <ColStyled
                          style={{
                            width: 134,
                            marginRight: 56,
                            direction: "rtl",
                          }}
                        >
                          <BoxInputStyled>
                            <TitleMoneyStyled style={{textAlign: 'end', whiteSpace: 'normal', maxWidth:135, height: 'auto',fontSize: 18 }}>{item.name}</TitleMoneyStyled>
                          </BoxInputStyled>
                        </ColStyled>
                        {renderDataChildren({
                          data: compareItems.map((product) => {
                            return {
                              value: product[item.keyMap],
                              key: item.keyMap,
                            };
                          }),
                        })}
                      </RowStyled>
                    ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default LayoutCompare;
