import PageBorder from "@components/Element/PageBorder";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { apiDepositRefund } from "../../../../pages/api/paymentApi";
import SendRequest from "../SendRequest";

type Props = {};

const DepositRefundRequest = (props: Props) => {
  const {
    query: { txcode },
  } = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickBtn = () => {
    if (!txcode) return;
    setLoading(true);
    apiDepositRefund(txcode as string)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: "Gửi yêu cầu thanh yêu cầu hoàn cọc thành công",
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
        text="Gửi yêu cầu hoàn cọc"
        loading={loading}
      />
    </PageBorder>
  );
};

export default DepositRefundRequest;
