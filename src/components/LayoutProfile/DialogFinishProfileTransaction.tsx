import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export interface DialogFinishProfileTransactionProps {
  open: boolean;
  transactionCode: string;
  onClose: (value: string) => void;
}

export default function DialogFinishProfileTransaction({
  open,
  onClose,
  transactionCode,
}: DialogFinishProfileTransactionProps) {
  console.log(transactionCode, "trancaose");
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Hoàn thiện hồ sơ mua bán</DialogTitle>
    </Dialog>
  );
}
