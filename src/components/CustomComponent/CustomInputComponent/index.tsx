import { FormControl, Box, TextField, Typography } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'

type Props = {
  label?: string;
  placeholder?: string;
  width?: number;
  helperText?: string;
}

const FormControlStyled = styled(FormControl)`
  width: 100%;
`
const TextLabel = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
  margin: 20px 0px 6px;
`
const ColStyled = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const CustomInputComponent = ({ label, width, placeholder, helperText }: Props) => {
  return (
    <ColStyled style={{ maxWidth: width }}>
      {label && (<TextLabel>{label}</TextLabel>)}
      <FormControlStyled className='custom-input-base-form-control'>
        <TextField placeholder={placeholder} helperText={helperText} />
      </FormControlStyled>
    </ColStyled>
  )
}

export default CustomInputComponent