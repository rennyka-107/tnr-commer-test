import BoxContainer from "@components/CustomComponent/BoxContainer";
import { IconBackTransation, IconSuccess } from "@components/Icons";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import IconError from "@components/Icons/IconError";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ContractI, getOrderById, getOrderDetail } from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormatFns from "utils/DateFns";
import { dayOfWeekToString, getDateFromStringDMY } from "utils/helper";
import Product3 from "../../../public/images/product3.png";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import SelectInputTwo from "@components/CustomComponent/SelectInputComponent/SelectInputTwo";
import SelectInputWithId from "@components/CustomComponent/SelectInputComponent/SelectInputWithId";
import DialogFinishProfileTransaction from "./DialogFinishProfileTransaction";
import { format, parse } from "date-fns";
type Props = {
  //   item: ContractI;
  setActiveTab: (d: any) => void;
};
const HeaderContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ImageProduct = styled(Image)`
  border-radius: 8px;
`;

const HeaderTitle = styled.span`
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
`;

const TitleNameProject = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8190a7;
`;
const TitleProductProject = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #1b3459;
`;
const TextLeftTop = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8190a7;
`;
const TextRightTop = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #1b3459;
`;
const TitleCenterStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
`;

const TextBottomTable = styled.span`
  background: #ffffff;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;
const TextProduct = styled.span<{ color?: string }>`
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.41px;
  color: ${({ color }) => color};
  display: inline-flex;
  align-items: center;
`;

const fakeCustomers = [
  {
    name: "Nguyễn Văn A",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456781",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839481",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: true,
  },
  {
    name: "Nguyễn Văn B",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456782",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839482",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: false,
  },
  {
    name: "Nguyễn Văn C",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456783",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839483",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: false,
  },
  {
    name: "Nguyễn Văn D",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456784",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839484",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: false,
  },
  {
    name: "Nguyễn Văn C",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456785",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839485",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: null,
  },
  {
    name: "Nguyễn Văn C",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456786",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839486",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: null,
  },
  {
    name: "Nguyễn Văn C",
    dob: "01/11/1995",
    address: "Số 2 Phố A, Phường B, Quận C, Phố D",
    contactAddress: "Số 2 Phố A, Phường B, Quận C, Phố D",
    phone: "0123456787",
    email: "nguyenvana@gmail.com",
    idNumber: "024934839487",
    issueDate: "23/1/2021",
    issuePlace: "Công an huyện ....",
    verify: null,
  },
];
type RequestType =
  | "liquidation"
  | "deposit-refund"
  | "transfer"
  | "change-apartment";

const sendRequestTypes = [
  {
    id: 0,
    code: "liquidation",
    name: "Thanh lý",
  },
  {
    id: 1,
    code: "deposit-refund",
    name: "Hoàn cọc",
  },
  {
    id: 3,
    code: "transfer",
    name: "Chuyển nhượng",
  },
  {
    id: 2,
    code: "change-apartment",
    name: "Đổi lô / đổi căn",
  },
];

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}
interface RequestParams {
  code: RequestType;
  name: string;
  id: number;
}

const rows = [createData("Frozen", 159, 6.0, 24, 4.0)];

interface PaymentRequestType {
  id: string;
  name: string;
}

