import React, { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Radio,
  RadioProps,
  Skeleton,
  Typography,
} from "@mui/material";

import { FakeDataTable3, FakeDataTable4 } from "./fakeData";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconDownloadPTG, IconDropDown } from "@components/Icons";
import { PTGResponse, ResponseSearchById } from "interface/product";
import {
  downloadPhieuTinhGiaAPI,
  getPaymentListByScheduleId,
  getPriceListByProductLandsoft,
  getProductPtgApi,
} from "../../../pages/api/productsApi";
import { isEmpty } from "lodash";
import { getProductPTG } from "../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";
import useAddToCart from "hooks/useAddToCart";
import { styled as styledMui } from "@mui/material/styles";
import { useRouter } from "next/router";
import useNotification from "hooks/useNotification";

interface Price {
  ApartmentPrice: string;
  levelDetailGrandfatherName?: string;
  BuildPrice: string;
  FoundationMoney: string;
  LandPrice: string;
  PriceID: number;
  PriceName: string;
  TotalLandPrice: string;
  LandMoney: string;
  TotalMoney: string;
}

interface Payment {
  ScheduleID: number | string;
  LandMoney: number;
  BuildMoney: number;
  FoundationMoney: number;
  TotalMoney: number;
}
interface PaymentItem {
  Amount: string;
  Amount1: string;
  Amount2: string;
  percentageString?: string;
  Amount3: string;
  Date: string;
  Description: string;
  Number: number;
  Percentage1: string;
  Percentage2: string;
  Percentage3: string;
  Type1: number;
  Type2: number;
  Type3: number;
}
interface PhieuTinhGiaProps {
  productItem?: PTGResponse;
  dataProduct?: ResponseSearchById;
  setDataDownloadPtg?: any;
  //   dataPrice?: Price
  scheduleId?: string;
  promotions?: number[];
  priceID?: number | string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const WrapBodyStyped = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 58px;
  gap: 30px;
`;
const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 539px;
  gap: 35px;
`;
const ContainerBottomLeft = styled.div`
  background: #f8fafe;
  border-radius: 20px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ContainerCenterRight = styled.div`
  background: #f8fafe;
  border-radius: 20px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 540px;
  gap: 35px;
`;

const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
`;

const WrapCardItem = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  padding: 22px 16px 22px 13px;
`;
const WrapItemOnCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const TextLeftOnCardLeft = styled(Typography)`
  width: 50%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 38px;
  text-align: right;
  color: #1b3459;
`;
const TextLeftOnCardLeftTypeCaoTang1 = styled(Typography)`
  width: 50%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  /* or 178% */

  /* Brand/Main color */

  color: #1b3459;
`;
const TextRightOnCardLeft = styled(Typography)`
  width: 50%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 38px;
  /* or 211% */

  /* Brand/Main color */

  color: #1b3459;
`;

const TextOnCardRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #1b3459;
`;

const WrapRightCardText = styled.div`
  display: flex;
  gap: 14px;
  right: 0;
`;

const TitleBottomWrap = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
  margin-bottom: 5px;
`;

const SubTitleBottomWrap = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;
const TextBoldInWrapBottom = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1b3459;
`;
const TextInWrapBottom = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;

const TextCenterRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #1b3459;
  margin-bottom: 9px;
`;
const SubTextCenterRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* or 129% */

  text-align: right;

  /* Brand/Main color */

  color: #1b3459;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 50px;
  background: #ea242a;
  border-radius: 8px;
  padding: 13px;
  :hover {
    background: #ffffff;
    box-shadow: 4px 8px 24px #f2f2f5;
    border: 1px solid #48576d;
    border-radius: 8px;
    color: #48576d;
    font-weight: 400;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const TitleSelectStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 11px;
  /* Brand */

  color: #1b3459;
`;

const TextPriceName = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  /* Brand */

  color: #1b3459;
`;

const NumberPrice = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Brand/Sub 2 */

  color: #ea242a;
`;

const BpIcon = styledMui("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  border: "1px solid #0063F7",
  backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#f5f8fa",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    opacity: 0.4,
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
  "input:disabled:checked ~ &": {
    backgroundColor: "#0063F7",
  },
}));

