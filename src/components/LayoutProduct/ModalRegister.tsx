import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerDatePickerThamQuan from "@components/Form/ControllerDatePickerThamQuan";
import ControllerDateTimeDatLich from "@components/Form/ControllerDateTimeDatLich";
import ControllerInputDatLich from "@components/Form/ControllerInputDatLich";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import ControllerSelect from "@components/Form/ControllerSelect";
import ControllerSelectTime from "@components/Form/ControllerSelectTime";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import { IconX } from "@components/Icons";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import useForceUpdate from "hooks/useForceUpdate";
import useNotification from "hooks/useNotification";

import { ResponseSearchById } from "interface/product";
import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validateLine } from "utils/constants";
import DateFns from "utils/DateFns";
import { validateVietnameseName } from "utils/helper";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import { getUserInfoApi } from "../../../pages/api/profileApi";
import { saveInforVisitApament } from "../../../pages/api/visitAparmentFormApi";
import { getUserInfo } from "../../../store/profileSlice";
import { RootState } from "../../../store/store";
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
  visitDate: string;
  visitTime: string;
}

const listTime = [
  {
    label: "00:00 AM",
    value: "00:00 AM",
  },
  {
    label: "00:30 AM",
    value: "00:30 AM",
  },
  {
    label: "01:00 AM",
    value: "01:00 AM",
  },
  {
    label: "01:30 AM",
    value: "01:30 AM",
  },
  {
    label: "02:00 AM",
    value: "02:00 AM",
  },
  {
    label: "02:30 AM",
    value: "02:30 AM",
  },
  {
    label: "03:00 AM",
    value: "03:00 AM",
  },
  {
    label: "03:30 AM",
    value: "03:30 AM",
  },
  {
    label: "04:00 AM",
    value: "04:00 AM",
  },
  {
    label: "04:30 AM",
    value: "04:30 AM",
  },
  {
    label: "05:00 AM",
    value: "05:00 AM",
  },
  {
    label: "05:30 AM",
    value: "05:30 AM",
  },
  {
    label: "06:00 AM",
    value: "06:00 AM",
  },
  {
    label: "06:30 AM",
    value: "06:30 AM",
  },
  {
    label: "07:00 AM",
    value: "07:00 AM",
  },
  {
    label: "07:30 AM",
    value: "07:30 AM",
  },
  {
    label: "08:00 AM",
    value: "08:00 AM",
  },
  {
    label: "08:30 AM",
    value: "08:30 AM",
  },
  {
    label: "09:00 AM",
    value: "09:00 AM",
  },
  {
    label: "09:30 AM",
    value: "09:30 AM",
  },
  {
    label: "10:00 AM",
    value: "10:00 AM",
  },
  {
    label: "10:30 AM",
    value: "10:30 AM",
  },
  {
    label: "11:00 AM",
    value: "11:00 AM",
  },
  {
    label: "11:30 AM",
    value: "11:30 AM",
  },
  {
    label: "12:00 PM",
    value: "12:00 PM",
  },
  {
    label: "12:30 PM",
    value: "12:30 PM",
  },
  {
    label: "13:00 PM",
    value: "13:00 PM",
  },
  {
    label: "13:30 PM",
    value: "13:30 PM",
  },
  {
    label: "14:00 PM",
    value: "14:00 PM",
  },
  {
    label: "14:30 PM",
    value: "14:30 PM",
  },
  {
    label: "15:00 PM",
    value: "15:00 PM",
  },
  {
    label: "15:30 PM",
    value: "15:30 PM",
  },
  {
    label: "16:00 PM",
    value: "16:00 PM",
  },
  {
    label: "16:30 PM",
    value: "16:30 PM",
  },
  {
    label: "17:00 PM",
    value: "17:00 PM",
  },
  {
    label: "17:30 PM",
    value: "17:30 PM",
  },
  {
    label: "18:00 PM",
    value: "18:00 PM",
  },
  {
    label: "18:30 PM",
    value: "18:30 PM",
  },
  {
    label: "19:00 PM",
    value: "19:00 PM",
  },
  {
    label: "19:30 PM",
    value: "19:30 PM",
  },
  {
    label: "20:00 PM",
    value: "20:00 PM",
  },
  {
    label: "20:30 PM",
    value: "20:30 PM",
  },
  {
    label: "21:00 PM",
    value: "21:00 PM",
  },
  {
    label: "21:30 PM",
    value: "21:30 PM",
  },
  {
    label: "22:00 PM",
    value: "22:00 PM",
  },
  {
    label: "22:30 PM",
    value: "22:30 PM",
  },
  {
    label: "23:00 PM",
    value: "23:00 PM",
  },
  {
    label: "23:30 PM",
    value: "23:30 PM",
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
  padding: 22px 61px 26px 34px;
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
const ButtonStyled = styled(Button)`
  font-family: "Roboto";
  text-transform: none;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  /* Brand/Main color */
  border-radius: 8px;
  color: #1b3459;
  padding: 14px 70px;
  cursor: pointer;
  border: unset;
  width: 100%;
  height: 54px;
`;
const ModalRegister = (props: PropsI) => {
  const { isOpen, onClose, product, toggle } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //   const [rerender, forceUpdate] = useForceUpdate();
  const detailUser = useSelector(
    (state: RootState) => state?.profile?.userInfo
  );

  const notification = useNotification();
  const validationSchema = yup.object().shape({
    fullname: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .required(validateLine.required)
      .min(3, "Họ tên không được chứa ít hơn 3 ký tự")
      .matches(validateVietnameseName(), "Họ và tên không đúng định dạng")
      .max(255, "Tên không được quá 255 ký tự")
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
      .max(10, "Số điện thoại không được nhiều hơn 10 số")
      .required(validateLine.required)
      .default(""),
    visitDate: yup
      .string()
      .required("không được bỏ trống"),
      // .min(DateFns.getP(), "Không được chọn ngày trong quá khứ"),
    visitTime: yup.string().required("không được bỏ trống"),
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
    if (detailUser) {
      setValue("fullname", detailUser.fullname);
      setValue("email", detailUser.email);
      setValue("phone", detailUser.phone);
    }
  }, [detailUser]);
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const submitForm = async (values) => {
    setLoading(true);
    console.log(values, "!23")
    try {
      const response = await saveInforVisitApament(values);
      // console.log(response,'response');
      if (response?.responseCode == "00") {
        notification({
          severity: "success",
          title: `Đặt lịch`,
          message: "Đặt lịch thành công",
        });
        setLoading(false);
        toggle();
      } else {
        notification({
          severity: "error",
          title: `Đặt lịch`,
          message: response?.responseMessage ?? "Có một số lỗi xảy ra",
        });
      }
      setLoading(false);
    } catch (err) {
      notification({
        severity: "error",
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
        }}
      >
        <form
          noValidate
          onSubmit={handleSubmit((values) => submitForm(values))}
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",

              alignItems: "center",
              borderBottom: "1px solid #c7c9d9",
            }}
          >
            <TitleStyled>Đặt lịch tham quan nhà mẫu</TitleStyled>
            <IconX
              style={{
                stroke: "#1B3459",
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
              onClick={onClose}
            />
          </div>
          {/* <LineStyled style={{ border: "1px solid #C7C9D9;" }} /> */}

          <div style={{ padding: "20px 50px" }}>
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
                label="Số điện thoại"
                labelColor="#666666"
              />
            </FormGroup>
            <FormGroup fullWidth>
              <ControllerReactDatePicker
                label={"Ngày tham quan"}
                control={control}
                name={"visitDate"}
                required
              />
              {/* <ControllerDatePicker
                control={control}
                name="date"
                label="Ngày tham quan"
              /> */}
            </FormGroup>
            <FormGroup fullWidth>
              <ControllerSelectTime
                variant="outlined"
                name="visitTime"
                label="Chọn giờ tham quan"
                control={control}
                setValue={setValue}
                dataSelect={listTime}
                required={true}
                isClear={true}
              />
            </FormGroup>

            <FormGroup>
              <div style={{ width: "100%", marginTop: 20 }}>
                <ButtonStyled
                  style={{
                    background: !isEmpty(errors) ? "#D6000080" : "#FEC83C",
                    color: !isEmpty(errors) ? "#ffffff" : "#1B3459",
                  }}
                  type="submit"
                  disabled={!isEmpty(errors)}
                >
                  {loading === false ? (
                    <>Xác nhận đặt lịch</>
                  ) : (
                    <CircularProgress
                      style={{ height: 25, width: 25, color: "#ffffff" }}
                    />
                  )}
                </ButtonStyled>
              </div>
            </FormGroup>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalRegister;
