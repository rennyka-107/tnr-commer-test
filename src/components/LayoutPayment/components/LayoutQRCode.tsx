import Container from "@components/Container";
import {
  ButtonNormalStyled,
  Text18ItalicStyled,
  Text18Styled,
  Title28Styled,
} from "@components/LayoutPayment/styled";
import styled from "@emotion/styled";
import { Box, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

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

  return (
    <Container>
      <BoxTransaction>
        <Title28Styled>Tạo giao dịch thành công</Title28Styled>
        <CardMedia
          component={"img"}
          style={{ width: 92, height: 92, margin: "14px 0px 20px" }}
          src={
            "https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
          }
          alt={"qr-transaction-img"}
        />
        <Text18Styled style={{ marginBottom: 18 }}>
          Mã giao dịch: 123#456
        </Text18Styled>
        <Text18ItalicStyled color={"#FEC83C"} mw={600} textAlign={"center"}>
          Quý khách vui lòng hoàn thiện hồ sơ mua bán trong vòng 12 tiếng để
          được nhận phiếu đặt hàng
        </Text18ItalicStyled>
        <Text18Styled style={{ margin: "22px 0px 37px" }}>
          Cám ơn Quý khách
        </Text18Styled>
        <ButtonNormalStyled
          style={{ width: 225 }}
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
