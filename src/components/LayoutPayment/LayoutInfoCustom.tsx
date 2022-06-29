import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerTextField from "@components/Form/ControllerTextField";
import { IconEdit, IconPlusCircle } from "@components/Icons";
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
  CircularProgress,
  Backdrop,
  Typography,
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
  apiGetProfileInformation,
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
import useNotification from "hooks/useNotification";
import useAuth from "hooks/useAuth";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import isEqual from "lodash.isequal";
import IconWarning from "@components/Icons/IconWarning";
import LocalStorage from "utils/LocalStorage";

type Props = {
  setScopeRender: Dispatch<SetStateAction<string>>;
};

const BoxInfoUserStyled = styled(Box)({
  background: "#f3f4f6",
  borderRadius: 18,
  padding: "0px 20px",
  width: "100%",
  maxWidth: "317px",
  height: 100,
  marginTop: 16,
});

interface InformationBuyer {
  fullname: string;
  dob: string | Date;
  phoneNumber: string;
  email: string;
  idNumber: string;
  issuePlace: string;
  issueDate: string | Date;
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
  email: yup
    .string()
    .email()
    .required(validateLine.required)
    .trim(validateLine.trim)
    .default(""),
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
  const [loading, setLoading] = useState<boolean>(false);
  const [listCustomerType, setListCustomerType] = useState<any>([]);
  const { cart } = useSelector((state: RootState) => state.carts);
  const { listPayment } = useSelector((state: RootState) => state.payments);
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.payments.data);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const notification = useNotification();
  const router = useRouter();
  const {
    query: { transactionCode },
  } = useRouter();
  const [initialValue, setInitialValue] = useState<any>(null);
  const [disabledEditMainUser, setDisabledEditMainUser] =
    useState<boolean>(false);

  async function getInformationUser() {
    try {
      const res = await apiGetProfileInformation();
      if (!isEmpty(res.responseData)) {
        const {
          fullname,
          birth: dob,
          phone: phoneNumber,
          email,
          idNumber,
          idReceiveDate: issueDate,
          idReceivePlace: issuePlace,
          address: permanentAddress,
        } = res.responseData;
        if (isEmpty(transactionCode)) {
          dispatch(
            setData({
              ...data,
              paymentIdentityInfos: [
                {
                  fullname,
                  dob,
                  phoneNumber,
                  email,
                  idNumber,
                  issueDate,
                  issuePlace,
                  permanentAddress,
                  contactAddress: "",
                  province: "",
                  district: "",
                  mainUser: 1,
                },
              ],
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!isEmpty(transactionCode)) {
      fetchData();
    } else {
      if (isAuthenticated) getInformationUser();
    }
  }, [transactionCode, isAuthenticated]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await apiGetPaymentInformation(transactionCode as string);
      if (!isEmpty(res.responseData)) {
        dispatch(setData(res.responseData));
        setInitialValue(res.responseData);
        setDisabledEditMainUser(true);
      } else {
        notification({
          severity: "error",
          title: `Thông tin mã giao dịch ${transactionCode}`,
          message: res.responseMessage,
        });
        router.push("/404");
      }
    } catch (err) {
      notification({
        severity: "error",
        title: `Thông tin mã giao dịch ${transactionCode}`,
        message: "Có lỗi xảy ra",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    data.paymentIdentityInfos.forEach((info) => {
      if (info.mainUser && info.mainUser === 1) {
        if (
          !isEmpty(watch("idNumber")) &&
          !isEqual(
            {
              fullname: watch("fullname"),
              dob: watch("dob"),
              phoneNumber: watch("phoneNumber"),
              email: watch("email"),
              idNumber: watch("idNumber"),
              issueDate: watch("issueDate"),
              issuePlace: watch("issuePlace"),
              permanentAddress: watch("permanentAddress"),
              contactAddress: watch("contactAddress"),
              province: watch("province"),
              district: watch("district"),
            },
            {
              fullname: info.fullname,
              phoneNumber: info.phoneNumber,
              email: info.email,
              idNumber: info.idNumber,
              issuePlace: info.issuePlace,
              permanentAddress: info.permanentAddress,
              contactAddress: info.contactAddress,
              province: info.province,
              district: info.district,
              dob: info.dob,
              issueDate: info.issueDate,
            }
          )
        ) {
          reset({
            ...info,
            ...watch(),
          });
        } else {
          reset({
            ...info,
          });
        }
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
    fetchPaymentMethod();
  }, []);

  const handleOnSubmit = (values, paymentFlag = 0) => {
    setLoading(true);
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
      id,
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
          mainUser: 1,
          id,
        };
      }
      return {
        ...info,
      };
    });
    const formatData = {
      productId: !isEmpty(transactionCode) ? data.productId : productId,
      paymentMethodId: payMethod,
      paymentIdentityInfos: formatInfos,
      quotationRealt: !isEmpty(transactionCode)
        ? data.quotationRealt
        : {
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
      deposite:
        billing === 1
          ? !isEmpty(transactionCode)
            ? data.quotationRealt.minEarnestMoney
            : minEarnestMoney
          : null,
      totalDeposite:
        billing !== 1
          ? !isEmpty(transactionCode)
            ? data.quotationRealt.regulationOrderPrice
            : regulationOrderPrice
          : null,
      paymentFlag: paymentFlag,
      tnrUserId: null,
      transactionCode: !isEmpty(transactionCode) ? transactionCode : null,
      listUserIdDelete: data.listUserIdDelete,
    };
    try {
      apiSavePaymentInformation(formatData)
        .then((res) => {
          if (!isEmpty(res.responseData)) {
            notification({
              message: "Lưu thông tin hồ sơ mua bán thành công!",
              severity: "success",
              title: "Hoàn thiện hồ sơ mua bán",
            });
            addToCart();
            LocalStorage.remove("cart");
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
          } else {
            notification({
              error: res.responseMessage,
              title: "Hoàn thiện hồ sơ mua bán",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          notification({
            error: "Có lỗi xảy ra!",
            title: "Hoàn thiện hồ sơ mua bán",
          });
          setLoading(false);
        });
    } catch (error) {
      {
        notification({
          error: "Có lỗi xảy ra!",
          title: "Hoàn thiện hồ sơ mua bán",
        });
        setLoading(false);
      }
    }
  };

  function removeCustomer(id: string) {
    const paymentIdentityInfos = [...data.paymentIdentityInfos];
    const infos = paymentIdentityInfos.filter((info) => info.idNumber !== id);
    const deleteInfo = paymentIdentityInfos.find(
      (info) => info.idNumber === id
    );
    const arrayDelete = !isEmpty(data.listUserIdDelete)
      ? [...data.listUserIdDelete]
      : [];
    if (!isEmpty(deleteInfo.id)) {
      arrayDelete.push(deleteInfo.id);
    }
    dispatch(
      setData({
        ...data,
        paymentIdentityInfos: infos,
        listUserIdDelete: arrayDelete,
      })
    );
  }
  function renderListCustomer() {
    const arrayInfos = [...data.paymentIdentityInfos];
    let paymentIdentityInfos: any[] = [];
    paymentIdentityInfos = arrayInfos.filter((info) => info.mainUser !== 1);
    const numberRow = paymentIdentityInfos.length / 2;
    const arrayElements = [];
    if (numberRow > 0) {
      for (let i = 0; i < numberRow; i++) {
        const ele1 = paymentIdentityInfos.pop();
        const ele2 =
          paymentIdentityInfos.length >= 1 ? paymentIdentityInfos.pop() : null;
        arrayElements.push(
          <RowStyled key={ele1.idNumber + "1023"}>
            <BoxInfoUserStyled style={{ cursor: "pointer", display: "flex" }}>
              <ColStyled jContent={"center"} sx={{ gap: 1 }}>
                <Text18Styled
                  onClick={() => {
                    setFormInfo({ open: true, idNumber: ele1.idNumber });
                  }}
                  color={"black"}
                >
                  {ele1.fullname}
                </Text18Styled>
                <Text14Styled color={"#5a5a5a"}>
                  {ele1.phoneNumber}
                </Text14Styled>
              </ColStyled>
              <IconButton onClick={() => removeCustomer(ele1.idNumber)}>
                <IconPlusCircle style={{ transform: "rotate(45deg)" }} />
              </IconButton>
            </BoxInfoUserStyled>
            {!isEmpty(ele2) && (
              <BoxInfoUserStyled style={{ cursor: "pointer", display: "flex" }}>
                <ColStyled jContent={"center"} sx={{ gap: 1 }}>
                  <Text18Styled
                    onClick={() => {
                      setFormInfo({ open: true, idNumber: ele2.idNumber });
                    }}
                    color={"black"}
                  >
                    {ele2.fullname}
                  </Text18Styled>
                  <Text14Styled color={"#5a5a5a"}>
                    {ele2.phoneNumber}
                  </Text14Styled>
                </ColStyled>
                <IconButton onClick={() => removeCustomer(ele2.idNumber)}>
                  <IconPlusCircle style={{ transform: "rotate(45deg)" }} />
                </IconButton>
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
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                  {!isEmpty(transactionCode) && !isAuthenticated && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #C7C9D9",
                        p: 2,
                        borderRadius: "8px",
                        mt: 1,
                      }}
                    >
                      <IconWarning />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "16.41px",
                            color: "#1B3459",
                          }}
                        >
                          Thông tin đăng ký tài khoản
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "14.84px",
                            color: "#0E1D34",
                          }}
                        >
                          Thông tin người mua đầu tiên dưới đây sẽ được sử dụng
                          để đăng ký tài khoản sau khi đặt cọc thành công
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <RowStyled>
                    <BoxInfoUserStyled
                      sx={{
                        background: !isEmpty(transactionCode)
                          ? "#FFCC00 !important"
                          : "#f3f4f6",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ColStyled jContent={"center"}>
                        <Title22Styled style={{ marginBottom: 8 }}>
                          {!isEmpty(watch("fullname"))
                            ? watch("fullname")
                            : "Khác hàng vãng lai"}
                        </Title22Styled>
                        <Text14Styled color={"#5a5a5a"}>
                          {!isEmpty(watch("phoneNumber"))
                            ? "Số điện thoại: " + watch("phoneNumber")
                            : "Vui lòng điền đầy đủ thông tin bên dưới để tiến hành giao dịch."}
                        </Text14Styled>
                      </ColStyled>
                      {!isEmpty(transactionCode) && (
                        <IconButton
                          sx={{
                            width: "30px",
                            height: "30px",
                            display: "inline-block",
                          }}
                          onClick={() =>
                            setDisabledEditMainUser(!disabledEditMainUser)
                          }
                        >
                          <IconEdit style={{ width: "30px", height: "30px" }} />
                        </IconButton>
                      )}
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
                      {!disabledEditMainUser && (
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
                      )}

                      {!disabledEditMainUser && (
                        <Grid item xs={6}>
                          <FormGroup>
                            <ControllerReactDatePicker
                              label={"Ngày sinh"}
                              control={control}
                              name={"dob"}
                              required
                              maxDate={new Date()}
                            />
                          </FormGroup>
                        </Grid>
                      )}

                      {!disabledEditMainUser && (
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
                      )}
                      {!disabledEditMainUser && (
                        <Grid item xs={6}>
                          <FormGroup>
                            <ControllerTextField
                              label={"Email"}
                              control={control}
                              variant={"outlined"}
                              name={"email"}
                              required
                            />
                          </FormGroup>
                        </Grid>
                      )}
                      {!disabledEditMainUser && (
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
                      )}
                      <Grid item xs={disabledEditMainUser ? 6 : 12}>
                        <FormGroup>
                          <ControllerTextField
                            label={"CCCD/CMND"}
                            control={control}
                            variant={"outlined"}
                            name={"idNumber"}
                            required
                            width={317}
                            disabled={disabledEditMainUser}
                          />
                        </FormGroup>
                      </Grid>
                      {disabledEditMainUser && (
                        <Grid item xs={6}>
                          <FormGroup>
                            <ControllerTextField
                              label={"Email"}
                              control={control}
                              variant={"outlined"}
                              name={"email"}
                              required
                              disabled
                            />
                          </FormGroup>
                        </Grid>
                      )}
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"Nơi cấp"}
                            control={control}
                            variant={"outlined"}
                            name={"issuePlace"}
                            required
                            disabled={disabledEditMainUser}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerReactDatePicker
                            label={"Ngày cấp"}
                            control={control}
                            variant={"outlined"}
                            name={"issueDate"}
                            required
                            maxDate={new Date()}
                            disabled={disabledEditMainUser}
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
                            disabled={disabledEditMainUser}
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
                            disabled={disabledEditMainUser}
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
                            disabled={disabledEditMainUser}
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
                            disabled={disabledEditMainUser}
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
              {(isEmpty(transactionCode) || data.paymentStatus === 0) && (
                <ButtonAction
                  disabled={
                    formInfo.open || !acceptPolicy || data.paymentStatus !== 0
                  }
                  margin={"12px auto"}
                  onClick={handleSubmit((values) => handleOnSubmit(values, 1))}
                >
                  <Text18Styled color={"#fff"}>
                    Tạo phiếu thanh toán
                  </Text18Styled>
                </ButtonAction>
              )}
              {!formInfo.open && (
                <ButtonStyled
                  type="submit"
                  bg={"white"}
                  border={"1px solid #c7c9d9"}
                  disabled={
                    isEqual(
                      initialValue?.paymentIdentityInfos,
                      data.paymentIdentityInfos
                    ) &&
                    isEqual(
                      initialValue.paymentIdentityInfos.find(
                        (info) =>
                          isEmpty(info.vocativeId) &&
                          isEmpty(info.customerTypeId)
                      ),
                      { ...watch() }
                    )
                  }
                >
                  <Text18Styled>Lưu thông tin</Text18Styled>
                </ButtonStyled>
              )}
              <ButtonStyled
                sx={{ marginTop: "12px" }}
                bg={"white"}
                border={"1px solid #c7c9d9"}
                onClick={() => setScopeRender("payment")}
              >
                <Text18Styled>Quay lại giỏ hàng</Text18Styled>
              </ButtonStyled>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LayoutInfoCustom;
