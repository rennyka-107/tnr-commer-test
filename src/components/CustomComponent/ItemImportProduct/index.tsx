import { IconPlusProduct } from '@components/Icons';
import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import React, { MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const WrapperContent = styled(Card)`
  width: 284px;
  height: 286px;
  border-radius: 20px;
  background: #F2F2F2;
  box-shadow: none;
  border: none;
`
const TextStyled = styled.span`
  margin-top: 20px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0E1D34;
`
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ItemImportProduct = ({ onClick }: Props) => {
  return (
    <WrapperContent>
      <ButtonStyled onClick={onClick}>
        <IconPlusProduct style={{ width: 46.6, height: 46.6, marginTop: 10 }} />
        <TextStyled>
          Thêm sản phầm so sánh
        </TextStyled>
      </ButtonStyled>
    </WrapperContent>
  )
}

export default ItemImportProduct
