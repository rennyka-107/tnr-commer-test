import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconEdit, IconEditWhite, IconSuccess } from "@components/Icons";
import IconError from "@components/Icons/IconError";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import isEmpty from "lodash.isempty";
import { setListCustomer } from "../../../../store/sendRequestSlice";

type Props = {};

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

const CustomerInformation = (props: Props) => {
  const [displayCustomerDetail, setDisplayCustomerDetail] = useState<any>(fakeCustomers[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const listCustomer = useSelector(
    ({ sendRequest }: RootState) => sendRequest.listCustomer
  );
  useEffect(() => {
    if (!isEmpty(listCustomer)) {
      setDisplayCustomerDetail(listCustomer[0]);
    }
  }, [listCustomer]);

  useEffect(() => {
    dispatch(setListCustomer(fakeCustomers));
  }, []);

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
  function renderButtonVerify() {
    switch (displayCustomerDetail.verify) {
      case true:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              alignItems: "center",
              width: "fit-content",
              borderRadius: "8px",
              padding: "12px 24px",
              border: "1px solid #06C270",
            }}
          >
            <IconSuccess style={{ width: "18px", height: "18px" }} />{" "}
            <Typography
              sx={{
                color: "#06C270",
                fontSize: "16px",
                background: "#FFFFFF",
                fontWeight: 500,
              }}
            >
              Ký số thành công
            </Typography>
          </Box>
        );
      case false:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                alignItems: "center",
                width: "fit-content",
                borderRadius: "8px",
                border: "1px solid #FF3B3B",
                padding: "12px 24px",
              }}
            >
              <IconError style={{ width: "18px", height: "18px" }} />{" "}
              <Typography
                sx={{
                  color: "#FF3B3B",
                  fontSize: "16px",
                  background: "#FFFFFF",
                  fontWeight: 500,
                }}
              >
                Ký số không thành công
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Button
                sx={{
                  color: "#1B3459",
                  fontSize: "16px",
                  background: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "12px",
                  textTransform: "none",
                  border: "1px solid #1B3459",
                  "&:hover": {
                    backgroundColor: "#1B3459",
                    color: "#FFFFFF",
                  },
                }}
              >
                Liên hệ hotline
              </Button>
              <Button
                sx={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  background: "#1B3459",
                  borderRadius: "8px",
                  padding: "12px 29px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#FF3B3B",
                  },
                }}
              >
                Ký lại
              </Button>
            </Box>
          </Box>
        );
      case null:
        return (
          <Button
            sx={{
              color: "#FFFFFF",
              fontSize: "16px",
              background: "#1B3459",
              borderRadius: "8px",
              padding: "12px 24px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#FF3B3B",
              },
            }}
            startIcon={
              <IconEditWhite style={{ width: "18px", height: "18px" }} />
            }
          >
            Ký chữ ký số
          </Button>
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
            listCustomer.find((cus) => cus.idNumber === customer.idNumber)
          )
        }
      >
        {checkVerifyCustomer(customer)}
        {customer.name}
      </Box>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
        {renderRowDetail("Tên khách hàng", displayCustomerDetail.name)}
        {renderRowDetail("Ngày sinh", displayCustomerDetail.dob)}
        {renderRowDetail("Địa chỉ thường trú", displayCustomerDetail.address)}
        {renderRowDetail(
          "Địa chỉ liên hệ",
          displayCustomerDetail.contactAddress
        )}
        {renderRowDetail("Số điện thoại", displayCustomerDetail.phone)}
        {renderRowDetail("Email", displayCustomerDetail.email)}
        {renderRowDetail("CCCD", displayCustomerDetail.idNumber)}
        {renderRowDetail("Ngày cấp", displayCustomerDetail.issueDate)}
        {renderRowDetail("Nơi cấp", displayCustomerDetail.issuePlace)}
      </Box>
    );
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "23px",
          color: "#1B3459",
        }}
      >
        Thông tin khách hàng
      </Typography>
      <Box sx={{ display: "flex", gap: 3, width: "100%", flexWrap: "wrap" }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={50} />
        ) : (
          listCustomer.map((item, idx) => (
            <React.Fragment key={idx}>{customerTab(item)}</React.Fragment>
          ))
        )}
      </Box>
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        renderDetailCustomer()
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "19px",
            color: "#1B3459",
          }}
        >
          Chữ ký số khách hàng
        </Typography>
        <Typography
          style={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#0063F7",
            cursor: "pointer",
          }}
        >
          Hướng dẫn sử dụng
        </Typography>
      </Box>
      <Box>
        {loading ? <Skeleton variant="rectangular" height={50} width="100%" /> : renderButtonVerify()}
      </Box>
    </Box>
  );
};

export default CustomerInformation;
