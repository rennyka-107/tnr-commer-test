import Container from "@components/Container";
import ContainerRequestTranfer from "@components/Container/ContainerRequestTranfer";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Subtitle from "@components/Element/Subtitle";
import { IconSuccess } from "@components/Icons";
import SendRequestStatus from "@components/SendRequestStatus";
import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import { Box, CircularProgress } from "@mui/material";
import { getOrderById } from "@service/Profile";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SendRequestSuccess = () => {
  return (
    <Page
      meta={{
        title: "TNR E-commerce Payment",
        description: "TNR E Payment",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Box sx={{ mt: 30, mb: 15 }}>
          <SendRequestStatus type="success" />
        </Box>
      </FlexContainer>
    </Page>
  );
};

export default SendRequestSuccess;
