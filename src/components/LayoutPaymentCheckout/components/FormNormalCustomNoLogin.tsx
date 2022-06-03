import ControllerTextField from '@components/Form/ControllerTextField';
import { IconEdit, IconPlusCircle } from '@components/Icons';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { validateLine } from 'utils/constants';
import * as yup from 'yup';

type Props = {
  setFormCustom: Dispatch<SetStateAction<string>>,
}
interface InformationCustom {
  idUser: string;
  noiCap: string;
  ngayCap: string;
  addressTT: string;
  addressLL: string;
  tinhTP: string;
  quanH: string;
  objectCustom: string;
  nickname: string;
  fullName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
}

const WrapperCardInfoUser = styled(Box)`
  border: 1px solid #e4e4e4;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 30px;
  max-width: 730px;
  margin-bottom: 45px;
`
const BoxUserStyled = styled.div`
  width: 317px;
  height: 100px;
  background: #f3f4f6;
  border-radius: 18px;
  padding: 20px;
`
const TitleUserStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #5a5a5a;
  margin: 0px;
`
const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ColStyled = styled.div`
  display: flex;
  flex-direction: column;
`
const TitleStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-size: 28px;
  line-height: 33px;
  font-weight: 500;
  color: #1b3459;
  margin: 0px 0px 16px;
`
const TextStyled = styled.p`
  margin: 0px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #0e1d34;
`
const TextSmallStyled = styled.p`
  margin: 8px 0px 0px;
  font-family: 'Roboto';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 16px;
  color: #5a5a5a;
`
const InputStyled = styled(TextField)`
  border: none;
  height: 44px;
  width: 317px;
  border: 1px solid #fcb875;
  border-radius: 8px;
  margin: 6px auto 16px;
`
const NoteTextStyled = styled.p`
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
  margin: 0px;
`
const CardCheckboxStyled = styled(Box)`
  border: 2px solid #b8b8b8;
  border-radius: 8px;
  background: #fff;
  width: 100%;
  padding: 20px 36px;
`
const TitleCheckboxStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
  margin: 0px;
`
const TitleLineStyled = styled.p`
  width: 240px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #1b3459;
  margin: 0px;
`
const LineStyled = styled.div`
  width: 100%;
  height: 0px;
  border-top: 1px solid #c7c9d9;
