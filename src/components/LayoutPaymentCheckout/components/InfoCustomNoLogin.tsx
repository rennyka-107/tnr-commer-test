import Container from '@components/Container';
import ControllerSelect from '@components/Form/ControllerSelect';
import ControllerTextField from '@components/Form/ControllerTextField';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardMedia, Checkbox, FormControl } from '@mui/material';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateLine } from 'utils/constants';
import * as yup from 'yup';
import Product1 from "../../../../public/images/product1.png";
import FormNormalCustomNoLogin from './FormNormalCustomNoLogin';

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
const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 1px;
  border-top: 1px solid #1b3459;
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
const ButtonSmallStyled = styled(Button)`
  border: none;
  border-radius: 8px;
  background: #1b3459;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  &: hover {
    background: #1b3459;
  }
`
const ButtonSaveInfoStyled = styled(Button)`
  border: 1px solid #c7c9d9;
  border-radius: 8px;
  background: #fff;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
  text-align: center;
  width: 100%;
  height: 50px;
`


const InfoCustomNoLogin = ({ setScope }: { setScope: Dispatch<SetStateAction<string>> }) => {
  const validationSchema = yup.object().shape({
    idUser: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    noiCap: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    ngayCap: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    addressTT: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    addressLL: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    tinhTP: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    quanH: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    objectCustom: yup.number().strict(true).required(validateLine.required).default(1),
    nickname: yup.number().strict(true).required(validateLine.required).default(1),
    fullName: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    birthday: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    phoneNumber: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
    email: yup.string().trim(validateLine.trim).strict(true).required(validateLine.required).default(''),
  })

  const { control, handleSubmit, setValue } = useForm<InformationCustom | any>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault()
  })

  const [formCustom, setFormCustom] = useState<string>('normal')

  const FormAddCustom = () => (
    <Box style={{ marginRight: 15 }}>
      <WrapperCardInfoUser style={{ width: 730 }}>
        <TitleStyled>Thông tin bên mua</TitleStyled>

        {/* form information user */}
        <FormControl style={{ width: '100%' }}>
          <RowStyled>
            <ControllerSelect
              style={{ width: 317 }}
              label={'Đối tượng khách hàng'}
              control={control}
              setValue={setValue}
              variant={'outlined'}
              dataSelect={[
                { label: "Cá nhân", value: 1 },
                { label: "Doanh nghiệp", value: 2 },
                { label: "Nhà nước", value: 3 }
              ]}
              name={'objectCustom'}
              labelColor={'#1b3459'}
            />
            <ControllerSelect
              style={{ width: 317 }}
              label={'Danh xưng'}
              setValue={setValue}
              control={control}
              dataSelect={[
                { label: "Ông", value: 1 },
                { label: "Bà", value: 2 },
                { label: "Anh/chị", value: 3 }
              ]}
              variant={'outlined'}
              name={'nickname'}
              labelColor={'#1b3459'}
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

          <TitleStyled>Thông tin cá nhân</TitleStyled>
          <RowStyled style={{ marginTop: 8 }}>
            <ControllerTextField
              label={'Số CMND'}
              control={control}
              variant={'outlined'}
              name={'idUser'}
              labelColor={'#1b3459'}
              width={317}
            />
            <RowStyled style={{ maxWidth: 317, height: 55, margin: 'auto 0 0', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <TitleCheckboxStyled>Đính kèm giấy CN ĐKDN</TitleCheckboxStyled>
              <ButtonSmallStyled>Tải lên</ButtonSmallStyled>
            </RowStyled>
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
      <RowStyled style={{ alignItems: 'start', justifyContent: 'center' }}>

        {/* {scopeFormCustom(formCustom)} */}
        {formCustom === 'normal' ? <FormNormalCustomNoLogin setFormCustom={setFormCustom} /> : <FormAddCustom />}

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
            <ButtonStyled disabled={formCustom === 'add'}>
              <TextButtonStyled>Tạo phiếu thanh toán</TextButtonStyled>
            </ButtonStyled>
            <RowStyled style={{ justifyContent: 'center', marginTop: 14 }}>
              <ButtonSaveInfoStyled onClick={() => setScope('transaction-message')}>Lưu thông tin</ButtonSaveInfoStyled>
            </RowStyled>
          </Box>
        </Box>
      </RowStyled>
    </Container>
  )
}

export default InfoCustomNoLogin