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
  apiSendInforMsb,
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
import { apiUploadFile } from "../../../pages/api/cartApi";
import PopupBorrowMsb from "./components/PopupBorrowMsb";
import Regexs from "utils/Regexs";
import ControllerSelectAutoComplete from "@components/Form/ControllerSelectAutoComplete";
import DistricSelect from "@components/Form/DistrictSelect";
import useProvinces from "hooks/useProvinces";
import CommuneSelect from "@components/Form/CommuneSelect";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { format, parse } from "date-fns";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FEC83C",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "FEC83C",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

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

interface Option {
  label: string;
  value: string;
}

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
  commune: string;
  provinceContactName: string;
  districtContactName: string;
  communeContactName: string;
}

const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .max(255, "Không được vượt quá 255 ký tự")
    .required(validateLine.required)
    .default(""),
  dob: yup
    .string()
    .required(validateLine.required)
    .trim(validateLine.trim)
    .default(""),
  phoneNumber: yup
    .string()
    .required(validateLine.required)
    .matches(Regexs.phone, "Số điện thoại không đúng")
    .max(10, "Số điện thoại không được vượt quá 10 số")
    .default(""),
  email: yup
    .string()
    .email("Không đúng định dạng email")
    .max(255, "Không được vượt quá 255 ký tự")
    .required(validateLine.required)
    .trim(validateLine.trim)
    .default(""),
  idNumber: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .max(12, "Số CMND quá dài")
    .matches(Regexs.idNumber, "Số CMND không đúng")
    .required(validateLine.required)
    .default(""),
  issuePlace: yup
    .string()
    .max(255, "Không được vượt quá 255 ký tự")
    .required(validateLine.required)
    .nullable()
    .default(""),
  issueDate: yup.string().required(validateLine.required).default(""),
  permanentAddress: yup
    .string()
    .max(255, "Không được vượt quá 255 ký tự")
    .required(validateLine.required)
    .nullable()
    .default(""),
  contactAddress: yup
    .string()
    .max(255, "Không được vượt quá 255 ký tự")
    .nullable()
    .default(""),
});

