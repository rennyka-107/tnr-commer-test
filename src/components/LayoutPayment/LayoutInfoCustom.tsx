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
  IconButton,
} from "@mui/material";
import FormGroup from "@components/Form/FormGroup";
import Link from "next/link";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
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
import FileUpload from "./components/FileUpload";
import TableQuote from "./components/TableQuote";
import AddInfoCustom from "./components/AddInfoCustom";
import Container from "@components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  apiGetCustomerType,
  apiGetPaymentInformation,
  apiGetQrCode,
  apiSavePaymentInformation,
  getListPaymenListById,
} from "../../../pages/api/paymentApi";
import isEmpty from "lodash.isempty";
import {
  setData,
  setListPayment,
  setQrCode,
} from "../../../store/paymentSlice";
import { useRouter } from "next/router";
import useAddToCart from "hooks/useAddToCart";

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
  fullname: string;
  dob: string;
  phoneNumber: string;
  email: string;
  idNumber: string;
  issuePlace: string;
  issueDate: string;
  permanentAddress: string;
  contactAddress: string;
  province: string;
  district: string;
}

const validationSchema = yup.object().shape({
  fullname: yup.string().required(validateLine.required).default(""),
  dob: yup
    .string()
    .required(validateLine.required)
    .trim(validateLine.trim)
    .default(""),
  phoneNumber: yup.string().required(validateLine.required).default(""),
  email: yup.string().trim(validateLine.trim).default(""),
  idNumber: yup.string().required(validateLine.required).default(""),
  issuePlace: yup.string().required(validateLine.required).default(""),
  issueDate: yup.string().required(validateLine.required).default(""),
  permanentAddress: yup.string().required(validateLine.required).default(""),
  contactAddress: yup.string().default(""),
  province: yup.string().default(""),
  district: yup.string().default(""),
});

