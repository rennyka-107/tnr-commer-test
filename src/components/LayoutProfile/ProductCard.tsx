import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import CustomButton from "@components/CustomComponent/CustomButton";
import Row from "@components/CustomComponent/Row";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import TNRButton from "@components/Element/TNRButton";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import IconWatingCircle from "@components/Icons/IconWatingCircle";
import styled from "@emotion/styled";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContractI, getOrderById } from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import useNotification from "hooks/useNotification";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormatFns from "utils/DateFns";
import { dayOfWeekToString, getDateFromStringDMY } from "utils/helper";
import Product3 from "../../../public/images/product3.png";
import { setOrderDetail } from "../../../store/sendRequestSlice";

const DynamicHorizontalLine = dynamic(() =>
  import("@components/CustomComponent/HorizontalLine").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ImageProduct = styled(Image)`
  border-radius: 8px;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentProduct = styled.div`
  padding-left: 31px;
  width: 582px;
`;

const Title = styled(Typography)`
  color: #8190a7;
  font-family: Roboto;
  font-style: normal;
`;

const TitleProject = styled(Title)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16.41px;
`;

const TitleTime = styled(Title)`
  font-weight: 400;
  font-size: 12px;
  line-height: 14.84px;
`;

const TitleProduct = styled(Title)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  color: #0e1d34;
`;

const CodeProduct = styled.span`
  color: #0e1d34;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  margin-bottom: 20px;
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

interface Props {
  item: ContractI;
  isLast?: boolean;
}

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

interface RequestParams {
  id: RequestType;
  name: string;
}

const ProductCard = (props: Props) => {
  const { item, isLast } = props;
  const router = useRouter();
  const [requestType, setRequestType] = useState<RequestParams | null>(null);
  const dispatch = useDispatch();
  const notification = useNotification();

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

  const handleChooseItem = (item: ContractI) => {
    router.replace(
      `/profile?transCode=${item.bookingCode}&transactionId=${item.transactionId}&uuid=${item.uuid}&productId=${item.productId}`
    );
  };

  const handleChangeRequestType = (e: SelectChangeEvent) => {
    const data = sendRequestTypes.filter((x) => x.name === e.target.value);
    setRequestType(data[0] as RequestParams);
    router.replace(`/send-request/${data[0].id}/${item.bookingCode}`);
  };

  const handleViewRequestDetail = () => {
    if (!requestType) {
      notification({
        severity: "error",
        message: "Vui lòng chọn yêu cầu giao dịch",
      });
    } else {
      router.replace(`/send-request/${requestType.id}/${item.bookingCode}`);
    }
  };

  return (
    <BoxContainer
      styleCustom={{
        padding: 18,
        borderRadius: 8,
        marginBottom: isLast ? 0 : 23,
        marginTop: 18,
        display: "flex",
      }}
      key={item?.id}
    >
      <div>
        {item?.productionImage ? (
          //   <ImageProduct
          //     loader={({ src, width, quality }) => {
          //       return `${src}?w=${width}&q=${quality}`;
          //     }}
          //     src={
          //       item?.productionImage ??
          //       "https://tse3.mm.bing.net/th?id=OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5&pid=Api&P=0&w=277&h=183"
          //     }
          //     width={159}
          //     height={96}
          //     alt=""
          //   />
          <ImageWithHideOnError
            className="logo"
            src={item?.productionImage}
            fallbackSrc={Product3}
            height={120}
            width={180}
            title={"Logo "}
            alt={"Logo "}
            priority
            style={{ borderRadius: 8 }}
            unoptimized={true}
          />
        ) : (
          <ImageProduct src={Product3} height={120} width={180} alt="" />
        )}
      </div>
      <ContentProduct>
        <HeaderTitle
          style={{ cursor: "pointer" }}
          onClick={() => handleChooseItem(item)}
        >
          <TitleProject>{item?.projectName || "TNR"}</TitleProject>
          <TitleTime>
            Cập nhật:{" "}
            {convertDateToString(
              getDateFromStringDMY(item?.bookingTime) ?? new Date()
            )}
          </TitleTime>
        </HeaderTitle>
        <HeaderTitle
          onClick={() => handleChooseItem(item)}
          style={{ marginBottom: 20, cursor: "pointer" }}
        >
          <TitleProduct>{item?.productName || "Lô A06"}</TitleProduct>
        </HeaderTitle>
        <CodeProduct>
          {item?.transactionCodeLandSoft || item?.bookingCode}
        </CodeProduct>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Khách hàng:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>{item?.fullname}</TextProduct>
          </Column>
        </Row>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Mã đặt chỗ:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>
              {item?.transactionCodeLandSoft || item?.bookingCode}
            </TextProduct>
          </Column>
        </Row>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Thời gian đặt chỗ:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>
              {convertDateToString(
                getDateFromStringDMY(item?.bookingTime) ?? new Date()
              )}
            </TextProduct>
          </Column>
        </Row>
        <DynamicHorizontalLine />
        {item?.paymentStatus === "12" ||
        item?.paymentStatus === "14" ||
        item?.paymentStatus === "16" ||
        item?.paymentStatus === "18" ||
        item?.paymentStatus === "19" ||
        item?.paymentStatus === "20" ||
        item?.paymentStatus === "21" ? (
          <>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Đã cọc:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Đã thanh toán:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Còn lại:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Đã cọc:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.totalDeposite)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Đã thanh toán:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.deposite)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>Còn lại:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.amountLeft)}&nbsp;đ
                </TextProduct>
              </Column>
            </Row>
          </>
        )}
        <DynamicHorizontalLine />
        <Row>
          <Column col={1} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Trạng thái:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct
              color={
                item?.paymentStatus === "12" ||
                item?.paymentStatus === "14" ||
                item?.paymentStatus === "16" ||
                item?.paymentStatus === "18" ||
                item?.paymentStatus === "19" ||
                item?.paymentStatus === "20" ||
                item?.paymentStatus === "21"
                  ? "#06C270"
                  : "#FF3B3B"
              }
            >
              {" "}
              <div style={{ marginRight: 10 }}>
                {item?.paymentStatus === "12" ||
                item?.paymentStatus === "14" ||
                item?.paymentStatus === "16" ||
                item?.paymentStatus === "18" ||
                item?.paymentStatus === "19" ||
                item?.paymentStatus === "20" ||
                item?.paymentStatus === "21" ? (
                  <IconCircleChecked />
                ) : (
                  <IconCircleClose />
                )}
              </div>
              {item?.paymentStatusString}
            </TextProduct>
            {/* {item?.status === "0" ? (
              <TextProduct color="#FF3B3B">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleClose />
                </div>
                Chưa hoàn thành hồ sơ mua bán
              </TextProduct>
            ) : item?.status === "1" ? (
              <TextProduct color="#06C270">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleChecked />
                </div>
                Đã hoàn thiện hồ sơ
              </TextProduct>
            ) : item?.status === "2" ? (
              <TextProduct color="#FF3B3B">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleClose />
                </div>
                Hết thời gian thanh toán
              </TextProduct>
            ) : item?.status === "3" ? (
              <TextProduct color="#06C270">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleChecked />
                </div>
                Đã duyệt
              </TextProduct>
            ) : item?.status === "4" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Đã tạo phiếu thanh toán
              </TextProduct>
            ) : item?.status === "5" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Đã tạo bản nháp thông tin mua hàng
              </TextProduct>
            ) : item?.status === "6" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Thanh lý cọc
              </TextProduct>
            ) : item?.status === "7" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Hoàn cọc
              </TextProduct>
            ) : item?.status === "8" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Đổi lô, căn
              </TextProduct>
            ) : item?.status === "9" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                Chuyển nhượng
              </TextProduct>
            ) : (
              <></>
            )} */}
          </Column>
        </Row>
        <Box
          sx={{
            display: "flex",
            alignItems: item.paymentStatus === "0" ? "center" : "flex-end",
            ml: item.paymentStatus === "0" ? "0px" : "150px",
            columnGap: "25px",
          }}
        >
          {item.paymentStatus === "0" ? (
            <>
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
                    `/payment-cart?transactionCode=${item.bookingCode}`
                  )
                }
              >
                Hoàn Thiện hồ sơ
              </Button>
            </>
          ) : (
            <>
              <SelectInputComponent
                data={sendRequestTypes}
                value={requestType ? [requestType.name] : []}
                onChange={handleChangeRequestType}
                placeholder="Gửi yêu cầu"
                style={{ margin: 0 }}
              />
            </>
          )}

          <CustomButton
            style={{ width: "300px", padding: "18px 50px", margin: "8px" }}
            label="Xem chi tiết"
            onClick={() => handleChooseItem(item)}
          />
        </Box>
      </ContentProduct>
    </BoxContainer>
  );
};

export default ProductCard;
