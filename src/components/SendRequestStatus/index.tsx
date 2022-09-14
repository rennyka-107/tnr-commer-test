import CustomButton from "@components/CustomComponent/CustomButton";
import PageBorder from "@components/Element/PageBorder";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface Props {
  type: "success" | "error";
}

const SendRequestStatus = ({ type }: Props) => {
  const router = useRouter();
  const generalInfo = useSelector((state: RootState) => state.generalInfo);

  const getContent = () => {
    if (type === "success") {
      return {
        title: "Yêu cầu của quý khách hàng đã được gửi thành công",
        desc: "Chúc mừng quý khách hàng đã gửi yêu cầu thành công Hệ thống sẽ xử lý và tiến hành xác nhận đơn hàng cho quý khách hàng",
        desc1: "Cảm ơn quý khách hàng",

        icon: "/icons/check.svg",
        bottomComponent: (
          <CustomButton
            style={{ width: "100%", maxWidth: "255px", marginTop: "30px" }}
            label="Về trang chủ"
            onClick={() => router.replace(`/`)}
          />
        ),
      };
    }

    return {
      title: "Yêu cầu của quý khách hàng không được gửi thành công",
      desc: `Yêu cầu quý khách hàng không được gửi thành công Vui lòng thực hiện lại các bước trước đó hoặc liên hệ hotline : ${generalInfo.phoneNumber}.`,
      desc1: "Cảm ơn quý khách hàng",
      icon: "/icons/close.svg",
      bottomComponent: (
        <Box>
          <CustomButton
            style={{
              width: "100%",
              maxWidth: "255px",
              marginTop: "30px",
              backgroundColor: "#fff",
              color: "#1B3459",
              border: "1px solid #ccc",
            }}
            label="Trở lại"
            onClick={() => router.push("/profile")}
          />
          <CustomButton
            style={{
              width: "100%",
              maxWidth: "400px",
              marginTop: "30px",
              marginLeft: "20px",
              backgroundColor: "#FEC83C",
              color: "#1B3459",
            }}
            label={`Liên hệ hotline: ${generalInfo.phoneNumber}`}
            onClick={() =>
              (window.location.href = `tel://${generalInfo.phoneNumber}`)
            }
          />
        </Box>
      ),
    };
  };

  console.log("generalInfo", generalInfo);

  const { desc, desc1, icon, title, bottomComponent } = getContent();

  return (
    <PageBorder
      sx={{ width: "100%", paddingLeft: "80px", paddingRight: "80px" }}
    >
      <StyledStatus>
        <div className="title">{title}</div>
        <div className="icon">
          <img src={icon} alt="" className="img" />
        </div>
        <div className="desc">
          {desc}
          <br />
          {desc1}
        </div>
        {bottomComponent}
      </StyledStatus>
    </PageBorder>
  );
};

export default SendRequestStatus;

const StyledStatus = styled(Box)({
  textAlign: "center",
  ".title": {
    fontWeight: 400,
    fontSize: "28px",
  },

  ".icon": {
    display: "flex",
    justifyContent: "center",
    marginTop: "28px",
  },

  ".desc": {
    maxWidth: "450px",
    color: "#1B3459",
    fontSize: "14px",
    fontWeight: 400,
    marginTop: "28px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.8,
  },
});
