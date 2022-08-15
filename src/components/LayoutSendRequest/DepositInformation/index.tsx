import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DateFns from "utils/DateFns";
import { currencyFormat } from "utils/helper";
import { RootState } from "../../../../store/store";

type Props = {
  title?: string;
  orderDetail?: any;
};

const DepositInformation = ({ title, orderDetail }: Props) => {
  console.log("orderDetail", orderDetail);
  
  if (!orderDetail) return <></>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "23px",
          color: "#1B3459",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#8190A7",
          }}
        >
          Mã đặt chỗ
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#1B3459",
          }}
        >
          {orderDetail.transactionCodeObject.code}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#8190A7",
          }}
        >
          Thời gian đặt chỗ
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#1B3459",
          }}
        >
          {orderDetail.transactionCodeObject.createDate}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#8190A7",
          }}
        >
          Số tiền cọc
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            color: "#EA242A",
          }}
        >
          {currencyFormat(orderDetail.totalDeposite)}đ
        </Typography>
      </Box>
    </Box>
  );
};

export default DepositInformation;