const BpCheckedIcon = styledMui(BpIcon)({
  backgroundColor: "#0063F7",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 18,
    height: 18,
    backgroundImage: "radial-gradient(#FFFFFF,#FFFFFF 40%,transparent 50%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#0063F7",
  },
  // "input:disabled ~ &": {
  //   opacity: 0.4,
  // },
});

const BpRadio = (props: RadioProps) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
        p: 0,
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

const PhieuTinhGia = ({
  dataProduct,
  setDataDownloadPtg,
  scheduleId,
  promotions,
  priceID,
}: PhieuTinhGiaProps) => {
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const router = useRouter();
  const addToCart = useAddToCart();
  const [loading, setLoading] = React.useState(false);
  const [paymentName, setPaymentName] = React.useState<string[]>([]);
  const [priceName, setPriceName] = React.useState<string[]>([]);
  const [listPaymentItem, setListPaymentItem] = React.useState<PaymentItem[]>(
    []
  );
  // console.log("dataProduct",dataProduct)
  const [handleOpen, setHandleOpen] = React.useState(false);
  const [priceIdSelect, setPriceIdSelect] = React.useState(0);
  const [selectedPromotionIds, setSelectedPromotionIds] = React.useState([]);
  const getDateNew = moment(new Date()).format("DD-mm-yyyy");
  const notification = useNotification();
  const [dataDwnPtg, setDataDwnPtg] = React.useState({
    ProductId: '',
    PriceID: 0,
    ScheduleID: 0,
	Promotions: []
  });

  const [filterPtg, setFilterPtg] = React.useState({
    productId: "0",
    priceID: 0,
    scheduleId: "",
    promotions: [],
  });

  const [filterPriceByName, setFilterPriceByName] = React.useState<Price>({
    ApartmentPrice: "",
    BuildPrice: "",
    FoundationMoney: "",
    LandMoney: "",
    LandPrice: "",
    PriceID: 0,
    PriceName: "",
    TotalLandPrice: "",
    TotalMoney: "",
  });

  const [filterPayment, setFilterpayment] = React.useState<Payment>({
    ScheduleID: !isEmpty(scheduleId) ? Number(scheduleId) : "",
    LandMoney: 0,
    BuildMoney: 0,
    FoundationMoney: 0,
    TotalMoney: 0,
  });

  const [listPrice, setListPrice] = React.useState([]);

  const handleChange = async (event: SelectChangeEvent<typeof paymentName>) => {
    const {
      target: { value },
    } = event;
    setPaymentName(typeof value === "string" ? value.split(",") : value);
    const findScheduleId = productItem.ListSchedule.find(
      (item) => item.ScheduleName === value
    );
    if (!isEmpty(findScheduleId)) {
      // const res = await fetchPtg({...filterPtg, scheduleId: findScheduleId.ScheduleID.toString(), promotions: []});
      setFilterPtg({
        ...filterPtg,
        scheduleId: findScheduleId.ScheduleID.toString(),
        promotions: [],
      });
    }
  };

  const handleChangePrice = (event: SelectChangeEvent<typeof priceName>) => {
    const {
      target: { value },
    } = event;
    setPriceName(typeof value === "string" ? value.split(",") : value);
    const datafilter = listPrice.filter((p) => p.PriceName === value);
    setPriceIdSelect(datafilter[0].PriceID);
  };

  useEffect(() => {
    if (!isEmpty(listPrice)) {
      if (!isEmpty(priceID ? priceID.toString() : undefined)) {
        const findPriceId = listPrice.find(
          (item) => item.PriceID.toString() === priceID.toString()
        );
        if (!isEmpty(findPriceId)) {
          // setPriceIdSelect(priceID as number);
          setPriceName(findPriceId.PriceName.split(","));
          setFilterPtg({ ...filterPtg, priceID: Number(priceID) });
        }
      } else {
        setPriceIdSelect(listPrice[0].PriceID);
        setPriceName(listPrice[0].PriceName.split(","));
      }
    }
  }, [listPrice, priceID]);

  useEffect(() => {
    if (
      !isEmpty(priceIdSelect.toString()) &&
      isEmpty(priceID ? priceID.toString() : undefined) &&
      isEmpty(scheduleId ? scheduleId.toString() : undefined) &&
      isEmpty(promotions)
    ) {
      setFilterPtg({
        ...filterPtg,
        productId: dataProduct.id,
        priceID: priceIdSelect,
        promotions: selectedPromotionIds,
      });
    }
  }, [dataProduct.id, priceIdSelect, selectedPromotionIds]);

  useEffect(() => {
    (async function () {
      const res = await fetchPtg({ ...filterPtg, promotions: [] });
      if (!isEmpty(res)) {
        setFilterpayment({
          LandMoney: res.LandMoney,
          BuildMoney: res.BuildMoney,
          FoundationMoney: res.FoundationMoney,
          TotalMoney: res.TotalMoney,
          ScheduleID: filterPtg.scheduleId,
        });
      }
      if (!isEmpty(selectedPromotionIds)) {
        setSelectedPromotionIds([]);
      }
    })();
  }, [filterPtg.scheduleId]);

  useEffect(() => {
    const filterSchedule =
      !isEmpty(productItem) && !isEmpty(productItem.ListSchedule)
        ? productItem.ListSchedule.filter(
            (sch) => sch.ScheduleName === paymentName[0]
          )
        : [];
    if (!isEmpty(filterSchedule)) {
      setDataDownloadPtg({
		ProductId: dataProduct.id,
        Promotions: selectedPromotionIds,
        PriceID: priceIdSelect,
        ScheduleID: filterSchedule[0].ScheduleID,
      });
      setDataDwnPtg({
        ProductId: dataProduct.id,
        Promotions: selectedPromotionIds,
        PriceID: priceIdSelect,
        ScheduleID: filterSchedule[0].ScheduleID,
      });
    }
  }, [productItem, paymentName]);

  async function fetchPtg(data: typeof filterPtg, changeCk: boolean = false) {
    try {
      if (data.priceID !== 0) {
        const response = await getProductPtgApi(data);
        if (!isEmpty(response.responseData)) {
          dispatch(getProductPTG(response.responseData));
          if(changeCk) {
            setFilterpayment({
              LandMoney: response.responseData.LandMoney,
              BuildMoney: response.responseData.BuildMoney,
              FoundationMoney: response.responseData.FoundationMoney,
              TotalMoney: response.responseData.TotalMoney,
              ScheduleID: filterPtg.scheduleId,
            });
          }
          return response.responseData;
        } else {
          notification({
            error: response.responseMessage,
            title: "Load phiếu tính giá"
          })
          setListPaymentItem([])
          dispatch(
            getProductPTG({
              ListPolicy: [],
              ListPromotion: [],
              ListSchedule: [],
              MaintainanceFee: null,
              LandPrice: 0,
              BuildPrice: 0,
              BuildMoney: 0,
              LandMoney: 0,
              ProductPrice: null,
              ProductQuotation: null,
              PromotionMoney: null,
              TotalMoney: null,
              TotalMoneyText: "",
              VAT: 0,
              MaintenanceFee: 0,
              PreTotalMoney: 0,
              priceId: null,
              scheduleId: "",
              TimeOfPayment: 0,
              TimeOfPaymentUnit: "",
            })
          );
          return null;
        };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    if (!isEmpty(dataProduct.id)) {
      if (!isEmpty(filterPtg.priceID.toString())) {
        if (
          (isEmpty(priceID ? priceID.toString() : undefined) &&
            isEmpty(promotions) &&
            isEmpty(scheduleId ? scheduleId.toString() : undefined)) ||
          (!isEmpty(priceID ? priceID.toString() : undefined) &&
            !isEmpty(promotions) &&
            !isEmpty(scheduleId ? scheduleId.toString() : undefined) &&
            filterPtg.priceID.toString() !== priceID.toString())
        ) {
          (async function () {
            const res = await fetchPtg({
              ...filterPtg,
              scheduleId: "",
              promotions: [],
            });
            if (!isEmpty(res)) {
              setPaymentName([res.ListSchedule[0].ScheduleName]);
              if (
                filterPtg.scheduleId.toString() !==
                res.ListSchedule[0].ScheduleID.toString()
              ) {
                setFilterPtg({
                  ...filterPtg,
                  scheduleId: res.ListSchedule[0].ScheduleID.toString(),
                  promotions: [],
                });
              } else {
                const res2 = await fetchPtg({ ...filterPtg, promotions: [] });
                if (!isEmpty(res2)) {
                  setFilterpayment({
                    LandMoney: res2.LandMoney,
                    BuildMoney: res2.BuildMoney,
                    FoundationMoney: res2.FoundationMoney,
                    TotalMoney: res2.TotalMoney,
                    ScheduleID: filterPtg.scheduleId,
                  });
                }
                if (!isEmpty(selectedPromotionIds)) {
                  setSelectedPromotionIds([]);
                }
              }
              if (!isEmpty(selectedPromotionIds)) {
                setSelectedPromotionIds([]);
              }
              setFilterpayment({
                LandMoney: res.LandMoney,
                BuildMoney: res.BuildMoney,
                FoundationMoney: res.FoundationMoney,
                TotalMoney: res.TotalMoney,
                ScheduleID: res.ListSchedule[0].ScheduleID,
              });
            }
          })();
        } else {
          // if(!isEmpty(priceID.toString()) && !isEmpty(dataProduct.id) && !isEmpty(scheduleId.toString()) && !isEmpty(promotions)) {
          (async function () {
            const res = await fetchPtg({
              ...filterPtg,
              productId: dataProduct.id,
              scheduleId,
              promotions,
            });
            if (!isEmpty(res)) {
              const findSchedule = res.ListSchedule.find(
                (it) => it.ScheduleID.toString() === scheduleId.toString()
              );
              if (!isEmpty(findSchedule)) {
                setPaymentName([findSchedule.ScheduleName]);
                setFilterpayment({
                  LandMoney: res.LandMoney,
                  BuildMoney: res.BuildMoney,
                  FoundationMoney: res.FoundationMoney,
                  TotalMoney: res.TotalMoney,
                  ScheduleID: findSchedule.ScheduleID,
                });
              }
              setSelectedPromotionIds(promotions);
            }
          })();
          // }
        }
      }
    }
  }, [filterPtg.priceID, scheduleId, priceID, dataProduct.id]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getPriceListByProductLandsoft(dataProduct.idls);
      if (response.responseCode === "00" && !isEmpty(response.responseData)) {
        setListPrice(response.responseData);
        setLoading(false);
      } else {
        notification({
          error: response.responseMessage,
          title: "Load phiếu tính giá"
        })
        dispatch(
          getProductPTG({
            ListPolicy: [],
            ListPromotion: [],
            ListSchedule: [],
            MaintainanceFee: null,
            LandPrice: 0,
            BuildPrice: 0,
            BuildMoney: 0,
            LandMoney: 0,
            ProductPrice: null,
            ProductQuotation: null,
            PromotionMoney: null,
            TotalMoney: null,
            TotalMoneyText: "",
            VAT: 0,
            MaintenanceFee: 0,
            PreTotalMoney: 0,
            priceId: null,
            scheduleId: "",
            TimeOfPayment: 0,
            TimeOfPaymentUnit: "",
          })
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (filterPayment.ScheduleID !== 0 && filterPayment.TotalMoney !== 0) {
        const responsePayment = await getPaymentListByScheduleId(filterPayment);
        if (responsePayment.responseCode === "00") {
          setListPaymentItem(responsePayment.responseData);
        }
      }
    })();
  }, [filterPayment]);

  useEffect(() => {
    const filterData = listPrice.filter(
      (item) => item.PriceName === priceName[0]
    );
    // console.log(filterData)
    if (!isEmpty(filterData)) {
      setFilterPriceByName({
        ApartmentPrice: filterData[0].ApartmentPrice,
        BuildPrice: filterData[0].BuildPrice,
        FoundationMoney: filterData[0].FoundationMoney,
        LandMoney: filterData[0].LandMoney,
        LandPrice: filterData[0].LandPrice,
        PriceID: filterData[0].PriceID,
        PriceName: filterData[0].PriceName,
        TotalLandPrice: filterData[0].TotalLandPrice,
        TotalMoney: filterData[0].TotalMoney,
      });
    }
  }, [priceName]);

  const handleDownloadPhieuTinhGia = () => {
    (async () => {
      setLoading(true);
      setHandleOpen(true);
      const response: any = await downloadPhieuTinhGiaAPI(dataDwnPtg);
      var binaryString = window?.atob(response);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      var blob = new Blob([bytes], { type: "application/pdf" });
      var link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = window.URL.createObjectURL(blob);
      link.click();
      setLoading(false);
      setHandleOpen(false);
    })();
  };

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  function currencyFormatTotal(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  const currencyFormatPrice = (num) => {
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleThanhtoan = () => {
    addToCart(dataProduct.id);
    localStorage.setItem("IdTCBG", JSON.stringify(priceIdSelect));
    localStorage.setItem("PaymentSelect", JSON.stringify(paymentName));
    localStorage.setItem("promotions", JSON.stringify(selectedPromotionIds));
    localStorage.setItem("scheduleId", JSON.stringify(filterPtg.scheduleId));
  };

  return (
    <WrapBodyStyped>
      <ContainerLeft>
        {dataProduct.projectTypeCode === "1" ? (
          <>
            <TitleStyled>Thông tin lô đất</TitleStyled>
            <WrapCardItem>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Dự án:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.projectName ? dataProduct?.projectName : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Loại bất động sản:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.projectType?.name
                    ? dataProduct?.projectType?.name
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Mã lô thương mại:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.lotSymbolCommercial
                    ? dataProduct?.lotSymbolCommercial
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Mã lô phê duyệt:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.lotSymbolLegal
                    ? dataProduct?.lotSymbolLegal
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Khối:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct.levelDetailParentName
                    ? dataProduct.levelDetailParentName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Phân Khu:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct.levelDetailName
                    ? dataProduct.levelDetailName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Diện tích đất:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.landArea ? dataProduct?.landArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              {dataProduct.build && <WrapItemOnCard>
                <TextLeftOnCardLeft>Diện tích xây dựng:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.buildArea ? dataProduct?.buildArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>}
              {/* <WrapItemOnCard>
                <TextLeftOnCardLeft>
                  Số tầng xây dựng thấp nhất:
                </TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.minFloor ? dataProduct?.minFloor : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>
                  Số tầng xây dựng cao nhất:
                </TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.maxFloor ? dataProduct?.maxFloor : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard> */}
            </WrapCardItem>
          </>
        ) : (
          <>
            <TitleStyled>Thông tin căn hộ</TitleStyled>
            <WrapCardItem style={{ padding: 37 }}>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Số căn hộ:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.name}
                  {/* A202 */}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Tầng:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.levelDetailName
                    ? dataProduct?.levelDetailName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Tòa:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.levelDetailParentName
                    ? dataProduct?.levelDetailParentName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Khu:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.levelDetailGrandfatherName
                    ? dataProduct?.levelDetailGrandfatherName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Diện tích thông thủy:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct.clearArea ? dataProduct.clearArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Diện tích tim tường:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct.wallArea ? dataProduct.wallArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>
            </WrapCardItem>
          </>
        )}

        <ContainerBottomLeft>
          <div>
            <TitleBottomWrap>Tiến độ thanh toán</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại tiến độ thanh toán
            </SubTitleBottomWrap>
          </div>
          <div>
            <FormControl fullWidth style={{ height: 44 }}>
              <Select
                disabled={router.pathname.includes("/payment-cart")}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                displayEmpty
                value={paymentName}
                onChange={handleChange}
                input={
                  <OutlinedInput style={{ height: 44, borderRadius: 8 }} />
                }
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>Tiến độ thanh toán</span>;
                  }

                  return selected.join(", ");
                }}
                IconComponent={(props) => <IconDropDown {...props} />}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
                SelectDisplayProps={{
                  style: {
                    paddingLeft: 20,
                  },
                }}
              >
                {!isEmpty(productItem) &&
                  !isEmpty(productItem.ListSchedule) &&
                  productItem.ListSchedule?.map((name, index) => (
                    <MenuItem
                      key={index}
                      value={name.ScheduleName}
                      // style={getStyles(name.ScheduleID, personName, theme)}
                    >
                      {name.ScheduleName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              maxHeight: 568,
              overflowY: listPaymentItem.length >= 5 ? "scroll" : "hidden",
              padding: 20,
            }}
          >
            {listPaymentItem.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  marginTop: 20,
                }}
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <TextCenterRight>Đợt {item.Number}</TextCenterRight>
                    <SubTextCenterRight>{item.Description}</SubTextCenterRight>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <TextCenterRight>
                      {currencyFormatPrice(item.Amount)}
                    </TextCenterRight>
                    <SubTextCenterRight>
                      {item.percentageString}
                    </SubTextCenterRight>
                  </div>
                </div>
                <div style={{ border: "1px solid #C7C9D9" }} />
              </div>
            ))}
          </div>
        </ContainerBottomLeft>
      </ContainerLeft>

      <ContainerRight>
        {dataProduct.projectTypeCode === "1" ? (
          <>
            <TitleStyled>Giá trị hợp đồng</TitleStyled>
            <WrapCardItem style={{ padding: 34 }}>
              <TitleSelectStyled>Chọn tiêu chuẩn bàn giao</TitleSelectStyled>
              <div>
                <FormControl fullWidth style={{ height: 44, marginBottom: 20 }}>
                  <Select
                    disabled={router.pathname.includes("/payment-cart")}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    displayEmpty
                    value={priceName}
                    onChange={handleChangePrice}
                    input={
                      <OutlinedInput style={{ height: 44, borderRadius: 8 }} />
                    }
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <span>Tiêu chuẩn bàn giao</span>;
                      }

                      return selected.join(", ");
                    }}
                    IconComponent={(props) => <IconDropDown {...props} />}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                    SelectDisplayProps={{
                      style: {
                        paddingLeft: 20,
                      },
                    }}
                  >
                    {listPrice.map((name, index) => (
                      <MenuItem
                        key={index}
                        value={name.PriceName}
                        // style={getStyles(name.ScheduleID, personName, theme)}
                      >
                        {name.PriceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <WrapItemOnCard>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    Đơn giá QSDĐ*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    {!isEmpty(productItem) && productItem.PreLandPrice ? (
                      <>
                        {" "}
                        {productItem?.PreLandPrice
                          ? currencyFormat(productItem?.PreLandPrice)
                          : "N/A"}
                      </>
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </TextOnCardRight>
                </div>
                <WrapRightCardText>
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    đồng/m²
                  </TextOnCardRight>
                </WrapRightCardText>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    Giá trị QSDĐ*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    {!isEmpty(productItem) && productItem.PreLandMoney ? (
                      <>
                        {" "}
                        {productItem?.PreLandMoney
                          ? currencyFormat(productItem?.PreLandMoney)
                          : "N/A"}
                      </>
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </TextOnCardRight>
                </div>
                <WrapRightCardText>
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    đồng
                  </TextOnCardRight>
                </WrapRightCardText>
              </WrapItemOnCard>
              {dataProduct.build ? (
                <>
                  <WrapItemOnCard>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        Đơn giá xây dựng*:
                      </TextOnCardRight>

                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        {!isEmpty(productItem) && productItem.PreBuildPrice ? (
                          <>
                            {" "}
                            {productItem?.PreBuildPrice
                              ? currencyFormat(productItem?.PreBuildPrice)
                              : "N/A"}
                          </>
                        ) : (
                          <Skeleton width={50} />
                        )}
                      </TextOnCardRight>
                    </div>
                    <WrapRightCardText>
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        đồng
                      </TextOnCardRight>
                    </WrapRightCardText>
                  </WrapItemOnCard>
                  <WrapItemOnCard>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        Giá trị xây dựng*:
                      </TextOnCardRight>

                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        {productItem.PreBuildMoney ? (
                          <>
                            {" "}
                            {productItem?.PreBuildMoney
                              ? currencyFormat(productItem?.PreBuildMoney)
                              : "N/A"}
                          </>
                        ) : (
                          <Skeleton width={50} />
                        )}
                      </TextOnCardRight>
                    </div>
                    <WrapRightCardText>
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        đồng
                      </TextOnCardRight>
                    </WrapRightCardText>
                  </WrapItemOnCard>
                </>
              ) : productItem.FoundationMoney ? (
                <>
                  <WrapItemOnCard>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        Giá trị móng*:
                      </TextOnCardRight>

                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        {!isEmpty(productItem) &&
                        productItem.FoundationMoney ? (
                          <>
                            {" "}
                            {productItem?.FoundationMoney
                              ? currencyFormat(productItem?.FoundationMoney)
                              : "N/A"}
                          </>
                        ) : productItem.FoundationMoney === 0 ? (
                          "0"
                        ) : (
                          <Skeleton width={50} />
                        )}
                      </TextOnCardRight>
                    </div>
                    <WrapRightCardText>
                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        đồng
                      </TextOnCardRight>
                    </WrapRightCardText>
                  </WrapItemOnCard>
                </>
              ) : <></>}
              <WrapItemOnCard>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Tổng giá trị hợp đồng trước chiết khấu*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {!isEmpty(productItem) && productItem.PreTotalMoney ? (
                      <>
                        {" "}
                        {productItem?.PreTotalMoney
                          ? currencyFormat(productItem?.PreTotalMoney)
                          : "N/A"}
                      </>
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </TextOnCardRight>
                </div>
                <WrapRightCardText>
                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    đồng
                  </TextOnCardRight>
                </WrapRightCardText>
              </WrapItemOnCard>

              <div style={{ marginTop: 10 }}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
                >
                  *Đã bao gồm VAT
                </Typography>
                {/* <Typography
              style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
            >
              *Đơn vị tính: vnd
            </Typography> */}
              </div>
            </WrapCardItem>
          </>
        ) : (
          <>
            <TitleStyled>Giá trị căn hộ</TitleStyled>
            <WrapCardItem style={{ padding: 34 }}>
              <TitleSelectStyled>Chọn tiêu chuẩn bàn giao</TitleSelectStyled>
              <div>
                <FormControl fullWidth style={{ height: 44, marginBottom: 20 }}>
                  <Select
                    disabled={router.pathname.includes("/payment-cart")}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    displayEmpty
                    value={priceName}
                    onChange={handleChangePrice}
                    input={
                      <OutlinedInput style={{ height: 44, borderRadius: 8 }} />
                    }
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <span>Tiêu chuẩn bàn giao</span>;
                      }

                      return selected.join(", ");
                    }}
                    IconComponent={(props) => <IconDropDown {...props} />}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                    SelectDisplayProps={{
                      style: {
                        paddingLeft: 20,
                      },
                    }}
                  >
                    {listPrice.map((name, index) => (
                      <MenuItem
                        key={index}
                        value={name.PriceName}
                        // style={getStyles(name.ScheduleID, personName, theme)}
                      >
                        {name.PriceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <WrapItemOnCard>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    Đơn giá thông thủy*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    {productItem.PreLandMoney ||
                    typeof productItem.PreLandMoney === "number" ? (
                      <>
                        {" "}
                        {productItem.PreLandMoney
                          ? currencyFormat(productItem.PreLandMoney)
                          : "0"}
                      </>
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </TextOnCardRight>
                </div>
                <WrapRightCardText>
                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    đồng/m²
                  </TextOnCardRight>
                </WrapRightCardText>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Tổng giá trị hợp đồng trước chiết khấu*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {/* {filterPriceByName.TotalMoney ? (
                      <>
                        {" "}
                        {filterPriceByName?.TotalMoney
                          ? currencyFormat(filterPriceByName?.TotalMoney) */}
                    {productItem.PreTotalMoney ? (
                      <>
                        {" "}
                        {productItem.PreTotalMoney
                          ? currencyFormat(productItem.PreTotalMoney)
                          : "N/A"}
                      </>
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </TextOnCardRight>
                </div>
                <WrapRightCardText>
                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    đồng
                  </TextOnCardRight>
                </WrapRightCardText>
              </WrapItemOnCard>
              <div style={{ marginTop: 10 }}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
                >
                  *Giá trên đã bao gồm VAT
                </Typography>

                {/* <Typography
              style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
            >
              *Đơn vị tính: vnd
            </Typography> */}
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#EA242A",
                    marginTop: 10,
                  }}
                >
                  2% kinh phí bảo trì căn hộ Bên mua thanh toán ngay khi bàn
                  giao căn hộ
                </Typography>
              </div>
            </WrapCardItem>
          </>
        )}
        <ContainerCenterRight>
          <div>
            <TitleBottomWrap>Chiết khấu</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại chiết khấu theo thứ tự ưu tiên giảm dần, giá trị giảm
              trừ
            </SubTitleBottomWrap>
          </div>
          <Typography
            sx={{
              color: "#48576D",
              fontSize: "14px",
              lineHeight: "16px",
              fontWeight: 500,
            }}
          >
            Chiết khấu tự động
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              maxHeight: 568,
              overflowY:
                productItem?.ListPromotion?.length >= 5 ? "scroll" : "hidden",
            }}
          >
            {productItem?.ListPromotion?.map((item, index) => {
              if (item?.IsPresent) {
                return (
                  <>
                    <Divider sx={{ width: "100%" }} />
                    <Typography
                      sx={{
                        color: "#48576D",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {item.PromotionName}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
                    >
                      <BpRadio
                        disabled={router.pathname.includes("/payment-cart")}
                        checked={
                          !selectedPromotionIds.includes(item.PromotionID)
                        }
                        onChange={(e, checked) => {
                          const filterArr = selectedPromotionIds.filter(
                            (it) => it !== item.PromotionID
                          );
                          if (!isEmpty(filterArr)) {
                            setSelectedPromotionIds([...filterArr]);
                            fetchPtg(
                              {
                                ...filterPtg,
                                promotions: [...filterArr],
                              },
                              true
                            );
                          } else {
                            setSelectedPromotionIds([]);
                            fetchPtg({ ...filterPtg, promotions: [] }, true);
                          }
                        }}
                      />
                      <TextPriceName>1. Nhận hiện vật</TextPriceName>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
                    >
                      <BpRadio
                        checked={selectedPromotionIds.includes(
                          item.PromotionID
                        )}
                        disabled={router.pathname.includes("/payment-cart")}
                        onChange={(e, checked) => {
                          setSelectedPromotionIds([
                            ...selectedPromotionIds,
                            item.PromotionID,
                          ]);
                          fetchPtg(
                            {
                              ...filterPtg,
                              promotions: [
                                ...selectedPromotionIds,
                                item.PromotionID,
                              ],
                            },
                            true
                          );
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <TextPriceName>2. Trừ giá trị hợp đồng</TextPriceName>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <NumberPrice>
                            -{currencyFormat(item?.Value)}đ
                          </NumberPrice>
                        </div>
                      </Box>
                    </Box>
                  </>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                  key={index}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    <Checkbox
                      checked={true}
                      disabled
                      sx={{
                        color: "#0063F7",
                        "&.Mui-checked": {
                          color: "#0063F7",
                          opacity: 0.4,
                        },
                        width: 24,
                        height: 24,
                      }}
                    />
                    <div
                      style={{
                        maxWidth: 300,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextPriceName>{item?.PromotionName}</TextPriceName>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <NumberPrice>-{currencyFormat(item?.Amount)}đ</NumberPrice>
                  </div>
                </div>
              );
            })}
          </div>
        </ContainerCenterRight>
        <ContainerCenterRight style={{ padding: 38, gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                {/* {dataProduct.buildType === "1"
                  ? "Tổng giá bán nhà ở"
                  : "Giá sau chiết khấu"} */}
                Giá sau chiết khấu
              </TextBoldInWrapBottom>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginTop: 3,
                }}
              >
                Đã bao gồm VAT
              </Typography>
            </div>
            <TextCenterRight
              style={{ fontSize: 18, margin: "auto", marginRight: 0 }}
            >
              {currencyFormatTotal(productItem?.TotalMoney)} đồng
            </TextCenterRight>
          </div>
          <div style={{ border: "1px solid #C7C9D9" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextBoldInWrapBottom style={{ fontSize: 18, maxWidth: "200px" }}>
                Tổng giá trị hợp đồng sau chiết khấu
              </TextBoldInWrapBottom>
              <Typography
                style={{ fontSize: 18, fontWeight: 700, color: "#EA242A" }}
              >
                {currencyFormatTotal(productItem?.TotalMoney)} đồng
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Bằng chữ:
              </TextBoldInWrapBottom>
              <Typography
                style={{
                  width: "40%",
                  textAlign: "right",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#EA242A",
                }}
              >
                {productItem?.TotalMoneyText}
              </Typography>
            </div>
          </div>
          <ButtonStyled
            style={{
              background: "#ffffff",
              border: "1px solid #FF3B3B",
              marginBottom: 8,
            }}
            onClick={handleDownloadPhieuTinhGia}
          >
            <IconDownloadPTG fill="#FF3B3B" />
            <Typography
              style={{ fontSize: 16, fontWeight: 400, color: "#FF3B3B" }}
            >
              Tải phiếu tính giá
            </Typography>
          </ButtonStyled>
          {router.pathname.includes("/products/") && (
            <ButtonStyled
              disabled={dataProduct?.paymentStatus !== 2}
              style={{
                backgroundColor:
                  dataProduct?.paymentStatus !== 2 ? "#FFFF" : "",
              }}
              onClick={handleThanhtoan}
            >
              Thanh Toán
            </ButtonStyled>
          )}
        </ContainerCenterRight>
      </ContainerRight>
    </WrapBodyStyped>
  );
};
export default PhieuTinhGia;
