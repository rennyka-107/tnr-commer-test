import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import useNotification from "hooks/useNotification";
import { ResponseSearchById } from "interface/product";
import isEmpty from "lodash.isempty";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { saveInforVisitApament } from "../../../pages/api/visitAparmentFormApi";
interface PropsI {
  isOpen: boolean;
  onClose?: () => void;
  product:ResponseSearchById;
  toggle:Function;
}

interface FormVisitI {
  projectId: string;
  productionId: string;
  apartmentModelId: string|number;
  fullname: string;
  email: string;
  phone: string|number;

}
const ModalRegister = (props: PropsI) => {
  const { isOpen, onClose,product,toggle } = props;
  const notification = useNotification();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
  } = useForm<FormVisitI>({
    mode: 'onChange',
    resolver: yupResolver(yup.object().shape({})),
    defaultValues: {
      projectId: product.project?.id,
      productionId: product?.id,
      apartmentModelId: product?.apartmentModel?.id,
      fullname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(()=>{
    if(!isOpen){
      reset();
    }
  },[isOpen])

  const submitForm=async(values)=>{
    const response=await saveInforVisitApament(values);
    // console.log(response,'response');
    if(response?.responseCode=='00'){
      notification({
        severity: "success",
        title: `Đặt lịch`,
        message:'Đặt lịch thành công'
      });
      toggle();
    }else{
      notification({
        severity: "error",
        title: `Đặt lịch`,
        message:response?.responseMessage??'Có một số lỗi xảy ra'
      });
    }
    
  }
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
        <form noValidate onSubmit={handleSubmit((values)=>submitForm(values))} autoComplete="off">
          <div>
            <span>Đăt lịch xem nhà mẫu</span>
          </div>
          <FormGroup sx={{ mb: 2, mt: 2 }} fullWidth>
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="fullname"
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
              name="phone"
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
