import FlexContainer from "@components/CustomComponent/FlexContainer";
import Container from "@components/Container";
import { ItemCompareData, ItemCompareProduct, ItemImportProduct, ItemProductSeen } from "@components/CustomComponent";
import Page from "@layouts/Page";
import { Button, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Modal, Box, Select, FormControl, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Product1 from "../../public/images/product1.png";
import styled from "@emotion/styled";
import { ExpandMore } from "@mui/icons-material";
import { IconTimes } from "@components/Icons";
import { useRouter } from "next/router";

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
const TitleModal = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  color: #000;
  margin-bottom: 32px;
  text-align: center;
`
const BoxModalStyled = styled(Box)`
  width: 1275px;
  min-height: 650px;
  background: #fff;
  border: none;
  box-sizing: border-box;
  padding: 32px 85px 90px;
  position: relative;
`
const BoxTimes = styled(Button)`
  position: absolute;
  top: 22px;
  right: 22px;
`
const BoxSearchModalStyled = styled(Box)`
  width: 100%;
  background: #1b3459;
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 145px;
`
const ButtonSearchModalStyled = styled(Button)`
  width: 154px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: #d60000;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  &:hover {
    background: #d60000;
  }
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


const CompareProduct = () => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const handleClickRouter = (e) => {
    e.preventDefault()
    router.push('/payment-cart')
  }

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
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <BoxModalStyled>
              <BoxTimes onClick={() => setOpen(false)}>
                <IconTimes />
              </BoxTimes>
              <TitleModal>Sản phẩm đã xem gần nhất</TitleModal>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <ItemProductSeen src={Product1} />
                </Grid>
                <Grid item xs={4}>
                  <ItemProductSeen src={Product1} />
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <TitleModal style={{ marginTop: 33 }}>Hoặc tìm sản phẩm</TitleModal>
              <FormControl style={{ width: '100%' }}>
                <BoxSearchModalStyled>
                  <Select defaultValue={"1"} style={{ background: 'white' }}>
                    <MenuItem value="1">Dòng sản phầm</MenuItem>
                    <MenuItem value="2">Dòng sản phầm</MenuItem>
                  </Select>
                  <Select defaultValue={"1"} style={{ background: 'white' }}>
                    <MenuItem value="1">Loại sản phẩm</MenuItem>
                    <MenuItem value="2">Loại sản phẩm</MenuItem>
                  </Select>
                  <Select defaultValue={"1"} style={{ background: 'white' }}>
                    <MenuItem value="1">Khoảng giá</MenuItem>
                    <MenuItem value="2">Khoảng giá</MenuItem>
                    <MenuItem value="3">Khoảng giá</MenuItem>
                  </Select>
                  <ButtonSearchModalStyled>So sánh</ButtonSearchModalStyled>
                </BoxSearchModalStyled>
              </FormControl>
            </BoxModalStyled>
          </Modal>
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
                onClick={handleClickRouter}
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
              <ItemImportProduct onClick={() => setOpen(true)} />
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