// import QRCode from 'qrcode'
import Container from '@components/Container'
import { Box, Typography, Button, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import QR_IMG from '../../../../public/images/qr-transaction.png'
import { useRouter } from 'next/router'

const BoxTransaction = styled(Box)`
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  min-height: 458px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1107px;
  margin: 0 auto 94px;
`
const TitleStyled = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
  color: #000;
  width: 448px;
  height: 38px;
  margin-bottom: 14px;
`
const TextStyled = styled(Typography)`
  width: 604px;
  height: 54px;
  margin-top: 58px;
  font-style: italic;
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #fec83c;
`
const ButtonStyled = styled(Button)`
  border-radius: 8px;
  border: none;
  background: #1b3459;
  height: 50px;
  width: 225px;
  &:hover {
    background: #1b3459;
  }
  &:disabled {
    background: #a4a4a4;
  }

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #FFFFFF;
`

const TransactionMessage = () => {
  const router = useRouter()
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    // QRCode.toDataURL("src qr-code").then(setSrc)
  }, [])
  console.log(src)

  return (
    <Container>
      <BoxTransaction>
        <TitleStyled>Tạo giao dịch thành công</TitleStyled>
        <TextStyled>
          Quý khách vui lòng hoàn thiện hồ sơ mua bán trong vòng 12 tiếng
          để được nhận phiếu đặt hàng
        </TextStyled>
        <CardMedia component={'img'} style={{ width: 92, height: 92, marginBottom: 80 }} src={src || QR_IMG.src} alt={'qr-transaction-img'} />
        <ButtonStyled onClick={() => { router.push('/') }}>Về trang chủ</ButtonStyled>
      </BoxTransaction>
    </Container>
  )
}

export default TransactionMessage