const LayoutInfoCustom = ({ setScopeRender }: Props) => {
  const { control, handleSubmit, watch, reset } = useForm<InformationBuyer>({
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

  const [payMethod, setPayMethod] = useState<string>("");
  const [billing, setBilling] = useState<number>(1);
  const [formInfo, setFormInfo] = useState<{ open: boolean; idNumber: string }>(
    { open: false, idNumber: "" }
  );
  const [listCustomerType, setListCustomerType] = useState<any>([]);
  const { cart } = useSelector((state: RootState) => state.carts);
  const { listPayment } = useSelector((state: RootState) => state.payments);
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.payments.data);
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const {
    query: { transactionCode },
  } = useRouter();

  useEffect(() => {
    if (!isEmpty(transactionCode)) {
      fetchData();
    }
  }, [transactionCode]);

  async function fetchData() {
    const res = await apiGetPaymentInformation(transactionCode as string);
    if (!isEmpty(res)) {
      dispatch(setData(res.responseData));
    }
  }

  useEffect(() => {
    data.paymentIdentityInfos.forEach((info) => {
      if (isEmpty(info.vocativeId) && isEmpty(info.customerTypeId)) {
        reset({ ...info });
      }
    });
  }, [data]);

  useEffect(() => {
    if (!isEmpty(listPayment)) {
      setPayMethod(listPayment[0]["id"]);
    }
  }, [listPayment]);

  async function getCustomerTypes() {
    const res = await apiGetCustomerType();
    if (!isEmpty(res.responseData)) setListCustomerType(res.responseData);
  }

  async function fetchPaymentMethod() {
    try {
      const res = await getListPaymenListById();
      if (!isEmpty(res.responseData)) {
        dispatch(setListPayment(res.responseData));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCustomerTypes();
  }, []);

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  const handleOnSubmit = (values, paymentFlag = 0) => {
    const {
      vat,
      totalVatPrice,
      maintainPrice,
      minEarnestMoney,
      regulationOrderPrice,
      totalPrice,
      id: productId,
    } = cart;
    const {
      fullname,
      dob,
      phoneNumber,
      email,
      idNumber,
      issueDate,
      issuePlace,
      permanentAddress,
      contactAddress,
      province,
      district,
    } = values;
    const formatInfos = data.paymentIdentityInfos.map((info) => {
      if (info.idNumber === idNumber || isEmpty(info.idNumber)) {
        return {
          fullname,
          dob,
          phoneNumber,
          email,
          idNumber,
          issueDate,
          issuePlace,
          permanentAddress,
          contactAddress,
          province,
          district,
        };
      }
      return info;
    });
    const formatData = {
      productId,
      paymentMethodId: payMethod,
      paymentIdentityInfos: formatInfos,
      quotationRealt: {
        landPrice: totalVatPrice,
        vat,
        maintainPrice,
        totalPrice,
        sales: "0",
        nppDiscount: "0",
        totalOnlinePrice: totalPrice,
        minEarnestMoney,
        regulationOrderPrice,
      },
      deposite: billing === 1 ? minEarnestMoney : null,
      totalDeposite: billing !== 1 ? regulationOrderPrice : null,
      paymentFlag: paymentFlag,
    };
    try {
      apiSavePaymentInformation(formatData)
        .then((res) => {
          if (!isEmpty(res.responseData)) {
            addToCart();
            if (
              !isEmpty(res.responseData?.transactionCode) &&
              paymentFlag === 0
            ) {
              apiGetQrCode(res.responseData?.transactionCode)
                .then((res) => {
                  if (!isEmpty(res.responseData)) {
                    dispatch(setQrCode(res.responseData));
                    setScopeRender("transaction_message");
                  }
                })
                .catch((err) => console.log(err));
            }
            if (
              !isEmpty(res.responseData?.msbRedirectLink) &&
              paymentFlag !== 0
            ) {
              window.location.href = res.responseData?.msbRedirectLink;
            }
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  function removeCustomer(id: string) {
    const paymentIdentityInfos = [...data.paymentIdentityInfos];
    const infos = paymentIdentityInfos.filter((info) => info.idNumber !== id);
    dispatch(
      setData({
        ...data,
        paymentIdentityInfos: infos,
      })
    );
  }

  function renderListCustomer() {
    const arrayInfos = [...data.paymentIdentityInfos];
    const mainCustomer = arrayInfos.find(
      (info) => isEmpty(info.vocativeId) && isEmpty(info.customerTypeId)
    );
    let paymentIdentityInfos = [];
    if (!isEmpty(transactionCode)) {
      const infosExceptMainCustomer = arrayInfos.filter(
        (info) => !isEmpty(info.vocativeId) && !isEmpty(info.customerTypeId)
      );
      infosExceptMainCustomer.unshift(mainCustomer);
      paymentIdentityInfos = [...infosExceptMainCustomer];
    }
    const numberRow = (paymentIdentityInfos.length - 1) / 2;
    const arrayElements = [];
    if (numberRow > 0) {
      for (let i = 0; i < numberRow; i++) {
        const ele1 = paymentIdentityInfos.pop();
        const ele2 =
          paymentIdentityInfos.length >= 2 ? paymentIdentityInfos.pop() : null;
        arrayElements.push(
          <RowStyled key={ele1.idNumber + "1023"}>
            <BoxInfoUserStyled style={{ cursor: "pointer" }}>
              <RowStyled>
                <Text18Styled
                  onClick={() => {
                    setFormInfo({ open: true, idNumber: ele1.idNumber });
                  }}
                  maxWidth={133}
                  color={"black"}
                >
                  {ele1.fullname}
                </Text18Styled>
                <IconButton onClick={() => removeCustomer(ele1.idNumber)}>
                  <IconPlusCircle style={{ transform: "rotate(45deg)" }} />
                </IconButton>
              </RowStyled>
            </BoxInfoUserStyled>
            {!isEmpty(ele2) && (
              <BoxInfoUserStyled style={{ cursor: "pointer" }}>
                <RowStyled>
                  <Text18Styled
                    onClick={() => {
                      setFormInfo({ open: true, idNumber: ele2.idNumber });
                    }}
                    maxWidth={133}
                    color={"black"}
                  >
                    {ele2.fullname}
                  </Text18Styled>
                  <IconButton onClick={() => removeCustomer(ele2.idNumber)}>
                    <IconPlusCircle style={{ transform: "rotate(45deg)" }} />
                  </IconButton>
                </RowStyled>
              </BoxInfoUserStyled>
            )}
          </RowStyled>
        );
      }
    }
    if (!isEmpty(arrayElements)) {
      return arrayElements.map((ele) => ele);
    }
    return <></>;
  }

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
            {formInfo.open ? (
              <AddInfoCustom
                listCustomerType={listCustomerType}
                onClose={() => setFormInfo({ open: false, idNumber: "" })}
                idNumber={formInfo.idNumber}
              />
            ) : (
              <>
                <WrapperBoxBorderStyled padding={"20px 30px 10px"}>
                  <Title28Styled>Thông tin bên mua</Title28Styled>
                  <RowStyled>
                    <BoxInfoUserStyled>
                      <ColStyled jContent={"center"}>
                        <Title22Styled style={{ marginBottom: 8 }}>
                          {!isEmpty(transactionCode)
                            ? watch("fullname")
                            : "Khác hàng vãng lai"}
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
                        setFormInfo({ open: true, idNumber: "" });
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
                  {renderListCustomer()}
                  <FormControl fullWidth style={{ margin: "25px 0px" }}>
                    <Grid container rowSpacing={"20px"} columnSpacing={"37px"}>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Họ và tên"}
                            control={control}
                            variant={"outlined"}
                            name={"fullname"}
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
                            name={"dob"}
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
                            name={"phoneNumber"}
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
                            name={"idNumber"}
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
                            name={"issuePlace"}
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
                            name={"issueDate"}
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
                            name={"permanentAddress"}
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
                            name={"contactAddress"}
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
                            name={"province"}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Quận/Huyện"}
                            control={control}
                            variant={"outlined"}
                            name={"district"}
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
                <Box>
                  <FileUpload />
                </Box>
              </>
            )}
          </Grid>

          <Grid item>
            <Box>
              <ItemDetailCol
                item={!isEmpty(data.production) ? data.production : null}
              />
            </Box>
            <Box margin={"15px 0px"}>
              <TableQuote
                item={
                  !isEmpty(data.quotationRealt) ? data.quotationRealt : null
                }
                setScopeRender={setScopeRender}
              />
            </Box>
            <Box width={350}>
              <RowStyled>
                <Checkbox
                  value={acceptPolicy}
                  onChange={(e, checked) => {
                    setAcceptPolicy(checked);
                  }}
                />
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
                disabled={formInfo.open || !acceptPolicy}
                margin={"12px auto"}
                onClick={() => handleOnSubmit(watch(), 1)}
              >
                <Text18Styled color={"#fff"}>Tạo phiếu thanh toán</Text18Styled>
              </ButtonAction>
              {!formInfo.open && (
                <ButtonStyled
                  type="submit"
                  bg={"white"}
                  border={"1px solid #c7c9d9"}
                >
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
