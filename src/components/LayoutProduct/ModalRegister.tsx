import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerDateTimeDatLich from "@components/Form/ControllerDateTimeDatLich";
import ControllerInputDatLich from "@components/Form/ControllerInputDatLich";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import ControllerSelect from "@components/Form/ControllerSelect";
import ControllerSelectTime from "@components/Form/ControllerSelectTime";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import useNotification from "hooks/useNotification";

import { ResponseSearchById } from "interface/product";
import isEmpty from "lodash.isempty";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateLine } from "utils/constants";
import { validateVietnameseName } from "utils/helper";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import { saveInforVisitApament } from "../../../pages/api/visitAparmentFormApi";
interface PropsI {
  isOpen: boolean;
  onClose?: () => void;
  product: ResponseSearchById;
  toggle: Function;
}

interface FormVisitI {
  projectId: string;
  productionId: string;
  apartmentModelId: string | number;
  fullname: string;
  email: string;
  phone: string | number;
  date: string;
  time: string;
}

const listTime = [
  {
    label: "00:00 AM",
    value: "00:00 AM",
  },
  {
    label: "01:00 AM",
    value: "01:00 AM",
  },
  {
    label: "02:00 AM",
    value: "02:00 AM",
  },
  {
    label: "03:00 AM",
    value: "03:00 AM",
  },
  {
    label: "04:00 AM",
    value: "04:00 AM",
  },
  {
    label: "05:00 AM",
    value: "05:00 AM",
  },
  {
    label: "06:00 AM",
    value: "06:00 AM",
  },
  {
    label: "07:00 AM",
    value: "07:00 AM",
  },
  {
    label: "08:00 AM",
    value: "08:00 AM",
  },
  {
    label: "09:00 AM",
    value: "09:00 AM",
  },
  {
    label: "10:00 AM",
    value: "10:00 AM",
  },
  {
    label: "11:00 AM",
    value: "11:00 AM",
  },
  {
    label: "12:00 PM",
    value: "12:00 PM",
  },
  {
    label: "13:00 PM",
    value: "13:00 PM",
  },
  {
    label: "14:00 PM",
    value: "14:00 PM",
  },
  {
    label: "15:00 PM",
    value: "15:00 PM",
  },
  {
    label: "16:00 PM",
    value: "16:00 PM",
  },
  {
    label: "17:00 PM",
    value: "17:00 PM",
  },
  {
    label: "18:00 PM",
    value: "18:00 PM",
  },
  {
    label: "19:00 PM",
    value: "19:00 PM",
  },
  {
    label: "20:00 PM",
    value: "20:00 PM",
  },
  {
    label: "21:00 PM",
    value: "21:00 PM",
  },
  {
    label: "22:00 PM",
    value: "22:00 PM",
  },
  {
    label: "23:00 PM",
    value: "23:00 PM",
  },
];

const TitleStyled = styled.span`
  font-family: "Roboto";
  padding: 10px 0px 10px 0px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  /* identical to box height, or 100% */

  color: #000000;
`;

const LineStyled = styled.div`
  width: 100%;
  height: 0px;
  top: 70px;
  left: 0px;
  position: absolute;
  /* Line/stroke */

  border: 1px solid #c7c9d9;
`;
const ModalRegister = (props: PropsI) => {
  const { isOpen, onClose, product, toggle } = props;
  const notification = useNotification();
  const validationSchema = yup.object().shape({
    fullname: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .min(3, "Họ tên không được chứa ít hơn 3 ký tự")
      .matches(validateVietnameseName(), "Họ và tên không đúng định dạng")
      .max(255)
      .default(""),
    email: yup
      .string()
      .trim(validateLine.trim)
      .required(validateLine.required)
      .strict(true)
      .matches(Regexs.email, "Email không đúng")
      .default(""),
    phone: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "Số điện thoại không đúng")
      .min(10, "Số điện thoại không được dưới 10 số")
      .max(12, "Số điện thoại không được nhiều hơn 12 số")
      .required(validateLine.required)
      .default(""),
    date: yup.string().required("không được bỏ trống"),
    time: yup.string().required("không được bỏ trống"),
  });
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormVisitI>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      projectId: product.project?.id,
      productionId: product?.id,
      apartmentModelId: product?.apartmentModel?.id,
      fullname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const submitForm = async (values) => {
    const response = await saveInforVisitApament(values);
    // console.log(response,'response');
    if (response?.responseCode == "00") {
      notification({
        severity: "success",
        title: `Đặt lịch`,
        message: "Đặt lịch thành công",
      });
      toggle();
    } else {
      notification({
        severity: "error",
        title: `Đặt lịch`,
        message: response?.responseMessage ?? "Có một số lỗi xảy ra",
      });
    }
  };
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
          maxWidth: "400px",
          width: "40%",
          height: "auto",
          backgroundColor: "#FFFF",
          borderRadius: 10,
          padding: "20px 50px",
        }}
      >
        <form
          noValidate
          onSubmit={handleSubmit((values) => submitForm(values))}
          autoComplete="off"
        >
          <div style={{ padding: "10px 0px 10px 0px" }}>
            <TitleStyled>Đăt lịch xem nhà mẫu</TitleStyled>
            <LineStyled style={{ border: "1px solid #C7C9D9;" }}></LineStyled>
          </div>

          <FormGroup fullWidth style={{ marginTop: 20 }}>
            <ControllerInputDatLich
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
          <FormGroup fullWidth>
            <ControllerInputDatLich
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
          <FormGroup fullWidth>
            <ControllerInputDatLich
              variant="outlined"
              hiddenLabel
              name="phone"
              control={control}
              placeholder="Số điện thoại"
              required
              fullWidth
              label="Mời bạn nhập số điện thoại"
              labelColor="#666666"
            />
          </FormGroup>
          <FormGroup fullWidth>
            <ControllerDateTimeDatLich
              label={"Ngày tham quan"}
              control={control}
              name={"date"}
              required
              maxDate={new Date()}
            />
          </FormGroup>
          <FormGroup fullWidth>
            <ControllerSelectTime
              variant="outlined"
              name="time"
              label="Chọn time"
              control={control}
              setValue={setValue}
              dataSelect={listTime}
              required={true}
              isClear={true}
            />
          </FormGroup>

          <FormGroup>
            <div style={{ width: "100%", marginTop: 20 }}>
              <CustomButton
                label="Đặt lịch"
                style={{
                  background: !isEmpty(errors) ? "#D6000080" : "#FEC83C",
                  color: !isEmpty(errors) ? "#ffffff" : "#1B3459",
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
