import Container from "@components/Container";
import IconError from "@components/Icons/IconError";
import IconStar from "@components/Icons/IconStar";
import IconSuccess from "@components/Icons/IconSuccess";
import {
  ButtonNormalStyled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useNotification from "hooks/useNotification";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { apiRateTransaction } from "../../../pages/api/rateApi";

type Props = {};

const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  margin-bottom: -10px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #fec83c;
    // box-shadow: 4px 8px 24px #f2f2f5;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    border-radius: 60px;
    color: #ffffff;
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
  margin-bottom: 30px;
`;

const LayoutResultPayment = (props: Props) => {
  const router = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [stars, setStars] = useState({
    0: {
      fillColor: "",
      clicked: false,
    },
    1: {
      fillColor: "",
      clicked: false,
    },
    2: {
      fillColor: "",
      clicked: false,
    },
    3: {
      fillColor: "",
      clicked: false,
    },
    4: {
      fillColor: "",
      clicked: false,
    },
  });
  const {
    query: { errorCode, bookingCode },
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
            mt: "30px",
            maxWidth: 450,
          }}
        >
          {errorCode === "0"
            ? "Chúc mừng quý khách đã thực hiện thành công giao dịch. Hệ thống sẽ xử lý và tiến hành xác nhận đơn hàng cho quý khách."
            : "Hết phiên giao dịch!"}
        </Typography>
        {errorCode === "0" && (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16.41px",
              maxWidth: 450,
              mb: "30px",
            }}
          >
            Cảm ơn Quý khách hàng
          </Typography>
        )}
        {isEmpty(bookingCode) ? (
          <Button
            sx={{
              borderRadius: "8px",
              background: "#1B3459",
              color: "#FFFFFF",
              fontSize: "1.1rem",
              fontWeight: 400,
              lineHeight: "21px",
              p: "14px 58px",
              mb: "30px",
              "&:hover": {
                background: "#FEC83C",
                // box-shadow: 4px 8px 24px #f2f2f5;
                boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                color: "#ffffff",
              },
            }}
            onClick={() => router.push("/")}
          >
            Về trang chủ
          </Button>
        ) : (
          <>
            <Typography
              sx={{
                m: "30px",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "32px",
                maxWidth: 450,
              }}
            >
              Bạn thấy chất lượng dịch vụ của chúng tôi như thế nào?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mb: "30px",
                justifyContent: "space-between",
              }}
            >
              {[1, 2, 3, 4, 5].map((nb, idx) => (
                <IconStar
                  key={`${idx}-star`}
                  fillColor={stars[idx]["fillColor"]}
                  onMouseOver={() => {
                    const oldStars = { ...stars };
                    for (const key in oldStars) {
                      if (idx >= Number(key) && !oldStars[key]["clicked"]) {
                        oldStars[key]["fillColor"] = "#FEC83C";
                      }
                    }
                    setStars({ ...oldStars });
                  }}
                  onMouseOut={() => {
                    const oldStars = { ...stars };
                    for (const key in oldStars) {
                      if (idx >= Number(key) && !oldStars[key]["clicked"]) {
                        oldStars[key]["fillColor"] = "";
                      }
                    }
                    setStars({ ...oldStars });
                  }}
                  onClick={() => {
                    const oldStars = { ...stars };
                    for (const key in oldStars) {
                      if (idx >= Number(key)) {
                        oldStars[key]["fillColor"] = "#FEC83C";
                        oldStars[key]["clicked"] = true;
                      } else {
                        oldStars[key]["fillColor"] = "";
                        oldStars[key]["clicked"] = false;
                      }
                    }
                    setStars({ ...oldStars });
                  }}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Box>

            <ButtonStyled
              onClick={() => {
                setLoading(true);
                let value = 0;
                for (const key in stars) {
                  if (stars[key]["clicked"]) {
                    value++;
                  }
                }
                apiRateTransaction({
                  bookingCode,
                  value,
                })
                  .then((res) => {
                    if (res.responseCode === "00") {
                      notification({
                        severity: "success",
                        title: "Đánh giá giao dịch",
                        message: res.responseMessage,
                      });
                      router.push("/");
                    } else {
                      notification({
                        severity: "error",
                        title: "Đánh giá giao dịch",
                        message: res.responseMessage,
                      });
                    }
                    setLoading(false);
                  })
                  .catch((err) => {
                    notification({
                      severity: "error",
                      title: "Đánh giá giao dịch",
                      message: "Có lỗi xảy ra",
                    });
                    setLoading(false);
                  });
              }}
            >
              <Text18Styled color={"#fff"}>
                {loading ? <CircularProgress /> : "Gửi đánh giá"}
              </Text18Styled>
            </ButtonStyled>
          </>
        )}
      </Box>
    </Container>
  );
};

export default LayoutResultPayment;