const LayoutInfoCustom = ({ setScopeRender }: Props) => {
  const { control, handleSubmit, watch, reset, trigger, setError, setValue } =
    useForm<InformationBuyer>({
      mode: "onChange",
      resolver: yupResolver(validationSchema),
      defaultValues: validationSchema.getDefault(),
    });

  const router = useRouter();
  const [payMethod, setPayMethod] = useState<string>("");
  const [validUpload, setValidUpload] = useState<boolean>(false);
  const [billing, setBilling] = useState<number>(1);
  const [formInfo, setFormInfo] = useState<{ open: boolean; idNumber: string }>(
    { open: false, idNumber: "" }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [listCustomerType, setListCustomerType] = useState<any>([]);
  const { cart } = useSelector((state: RootState) => state.carts);
  const { listPayment } = useSelector((state: RootState) => state.payments);
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);
  const [registerBorrow, setRegisterBorrow] = useState<boolean>(false);
  const [openBorrowMsbPopup, setOpenBorrowMsbPopup] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.payments.data);
  const uploadMedia = useSelector(
    (state: RootState) => state.payments.uploadMedia
  );
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const referenceCode = useSelector(
    (state: RootState) => state.payments.referenceCode
  );

  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const notification = useNotification();
  const {
    query: { transactionCode },
  } = useRouter();
  const [initialValue, setInitialValue] = useState<any>(null);
  const [disabledEditMainUser, setDisabledEditMainUser] =
    useState<boolean>(false);
  const { dataProvinces } = useProvinces();
  const [convertProvinType, setConvertProvinType] = useState<Option[]>([]);

  useEffect(() => {
    const convert = dataProvinces.map((item) => ({
      label: item.provinceName,
      value: item.provinceName,
    }));
    setConvertProvinType(convert);
  }, [dataProvinces]);

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
          address: contactAddress,
          domicile: permanentAddress,
          province,
          district,
          commune,
          provinceContactName,
          districtContactName,
          communeContactName,
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
                  contactAddress,
                  province,
                  district,
                  commune,
                  provinceContactName,
                  districtContactName,
                  communeContactName,
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
        setPayMethod(res.responseData?.paymentMethodId);
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
              commune: watch("commune"),
              provinceContactName: watch("provinceContactName"),
              districtContactName: watch("districtContactName"),
              communeContactName: watch("communeContactName"),
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
              commune: info.commune,
              provinceContactName: info.provinceContactName,
              districtContactName: info.districtContactName,
              communeContactName: info.communeContactName,
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
    if (!isEmpty(listPayment) && isEmpty(payMethod)) {
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
    return () => {
      dispatch(setData({ ...data, paymentStatus: 0 }));
    };
  }, []);

  function sendInforToMsb() {
    const sendData = {
      tenKhachHang: watch("fullname"),
      ngaySinh: format(
        parse(watch("dob") as string, "dd-MM-yyyy", new Date()),
        "dd/MM/yyyy"
      ),
      cmnd: watch("idNumber"),
      hoKhauThuongTru: watch("permanentAddress"),
      diaChiLienHe: watch("contactAddress"),
      tinhTp: watch("provinceContactName"),
      quanHuyen: watch("districtContactName"),
      phuongXa: watch("communeContactName"),
      dienThoai: watch("phoneNumber"),
      duAn: cart?.project?.name,
      loCan: cart?.name,
      giaTriBds:
        !isEmpty(productItem) &&
        productItem.TotalMoney !== 0 &&
        productItem.TotalMoney !== null
          ? productItem?.TotalMoney
          : cart?.totalPrice,
      chinhSachBanHang: !isEmpty(productItem)
        ? !isEmpty(productItem.ListPolicy)
          ? productItem.ListPolicy.map((item) => item.PolicyName).join(", ")
          : "Không có"
        : "",
      phuongThucThanhToan:
        listPayment.find((item) => item.id === payMethod)?.name ?? "",
      luaChonUuDai: "Có",
      ngayThanhToan: format(new Date(), "dd/MM/yyyy"),
      note: "",
      thoiGianYeuCau: format(new Date(), "dd/MM/yyyy hh:mm:ss"),
    };
    apiSendInforMsb(sendData)
      .then((res) => {
        console.log(res, "res");
        notification({
          title: "Gửi thông tin vay tới MSB",
          message: "Thành công",
          severity: "success",
        });
        setRegisterBorrow(false);
      })
      .catch((err) => {
        setRegisterBorrow(false);
        notification({
          title: "Gửi thông tin vay tới MSB",
          message: "Thất bại",
          severity: "error",
        });
      });
  }

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
      commune,
      provinceContactName,
      districtContactName,
      communeContactName,
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
          commune,
          provinceContactName,
          districtContactName,
          communeContactName,
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
            landPrice:
              !isEmpty(productItem) &&
              productItem.LandPrice !== 0 &&
              productItem.LandPrice !== null
                ? productItem?.LandPrice
                : totalVatPrice,
            vat:
              !isEmpty(productItem) &&
              productItem.VAT !== 0 &&
              productItem.VAT !== null
                ? productItem?.VAT
                : vat,
            maintainPrice:
              !isEmpty(productItem) &&
              productItem.MaintenanceFee !== 0 &&
              productItem.MaintenanceFee !== null
                ? productItem?.MaintenanceFee
                : maintainPrice,
            totalPrice:
              !isEmpty(productItem) &&
              productItem.TotalMoney !== 0 &&
              productItem.TotalMoney !== null
                ? productItem?.TotalMoney
                : totalPrice,
            totalOnlinePrice:
              !isEmpty(productItem) &&
              productItem.TotalMoney !== 0 &&
              productItem.TotalMoney !== null
                ? productItem?.TotalMoney
                : totalPrice,
            minEarnestMoney,
            regulationOrderPrice,
          },
      deposite: !isEmpty(transactionCode)
        ? billing === 1
          ? data.quotationRealt.minEarnestMoney
          : data.quotationRealt.regulationOrderPrice
        : billing === 1
        ? minEarnestMoney
        : regulationOrderPrice,
      totalDeposite: !isEmpty(transactionCode)
        ? billing === 1
          ? data.quotationRealt.minEarnestMoney
          : data.quotationRealt.regulationOrderPrice
        : billing === 1
        ? minEarnestMoney
        : regulationOrderPrice,
      paymentFlag: paymentFlag,
      tnrUserId: null,
      transactionCode: !isEmpty(transactionCode) ? transactionCode : null,
      listUserIdDelete: data.listUserIdDelete,
      listPaymentPolicy: !isEmpty(productItem) ? productItem?.ListPolicy : [],
      listPromotion: !isEmpty(productItem) ? productItem?.ListPromotion : [],
      referenceCode,
      priceId: !isEmpty(productItem) ? productItem?.priceId : null,
      scheduleId: !isEmpty(productItem.ListSchedule)
        ? productItem?.ListSchedule[0]["ScheduleID"]
        : "",
    };

    if (!isEmpty(uploadMedia) && !isEmpty(transactionCode)) {
      const data = new FormData();
      uploadMedia.forEach((media) => {
        data.append("multipartFileList", media);
      });
      data.append("paymentCode", transactionCode as string);
      data.append("isMobileBanking", "0");
      apiUploadFile(data)
        .then((response) => {
          if (!isEmpty(response.responseData)) {
            notification({
              severity: "success",
              title: "Hoàn thành hồ sơ",
              message: response.responseMessage,
            });
            router.push("/result-payment?errorCode=0");
          } else {
            notification({
              severity: "error",
              title: "Hoàn thành hồ sơ",
              message: response.responseMessage,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          notification({
            severity: "error",
            title: "Hoàn thành hồ sơ",
            message: "Có lỗi xảy ra",
          });
          setLoading(false);
        });
    } else {
      try {
        if (
          payMethod === "2F19283D-4384-43B7-805F-556BAAbcn447" &&
          isEmpty(uploadMedia) &&
          isEmpty(transactionCode)
        ) {
          notification({
            severity: "error",
            title:
              paymentFlag === 0
                ? "Lưu thông tin hồ sơ"
                : "Tạo phiếu thanh toán",
            message:
              "Bạn cần upload giấy tờ xác thực thanh toán Mobile Banking",
          });
          setLoading(false);
          return;
        }
        apiSavePaymentInformation(formatData)
          .then((res) => {
            if (!isEmpty(res.responseData)) {
              // notification({
              //   message: "Lưu thông tin hồ sơ mua bán thành công!",
              //   severity: "success",
              //   title: "Hoàn thiện hồ sơ mua bán",
              // });
              if (
                !isEmpty(res.responseData?.transactionCode) &&
                paymentFlag === 0
              ) {
                if (payMethod === "2F19283D-4384-43B7-805F-556BAAbcn447") {
                  if (!isEmpty(uploadMedia)) {
                    const data = new FormData();
                    uploadMedia.forEach((media) => {
                      data.append("multipartFileList", media);
                    });
                    data.append(
                      "paymentCode",
                      res.responseData?.transactionCode as string
                    );
                    data.append("isMobileBanking", "1");
                    apiUploadFile(data)
                      .then((response) => {
                        if (response.responseCode === "00") {
                          notification({
                            severity: "success",
                            title: "Tạo phiếu thanh toán",
                            message: "Tạo phiếu thanh toán thành công!",
                          });
                          apiGetQrCode(res.responseData?.transactionCode)
                            .then((res) => {
                              if (!isEmpty(res.responseData)) {
                                dispatch(setQrCode(res.responseData));
                                setLoading(false);
                                LocalStorage.remove("cart");
                                addToCart();
                                setScopeRender("transaction_message");
                              } else {
                                setLoading(false);
                                notification({
                                  message: res.responseMessage,
                                  severity: "error",
                                  title: "Hoàn thiện hồ sơ mua bán",
                                });
                              }
                            })
                            .catch((err) => console.log(err));
                        } else {
                          setLoading(false);
                          notification({
                            severity: "error",
                            title: "Tạo phiếu thanh toán",
                            message: response.responseMessage,
                          });
                        }
                      })
                      .catch((err) => {
                        notification({
                          severity: "error",
                          title: "Tạo phiếu thanh toán",
                          message: "Có lỗi xảy ra",
                        });
                        setLoading(false);
                      });
                  } else {
                    notification({
                      severity: "error",
                      title: "Tạo phiếu thanh toán",
                      message:
                        "Bạn cần upload giấy tờ xác thực thanh toán Mobile Banking",
                    });
                  }
                } else {
                  apiGetQrCode(res.responseData?.transactionCode)
                    .then((res) => {
                      if (!isEmpty(res.responseData)) {
                        dispatch(setQrCode(res.responseData));
                        LocalStorage.remove("cart");
                        addToCart();
                        setLoading(false);
                        setScopeRender("transaction_message");
                      } else {
                        notification({
                          message: res.responseMessage,
                          severity: "error",
                          title: "Hoàn thiện hồ sơ mua bán",
                        });
                      }
                    })
                    .catch((err) => console.log(err));
                }
              }
              if (
                !isEmpty(res.responseData?.msbRedirectLink) &&
                paymentFlag !== 0
              ) {
                window.location.href = res.responseData?.msbRedirectLink;
                return;
              }
              if (
                res.responseCode === "00" &&
                payMethod === "2F19283D-4384-43B7-805F-556BAAbcn447" &&
                paymentFlag !== 0
              ) {
                if (!isEmpty(uploadMedia)) {
                  const data = new FormData();
                  uploadMedia.forEach((media) => {
                    data.append("multipartFileList", media);
                  });
                  data.append(
                    "paymentCode",
                    res.responseData?.transactionCode as string
                  );
                  data.append("isMobileBanking", "1");
                  apiUploadFile(data)
                    .then((response) => {
                      if (response.responseCode === "00") {
                        notification({
                          severity: "success",
                          title: "Tạo phiếu thanh toán",
                          message: "Tạo phiếu thanh toán thành công!",
                        });
                        LocalStorage.remove("cart");
                        addToCart();
                        router.push("/profile");
                      } else {
                        notification({
                          severity: "error",
                          title: "Tạo phiếu thanh toán",
                          message: response.responseMessage,
                        });
                      }
                      setLoading(false);
                    })
                    .catch((err) => {
                      notification({
                        severity: "error",
                        title: "Tạo phiếu thanh toán",
                        message: "Có lỗi xảy ra",
                      });
                      setLoading(false);
                    });
                } else {
                  setLoading(false);
                  notification({
                    severity: "error",
                    title: "Tạo phiếu thanh toán",
                    message:
                      "Bạn cần upload giấy tờ xác thực thanh toán Mobile Banking",
                  });
                }
              }
            } else {
              setLoading(false);
              notification({
                error: res.responseMessage,
                title: "Hoàn thiện hồ sơ mua bán",
              });
            }
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
    <Container title={"Thanh toán"}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
        <Grid container columnSpacing={"30px"} justifyContent={"center"}>
          {!formInfo.open &&
            ((!isEmpty(transactionCode) && data.paymentStatus !== 3) ||
              isEmpty(transactionCode)) &&
            !isEmpty(productItem) &&
            !isEmpty(productItem?.ListSchedule) && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box style={{ marginBottom: 60, width: "65%" }}>
                  <Stepper
                    alternativeLabel
                    activeStep={0}
                    connector={<QontoConnector />}
                  >
                    {productItem.ListSchedule.map((schedule) => (
                      <Step key={schedule.ScheduleID}>
                        <StepLabel>{schedule.ScheduleName}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            )}
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
                              InputProps={{
                                style: {
                                  height: "44px",
                                  border: "1px solid #B8B8B8",
                                  borderRadius: "8px",
                                },
                              }}
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
                              InputProps={{
                                style: {
                                  height: "44px",
                                  border: "1px solid #B8B8B8",
                                  borderRadius: "8px",
                                },
                              }}
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
                              InputProps={{
                                style: {
                                  height: "44px",
                                  border: "1px solid #B8B8B8",
                                  borderRadius: "8px",
                                },
                              }}
                              required
                            />
                          </FormGroup>
                        </Grid>
                      )}
                      {!disabledEditMainUser && (
                        <Grid item xs={12}>
                          <RowStyled aItems={"baseline"} width="100%">
                            <Title20Styled
                              // mw={175}
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Thông tin giấy tờ
                            </Title20Styled>
                            <LinedStyled mw={400} />
                          </RowStyled>
                        </Grid>
                      )}
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label={"CCCD/CMND"}
                            control={control}
                            variant={"outlined"}
                            name={"idNumber"}
                            InputProps={{
                              style: {
                                height: "44px",
                                border: "1px solid #B8B8B8",
                                borderRadius: "8px",
                              },
                            }}
                            required
                            // width={317}
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
                              InputProps={{
                                style: {
                                  height: "44px",
                                  border: "1px solid #B8B8B8",
                                  borderRadius: "8px",
                                },
                              }}
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
                            InputProps={{
                              style: {
                                height: "44px",
                                border: "1px solid #B8B8B8",
                                borderRadius: "8px",
                              },
                            }}
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
                        <RowStyled aItems={"baseline"} width="100%">
                          <Title20Styled
                            // mw={175}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Địa chỉ thường trú
                          </Title20Styled>
                          <LinedStyled mw={400} />
                        </RowStyled>
                      </Grid>

                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerSelectAutoComplete
                            disabled={disabledEditMainUser}
                            variant="outlined"
                            name="province"
                            label="Thành phố/Tỉnh"
                            control={control}
                            setValue={setValue}
                            options={convertProvinType}
                            onChangeExtra={() => {
                              setValue("district", "");
                              setValue("commune", "");
                            }}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <DistricSelect
                            disabled={disabledEditMainUser}
                            name="district"
                            label="Quận/Huyện"
                            control={control}
                            setValue={setValue}
                            provinceName={watch("province")}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <CommuneSelect
                            disabled={disabledEditMainUser}
                            name="commune"
                            label="Xã"
                            control={control}
                            setValue={setValue}
                            districtName={watch("district")}
                            provinceName={watch("province")}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label=" "
                            control={control}
                            placeholder="Nhập địa chỉ cụ thể"
                            InputProps={{
                              style: {
                                height: "44px",
                                border: "1px solid #B8B8B8",
                                borderRadius: "8px",
                              },
                            }}
                            variant={"outlined"}
                            name={"permanentAddress"}
                            fullWidth
                            disabled={disabledEditMainUser}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <RowStyled aItems={"baseline"} width="100%">
                          <Title20Styled
                            // mw={175}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Địa chỉ liên lạc
                          </Title20Styled>
                          <LinedStyled mw={400} />
                        </RowStyled>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerSelectAutoComplete
                            disabled={disabledEditMainUser}
                            variant="outlined"
                            name="provinceContactName"
                            label="Thành phố/Tỉnh"
                            control={control}
                            setValue={setValue}
                            options={convertProvinType}
                            onChangeExtra={() => {
                              setValue("districtContactName", "");
                              setValue("communeContactName", "");
                            }}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <DistricSelect
                            disabled={disabledEditMainUser}
                            name="districtContactName"
                            label="Quận/Huyện"
                            control={control}
                            setValue={setValue}
                            provinceName={watch("provinceContactName")}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <CommuneSelect
                            disabled={disabledEditMainUser}
                            name="communeContactName"
                            label="Xã"
                            control={control}
                            setValue={setValue}
                            districtName={watch("districtContactName")}
                            provinceName={watch("provinceContactName")}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ControllerTextField
                            label=" "
                            control={control}
                            variant={"outlined"}
                            InputProps={{
                              style: {
                                height: "44px",
                                border: "1px solid #B8B8B8",
                                borderRadius: "8px",
                              },
                            }}
                            name={"contactAddress"}
                            fullWidth
                            placeholder="Nhập địa chỉ cụ thể"
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
                {((!isEmpty(transactionCode) && data.paymentStatus === 3) ||
                  (payMethod === "2F19283D-4384-43B7-805F-556BAAbcn447" &&
                    isEmpty(transactionCode))) && (
                  <Box>
                    <FileUpload setValidUpload={setValidUpload} />
                  </Box>
                )}
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
                    <Link
                      href={
                        "/buyingGuide?idUserManual=edef9816-8924-4857-ad52-7afc9124aqBV"
                      }
                    >
                      Điều Khoản TNR
                    </Link>
                  </span>
                </Text14Styled>
              </RowStyled>
              <Typography
                sx={{
                  ml: "12px",
                  fontSize: "14px",
                  lineHeight: "19,63px",
                  fontWeight: 500,
                  mt: 3,
                }}
              >
                Mua nhà dễ dàng hơn với khoản vay ưu đãi từ ngân hàng MSB
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={registerBorrow}
                  onChange={(e, checked) => {
                    if (checked) {
                      trigger().then(() => {
                        if (isEmpty(watch("contactAddress"))) {
                          setError("contactAddress", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("permanentAddress"))) {
                          setError("permanentAddress", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("province"))) {
                          setError("province", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("district"))) {
                          setError("district", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("commune"))) {
                          setError("commune", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("provinceContactName"))) {
                          setError("provinceContactName", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("communeContactName"))) {
                          setError("communeContactName", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (isEmpty(watch("districtContactName"))) {
                          setError("districtContactName", {
                            type: "manual",
                            message: "Không được để trống",
                          });
                        }
                        if (
                          !isEmpty(watch("contactAddress")) &&
                          !isEmpty(watch("province")) &&
                          !isEmpty(watch("district")) &&
                          !isEmpty(watch("commune")) &&
                          !isEmpty(watch("permanentAddress")) &&
                          !isEmpty(watch("provinceContactName")) &&
                          !isEmpty(watch("communeContactName")) &&
                          !isEmpty(watch("districtContactName"))
                        ) {
                          setRegisterBorrow(checked);
                          setOpenBorrowMsbPopup(true);
                        } else {
                          setRegisterBorrow(false);
                        }
                      });
                    }
                  }}
                />
                <Text14Styled>Đăng ký vay ngân hàng</Text14Styled>
              </Box>
              {(isEmpty(transactionCode) || data.paymentStatus === 0) && (
                <ButtonAction
                  disabled={
                    formInfo.open || !acceptPolicy || data.paymentStatus !== 0
                  }
                  margin={"12px auto"}
                  onClick={handleSubmit((values) => handleOnSubmit(values, 1))}
                  sx={{
                    background: "#ea242a",
                    "&:hover": {
                      background: "#FEC83C !important",
                      // box-shadow: 4px 8px 24px #f2f2f5;
                      boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                      // borderRadius: "60px",
                      color: "#ffffff",
                    },
                  }}
                >
                  <Text18Styled color={"#fff"}>
                    Tạo phiếu thanh toán
                  </Text18Styled>
                </ButtonAction>
              )}
              {!formInfo.open && (
                <ButtonStyled
                  type="submit"
                  bg={
                    !isEmpty(transactionCode) && data.paymentStatus !== 0
                      ? isEqual(
                          initialValue?.paymentIdentityInfos,
                          data.paymentIdentityInfos
                        ) &&
                        isEqual(
                          initialValue.paymentIdentityInfos.find(
                            (info) => info.mainUser === 1
                          ),
                          { ...watch() }
                        ) &&
                        !validUpload
                        ? "#E7E9EC"
                        : "red"
                      : "white"
                  }
                  border={"1px solid #c7c9d9"}
                  sx={{
                    background: "#ea242a",
                    "&:hover": {
                      background: "#FEC83C !important",
                      // box-shadow: 4px 8px 24px #f2f2f5;
                      boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                      // borderRadius: "60px",
                    },
                  }}
                  disabled={
                    isEqual(
                      initialValue?.paymentIdentityInfos,
                      data.paymentIdentityInfos
                    ) &&
                    isEqual(
                      initialValue.paymentIdentityInfos.find(
                        (info) => info.mainUser === 1
                      ),
                      { ...watch() }
                    ) &&
                    !validUpload
                  }
                >
                  <Text18Styled
                    sx={{
                      color:
                        !isEmpty(transactionCode) && data.paymentStatus === 3
                          ? "#FFFFFF !important"
                          : "",
                      "&:hover": {
                        color: "#FFFFFF !important",
                      },
                    }}
                  >
                    {!isEmpty(transactionCode) && data.paymentStatus === 3
                      ? "Hoàn thành hồ sơ"
                      : "Lưu thông tin"}
                  </Text18Styled>
                </ButtonStyled>
              )}
            </Box>
          </Grid>
        </Grid>
        <PopupBorrowMsb
          open={openBorrowMsbPopup}
          handleClose={() => {
            setOpenBorrowMsbPopup(false);
            setRegisterBorrow(false);
          }}
          callback={() => {
            setOpenBorrowMsbPopup(false);
            sendInforToMsb();
          }}
        />
      </form>
    </Container>
  );
};

export default LayoutInfoCustom;
