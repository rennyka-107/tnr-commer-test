import Container from "@components/Container";
import IconError from "@components/Icons/IconError";
import IconSuccess from "@components/Icons/IconSuccess";
import {
  ButtonNormalStyled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Typography } from "@mui/material";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

const LayoutResultPayment = (props: Props) => {
  const router = useRouter();
  const {
    query: { errorCode },
  } = router;
  useEffect(() => {
    if (isEmpty(errorCode)) {
      router.push("/");
    }
  }, [errorCode]);

  return (
    <Container title={"Thanh toán"}>
      <Box
        sx={{
          textAlign: "center",
          margin: "100px 0px",
          borderRadius: "20px",
          border: "1px solid #D8D8D8",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            m: "30px",
            fontWeight: 400,
            fontSize: "28px",
            lineHeight: "32.81px",
          }}
        >
          {errorCode === "0"
            ? "Thực hiện giao dịch thành công"
            : "Thực hiện giao dịch không thành công"}
        </Typography>
        {errorCode === "0" ? (
          <IconSuccess style={{ minWidth: "87px", minHeight: "87px" }} />
        ) : (
          <IconError style={{ minWidth: "87px", minHeight: "87px" }} />
        )}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "16.41px",
            m: "30px",
            maxWidth: 450,
          }}
        >
          {errorCode === "0"
            ? "Chúc mừng quý khách đã thực hiện thành công giao dịch. Hệ thống sẽ xử lý và tiến hành xác nhận đơn hàng cho quý khách Cảm ơn Quý khách hàng"
            : "Hết phiên giao dịch!"}
        </Typography>
        <ButtonNormalStyled
          bg={"#1b3459"}
          style={{ width: 225, marginBottom: 30 }}
          // onClick={() => handleOnSubmit(watch())}
        >
          <Text18Styled color={"#fff"}>Về trang chủ</Text18Styled>
        </ButtonNormalStyled>
      </Box>
    </Container>
  );
};

export default LayoutResultPayment;
