import { Grid, Box, FormControl } from '@mui/material'
import React from 'react'
import { ColStyled, RowStyled, Text14Styled, Text18Styled, Title22Styled, Title28Styled, WrapperBoxBorderStyled } from '../styled'
import styled from "@emotion/styled"
import { IconPlusCircle } from '@components/Icons'

type Props = {}

const BoxInfoUserStyled = styled(Box)({
  borderRadius: 18,
  padding: '0px 20px',
  background: '#f3f4f6',
  width: '100%',
  maxWidth: '317px',
  height: 100,
  marginTop: 16
})
const RowStyledAgain = styled(RowStyled)({
  marginTop: 20
})

const BuyerInfoCustomer = (props: Props) => {
  return (
    <RowStyled jContent={'center'}>
      <WrapperBoxBorderStyled padding={'27px 30px'}>
        <Title28Styled>Thông tin bên mua</Title28Styled>
        <RowStyled>
          <BoxInfoUserStyled>
            <ColStyled jContent={'center'}>
              <Title22Styled style={{ marginBottom: 13 }}>Khác hàng vãng lai</Title22Styled>
              <Text14Styled color={'#5a5a5a'}>Vui lòng điền đầy đủ thông tin bên dưới để tiến hành giao dịch.</Text14Styled>
            </ColStyled>
          </BoxInfoUserStyled>
          <BoxInfoUserStyled>
            <RowStyled>
              <Text18Styled maxWidth={133} color={'black'}>Thêm thông tin người mua khác</Text18Styled>
              <IconPlusCircle />
            </RowStyled>
          </BoxInfoUserStyled>
        </RowStyled>
        <FormControl fullWidth>

        </FormControl>
      </WrapperBoxBorderStyled >
    </RowStyled >
  )
}

export default BuyerInfoCustomer