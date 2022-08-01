import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
type Props = {
  open: boolean;
  handleClose: () => void;
  callback: () => void;
};

const PopupBorrowMsb = ({ open, handleClose, callback }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Vay ưu đãi từ ngân hàng MSB
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Thông tin của quý khách sẽ được gửi tới bộ phận CSKH của ngân hàng MSB
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={callback}>Đồng ý</Button>
        <Button onClick={handleClose} autoFocus>
          Không đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupBorrowMsb;
