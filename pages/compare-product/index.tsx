import FlexContainer from "@components/CustomComponent/FlexContainer";
import Container from "@components/Container";
import { ItemCompareData, ItemCompareProduct, ItemImportProduct } from "@components/CustomComponent";
import Page from "@layouts/Page";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import React from "react";
import Product1 from "../../public/images/product1.png";
import styled from "@emotion/styled";
import { ExpandMore } from "@mui/icons-material";
import { IconTimes } from "@components/Icons";

const WrapperTitle = styled.div`
  width: 134px;
  height: 59px;
  border-bottom: 2px solid #dcdcdc;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-align: right;
  color: #1b3459;
  display: flex;
  align-items: end;
  justify-content: end;
  padding: 0px 34px 10px 0px;
  white-space: pre;
`
const AccordionTitleStyle = styled.p`
  width: 100px;
  white-space: pre;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-align: right;
  color: #1b3459;
  margin: 0px;
  padding: 0px;
`
const WrapperText = styled.div`
  width: 288px;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 17px;
`
const WrapperTextCopy = styled.div`
  width: 134px;
  white-space: pre;
  font-family: 'Roboto';
  font-weight: 500;
  font-style: normal;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 35px;
`
const LineStyle = styled.div`
  width: 288px;
  height: 0px;
  border: 1px solid #dcdcdc;
`
const LineStyleCopy = styled.div`
  width: 134px;
  height: 0px;
  border: 1px solid #dcdcdc;
`
const columnsTitle = [
  {
    title: 'Giá',
    key: 'price'
  },
  {
    title: 'Diện tích',
    key: 'area'
  },
  {
    title: 'Phòng ngủ',
    key: 'bedroom'
  },
  {
    title: 'Phòng tắm',
    key: 'bathroom'
  },
  {
    title: 'Hướng',
    key: 'direction1'
  },
  {
    title: 'Hướng',
    key: 'direction2'
  }
]
const renderDataChildren = ({ data }) => {
  return (
    <>
      <WrapperText>
        2
      </WrapperText>
      <LineStyle />
      <WrapperText>
        <IconTimes style={{ width: 22.5 }} />
      </WrapperText>
      <LineStyle />
      <WrapperText>
        <IconTimes style={{ width: 22.5 }} />
      </WrapperText>
    </>
  )
}

const CompareProduct = () => {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Compare",
        description: "TNR Ecommerce Compare",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container title="So sánh bất động sản">
          <Grid direction={'row'} justifyContent={'center'} container>
            <Grid item style={{ marginTop: 286, marginRight: 56 }}>
              {Array.from(columnsTitle).map(item => (
                <WrapperTitle key={item.key}>
                  {item?.title}
                </WrapperTitle>
              ))}
            </Grid>
            <Grid item style={{ marginRight: 25 }}>
              <ItemCompareProduct
                src={Product1}
                title="TNR The Nosta"
                ticketCard="TNR Gold"
              />
              <ItemCompareData />
            </Grid>
            <Grid item style={{ marginRight: 25 }}>
              <ItemCompareProduct
                src={Product1}
                title="TNR The Nosta"
                ticketCard="TNR Gold"
              />
              <ItemCompareData />
            </Grid>
            <Grid item>
              <ItemImportProduct />
              <ItemCompareData />
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'center'} columns={1} style={{ marginTop: 36 }}>
            <Grid item xs={1} style={{ maxWidth: 1108 }}>
              <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore />} style={{ background: '#F3F3F3', marginLeft: 0 }}>
                  <AccordionTitleStyle>Tiện ích</AccordionTitleStyle>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                  <Grid container direction={'row'}>
                    <Grid item style={{ width: 134, marginRight: 56 }}>
                      <WrapperTextCopy>
                        Điều hoà
                      </WrapperTextCopy>
                      <LineStyleCopy />
                      <WrapperTextCopy>
                        Hồ bơi
                      </WrapperTextCopy>
                      <LineStyleCopy />
                      <WrapperTextCopy>
                        Phòng GYM
                      </WrapperTextCopy>
                    </Grid>
                    <Grid item style={{ marginRight: 25 }}>
                      {renderDataChildren({ data: [] })}
                    </Grid>
                    <Grid item style={{ marginRight: 25 }}>
                      {renderDataChildren({ data: [] })}
                    </Grid>
                    <Grid item>
                      {renderDataChildren({ data: [] })}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={1} style={{ maxWidth: 1108, marginTop: 15 }}>
              <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore />} style={{ background: '#F3F3F3', marginLeft: 0 }}>
                  <AccordionTitleStyle>Chi Tiết</AccordionTitleStyle>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, autem.
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </FlexContainer>
    </Page>
  )
}

export default CompareProduct;