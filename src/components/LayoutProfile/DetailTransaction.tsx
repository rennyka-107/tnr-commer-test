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
	  id: "liquidation",
	  name: "Thanh lý",
	},
	{
	  id: "deposit-refund",
	  name: "Hoàn cọc",
	},
	{
	  id: "transfer",
	  name: "Chuyển nhượng",
	},
	{
	  id: "change-apartment",
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
	id: RequestType;
	name: string;
  }
  
const rows = [createData("Frozen", 159, 6.0, 24, 4.0)];

const DetailTransaction = ({ setActiveTab }: Props) => {
  const router = useRouter();
  const { transCode, transactionId, uuid, productId } = router.query;
  const [data, setData] = useState<any[any]>([]);
  const [displayCustomerDetail, setDisplayCustomerDetail] = useState<any>(
    fakeCustomers[0]
  );
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
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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
    const dataFind = sendRequestTypes.filter((x) => x.name === e.target.value);
    setRequestType(dataFind[0] as RequestParams);
	router.replace(`/send-request/${dataFind[0].id}/${transCode}`);
  };

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
    return (
      <>
        {isEmpty(data) ? (
          <div style={{alignItems: 'center', display: 'flex', marginTop: 50}}>
            <LoadingComponent />
          </div>
        ) : (
          <div style={{ padding: 60 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
              <ImageWithHideOnError
                className="logo"
                src={!isEmpty(data.productionImage) ? data.productionImage : Product3}
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
                  <TitleNameProject style={{ color: "#1B3459" }}>
                    {data?.production.levelDetailParentName
                      ? data?.production.levelDetailParentName
                      : "N/A"}
                  </TitleNameProject>
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
                      Phòng ngủ
                    </TextLeftTop>
                    <TextLeftTop style={{ color: "#1B3459" }}>
                      Phòng tắm
                    </TextLeftTop>
                    <TextLeftTop style={{ color: "#1B3459" }}>
                      Hướng
                    </TextLeftTop>
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
                      {data.production.numBed ? data.production.numBed : "N/A"}
                    </TextRightTop>
                    <TextRightTop>
                      {data.production.numBath
                        ? data.production.numBath
                        : "N/A"}
                    </TextRightTop>
                    <TextRightTop>
                      {data.production.doorDirection
                        ? data.production.doorDirection
                        : "N/A"}
                    </TextRightTop>
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
                  <TextLeftTop>Mã đặt chỗ</TextLeftTop>
                  <TextLeftTop>Thời gian đặt chỗ</TextLeftTop>
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
                  <TextRightTop>{data.billNumber}</TextRightTop>
                  <TextRightTop>
                    {convertDateToString(
                      getDateFromStringDMY(data.createdAt) ?? new Date()
                    )}
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
                        onClick={() =>
                          router.push(
                            `/payment-cart?transactionCode=${transCode}`
                          )
                        }
                      >
                        Hoàn Thiện hồ sơ
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
                    {data.quotationRealt.landPrice
                      ? `${currencyFormat(data.quotationRealt.landPrice)} đ`
                      : "N/A"}
                  </TextRightTop>
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
                    {data.quotationRealt.totalPrice
                      ? `${currencyFormat(data.quotationRealt.totalPrice)} đ`
                      : "N/A"}
                  </TextRightTop>
                  <TextRightTop>
                    {data.quotationRealt.nppDiscount
                      ? `${currencyFormat(data.quotationRealt.nppDiscount)} đ`
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
                    {/* {data.map((row) => ( */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {data.billNumber}
                      </TableCell>
                      <TableCell align="right"> {data.createdAt}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {currencyFormat(data.deposite)} đ
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        N/A
                        {/* {data.paymentMethod.name} */}
                      </TableCell>
                      <TableCell align="right">
                        {data.paymentStatusString}
                      </TableCell>
                    </TableRow>
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

  useEffect(() => {
    fecthComponent();
  }, [data]);

  return (
    <BoxContainer
      HeaderCustom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
		<HeaderContainer>
          <IconBackTransation
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("contract")}
          />
          <HeaderTitle>Chi tiết giao dịch</HeaderTitle>
		
        </HeaderContainer>
		  <SelectInputTwo
		  data={sendRequestTypes}
		  value={requestType ? [requestType.name] : []}
		  onChange={handleChangeRequestType}
		  placeholder="Gửi yêu cầu"
		  style={{ margin: 0 }}
		/>
		</div>
      }
      styleCustom={{ padding: "21px 24px" }}
    >
      {/* {item?.avatar ? (
          <ImageProduct
            loader={({ src, width, quality }) => {
              return `${src}?w=${width}&q=${quality}`;
            }}
            src={
              item?.avatar ??
              "https://tse3.mm.bing.net/th?id=OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5&pid=Api&P=0&w=277&h=183"
            }
            width={159}
            height={96}
            alt=""
          />
        ) : ( */}

      {/* )} */}
      {fecthComponent()}
    </BoxContainer>
  );
};

export default DetailTransaction;
