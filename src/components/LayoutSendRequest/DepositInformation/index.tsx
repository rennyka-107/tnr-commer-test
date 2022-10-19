import { Box, Typography } from "@mui/material";
import { parseISO, format, parse } from "date-fns";
import React from "react";
import { currencyFormat } from "utils/helper";

type Props = {
  title?: string;
  orderDetail?: any;
};

const DepositInformation = ({ title, orderDetail }: Props) => {
  console.log(orderDetail, "order detail")
  if (!orderDetail) return <></>;

  console.log("orderDetail",orderDetail)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5, mt: 6 }}>
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
          Mã giao dịch
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#1B3459",
          }}
        >
          {orderDetail.transactionCodeLandSoft ?? orderDetail.transactionCode}
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
          Thời gian giao dịch
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#1B3459",
          }}
        >
          {/* {orderDetail.transactionCodeObject.createDate} */}
          {format(
            parse(
              orderDetail.createdAt,
              "dd-MM-yyyy HH:mm:ss",
              new Date()
            ),
            "HH:mm | dd/MM/yyyy"
          )}
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
          {currencyFormat(orderDetail.deposite)}đ
        </Typography>
      </Box>
    </Box>
  );
};

export default DepositInformation;
