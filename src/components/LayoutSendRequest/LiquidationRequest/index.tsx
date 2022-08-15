import PageBorder from "@components/Element/PageBorder";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { apiLiquidationPikes } from "../../../../pages/api/paymentApi";
import SendRequest from "../SendRequest";

type Props = {};

const LiquidationRequest = () => {
  const {
    query: { txcode },
  } = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickBtn = () => {
    if (!txcode) return;
    setLoading(true);
    apiLiquidationPikes(txcode as string)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: "Gửi yêu cầu thanh lí thành công",
          });
        } else {
          notification({
            severity: "error",
            message: res.responseMessage,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <PageBorder>
      <SendRequest
        handleClickBtn={handleClickBtn}
        text="Gửi yêu cầu thanh lý"
        loading={loading}
      />
    </PageBorder>
  );
};

export default LiquidationRequest;
