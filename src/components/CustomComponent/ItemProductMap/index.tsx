import React from 'react'
import styled from '@emotion/styled'
import { Box, CardMedia, Grid, Typography, Button } from '@mui/material'
import { IconBath, IconBedDouble, IconCompass, IconFrame } from '@components/Icons';

interface Props {
  src?: any;
  data?: object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const WrapperContent = styled(Box)`
  width: 350px;
  height: auto;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  background: #fff;
  box-shadow: none;
  position: relative;
  padding: 197px 25px 0px;
  margin-top: 15px;
`
const WrapperImg = styled(Box)`
  width: 100%;
  height: 195px;
  border-radius: 20px 20px 0px 0px;
  position: absolute;
  top: -15px;
  left: 0;

`
const TitleStyled = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
`
const TextStyled = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`
const DividerLine = styled.div`
  width: 100%;
  height: 0px;
  border: 0.5px solid #c7c9d9;
  margin-bottom: 15px;
`
const TicketTag = styled(Box)`
  padding: 7px 14px;
  position: absolute;
  top: 150px;
  right: 0px;
  background: #fec83c;
  color: white;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`
const ButtonStyled = styled(Button)`
  display: flex;
  algin-items: center;
  width: 99px;
  margin: 40px auto 0px;
  white-space: pre;
`

const ItemProductMap = ({ src, onClick, data }: Props) => {
  return (
    <WrapperContent>
      <WrapperImg>
        <CardMedia component="img" height={195} image={src?.src ?? ''} alt="img product" style={{ borderRadius: '20px 20px 0px 0px' }} />
      </WrapperImg>
      <TicketTag>TNR Gold</TicketTag>
      <TitleStyled>Lô A01</TitleStyled>
      <TextStyled style={{ margin: '10px auto' }}>TNR The Nosta 90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội</TextStyled>
      <DividerLine />
      <Grid sx={{ pb: 2}} container rowSpacing={1}>
        <Grid item xs={6} display={'flex'} alignItems={'center'}>
          <IconBedDouble />&nbsp;&nbsp;<TextStyled>02</TextStyled>
        </Grid>
        <Grid item xs={6} display={'flex'} alignItems={'center'}>
          <IconFrame />&nbsp;&nbsp;<TextStyled>80 m<sup>2</sup></TextStyled>
        </Grid>
        <Grid item xs={6} display={'flex'} alignItems={'center'}>
          <IconBath />&nbsp;&nbsp;<TextStyled>02</TextStyled>
        </Grid>
        <Grid item xs={6} display={'flex'} alignItems={'center'}>
          <IconCompass />&nbsp;&nbsp;<TextStyled>Đông nam</TextStyled>
        </Grid>
      </Grid>
    </WrapperContent>
  )
}

export default ItemProductMap