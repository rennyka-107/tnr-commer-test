import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import * as yup from "yup";
interface PropsI {
  isOpen: boolean;
  onClose?: () => void;
}
const ModalRegister = (props: PropsI) => {
  const { isOpen, onClose } = props;
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
  } = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(yup.object().shape({})),
    defaultValues: {},
  });
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        padding: "5vh 3%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          position: "relative",
          maxWidth: "1660px",
          width: "40%",
          height: "auto",
          backgroundColor: "#FFFF",
          borderRadius: 10,
          padding:"20px 50px"
        }}
      >
        <form noValidate onSubmit={() => {}} autoComplete="off">
          <div>
            <span>Đăt lịch xem nhà mẫu</span>
          </div>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="fullName"
              control={control}
              placeholder="Họ và tên"
              required
              fullWidth
              label="Họ và tên"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="email"
              control={control}
              placeholder="Email"
              required
              fullWidth
              label="Email"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup sx={{ mb: 2 }} fullWidth>
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="phoneNumber"
              control={control}
              placeholder="Số điện thoại"
              fullWidth
              label="Số điện thoại"
              labelColor="#666666"
              required
            />
          </FormGroup>
          <FormGroup>
            <div style={{ width: "100%" }}>
              <CustomButton
                label="Đặt lịch"
                style={{
                  background: !isEmpty(errors) ? "#D6000080" : "#D60000",
                }}
                type="submit"
                disabled={!isEmpty(errors)}
              />
            </div>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalRegister;
