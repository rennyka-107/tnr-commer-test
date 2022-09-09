import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { useDispatch } from "react-redux";
import { resetAllFileFinishTransaction } from "../../../store/paymentSlice";
export interface DialogFinishProfileTransactionProps {
  open: boolean;
  transactionCode: string;
  onClose: () => void;
}

export default function DialogFinishProfileTransaction({
  open,
  onClose,
  transactionCode,
}: DialogFinishProfileTransactionProps) {
  const [renderSelect, setRenderSelect] = useState<0 | 1 | 2>(0);
  const dispatch = useDispatch();
  function renderContent() {
    switch (renderSelect) {
      case 0:
        return (
          <DialogContent sx={{ pt: 0 }}>
            Đính kèm <strong>Mặt trước</strong> Căn cước công dân / Chứng minh
            thư
          </DialogContent>
        );
      case 1:
        return (
          <DialogContent sx={{ pt: 0 }}>
            Đính kèm <strong>Mặt sau</strong> Căn cước công dân / Chứng minh thư
          </DialogContent>
        );
      default:
        return (
          <DialogContent sx={{ pt: 0 }}>
            Đính kèm <strong>Hộ khẩu/ Xác nhận cư trú</strong>
          </DialogContent>
        );
    }
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            color: "#1B3459",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "20px",
          }}
        >
          Hoàn thiện hồ sơ mua bán
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(resetAllFileFinishTransaction());
            onClose && onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "fit-content",
            p: 1.5,
            background:
              renderSelect === 0 || renderSelect === 1 ? "#FFCC00" : "#F2F4F5",
            borderRadius: "32px",
            color: "#0E0F0F",
          }}
        >
          CCCD/CMT
        </Box>
        <Box
          sx={{
            width: "fit-content",
            p: 1.5,
            background: renderSelect === 2 ? "#FFCC00" : "#F2F4F5",
            borderRadius: "32px",
            ml: 1,
            color: "#0E0F0F",
            textTransform: "none",
          }}
        >
          Hộ khẩu/Xác nhận cư trú
        </Box>
      </DialogContent>
      {renderContent()}
      <FileUpload
        renderSelect={renderSelect}
        transactionCode={transactionCode}
        setRenderSelect={setRenderSelect}
      />
    </Dialog>
  );
}
