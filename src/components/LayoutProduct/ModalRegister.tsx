import CustomButton from "@components/CustomComponent/CustomButton";
import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerDatePickerThamQuan from "@components/Form/ControllerDatePickerThamQuan";
import ControllerDatePickerTQNM from "@components/Form/ControllerDatePickerTQNM";
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
  TextField,
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
import dayjs, { Dayjs } from "dayjs";
import { RootState } from "../../../store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ControllerTimeSelect from "@components/Form/ControllerTimeSelect";

interface PropsI {
  isOpen: boolean;
  onClose?: () => void;
  product: ResponseSearchById;
  toggle: Function;
  content: string;
}

interface FormVisitI {
  projectId: string;
  productionId: string;
  apartmentModelId: string | number;
  fullname: string;
  email: string;
  phone: string | number;
  visitDate: string;
  visitTime: any;
}

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

const TextGuideStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  /* Brand/Main color */

  color: #1b3459;
`;

const TextFieldStyled = styled(TextField)`

.MuiOutlinedInput-input
`;

const ModalRegister = (props: PropsI) => {
  const { isOpen, onClose, product, toggle, content } = props;
  const [loading, setLoading] = useState(false);
  const [visitContent, setVisitContent] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const dispatch = useDispatch();
  //   const [rerender, forceUpdate] = useForceUpdate();
  const detailUser = useSelector(
    (state: RootState) => state?.profile?.userInfo
  );
  console.log(dateValue);

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
    visitDate: yup.string().required("Không được bỏ trống"),
    // .min(DateFns.getP(), "Không được chọn ngày trong quá khứ"),
    visitTime: yup
      .date()
      .required("Không được bỏ trống")
      .typeError("Thời gian chọn không hợp lệ!")
    //   .min(
    //     !isEmpty(dateValue) && new Date(dateValue) <= new Date()
    //       ? dayjs(new Date())
    //       : dayjs(new Date().getDate() - 1),
    //     "Không được chọn thời gian nhỏ hơn hiện tại"
    //   ),
	.min(
       new Date(dateValue) <= new Date()
          ? dayjs(new Date())
          : dayjs(new Date().getDate() - 1),
        "Không được chọn thời gian nhỏ hơn hiện tại"
      ),
  });
  console.log
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
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

  const [expanded, setExpanded] = useState(false);
  const dataForDisplay = expanded ? visitContent : visitContent?.slice(0, 70);

  useEffect(() => {
    if (!isEmpty(product.project)) {
      setVisitContent(product.project.visitContent);
    }
  }, [product]);

  useEffect(() => {
    if (detailUser) {
      setValue("fullname", detailUser.fullname);
      setValue("email", detailUser.email);
      setValue("phone", detailUser.phone);
      setValue("visitTime", dayjs(new Date()));
    }
    console.log(dayjs(new Date()).format("HH:mm"));
  }, [detailUser, isOpen]);
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const submitForm = async (values) => {
    setLoading(true);
    const body = {
		...values,
		visitTime: dayjs(values.visitTime).format("HH:mm")
	};
	console.log(values)

    try {
      const response = await saveInforVisitApament(body);
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
            {!isEmpty(visitContent) ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextGuideStyled>
                    Hướng dẫn đặt lịch tham quan:
                  </TextGuideStyled>
                  <TextGuideStyled
                    style={{
                      maxHeight: 100,
                      overflow: "auto",
                      whiteSpace: "pre",
                    }}
                    dangerouslySetInnerHTML={{ __html: dataForDisplay }}
                  />{" "}
                  {expanded === false && (
                    <div
                      style={{
                        position: "absolute",
                        width: 335,
                        height: 48,
                        left: "27.5px",
                        top: 135,
                        background:
                          " linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
                      }}
                    ></div>
                  )}
                </div>
                <a
                  style={{
                    color: "#0063F7",
                    fontWeight: 400,
                    cursor: "pointer",
                    //   fontStyle: "italic",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                  onClick={() => setExpanded(!expanded)}
                >
                  {!isEmpty(visitContent) ? (
                    <>
                      {visitContent.length > 70 && (
                        <> {expanded ? "Rút gọn" : "Xem thêm"}</>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </a>
              </div>
            ) : (
              <></>
            )}
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
              <ControllerDatePickerTQNM
                label={"Ngày tham quan"}
                control={control}
                name={"visitDate"}
                setDateValue={setDateValue}
                required
                minDate={new Date()}
                labelColor="#8190A7"
              />
              {/* <ControllerDatePicker
                control={control}
                name="date"
                label="Ngày tham quan"
              /> */}
            </FormGroup>
            <FormGroup fullWidth>
              <ControllerTimeSelect
                variant="outlined"
                hiddenLabel
                name="visitTime"
                control={control}
                required
                fullWidth
                minDate={dateValue}
                setTimeValue={setTimeValue}
                label="Chọn giờ tham quan"
                labelColor="#666666"
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
