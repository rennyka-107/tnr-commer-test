import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Subtitle from "@components/Element/Subtitle";

const ChangeApartmentRequest = dynamic(
  () => import("../../src/components/LayoutSendRequest/ChangeApartmentRequest"),
  { loading: () => <p>...</p>, ssr: false }
);
const DepositRefundRequest = dynamic(
  () => import("../../src/components/LayoutSendRequest/DepositRefundRequest"),
  { loading: () => <p>...</p>, ssr: false }
);
const LiquidationRequest = dynamic(
  () => import("../../src/components/LayoutSendRequest/LiquidationRequest"),
  { loading: () => <p>...</p>, ssr: false }
);

const TransferRequest = dynamic(
  () => import("../../src/components/LayoutSendRequest/TransferRequest"),
  { loading: () => <p>...</p>, ssr: false }
);

const ProductInformation = dynamic(
  () => import("../../src/components/LayoutSendRequest/ProductInformation"),
  { loading: () => <p>...</p>, ssr: false }
);

const DepositInformation = dynamic(
  () => import("../../src/components/LayoutSendRequest/DepositInformation"),
  { loading: () => <p>...</p>, ssr: false }
);

const CustomerInformation = dynamic(
  () => import("../../src/components/LayoutSendRequest/CustomerInformation"),
  { loading: () => <p>...</p>, ssr: false }
);

const requestType = [
  "change-apartment",
  "deposit-refund",
  "liquidation",
  "transfer",
];

const SendRequest = () => {
  const {
    query: { request },
  } = useRouter();
  const router = useRouter();
  useEffect(() => {
    if (!isEmpty(request) && requestType.indexOf(request as string) === -1) {
      router.push("/404");
    }
  }, [request]);

  const [loading, setLoading] = useState<boolean>(false);

  const renderTitle = () => {
    switch (request) {
      case "change-apartment":
        return "Thông tin sản phẩm yêu cầu đổi căn";

      case "deposit-refund":
        return "Thông tin sản phẩm hoàn cọc";

      case "liquidation":
        return "Thông tin sản phẩm thanh lý";

      case "transfer":
        return "Thông tin sản phẩm yêu cầu chuyển nhượng";
    }
  };

  const renderBreadcrum = () => {
    switch (request) {
      case "change-apartment":
        return "Gửi yêu cầu đổi căn";

      case "deposit-refund":
        return "Gửi yêu cầu hoàn cọc";

      case "liquidation":
        return "Gửi yêu cầu thanh lý";

      case "transfer":
        return "Gửi yêu cầu chuyển nhượng";
    }
  };

  const renderDepositInfomationTitle = () => {
    switch (request) {
      case "change-apartment":
        return "Thông tin đặt cọc sản phẩm yêu cầu đổi căn";

      case "deposit-refund":
        return "Thông tin đặt cọc sản phẩm yêu cầu hoàn cọc";

      case "liquidation":
        return "Thông tin đặt cọc sản phẩm yêu cầu thanh lý";

      case "transfer":
        return "Thông tin đặt cọc sản phẩm chuyển nhượng";
    }
  };

  const renderRightContent = () => {
    switch (request) {
      case "change-apartment":
        return <ChangeApartmentRequest />;
      case "deposit-refund":
        return <DepositRefundRequest />;
      case "liquidation":
        return <LiquidationRequest />;
      case "transfer":
        return <TransferRequest />;
    }
  };

  return (
    <Page
      meta={{
        title: "TNR E-commerce Payment",
        description: "TNR E Payment",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        {!loading ? (
          <Container title={renderBreadcrum()}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ width: "50%" }}>
                <Subtitle>{renderTitle()}</Subtitle>
                <ProductInformation />
                <DepositInformation title={renderDepositInfomationTitle()} />
                <CustomerInformation />
              </Box>
              <Box sx={{ width: "50%" }}>{renderRightContent()}</Box>
            </Box>
          </Container>
        ) : (
          <Container title={"Gửi yêu cầu"}>
            <div style={{ textAlign: "center", margin: "200px 0px" }}>
              <CircularProgress />
            </div>
          </Container>
        )}
      </FlexContainer>
    </Page>
  );
};

export default SendRequest;