const DetailTransaction = ({ setActiveTab }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const {
    transCode,
    transactionId,
    uuid,
    productId,
    transactionCodeLandSoft,
    transactionTypeName,
    bookingTime,
  } = router.query;
  const [data, setData] = useState<any[any]>([]);
  const [displayCustomerDetail, setDisplayCustomerDetail] = useState<any>(
    fakeCustomers[0]
  );
  const [paymentRequestTypeRes, setPaymentRequestTypeRes] = useState<
    PaymentRequestType[]
  >([]);
  const [requestType, setRequestType] = useState<RequestParams | null>(null);
  const fetchById = async (body: any) => {
    try {
      const response = await getOrderDetail(body);
      setData(response.responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!data) return;

    const paymentRequestList = data?.paymentRequestTypeResponseList?.map(
      (paymentRequest) => ({
        id: `${paymentRequest.requestId}`,
        name: paymentRequest.requestType,
      })
    );

    setPaymentRequestTypeRes(paymentRequestList);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setDisplayCustomerDetail(data.paymentIdentityInfos[0]);
    }
  }, [data]);

  useEffect(() => {
    const body = {
      transactionCode: transCode,
      transactionId: Number(transactionId),
      uuid: uuid !== "null" ? uuid : null,
      productId: productId,
    };
    fetchById(body);
  }, [router]);

  const convertDateToString = (date: Date) => {
    const house = FormatFns.format(date, "HH:mm");
    const day = FormatFns.format(date, "dd/MM/yyyy");
    const dateOfWeek = date.getDay();
    return house + " | " + dayOfWeekToString(dateOfWeek) + "," + day;
  };

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function checkVerifyCustomer({ verify }: any) {
    switch (verify) {
      case true:
        return <IconSuccess style={{ width: "24px", height: "24px" }} />;
      case false:
        return <IconError style={{ width: "24px", height: "24px" }} />;
      case null:
        return <MoreHorizIcon />;
    }
  }

  const handleChangeRequestType = (e: SelectChangeEvent) => {
    const data = sendRequestTypes.filter(
      (x) => x.id.toString() === e.target.value
    );
    setRequestType(data[0] as RequestParams);

    if (data.length > 0) {
      router.replace(`/send-request/${data[0].code}/${transCode}`);
    }
  };

  function convertTimeValue(time: string) {
    try {
      return format(
        parse(time, "dd-MM-yyyy HH:mm:ss", new Date()),
        "HH:mm | dd/MM/yyyy"
      );
    } catch (err) {
      return format(
        parse(time, "dd-MM-yyyy", new Date()),
        "HH:mm | dd/MM/yyyy"
      );
    }
  }

  function customerTab(customer: any) {
    return (
      <Box
        sx={{
          width: "auto",
          background:
            displayCustomerDetail.idNumber === customer.idNumber
              ? "#FEC83C"
              : "#F3F4F6",
          borderRadius: "8px",
          p: "12px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          cursor: "pointer",
          gap: 2,
        }}
        onClick={() =>
          setDisplayCustomerDetail(
            data.paymentIdentityInfos.find(
              (cus) => cus.idNumber === customer.idNumber
            )
          )
        }
      >
        {checkVerifyCustomer(customer)}
        <Typography
          style={{
            fontSize: 16,
            fontWeight: 500,
            color:
              displayCustomerDetail.idNumber === customer.idNumber
                ? "#0E1D34"
                : " #8190A7",
          }}
        >
          {" "}
          {customer.fullname}
        </Typography>
      </Box>
      //   <></>
    );
  }
  function renderRowDetail(title: string, description: string) {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#8190A7",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#1B3459",
          }}
        >
          {description}
        </Typography>
      </Box>
    );
  }
  console.log("transactionCodeLandSoft", transactionCodeLandSoft, transCode);

  function renderDetailCustomer() {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", mb: 2 }}
        style={{ gap: 10 }}
      >
        {renderRowDetail("Tên khách hàng", displayCustomerDetail.fullname)}
        {renderRowDetail("Số CDMND", displayCustomerDetail.idNumber)}
        {renderRowDetail("Điện thoại", displayCustomerDetail.phoneNumber)}
      </Box>
    );
  }
  const fecthComponent = () => {
    console.log("datadatadata", data);

    return (
      <>
        {isEmpty(data) ? (
          <div style={{ alignItems: "center", display: "flex", marginTop: 50 }}>
            <LoadingComponent />
          </div>
        ) : (
          <div style={{ padding: 60 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
              <ImageWithHideOnError
                className="logo"
                src={
                  !isEmpty(data.productionImage)
                    ? data.productionImage
                    : Product3
                }
                fallbackSrc={Product3}
                height={199}
                width={350}
                title={"Logo "}
                alt={"Logo "}
                priority
                style={{ borderRadius: 8 }}
                unoptimized={true}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  width: 255,
                }}
              >
                <TitleNameProject>
                  {data?.production.projectName
                    ? data?.production.projectName
                    : "N/A"}
                </TitleNameProject>
                <TitleNameProject
                  style={{
                    color: "#1B3459",
                    fontWeight: 500,
                    fontSize: 24,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {data?.production.name ? data?.production.name : "N/A"}
                </TitleNameProject>
                <div style={{ display: "flex", gap: 13 }}>
                  {data?.production.projectTypeCode === "2" && (
                    <TitleNameProject style={{ color: "#1B3459" }}>
                      {data?.production.levelDetailParentName
                        ? data?.production.levelDetailParentName
                        : "N/A"}
                    </TitleNameProject>
                  )}
                  <TitleNameProject style={{ color: "#1B3459" }}>
                    {data?.production.levelDetailName
                      ? data?.production.levelDetailName
                      : "N/A"}
                  </TitleNameProject>
                </div>

                <div style={{ border: "1px solid #C7C9D9" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <TextLeftTop style={{ color: "#1B3459" }}>
                      Diện tích
                    </TextLeftTop>
                    <TextLeftTop style={{ color: "#1B3459" }}>
                      {data.production.projectTypeCode === "2"
                        ? "Phòng ngủ"
                        : "Hướng"}
                    </TextLeftTop>
                    <TextLeftTop style={{ color: "#1B3459" }}>
                      {data.production.projectTypeCode === "2"
                        ? "Phòng vệ sinh"
                        : "Phân loại"}
                    </TextLeftTop>
                    {(data.production.projectTypeCode === "2" ||
                      (data.production.projectTypeCode === "1" &&
                        data.production.build)) && (
                      <TextLeftTop style={{ color: "#1B3459" }}>
                        {data.production.projectTypeCode === "2"
                          ? "Hướng"
                          : "Tầng cao"}
                      </TextLeftTop>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      textAlign: "right",
                    }}
                  >
                    <TextRightTop>
                      {data.production.landArea
                        ? data.production.landArea
                        : "N/A"}
                    </TextRightTop>
                    <TextRightTop>
                      {data.production.projectTypeCode === "2"
                        ? data.production.numBed
                          ? data.production.numBed
                          : "N/A"
                        : data.production.doorDirection
                        ? data.production.doorDirection
                        : "N/A"}
                    </TextRightTop>
                    <TextRightTop>
                      {data.production.projectTypeCode === "2"
                        ? data.production.numBath
                          ? data.production.numBath
                          : "N/A"
                        : data.production.build
                        ? "Có xây"
                        : "Chưa xây"}
                    </TextRightTop>
                    {(data.production.projectTypeCode === "2" ||
                      (data.production.projectTypeCode === "1" &&
                        data.production.build)) && (
                      <TextRightTop>
                        {data.production.projectTypeCode === "2"
                          ? data.production.doorDirection
                            ? data.production.doorDirection
                            : "N/A"
                          : data.production.floorHeight
                          ? data.production.floorHeight
                          : "N/A"}
                      </TextRightTop>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 27 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Thông tin đặt cọc
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Mã giao dịch</TextLeftTop>
                  <TextLeftTop>Loại hợp đồng</TextLeftTop>
                  <TextLeftTop>Thời gian giao dịch</TextLeftTop>
                  <TextLeftTop>Tình trạng đặt chỗ</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                    alignItems: "end",
                  }}
                >
                  <TextRightTop>
                    {transactionCodeLandSoft || transCode || data.billNumber}
                  </TextRightTop>
                  <TextRightTop>{transactionTypeName}</TextRightTop>
                  <TextRightTop>
                    {bookingTime
                      ? convertTimeValue(bookingTime as string)
                      : "N/A"}
                  </TextRightTop>
                  {data.paymentStatus === 0 ? (
                    <>
                      <TextLeftTop
                        style={{ color: "#EA242A", fontWeight: 700 }}
                      >
                        {data.paymentStatusString}
                      </TextLeftTop>
                      <Button
                        style={{
                          height: 48,
                          width: 186,
                          background: "#FEC83C",
                          textTransform: "none",
                          color: "#0E1D34",
                          fontSize: 16,
                          fontWeight: 500,
                          borderRadius: 8,
                        }}
                        onClick={
                          () => setOpen(true)
                          // router.push(
                          //   `/payment-cart?transactionCode=${transCode}`
                          // )
                        }
                      >
                        Hoàn thiện hồ sơ
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextProduct
                        color={
                          data?.paymentStatus === 12 ||
                          data?.paymentStatus === 14 ||
                          data?.paymentStatus === 16 ||
                          data?.paymentStatus === 18 ||
                          data?.paymentStatus === 19 ||
                          data?.paymentStatus === 20 ||
                          data?.paymentStatus === 21
                            ? "#06C270"
                            : "#FF3B3B"
                        }
                      >
                        {data?.paymentStatusString}
                      </TextProduct>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 60,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              ></Box>
              <TitleCenterStyled style={{ marginBottom: 12 }}>
                Thông tin khách hàng
              </TitleCenterStyled>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                {data.paymentIdentityInfos.map((item, idx) => (
                  <React.Fragment key={idx}>{customerTab(item)}</React.Fragment>
                ))}
              </div>
              <div>{renderDetailCustomer()}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Báo giá
              </TitleCenterStyled>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Giá BĐS</TextLeftTop>
                  <TextLeftTop>Thuế VAT</TextLeftTop>
                  <TextLeftTop>Phí bảo trì</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextRightTop>
                    {data.quotationRealt.vat
                      ? `${currencyFormat(data.quotationRealt.vat)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.quotationRealt.maintainPrice
                      ? `${currencyFormat(data.quotationRealt.maintainPrice)} đ`
                      : "N/A"}
                  </TextRightTop>
                </div>
              </div> */}
            </div>
            {/* <div
              style={{
                border: "1px solid #C7C9D9",
                marginTop: 20,
                marginBottom: 20,
              }}
            /> */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Giá BĐS</TextLeftTop>
                  <TextLeftTop>Tổng tiền niêm yết</TextLeftTop>
                  <TextLeftTop>Giảm giá</TextLeftTop>
                  <TextLeftTop>Tổng tiền mua online</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextRightTop>
                    {data.quotationRealt.landPrice
                      ? `${currencyFormat(data.quotationRealt.landPrice)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.quotationRealt.totalPrice
                      ? `${currencyFormat(data.quotationRealt.totalPrice)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.promotionMoney !== null
                      ? `${currencyFormat(data.promotionMoney)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop style={{ color: "#EA242A", fontWeight: 500 }}>
                    {data.quotationRealt.totalOnlinePrice
                      ? `${currencyFormat(
                          data.quotationRealt.totalOnlinePrice
                        )} đ`
                      : "N/A"}
                  </TextRightTop>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #C7C9D9",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Tiền đặt chỗ tối thiểu</TextLeftTop>
                  <TextLeftTop>Tiền đặt cọc quy định</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextRightTop style={{ fontWeight: 500 }}>
                    {data.quotationRealt.minEarnestMoney
                      ? `${currencyFormat(
                          data.quotationRealt.minEarnestMoney
                        )} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop style={{ fontWeight: 500 }}>
                    {data.quotationRealt.regulationOrderPrice
                      ? `${currencyFormat(
                          data.quotationRealt.regulationOrderPrice
                        )} đ`
                      : "N/A"}
                  </TextRightTop>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 27 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Chi tiết thanh toán
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Đã đặt cọc</TextLeftTop>
                  <TextLeftTop>Đã thanh toán</TextLeftTop>
                  <TextLeftTop>Còn lại</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextRightTop>
                    {data.totalDeposite
                      ? `${currencyFormat(data.totalDeposite)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.deposite
                      ? `${currencyFormat(data.deposite)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.amountLeft
                      ? `${currencyFormat(data.amountLeft)} đ`
                      : "N/A"}{" "}
                  </TextRightTop>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                background: "#F3F4F6",
                gap: 10,

                marginTop: 25,
              }}
            >
              <TableContainer component={Paper}>
                <Table
                  style={{ width: "auto", borderRadius: 8 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã TT</TableCell>
                      <TableCell align="right">Ngày TT</TableCell>
                      <TableCell align="right">Số tiền</TableCell>
                      <TableCell align="right">Hình thức</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!isEmpty(data?.paymentHistoryList) ? (
                      data?.paymentHistoryList.map((item, idx) => (
                        <TableRow key={item.PaymentHistoryId + "unique" + idx}>
                          <TableCell component="th" scope="row">
                            {item.PaymentHistoryId}
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            {item.PaymentDate}
                          </TableCell>
                          <TableCell align="right">
                            {item.PaymentAmout
                              ? currencyFormat(item.PaymentAmout)
                              : 0}{" "}
                            đ
                          </TableCell>
                          <TableCell align="right">
                            {item.PaymentMethod ?? "N/A"}
                          </TableCell>
                          <TableCell align="right">
                            {item.PaymentStatus}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <></>
                    )}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <BoxContainer
      HeaderCustom={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <HeaderContainer>
            <IconBackTransation
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("contract")}
            />
            <HeaderTitle>Chi tiết giao dịch</HeaderTitle>
          </HeaderContainer>
          <SelectInputWithId
            data={paymentRequestTypeRes}
            value={requestType ? [requestType.name] : []}
            onChange={handleChangeRequestType}
            placeholder="Gửi yêu cầu"
            style={{ margin: 0 }}
            disabled={paymentRequestTypeRes?.length === 0}
          />
        </div>
      }
      styleCustom={{ padding: "21px 24px" }}
    >
      {fecthComponent()}
      <DialogFinishProfileTransaction
        open={open}
        onClose={() => setOpen(false)}
        transactionCode={transCode as string}
      />
    </BoxContainer>
  );
};

export default DetailTransaction;
