import Container from "@components/Container";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from "react";
import styled from "@emotion/styled";
import {
  ColStyled,
  RowStyled,
  Title22Styled,
} from "@components/StyledLayout/styled";
import { IconTimes } from "@components/Icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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
  const renderDataChildren = ({ data }) => {
    return (
      <React.Fragment>
        <ColStyled style={{ width: 293 }}>
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
        </ColStyled>
      </React.Fragment>
    );
  };

  const router = useRouter();
  const ArrayItemLocal = () => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("compare-item");
      if (local !== null) {
        const items = JSON.parse(local);
        const result = items?.map((item, idx) => (
          <ColStyled style={{ width: 293 }} key={idx}>
            <ItemCompareDynamic
              data={item}
              onClick={() => router.push(`/payment-cart/${item.id}`)}
            />
          </ColStyled>
        ));
        return result;
      }
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
              <BoxInputStyled>
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
              </BoxInputStyled>
            </Box>
          </ColStyled>
          {ArrayItemLocal()}
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
                <RowStyled>
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
                </RowStyled>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                autem.
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LayoutCompare;
