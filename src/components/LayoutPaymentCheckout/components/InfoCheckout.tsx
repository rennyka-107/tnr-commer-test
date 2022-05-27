import Container from '@components/Container';
import ControllerTextField from '@components/Form/ControllerTextField';
import { IconEdit, IconPlusCircle } from '@components/Icons';
import styled from '@emotion/styled';
import { Box, Button, CardMedia, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Step, StepLabel, Stepper, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { validateLine } from 'utils/constants';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Product1 from "../../../../public/images/product1.png";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

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
  margin: 18px 0px 0px;
  font-family: 'Roboto';
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
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
const WrapperCardDetailProduct = styled(Box)`
  border: 1px solid #e4e4e4;
  border-radius: border-box;
  max-width: 350px;
  border-radius: 20px;
  padding: 12px;
  margin-bottom: 20px;
`
const TextCardDetailPayment = styled.p`
  margin: 0px 0px 15px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`
const TextLinkCardPayment = styled.p`
  margin: 0px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0063f7;
`
const DividerLine = styled.div`
  width: 100%;
  height: 0;
  border: 0.5px solid #1b3459;
  margin-bottom: 16px;
`
const ButtonStyled = styled(Button)`
  border-radius: 8px;
  border: none;
  background: #ea242a;
  height: 44px;
  width: 100%;
  &:hover {
    background: #ea242a;
  }
  &:disabled {
    background: #a4a4a4;
  }
`
const TextButtonStyled = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
`

const InfoCheckout = ({ setScope }: { setScope: Dispatch<SetStateAction<string>> }) => {
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

  const steps = [
    'Ký hợp đồng mua bán',
    'Thanh toán đợt 2',
    'Thanh toán đợt 3',
    'Thanh toán đợt 4',
    'Thanh toán đợt 5',
    'Thanh toán đợt 6',
    'Thanh toán đợt 7',
    'Bàn giao giấy chứng nhận'
  ]

  const [formCustom, setFormCustom] = useState<string>('normal')

  const scopeFormCustom = (_scope) => {
    switch (_scope) {
      case 'normal':
        return <FormNormalCustom />
      case 'add':
        return <FormAddCustom />
      default:
        return <FormNormalCustom />
    }
  }

  const FormNormalCustom = () => (
    <Box style={{ marginRight: 15 }}>
      <WrapperCardInfoUser>
        <TitleStyled>Thông tin bên mua</TitleStyled>
        <RowStyled>
          <BoxUserStyled>
            <RowStyled>
              <TitleUserStyled>Nguyễn Văn A</TitleUserStyled>
              <IconEdit style={{ width: 15, height: 15 }} />
            </RowStyled>
            <TextSmallStyled>Số điện thoại: 012 345 6789</TextSmallStyled>
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

  const FormAddCustom = () => (
    <Box style={{ marginRight: 15 }}>
      <WrapperCardInfoUser style={{ width: 730 }}>
        <TitleStyled>Thông tin bên mua</TitleStyled>

        {/* form information user */}
        <FormControl style={{ width: '100%' }}>
          <RowStyled>
            <ControllerTextField
              label={'Đối tượng khách hàng'}
              control={control}
              variant={'outlined'}
              name={'objectCustom'}
              labelColor={'#1b3459'}
              width={317}
            />
            <ControllerTextField
              label={'Danh xưng'}
              control={control}
              variant={'outlined'}
              name={'nickname'}
              labelColor={'#1b3459'}
              width={317}
            />
          </RowStyled>
          <RowStyled style={{ marginTop: 20 }}>
            <ControllerTextField
              label={'Họ và tên'}
              control={control}
              variant={'outlined'}
              name={'fullName'}
              labelColor={'#1b3459'}
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
              label={'Điện thoại'}
              control={control}
              variant={'outlined'}
              name={'phoneNumber'}
              labelColor={'#1b3459'}
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

          <DividerLine style={{ marginTop: 36, borderColor: '#d8d8d8' }} />

          <RowStyled style={{ marginTop: 8 }}>
            <ControllerTextField
              label={'CMND/CCCD'}
              control={control}
              variant={'outlined'}
              name={'idUser'}
              labelColor={'#1b3459'}
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
              width={317}
            />
            <ControllerTextField
              label={'Ngày cấp'}
              control={control}
              variant={'outlined'}
              name={'ngayCap'}
              labelColor={'#1b3459'}
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
      <RowStyled style={{ justifyContent: 'start' }}>
        <ButtonStyled onClick={() => setFormCustom('normal')} style={{ width: 225, background: '#fff', border: '1px solid #d8d8d8' }}>
          <TextButtonStyled style={{ color: '#1b3459' }}>Huỷ</TextButtonStyled>
        </ButtonStyled>
        <ButtonStyled onClick={() => setScope('normal')} style={{ width: 225, background: '#1b3459', marginLeft: 35 }}>
          <TextButtonStyled>Lưu thông tin</TextButtonStyled>
        </ButtonStyled>
      </RowStyled>

    </Box>
  )

  return (
    <Container title="Thông tin">
      <Box style={{ marginBottom: 60 }}>
        <Stepper alternativeLabel activeStep={1}>
          {steps.map((label, idx) => (
            <Step key={idx}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <RowStyled style={{ alignItems: 'start', justifyContent: 'center' }}>

        {scopeFormCustom(formCustom)}

        <Box style={{ marginLeft: 15 }}>
          <WrapperCardDetailProduct>
            <CardMedia style={{ borderRadius: 15 }} component={'img'} width={325} height={200} image={Product1.src} alt={'Photo product'} />
            <Box style={{ margin: '26px 13px 0px' }}>
              <TitleStyled>LÔ A01</TitleStyled>
              <RowStyled>
                <TextCardDetailPayment>Toà A</TextCardDetailPayment>
                <TextCardDetailPayment>Tằng 26</TextCardDetailPayment>
              </RowStyled>
              <DividerLine />
              <RowStyled>
                <TextCardDetailPayment>Diện tích</TextCardDetailPayment>
                <TextCardDetailPayment>80 m<sup>2</sup></TextCardDetailPayment>
              </RowStyled>
              <RowStyled>
                <TextCardDetailPayment>Phòng ngủ</TextCardDetailPayment>
                <TextCardDetailPayment>3</TextCardDetailPayment>
              </RowStyled>
              <RowStyled>
                <TextCardDetailPayment>Phòng tắm</TextCardDetailPayment>
                <TextCardDetailPayment>2</TextCardDetailPayment>
              </RowStyled>
              <RowStyled>
                <TextCardDetailPayment>Hướng</TextCardDetailPayment>
                <TextCardDetailPayment>Nam</TextCardDetailPayment>
              </RowStyled>
            </Box>
          </WrapperCardDetailProduct>
          <WrapperCardDetailProduct style={{ padding: '18px 25px 6px' }}>
            <RowStyled style={{ alignItems: 'baseline' }}>
              <TitleStyled>Báo giá</TitleStyled>
              <TextLinkCardPayment>Lịch thanh toán</TextLinkCardPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Giá BĐS</TextCardDetailPayment>
              <TextCardDetailPayment>2.114.200.000 đ</TextCardDetailPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Thuế VAT</TextCardDetailPayment>
              <TextCardDetailPayment>0 đ</TextCardDetailPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Phí bảo trì</TextCardDetailPayment>
              <TextCardDetailPayment>0 đ</TextCardDetailPayment>
            </RowStyled>
            <DividerLine />
            <RowStyled>
              <TextCardDetailPayment>Tổng tiền niêm yết</TextCardDetailPayment>
              <TextCardDetailPayment>2.114.200.000 đ</TextCardDetailPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Giảm giá</TextCardDetailPayment>
              <TextCardDetailPayment>0 đ</TextCardDetailPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Tổng tiền mua online</TextCardDetailPayment>
              <TextCardDetailPayment style={{ fontWeight: 500, fontSize: 18, color: '#ea242a', marginTop: -2 }}>2.114.200.000 đ</TextCardDetailPayment>
            </RowStyled>
            <DividerLine />
            <RowStyled>
              <TextCardDetailPayment>Tiền đặt chỗ tối thiểu</TextCardDetailPayment>
              <TextCardDetailPayment style={{ fontWeight: 500 }}>1.000.000 đ</TextCardDetailPayment>
            </RowStyled>
            <RowStyled>
              <TextCardDetailPayment>Tiền đặt hàng quy định</TextCardDetailPayment>
              <TextCardDetailPayment style={{ fontWeight: 500 }}>50.000.000 đ</TextCardDetailPayment>
            </RowStyled>
          </WrapperCardDetailProduct>
          <Box style={{ maxWidth: 350 }}>
            <RowStyled style={{ marginBottom: 20 }}>
              <Checkbox />
              <TextCardDetailPayment style={{ margin: '0px 8px 0px 0px' }}>
                Ấn “Thanh toán” đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
                <span style={{ color: '#0063F7', textDecoration: 'underline' }}>
                  <Link href={'/'}>Điều Khoản TNR</Link>
                </span>
              </TextCardDetailPayment>
            </RowStyled>
            <ButtonStyled onClick={() => setScope('transaction-message')} disabled={formCustom === 'add'}>
              <TextButtonStyled>Tạo phiếu thanh toán</TextButtonStyled>
            </ButtonStyled>
            <RowStyled style={{ justifyContent: 'center', marginTop: 14, cursor: 'pointer' }}>
              <TitleCheckboxStyled>Lưu thông tin</TitleCheckboxStyled>
            </RowStyled>
          </Box>
        </Box>
      </RowStyled>
    </Container>
  )
}

export default InfoCheckout