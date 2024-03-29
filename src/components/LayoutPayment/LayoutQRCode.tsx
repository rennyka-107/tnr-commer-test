import Container from "@components/Container";
import {
  ButtonNormalStyled,
  Text18ItalicStyled,
  Text18Styled,
  Title28Styled,
} from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { Box, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const BoxTransaction = styled(Box)`
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  min-height: 458px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1107px;
  margin: 0 auto 94px;
`;

const LayoutQRCode = () => {
  const router = useRouter();
  const qrCode = useSelector((state: RootState) => state.payments.qrCode);
  return (
    <Container title={"Thanh toán"} textsub={true}>
      <BoxTransaction>
        <Title28Styled>Tạo giao dịch thành công</Title28Styled>
        <CardMedia
          component={"img"}
          style={{ width: 150, height: 150, margin: "14px 0px 20px" }}
          src={qrCode ? `data:image/png;base64, ${qrCode}` : ""}
          alt={"qr-transaction-img"}
        />
        {/* <Text18Styled style={{ marginBottom: 18 }}>
          Mã giao dịch: 123#456
        </Text18Styled> */}
        <Text18ItalicStyled color={"#FEC83C"} mw={600} textAlign={"center"}>
          Quý khách vui lòng hoàn thiện hồ sơ mua bán trong vòng 12 tiếng để
          được nhận phiếu đặt hàng
        </Text18ItalicStyled>
        <Text18Styled sx={{ mt: "20px"}} color={"#1b3459"}>Cảm ơn Quý khách</Text18Styled>
        <ButtonNormalStyled
          sx={{
            maxWidth: 225,
            mt: "20px",
            "&:hover": {
              background: "#FEC83C !important",
              // box-shadow: 4px 8px 24px #f2f2f5;
              boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
              // borderRadius: "60px",
            },
          }}
          bg={"#1b3459"}
          onClick={() => {
            router.push("/");
          }}
        >
          <Text18Styled color={"white"}>Về trang chủ</Text18Styled>
        </ButtonNormalStyled>
      </BoxTransaction>
    </Container>
  );
};

export default LayoutQRCode;