`


const FormNormalCustomNoLogin = (props: Props) => {
  const { setFormCustom } = props

  const [colorInputMoney, setColorInputMoney] = useState<string[]>(['#fec83c', '#b8b8b8'])
  const [colorCardMoney, setColorCardMoney] = useState<string[]>(['#fec83c', '#b8b8b8'])

  const validationSchema = yup.object().shape({
    idUser: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    noiCap: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    ngayCap: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    addressTT: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    addressLL: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    tinhTP: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    quanH: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    objectCustom: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    nickname: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    fullName: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    birthday: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    phoneNumber: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    email: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
  })
  const { control, handleSubmit } = useForm<InformationCustom>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault()
  })

  return (
    <Box style={{ marginRight: 15 }}>
      <WrapperCardInfoUser>
        <TitleStyled>Thông tin bên mua</TitleStyled>
        <RowStyled>
          <BoxUserStyled>
            <RowStyled>
              <TitleUserStyled>Khách hàng vãng lai</TitleUserStyled>
            </RowStyled>
            <TextSmallStyled>Vui lòng điền đầy đủ thông tin bên dưới để tiến hành giao dịch.</TextSmallStyled>
          </BoxUserStyled>
          <BoxUserStyled>
            <RowStyled style={{ height: '100%', cursor: 'pointer' }} onClick={() => setFormCustom('add')}>
              <TextStyled style={{ maxWidth: 133 }}>Thêm thông tin người mua khác</TextStyled>
              <IconPlusCircle />
            </RowStyled>
          </BoxUserStyled>
        </RowStyled>

        {/* form information user */}
        <FormControl style={{ width: '100%' }}>
          <RowStyled style={{ marginTop: 28 }}>
            <ControllerTextField
              label={'Họ và tên'}
              control={control}
              variant={'outlined'}
              name={'fullName'}
              labelColor={'#1b3459'}
              required
              width={317}
            />
            <ControllerTextField
              label={'Ngày sinh'}
              control={control}
              variant={'outlined'}
              name={'birthday'}
              labelColor={'#1b3459'}
              width={317}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Số điện thoại'}
              control={control}
              variant={'outlined'}
              name={'phoneNumber'}
              labelColor={'#1b3459'}
              required
              width={317}
            />
            <ControllerTextField
              label={'Email'}
              control={control}
              variant={'outlined'}
              name={'email'}
              labelColor={'#1b3459'}
              width={317}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 40, alignItems: 'baseline' }}>
            <TitleLineStyled>Thông tin giấy tờ</TitleLineStyled>
            <LineStyled />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'CMND/CCCD'}
              control={control}
              variant={'outlined'}
              name={'idUser'}
              labelColor={'#1b3459'}
              required
              width={317}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Nơi cấp'}
              control={control}
              variant={'outlined'}
              name={'noiCap'}
              labelColor={'#1b3459'}
              required
              width={317}
            />
            <ControllerTextField
              label={'Ngày cấp'}
              control={control}
              variant={'outlined'}
              name={'ngayCap'}
              labelColor={'#1b3459'}
              required
              width={317}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Địa chỉ thường trú'}
              control={control}
              variant={'outlined'}
              name={'addressTT'}
              labelColor={'#1b3459'}
              required
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Địa chỉ liên lạc'}
              control={control}
              variant={'outlined'}
              name={'addressLL'}
              labelColor={'#1b3459'}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Thành phố/Tỉnh'}
              control={control}
              variant={'outlined'}
              name={'tinhTP'}
              labelColor={'#1b3459'}
              width={317}
            />
            <ControllerTextField
              label={'Quận/Huyện'}
              control={control}
              variant={'outlined'}
              name={'quanH'}
              labelColor={'#1b3459'}
              width={317}
            />
          </RowStyled>
        </FormControl>
      </WrapperCardInfoUser>

      {/* information payment */}
      <WrapperCardInfoUser>
        <TitleStyled>Thông tin thanh toán</TitleStyled>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup defaultValue={1} onChange={(event) => setColorInputMoney(+event.target.value === 1 ? ['#fec83c', '#b8b8b8'] : ['#b8b8b8', '#fec83c'])}>
            <RowStyled className='custom-wrapper-introducer-code custom-input-money-inactive'>
              <ColStyled>
                <FormControlLabel value={1} control={<Radio />} label={"Số tiền đặ hàng tối thiểu"} />
                <InputStyled value={'20.000.000 vnd'} style={{ color: colorInputMoney[0], borderColor: colorInputMoney[0] }} />
              </ColStyled>
              <ColStyled>
                <FormControlLabel value={2} control={<Radio />} label={"Tổng tiền mặt hàng"} />
                <InputStyled value={'50.000.000 vnd'} style={{ color: colorInputMoney[1], borderColor: colorInputMoney[1] }} />
              </ColStyled>
            </RowStyled>
            <NoteTextStyled style={{ maxWidth: 330 }}>Vui lòng thanh toán đủ tổng tiền cọc trong vòng 24h để được hoàn thiện hồ sơ</NoteTextStyled>
          </RadioGroup>
        </FormControl>
      </WrapperCardInfoUser>

      {/* method payment */}
      <WrapperCardInfoUser>
        <TitleStyled>Phương thức thanh toán</TitleStyled>
        <FormControl style={{ width: '100%' }}>
          <RadioGroup defaultValue={1} className="custom-card-checkbox-payment" onChange={event => setColorCardMoney(+event.target.value === 1 ? ['#fec83c', '#b8b8b8'] : ['#b8b8b8', '#fec83c'])}>
            <CardCheckboxStyled style={{ marginBottom: 17, borderColor: colorCardMoney[0] }}>
              <FormControlLabel value={1} control={<Radio />} label={<TitleCheckboxStyled>Mobile Banking</TitleCheckboxStyled>} />
            </CardCheckboxStyled>
            <CardCheckboxStyled style={{ borderColor: colorCardMoney[1] }}>
              <FormControlLabel value={2} control={<Radio />} label={
                <>
                  <TitleCheckboxStyled style={{ marginBottom: 9 }}>Cổng thanh toán online</TitleCheckboxStyled>
                  <NoteTextStyled>Sử dụng ATM đã đăng ký Internet Banking hoặc các thẻ Quốc tế Visa, Master card .....</NoteTextStyled>
                </>
              } />
            </CardCheckboxStyled>
          </RadioGroup>
        </FormControl>
      </WrapperCardInfoUser>
    </Box>
  )
}

export default FormNormalCustomNoLogin