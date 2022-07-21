import { Box, Typography } from "@mui/material";
import React from "react";
import { currencyFormat } from "utils/helper";

type Props = {};

const DepositInformation = (props: Props) => {
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
        Thông tin đặt cọc sản phẩm yêu cầu thanh lý
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
          SA-05-13/TTĐC/TNRLAMSON
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
          09:24 | Thứ 2, 09/11/2021
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
          {currencyFormat(20000000)}đ
        </Typography>
      </Box>
    </Box>
  );
};

export default DepositInformation;
