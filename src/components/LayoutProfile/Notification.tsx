import BoxContainer from "@components/CustomComponent/BoxContainer";
import { getNotificationByUser } from "@service/Profile";
import React, { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import IconWarning from "@components/Icons/IconWarning";
import { IconSuccess } from "@components/Icons";
import IconError from "@components/Icons/IconError";
import Row from "@components/CustomComponent/Row";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import useNotification from "hooks/useNotification";
import isEmpty from "lodash.isempty";

const AlertMessage = <HTMLDivElement, AlertProps>(props) => {
  function getIcon() {
    switch (props.icon) {
      case "warning":
        return <IconWarning />;
      case "success":
        return <IconSuccess />;
      default:
        return <IconError />;
    }
  }
  return (
    <Alert
      action={props.action}
      elevation={6}
      variant="standard"
      {...props}
      icon={getIcon()}
    />
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<{
    page: number;
    size: number;
    total: number;
  }>({
    page: 1,
    size: 5,
    total: 0,
  });
  const getNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotificationByUser({
        ...paginate,
        page: paginate.page - 1,
      });
      if (!isEmpty(response.responseData)) {
        setNotifications(response.responseData?.content);
        setPaginate({ ...paginate, total: response.responseData.totalPages });
      }
    } catch (err) {
      notification({
        severity: "error",
        title: "Lỗi",
        message: "Có lỗi xảy ra!",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotifications();
  }, [paginate.page]);

  const ItemCard = (item: any) => (
    <AlertMessage
      severity={item.type}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        margin: "1.5rem 0 0 0",
        boxShadow: "unset",
        background: "unset",
        border: "1px solid #C7C9D9",
        borderRadius: "8px",
      }}
      action={
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#8190A7",
          }}
        >
          {item.noticeAt}
        </Typography>
      }
      icon={item.type}
    >
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Typography
            sx={{
              color: (function () {
                switch (item.type) {
                  case "success":
                    return "#06C270";
                  case "warning":
                    return "#FFCC00";
                  default:
                    return "#FF3B3B";
                }
              })(),
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "16px",
            }}
          >
            {item.subject ?? ""}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "15px",
              color: "#0E1D34",
            }}
          >
            {item.content}
          </Typography>
        </Box>
      </Box>
    </AlertMessage>
  );

  function renderPaginate() {
    return (
      <Row customStyle={{ padding: 20, justifyContent: "center" }}>
        <PaginationComponent
          count={paginate.total}
          onChange={(event, page) => {
            if (page !== paginate.page) {
              setPaginate({ ...paginate, page });
            }
          }}
          page={paginate.page}
        />
      </Row>
    );
  }

  return (
    <BoxContainer
      titleHeader="Quản lý thông báo"
      styleCustom={{ padding: "21px 24px" }}
    >
      {loading ? (
        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : !isEmpty(notifications) ? (
        notifications.map((item, idx) => (
          <React.Fragment key={idx}>{ItemCard(item)}</React.Fragment>
        ))
      ) : (
        "Không có thông báo"
      )}
      {paginate.total > 1 && renderPaginate()}
    </BoxContainer>
  );
};
export default Notification;
