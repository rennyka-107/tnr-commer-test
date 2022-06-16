import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerTextField from "@components/Form/ControllerTextField";
import { IconPlusCircle } from "@components/Icons";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import FormGroup from "@components/Form/FormGroup";
import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import * as yup from "yup";
import {
  ButtonAction,
  ButtonStyled,
  ColStyled,
  LinedStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
  Title20Styled,
  Title22Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../StyledLayout/styled";
import BillingInfo from "./components/BillingInfo";
import ItemDetailCol from "./components/ItemDetailCol";
import PaymentMethods from "./components/PaymentMethods";
import TableQuote from "./components/TableQuote";
import AddInfoCustom from "./components/AddInfoCustom";
import Container from "@components/Container";

type Props = {
  setScopeRender: Dispatch<SetStateAction<string>>;
};

const BoxInfoUserStyled = styled(Box)({
  borderRadius: 18,
  padding: "0px 20px",
  background: "#f3f4f6",
  width: "100%",
  maxWidth: "317px",
  height: 100,
  marginTop: 16,
});

interface InformationBuyer {
  hoTen: string;
  ngaySinh: string;
  soDienThoai: string;
  email: string;
  soDdcn: string;
  noiCap: string;
  ngayCap: string;
  dcThuongTru: string;
  dcLienLac: string;
  thanhPho: string;
  quanHuyen: string;
}

const LayoutInfoCustom = ({ setScopeRender }: Props) => {
  const validationSchema = yup.object().shape({
    hoTen: yup.string().required(validateLine.required).default(""),
    ngaySinh: yup
      .string()
      .required(validateLine.required)
      .trim(validateLine.trim)
      .default(""),
    soDienThoai: yup.string().required(validateLine.required).default(""),
    email: yup.string().trim(validateLine.trim).default(""),
    soDdcn: yup.string().required(validateLine.required).default(""),
    noiCap: yup.string().required(validateLine.required).default(""),
    ngayCap: yup.string().required(validateLine.required).default(""),
    dcThuongTru: yup.string().required(validateLine.required).default(""),
    dcLienLac: yup.string().default(""),
    thanhPho: yup.string().default(""),
    quanHuyen: yup.string().default(""),
  });

  const { control, handleSubmit } = useForm<InformationBuyer>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });
  const steps = [
    "Ký hợp đồng mua bán",
    "Thanh toán đợt 2",
    "Thanh toán đợt 3",
    "Thanh toán đợt 4",
    "Thanh toán đợt 5",
    "Thanh toán đợt 6",
    "Thanh toán đợt 7",
    "Bàn giao giấy chứng nhận",
  ];

  const [payMethod, setPayMethod] = useState<number>(1);
  const [billing, setBilling] = useState<number>(1);
  const [formInfo, setFormInfo] = useState<boolean>(false);

  const handleOnSubmit = (values) => {
    try {
      setScopeRender("transaction_message");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container title={"Thông tin"}>
      {/* {!formInfo && (
        <Box style={{ marginBottom: 60 }}>
          <Stepper alternativeLabel activeStep={1}>
            {steps.map((label, idx) => (
              <Step key={idx}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )} */}
      <form onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
        <Grid container columnSpacing={"30px"} justifyContent={"center"}>
          <Grid item>
            {formInfo ? (
              <AddInfoCustom setFormInfo={setFormInfo} />
            ) : (
              <>
                <WrapperBoxBorderStyled padding={"20px 30px 10px"}>
                  <Title28Styled>Thông tin bên mua</Title28Styled>
                  <RowStyled>
                    <BoxInfoUserStyled>
                      <ColStyled jContent={"center"}>
                        <Title22Styled style={{ marginBottom: 8 }}>
                          Khác hàng vãng lai
                        </Title22Styled>
                        <Text14Styled color={"#5a5a5a"}>
                          Vui lòng điền đầy đủ thông tin bên dưới để tiến hành
                          giao dịch.
                        </Text14Styled>
                      </ColStyled>
                    </BoxInfoUserStyled>
                    <BoxInfoUserStyled
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFormInfo(true);
                      }}
                    >
                      <RowStyled>
                        <Text18Styled maxWidth={133} color={"black"}>
                          Thêm thông tin người mua khác
                        </Text18Styled>
                        <IconPlusCircle />
                      </RowStyled>
                    </BoxInfoUserStyled>
                  </RowStyled>
                  <FormControl fullWidth style={{ margin: "25px 0px" }}>
                    <Grid container rowSpacing={"20px"} columnSpacing={"37px"}>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Họ và tên"}
                            control={control}
                            variant={"outlined"}
                            name={"hoTen"}
                            required
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerDatePicker
                            label={"Ngày sinh"}
                            control={control}
                            variant={"outlined"}
                            name={"ngaySinh"}
                            required
                          />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Số điện thoại"}
                            control={control}
                            variant={"outlined"}
                            name={"soDienThoai"}
                            required
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Email"}
                            control={control}
                            variant={"outlined"}
                            name={"email"}
                          />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12}>
                        <RowStyled aItems={"baseline"} width={670}>
                          <Title20Styled
                            // mw={175}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Thông tin giấy tờ
                          </Title20Styled>
                          <LinedStyled mw={500} />
                        </RowStyled>
                      </Grid>

                      <Grid item xs={12}>
                        <FormGroup>
                          <ControllerTextField
                            label={"CCCD/CMND"}
                            control={control}
                            variant={"outlined"}
                            name={"soDdcn"}
                            required
                            width={317}
                          />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Nơi cấp"}
                            control={control}
                            variant={"outlined"}
                            name={"noiCap"}
                            required
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerDatePicker
                            label={"Ngày cấp"}
                            control={control}
                            variant={"outlined"}
                            name={"ngayCap"}
                            required
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Địa chỉ thường trú"}
                            control={control}
                            variant={"outlined"}
                            name={"dcThuongTru"}
                            required
                            fullWidth
                          />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Địa chỉ liên lạc"}
                            control={control}
                            variant={"outlined"}
                            name={"dcLienLac"}
                            fullWidth
                          />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Thành phố/Tỉnh"}
                            control={control}
                            variant={"outlined"}
                            name={"thanhPho"}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Quận/Huyện"}
                            control={control}
                            variant={"outlined"}
                            name={"quanHuyen"}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </FormControl>
                </WrapperBoxBorderStyled>

                <Box margin={"40px 0px"}>
                  <BillingInfo billing={billing} setBilling={setBilling} />
                </Box>

                <Box>
                  <PaymentMethods
                    payMethod={payMethod}
                    setPayMethod={setPayMethod}
                  />
                </Box>
              </>
            )}
          </Grid>

          <Grid item>
            <Box>
              <ItemDetailCol />
            </Box>
            <Box margin={"15px 0px"}>
              <TableQuote setScopeRender={setScopeRender} />
            </Box>
            <Box width={350}>
              <RowStyled>
                <Checkbox />
                <Text14Styled>
                  Ấn “Thanh toán” đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
                  <span
                    style={{ color: "#0063F7", textDecoration: "underline" }}
                  >
                    <Link href={"/"}>Điều Khoản TNR</Link>
                  </span>
                </Text14Styled>
              </RowStyled>
              <ButtonAction
                disabled={formInfo}
                margin={"12px auto"}
                type={"submit"}
              >
                <Text18Styled color={"#fff"}>Tạo phiếu thanh toán</Text18Styled>
              </ButtonAction>
              {!formInfo && (
                <ButtonStyled bg={"white"} border={"1px solid #c7c9d9"}>
                  <Text18Styled>Lưu thông tin</Text18Styled>
                </ButtonStyled>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LayoutInfoCustom;