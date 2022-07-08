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
} from "@components/StyledLayout/styled";
import { IconTimes } from "@components/Icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { searchLocationResponse } from "interface/searchIF";
import LocalStorage from "utils/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

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
  const [compareItem, setCompareItem] = useState<searchLocationResponse[]>([]);
  const { compareParams } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  useEffect(() => {
    initItem();
  },[])

  useEffect(() => {
    console.log(compareParams);
  })

  const initItem = () => {
    if(typeof window !== 'undefined'){
      const local = LocalStorage.get('compare-item');
      if(local){
        setCompareItem(local);
      }
    }
  }

  const onRemove = (id: string) => () => {
    const local: searchLocationResponse[] = LocalStorage.get('compare-item');
    if(local){
      const index = local.map((item: searchLocationResponse) => item.productId).indexOf(id);
      if(index !== -1){
        local.splice(index, 1);
      }
      LocalStorage.set('compare-item',local);
      setCompareItem(local);
    }
  }

  const onAdd = (product: searchLocationResponse) => {

  }


  const renderDataChildren = ({ data }) => {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <BoxInputStyled width={293} paddingLeft={"14px"} key={index}>
          <Title22Styled color={"#1b3459"}>{item}</Title22Styled>
        </BoxInputStyled>
        ))}
        {Array.from({ length: 3 - data.length }).map((item, index) => (
          <BoxInputStyled width={293} paddingLeft={"14px"} key={index}>
          <IconTimes style={{ width: 22.5 }} />
        </BoxInputStyled>
        ))}
        {/* <ColStyled style={{ width: 293 }}>
          <BoxInputStyled width={293} paddingLeft={"14px"}>
            <Title22Styled color={"#1b3459"}>2</Title22Styled>
          </BoxInputStyled>
        </ColStyled>
        <ColStyled style={{ width: 293 }}>
          <BoxInputStyled width={293} paddingLeft={"14px"}>
            <IconTimes style={{ width: 22.5 }} />
          </BoxInputStyled>
        </ColStyled>
        <ColStyled style={{ width: 293 }}>
          <BoxInputStyled width={293} paddingLeft={"14px"}>
            <IconTimes style={{ width: 22.5 }} />
          </BoxInputStyled>
        </ColStyled> */}
      </React.Fragment>
    );
  };

  const router = useRouter();

  const ArrayItemLocal = (product: searchLocationResponse[]) => {
    if (typeof window !== "undefined") {
        const result = product.map((item, idx) => (
          <ColStyled style={{ width: 293 }} key={idx}>
            <ItemCompareDynamic
              data={item}
              onRemove={onRemove(item.productId)}
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
      const local = localStorage.getItem("compare-item");
      if (local !== null) {
        const items = 3 - JSON.parse(local).length;
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
              }}
            >
              {compareParams.filter(item => item.type === 'Thông tin chung').map(item => (
                <BoxInputStyled key={item.id}>
                <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
              </BoxInputStyled>
              ))}
              {/* <BoxInputStyled>
                <TitleMoneyStyled>Giá</TitleMoneyStyled>
              </BoxInputStyled>

              <BoxInputStyled>
                <TitleMoneyStyled>Diện tích</TitleMoneyStyled>
              </BoxInputStyled>

              <BoxInputStyled>
                <TitleMoneyStyled>Phòng ngủ</TitleMoneyStyled>
              </BoxInputStyled>

              <BoxInputStyled>
                <TitleMoneyStyled>Phòng tắm</TitleMoneyStyled>
              </BoxInputStyled>

              <BoxInputStyled>
                <TitleMoneyStyled>Hướng</TitleMoneyStyled>
              </BoxInputStyled>

              <BoxInputStyled>
                <TitleMoneyStyled>Hướng</TitleMoneyStyled>
              </BoxInputStyled> */}
            </Box>
          </ColStyled>
          {ArrayItemLocal(compareItem)}
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
                <ColStyled style={{ width: 134, marginRight: 56 }}>
                  <BoxInputStyled>
                    <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
                  </BoxInputStyled>
                </ColStyled>
                {renderDataChildren({ data: [compareItem.map(product => product[item.keyMap.trim()])] })}
              </RowStyled>
              ))}


                {/* <RowStyled>
                  <ColStyled style={{ width: 134, marginRight: 56 }}>
                    <BoxInputStyled>
                      <TitleMoneyStyled>Điều hoà</TitleMoneyStyled>
                    </BoxInputStyled>
                  </ColStyled>
                  {renderDataChildren({ data: [] })}
                </RowStyled>

                <RowStyled>
                  <ColStyled style={{ width: 134, marginRight: 56 }}>
                    <BoxInputStyled>
                      <TitleMoneyStyled>Hồ bơi</TitleMoneyStyled>
                    </BoxInputStyled>
                  </ColStyled>
                  {renderDataChildren({ data: [] })}
                </RowStyled>

                <RowStyled>
                  <ColStyled style={{ width: 134, marginRight: 56 }}>
                    <BoxInputStyled>
                      <TitleMoneyStyled>Phòng GYM</TitleMoneyStyled>
                    </BoxInputStyled>
                  </ColStyled>
                  {renderDataChildren({ data: [] })}
                </RowStyled> */}
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
                <ColStyled style={{ width: 134, marginRight: 56 }}>
                  <BoxInputStyled>
                    <TitleMoneyStyled>{item.name}</TitleMoneyStyled>
                  </BoxInputStyled>
                </ColStyled>
                {renderDataChildren({ data: [compareItem.map(product => product[item.keyMap.trim()])] })}
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
