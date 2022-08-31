import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { searchLocationResponse } from "interface/searchIF";

interface Props {
  handleClose: () => void;
  open: boolean;
  handleConfirm: (tempCart: searchLocationResponse | string) => () => void;
  tempCart: searchLocationResponse | string | null;
}

const ConfirmDialog = ({
  open,
  handleClose,
  handleConfirm,
  tempCart,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Trong giỏ hàng đang có một sản phẩm khác, bạn có muốn thay thế sản
          phẩm không.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy bỏ</Button>
        <Button onClick={handleConfirm(tempCart)} autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
