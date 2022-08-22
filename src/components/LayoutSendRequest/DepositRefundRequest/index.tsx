import PageBorder from "@components/Element/PageBorder";
import { getOrderByUser } from "@service/Profile";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiDepositRefund } from "../../../../pages/api/paymentApi";
import { RootState } from "../../../../store/store";
import SendRequest from "../SendRequest";

type Props = {};

const DepositRefundRequest = (props: Props) => {
  const {
    query: { txcode },
  } = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [contact, setContact] = useState<any>();

  const getContract = async () => {
    const data = new FormData();
    data.append("projectId", "");
    data.append("status", "");

    const response = await getOrderByUser(data);
    const contacts = response?.responseData ?? [];
    const contact = contacts.find((contact) => contact.bookingCode === txcode);
    setContact(contact);
  };

  useEffect(() => {
    getContract();
  }, []);

  const handleClickBtn = () => {
    if (!txcode) return;
    setLoading(true);
    apiDepositRefund({
      transactionId: contact.transactionId,
      transactionCodeLandSoft: contact.transactionCodeLandSoft,
      productId: contact.productId,
      customerIdentity: contact.idNumber,
      customerName: contact.fullname,
    })
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
