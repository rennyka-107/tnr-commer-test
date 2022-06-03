import { IconInfoCircle } from '@components/Icons'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { ButtonStyled, LinedStyled, RowStyled, Text12ItalicStyled, Text14Styled, Text18Styled, Title28Styled, WrapperBoxBorderStyled } from '../styled'

const BoxDetailInfo = styled(Box)({
  marginTop: 15
})

const RowStyledAgain = styled(RowStyled)({
  marginBottom: 10
})

type Props = {
  width?: number,
  urlPayment?: string,
}

const TableQuote = ({ width, urlPayment }: Props) => {
  return (
    <WrapperBoxBorderStyled mw={width ?? 350} padding={'20px 20px 25px'}>
      <Title28Styled>Báo giá</Title28Styled>

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Giá BĐS</Text14Styled>
          <Text14Styled>2.114.200.000 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Thuế VAT</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Phí bảo trì</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền niêm yết</Text14Styled>
          <Text14Styled>2.114.200.000 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Giảm giá</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Chiết khấu NPP</Text14Styled>
          <Text14Styled>0 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyledAgain>
          <Text14Styled>Tổng tiền mua online</Text14Styled>
          <Text18Styled fw={500} style={{ color: '#ea242a' }}>2.114.200.000 đ</Text18Styled>
        </RowStyledAgain>
      </BoxDetailInfo>

      <LinedStyled />

      <BoxDetailInfo>
        <RowStyledAgain>
          <Text14Styled>Tiền đặt chỗ tối thiểu</Text14Styled>
          <Text14Styled fw={500}>1.000.000 đ</Text14Styled>
        </RowStyledAgain>
        <RowStyled>
          <Text14Styled>Tiền đặt hàng quy định</Text14Styled>
          <Text14Styled fw={500}>50.000.000 đ</Text14Styled>
        </RowStyled>
      </BoxDetailInfo>

      {urlPayment && (
        <BoxDetailInfo>
          <RowStyledAgain justifyContent={'start'}>
            <IconInfoCircle />&nbsp;
            <Text12ItalicStyled>
              Nếu đã có tài khoản, vui lòng{' '}
              <Link href={urlPayment}>
                <a style={{ color: '#0063F7', textDecoration: 'underline' }}>ĐĂNG NHẬP</a>
              </Link>
              {' '}để lưu thông tin thanh toán
            </Text12ItalicStyled>
          </RowStyledAgain>
          <RowStyled>
            <ButtonStyled>
              <Text18Styled color={'white'}>Tiếp tục thanh toán</Text18Styled>
            </ButtonStyled>
          </RowStyled>
        </BoxDetailInfo>
      )}
    </WrapperBoxBorderStyled>
  )
}

export default TableQuote