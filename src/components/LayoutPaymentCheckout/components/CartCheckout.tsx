import { Button, Card, CardMedia, Grid, MenuItem, Select, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import styled from "@emotion/styled"
import { IconRadio, IconTimes } from '@components/Icons'
import Product1 from "../../../../public/images/product1.png";
import Container from '@components/Container';

const WrapperCardDetail = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 635px;
  margin-top: -25px;
`
const WrapperProduct = styled(Card)`
  width: 100%;
  height: 231px;
  border: none;
  box-shadow: none;
  border: 1px solid #fec83c;
  border-radius: 20px;
  display: flex;
  align-items: center;
`
const WrapperDetail = styled.div`
  max-width: 235px;
  width: 100%;
  margin: 6px 20px 0px 30px;
`
const TitleStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  color: #1b3459;
  margin: 0px 0px 15px;
`
const TextStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
  margin: 0px 0px 12px;
`
const TextButtonStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
`
const WrapperLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DividerLine = styled.div`
  width: 100%;
  height: 0;
  border: 0.5px solid #1b3459;
  margin-bottom: 16px;
`
const WrapperIntro = styled(Card)`
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
  margin-top: 23px;
  padding: 20px;
`
const ButtonStyled = styled(Button)`
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  background: #e0e0e0;
  height: 44px;
  color: #1b3459;
`
const InputStyled = styled(TextField)`
  border: none;
  height: 44px;
  width: 317px;
  border: 1px solid #1b3459;
  border-radius: 8px;
  color: #1d3459;
`
const SelectStyled = styled(Select)`
  border: none;
  border: 1px solid #FEC83C;
  border-radius: 8px;
  height: 44px;
  width: 317px;
`
const BlockIconTimes = styled.div`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: #EA242A;
  transform: translate(619px, 16px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const WrapperCardPayment = styled.div`
  max-width: 445px;
  width: 100%;
  height: 407px;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  padding: 22px 20px;
`

const CartCheckout = ({ setScope }: { setScope: Dispatch<SetStateAction<string>> }) => {
  return (
    <Container title="Thanh toán">
      <Grid container alignItems='flex-start' columnSpacing={'31px'} justifyContent="center" style={{ marginBottom: 200 }}>
        <Grid item xs={7} style={{ display: 'flex', justifyContent: 'end' }}>
          <WrapperCardDetail>
            <BlockIconTimes>
              <IconTimes style={{ color: 'white', width: 12, height: 12 }} />
            </BlockIconTimes>
            <WrapperProduct>
              <IconRadio style={{ margin: '0px 10px 0px 20px', width: '5em' }} />
              <CardMedia style={{ borderRadius: 15 }} component={'img'} width={308} height={200} image={Product1.src} alt={'Photo product'} />
              <WrapperDetail>
                <TitleStyled>Căn A01</TitleStyled>
                <div style={{ display: 'flex' }}>
                  <TextStyled>Toà A</TextStyled>
                  <TextStyled>Tầng 26</TextStyled>
                </div>
                <DividerLine />
                <WrapperLine>
                  <TextStyled>Diễn tích</TextStyled>
                  <TextStyled>80 m<sup>2</sup></TextStyled>
                </WrapperLine>
                <WrapperLine>
                  <TextStyled>Phòng ngủ</TextStyled>
                  <TextStyled>3</TextStyled>
                </WrapperLine>
                <WrapperLine>
                  <TextStyled>Phòng tắm</TextStyled>
                  <TextStyled>2</TextStyled>
                </WrapperLine>
                <WrapperLine>
                  <TextStyled>Hướng</TextStyled>
                  <TextStyled>Nam</TextStyled>
                </WrapperLine>
              </WrapperDetail>
            </WrapperProduct>
            <WrapperIntro className='custom-wrapper-introducer-code'>
              <TextButtonStyled style={{ width: 130 }}>Mã giới thiệu</TextButtonStyled>
              <InputStyled />
              <ButtonStyled style={{ width: 112 }}>
                <TextButtonStyled>Áp dụng</TextButtonStyled>
              </ButtonStyled>
            </WrapperIntro>
            <WrapperIntro className='custom-wrapper-introducer-code'>
              <TextButtonStyled>Chọn chiết khấu</TextButtonStyled>
              <SelectStyled displayEmpty>
                <MenuItem value="">Đã áp dụng 3 chiết khấu</MenuItem>
              </SelectStyled>
              <ButtonStyled style={{ width: 112 }}>
                <TextButtonStyled>Áp dụng</TextButtonStyled>
              </ButtonStyled>
            </WrapperIntro>
          </WrapperCardDetail>
        </Grid>
        <Grid item xs={5}>
          <WrapperCardPayment>
            <TitleStyled>Báo giá</TitleStyled>
            <WrapperLine>
              <TextStyled>Giá BĐS</TextStyled>
              <TextStyled>2.114.200.000 đ</TextStyled>
            </WrapperLine>
            <WrapperLine>
              <TextStyled>Thuế VAT</TextStyled>
              <TextStyled>0 đ</TextStyled>
            </WrapperLine>
            <WrapperLine>
              <TextStyled>Phí bảo trì</TextStyled>
              <TextStyled>0 đ</TextStyled>
            </WrapperLine>

            <DividerLine />
            <WrapperLine>
              <TextStyled>Tổng tiền niêm yết</TextStyled>
              <TextStyled>2.114.200.000 đ</TextStyled>
            </WrapperLine>
            <WrapperLine>
              <TextStyled>Giảm giá</TextStyled>
              <TextStyled>0 đ</TextStyled>
            </WrapperLine>
            <WrapperLine>
              <TextStyled>Tổng tiền mua online</TextStyled>
              <TextStyled style={{ fontWeight: 500, fontSize: 18, color: '#ea242a', marginTop: -2 }}>2.114.200.000 đ</TextStyled>
            </WrapperLine>

            <DividerLine />
            <WrapperLine>
              <TextStyled>Tiền đặt chỗ tối thiều</TextStyled>
              <TextStyled style={{ fontWeight: 500 }}>1.000.000 đ</TextStyled>
            </WrapperLine>
            <WrapperLine>
              <TextStyled>Giá BĐS</TextStyled>
              <TextStyled style={{ fontWeight: 500 }}>50.000.000 đ</TextStyled>
            </WrapperLine>
            <ButtonStyled onClick={() => setScope('cart-info')} style={{ width: '100%', background: '#ea242a', border: 'none', marginTop: 12 }}>
              <TextButtonStyled style={{ color: 'white' }}>Tiếp tục thanh toán</TextButtonStyled>
            </ButtonStyled>
          </WrapperCardPayment>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartCheckout