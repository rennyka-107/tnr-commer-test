import React, { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Button, Skeleton, Typography } from "@mui/material";

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

interface Price {
  ApartmentPrice: string;
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
  ScheduleID: number;
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  color: #1b3459;
  text-align: right;
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

const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

const PhieuTinhGia = ({
  dataProduct,
  setDataDownloadPtg,
}: PhieuTinhGiaProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
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
  const getDateNew = moment(new Date()).format("DD-mm-yyyy");
  const [dataDwnPtg, setDataDwnPtg] = React.useState({
    ProjectId: 0,
    ProductId: 0,
    DepositDate: "",
    PriceID: 0,
    ScheduleID: 0,
  });

  const [filterPtg, setFilterPtg] = React.useState({
    projectId: 0,
    productId: 0,
    depositDate: "",
    isMortgage: true,
    groupCusID: 0,
    provinceID: 0,
    priceID: 0,
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
    ScheduleID: 0,
    LandMoney: 0,
    BuildMoney: 0,
    FoundationMoney: 0,
    TotalMoney: 0,
  });

  const [listPrice, setListPrice] = React.useState([]);
  
  const handleChange = (event: SelectChangeEvent<typeof paymentName>) => {
    const {
      target: { value },
    } = event;
    setPaymentName(typeof value === "string" ? value.split(",") : value);
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
      setPriceIdSelect(listPrice[0].PriceID);
    }
  }, [listPrice]);

  useEffect(() => {
    if (!isEmpty(listPrice)) {
      setFilterPtg({
        projectId: Number(dataProduct.project.idls),
        productId: Number(dataProduct.idls),
        depositDate: getDateNew,
        isMortgage: true,
        groupCusID: 0,
        provinceID: 0,
        priceID: priceIdSelect,
      });
    }
  }, [listPrice, priceIdSelect]);

  useEffect(() => {
    const filterSchedule = productItem.ListSchedule.filter(
      (sch) => sch.ScheduleName === paymentName[0]
    );
    if (!isEmpty(filterSchedule)) {
      setDataDownloadPtg({
        ProjectId: Number(dataProduct.project.idls),
        ProductId: Number(dataProduct.idls),
        DepositDate: getDateNew,
        PriceID: priceIdSelect,
        ScheduleID: filterSchedule[0].ScheduleID,
      });
      setDataDwnPtg({
        ProjectId: Number(dataProduct.project.idls),
        ProductId: Number(dataProduct.idls),
        DepositDate: getDateNew,
        PriceID: priceIdSelect,
        ScheduleID: filterSchedule[0].ScheduleID,
      });
    }
  }, [productItem, paymentName]);

  useEffect(() => {
    {
      (async () => {
        try {
          if (filterPtg.projectId !== 0 && filterPtg.priceID !== 0) {
            const response = await getProductPtgApi(filterPtg);
            dispatch(getProductPTG(response.responseData));
            setPaymentName([
              response.responseData.ListSchedule[0].ScheduleName,
            ]);
            setFilterpayment({
              LandMoney: response.responseData.LandMoney,
              BuildMoney: response.responseData.BuildMoney,
              FoundationMoney: response.responseData.FoundationMoney,
              TotalMoney: response.responseData.TotalMoney,
              ScheduleID: response.responseData.ListSchedule[0].ScheduleID,
            });
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [filterPtg, dispatch]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getPriceListByProductLandsoft(dataProduct.idls);
      if (response.responseCode === "00" && !isEmpty(response.responseData)) {
        setListPrice(response.responseData);
        setPriceName([response.responseData[0].PriceName]);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (filterPayment.ScheduleID !== 0) {
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

  useEffect(() => {
    const filterPaymentSche = productItem.ListSchedule.filter(
      (item) => item.ScheduleName === paymentName[0]
    );
    if (!isEmpty(filterPaymentSche)) {
      setFilterpayment({
        ...filterPayment,
        ScheduleID: filterPaymentSche[0].ScheduleID,
      });
    }
  }, [paymentName]);

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
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleThanhtoan = () => {
	addToCart(dataProduct.id)
	localStorage.setItem("IdTCBG",JSON.stringify(priceIdSelect))
	localStorage.setItem("PaymentSelect",JSON.stringify(paymentName))
  }


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
                  {dataProduct?.projectName}
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
                  {dataProduct?.lotSymbolLegal}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Khối:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct.levelDetailParentName}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Phân Khu:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct.levelDetailName}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Diện tích đất:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.landArea ? dataProduct?.landArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeft>Diện tích xây dựng:</TextLeftOnCardLeft>
                <TextRightOnCardLeft>
                  {dataProduct?.buildArea ? dataProduct?.buildArea : "N/A"} m2
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
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
              </WrapItemOnCard>
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
                  {dataProduct?.floorNum ? dataProduct?.floorNum : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Tòa:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.levelDetailName
                    ? dataProduct?.levelDetailName
                    : "N/A"}
                </TextRightOnCardLeft>
              </WrapItemOnCard>
              <WrapItemOnCard>
                <TextLeftOnCardLeftTypeCaoTang1>
                  Khu:
                </TextLeftOnCardLeftTypeCaoTang1>
                <TextRightOnCardLeft>
                  {dataProduct?.levelDetailParentName
                    ? dataProduct?.levelDetailParentName
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
                  Diện tích tìm tường:
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
            <TitleBottomWrap>Chiết khấu</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại chiết khấu theo thứ tự ưu tiên giảm dần, giá trị giảm
              trừ
            </SubTitleBottomWrap>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              maxHeight: 535,
              overflowY:
                productItem?.ListPromotion?.length >= 5 ? "scroll" : "hidden",
            }}
          >
            {productItem?.ListPromotion?.map((item, index) => (
              <div
                style={{
                  border: "1px solid #D8D8D8",
                  borderRadius: "20px",
                  display: "flex",
                  gap: 28,
                  padding: "18px 22px 18px 21px",
                }}
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "50%",
                  }}
                >
                  <TextBoldInWrapBottom>
                    {item.PromotionName}
                  </TextBoldInWrapBottom>
                  <TextInWrapBottom>
                    Tỉ lệ chiết khấu: {item.Value}&nbsp;%
                  </TextInWrapBottom>
                </div>
                <div style={{ border: "1px solid #E7E9EC" }} />
                <div style={{ margin: "auto" }}>
                  <TextBoldInWrapBottom>
                    - {currencyFormat(item.Amount)}
                  </TextBoldInWrapBottom>
                </div>
              </div>
            ))}
          </div>
        </ContainerBottomLeft>
      </ContainerLeft>

      <ContainerRight>
        {dataProduct.projectTypeCode === "1" ? (
          <>
            <TitleStyled>Giá trị nhà ở</TitleStyled>
            <WrapCardItem style={{ padding: 34 }}>
              <TitleSelectStyled>Chọn tiêu chuẩn bàn giao</TitleSelectStyled>
              <div>
                <FormControl fullWidth style={{ height: 44, marginBottom: 20 }}>
                  <Select
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
                    {productItem.LandPrice ? (
                      <>
                        {" "}
                        {productItem?.LandPrice
                          ? currencyFormat(productItem?.LandPrice)
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
                    Tổng giá trị QSDĐ*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    {productItem.LandMoney ? (
                      <>
                        {" "}
                        {productItem?.LandMoney
                          ? currencyFormat(productItem?.LandMoney)
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
                        {productItem.BuildPrice ? (
                          <>
                            {" "}
                            {productItem?.BuildPrice
                              ? currencyFormat(productItem?.BuildPrice)
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
                        Tổng giá trị xây dựng*:
                      </TextOnCardRight>

                      <TextOnCardRight
                        style={{
                          color: "#1b3459",
                          fontWeight: 400,
                        }}
                      >
                        {productItem.BuildMoney ? (
                          <>
                            {" "}
                            {productItem?.BuildMoney
                              ? currencyFormat(productItem?.BuildMoney)
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
              ) : (
                <></>
              )}
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
                    Tổng giá bán nhà ở*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {productItem.TotalMoney ? (
                      <>
                        {" "}
                        {productItem?.TotalMoney
                          ? currencyFormat(productItem?.TotalMoney)
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
                    Giá trị thông thủy*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "#1b3459",
                      fontWeight: 400,
                    }}
                  >
                    {filterPriceByName.ApartmentPrice ? (
                      <>
                        {" "}
                        {filterPriceByName?.ApartmentPrice
                          ? filterPriceByName?.ApartmentPrice
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
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Tổng giá bán căn hộ*:
                  </TextOnCardRight>

                  <TextOnCardRight
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {filterPriceByName.TotalMoney ? (
                      <>
                        {" "}
                        {filterPriceByName?.TotalMoney
                          ? filterPriceByName?.TotalMoney
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
            <TitleBottomWrap>Tiến độ thanh toán</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại tiến độ thanh toán
            </SubTitleBottomWrap>
          </div>
          <div>
            <FormControl fullWidth style={{ height: 44 }}>
              <Select
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
                {productItem.ListSchedule?.map((name, index) => (
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
              maxHeight: 535,
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
                      {currencyFormat(item.Amount)}
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
        </ContainerCenterRight>
        <ContainerCenterRight style={{ padding: 38, gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Giá niêm yết
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
              {currencyFormat(productItem?.ProductQuotation)} vnd
            </TextCenterRight>
          </div>
          <div style={{ border: "1px solid #C7C9D9" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Giá sau chiết khấu
              </TextBoldInWrapBottom>
              <Typography
                style={{ fontSize: 18, fontWeight: 700, color: "#EA242A" }}
              >
                {currencyFormat(productItem?.TotalMoney)} vnd
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
            style={{ background: "#ffffff", border: "1px solid #FCB715" }}
            onClick={handleDownloadPhieuTinhGia}
          >
            <IconDownloadPTG />
            <Typography
              style={{ fontSize: 16, fontWeight: 400, color: "#FCB715" }}
            >
              Tải phiếu tính giá
            </Typography>
          </ButtonStyled>
          <ButtonStyled
            onClick={handleThanhtoan}
          >
            Thanh Toán
          </ButtonStyled>
        </ContainerCenterRight>
      </ContainerRight>
    </WrapBodyStyped>
  );
};
export default PhieuTinhGia;
