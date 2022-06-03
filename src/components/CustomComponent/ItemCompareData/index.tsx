import React from 'react'
import styled from '@emotion/styled'

const WrapperContent = styled.div`
  width: 289px;
`
const WrapperData = styled.div`
  width: 100%;
  border-bottom: 2px solid #dcdcdc;
  height: 59px;
  color: #1B3459;
  font-size: 18px;
  font-family: 'Roboto';
  font-style: normal;
  display: flex;
  padding: 0px 0px 8px 18px;
  align-items: end;
`

const styleFirst = {
  color: '#d60000',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '130%'
}

const ItemCompareData = () => {
  return (
    <WrapperContent>
      {Array.from(Array(6)).map((_, idx) => (
        <WrapperData key={idx} style={idx === 0 ? styleFirst : {}}>
          3.018.933.000đ
        </WrapperData>
      ))}
    </WrapperContent>
  )
}

export default ItemCompareData
