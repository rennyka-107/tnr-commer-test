import ControllerSelect from "@components/Form/ControllerSelect";
import FormGroup from "@components/Form/FormGroup";
import { FormControl, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LinedStyled,
  RowStyled,
  ButtonStyled,
  ButtonNormalStyled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerTextField from "@components/Form/ControllerTextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import isEmpty from "lodash.isempty";
import { setData } from "../../../../store/paymentSlice";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import { validateLine } from "utils/constants";
import isEqual from "lodash.isequal";
import useNotification from "hooks/useNotification";

type Props = {
  onClose: Function;
  idNumber?: string;
  listCustomerType: any[];
};

interface InformationCustom {
  customerTypeId: string;
  vocativeId: string;
  fullname: string;
  dob: string;
  phoneNumber: string;
  email: string;
  idNumber: string;
  issuePlace: string;
  issueDate: string;
  permanentAddress: string;
  contactAddress: string;
  province: string;
  district: string;
}

const validationSchema = yup.object().shape({
  customerTypeId: yup.string().required(validateLine.required).default(""),
  vocativeId: yup.string().required(validateLine.required).default(""),
  fullname: yup.string().required(validateLine.required).default(""),
  dob: yup.string().required(validateLine.required).default(""),
  phoneNumber: yup.string().required(validateLine.required).default(""),
  email: yup.string().required(validateLine.required).default(""),
  idNumber: yup.string().required(validateLine.required).default(""),
  issuePlace: yup.string().required(validateLine.required).default(""),
  issueDate: yup.string().required(validateLine.required).default(""),
  permanentAddress: yup.string().required(validateLine.required).default(""),
  contactAddress: yup.string().default(""),
  province: yup.string().default(""),
  district: yup.string().default(""),
});

const AddInfoCustom = (props: Props) => {
  const { onClose, idNumber, listCustomerType } = props;
  const data = useSelector((state: RootState) => state.payments.data);
  const dispatch = useDispatch();
  const [initialValue, setInitialValue] = useState<any>(
    validationSchema.getDefault()
  );
  const notification = useNotification();
  const { control, handleSubmit, setValue, reset, watch } =
    useForm<InformationCustom>({
      mode: "onChange",
      resolver: yupResolver(validationSchema),
      defaultValues: validationSchema.getDefault(),
    });

  useEffect(() => {
    if (idNumber) {
      const listInfos = data.paymentIdentityInfos;
      if (!isEmpty(listInfos) && listInfos.length >= 2) {
        const info = listInfos.find((item) => item.idNumber === idNumber);
        if (!isEmpty(info)) {
          reset({ ...info });
          setInitialValue({ ...info });
        }
      }
    }
  }, [data, idNumber]);
  const handleOnSubmit = (values) => {
    const { paymentIdentityInfos } = data;
    if (!isEmpty(idNumber)) {
      let valid = true;
      const formatArray = paymentIdentityInfos.map((info) => {
        if (info.idNumber === idNumber) {
          return { ...info, ...values };
        } else {
          if (info.idNumber === values.idNumber) {
            valid = false;
          }
        }
        return info;
      });
      if (valid) {
        dispatch(
          setData({
            ...data,
            paymentIdentityInfos: formatArray,
          })
        );
      } else {
        notification({
          severity: "error",
          title: "Tr??ng CMND/CCCD",
          message:
            "CMND/CCCD c???a ng?????i mua b??? tr??ng v???i CMND/CCCD c???a ng?????i mua kh??c",
        });
        return;
      }
    } else {
      let valid = true;
      paymentIdentityInfos.forEach((item) => {
        if (item.idNumber === values.idNumber) {
          valid = false;
        }
      });
      if (valid) {
        dispatch(
          setData({
            ...data,
            paymentIdentityInfos: [...paymentIdentityInfos, values],
          })
        );
      } else {
        notification({
          severity: "error",
          title: "Tr??ng CMND/CCCD",
          message:
            "CMND/CCCD c???a ng?????i mua b??? tr??ng v???i CMND/CCCD c???a ng?????i mua kh??c",
        });
        return;
      }
    }
    onClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
        <WrapperBoxBorderStyled>
          <Title28Styled>Th??ng tin c?? nh??n</Title28Styled>
          <FormControl fullWidth style={{ marginTop: 30 }}>
            <Grid container rowSpacing={"20px"} columnSpacing={"37px"}>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerSelect
                    label={"?????i t?????ng kh??ch h??ng"}
                    control={control}
                    setValue={setValue}
                    variant={"outlined"}
                    dataSelect={listCustomerType.map((ct) => ({
                      label: ct.name,
                      value: ct.id,
                    }))}
                    name={"customerTypeId"}
                    labelColor={"#1b3459"}
                    required
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerSelect
                    label={"Danh x??ng"}
                    control={control}
                    setValue={setValue}
                    variant={"outlined"}
                    dataSelect={[
                      {
                        label: "??ng",
                        value: "02334B87-1F9F-4EAC-9B4C-C63s58E01842",
                      },
                      {
                        label: "B??",
                        value: "02334B87-1F9F-4EAC-9B4C-C6HG84701842",
                      },
                    ]}
                    name={"vocativeId"}
                    labelColor={"#1b3459"}
                    required
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"H??? v?? t??n"}
                    control={control}
                    variant={"outlined"}
                    name={"fullname"}
                    required
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerReactDatePicker
                    label={"Ng??y sinh"}
                    control={control}
                    variant={"outlined"}
                    name={"dob"}
                    required
                    maxDate={new Date()}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"S??? ??i???n tho???i"}
                    control={control}
                    variant={"outlined"}
                    name={"phoneNumber"}
                    required
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Email"}
                    control={control}
                    variant={"outlined"}
                    name={"email"}
                    required
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <LinedStyled mw={670} style={{ margin: "15px 0px 5px" }} />
                {/* <RowStyled width={670}>
                  <Title28Styled>Th??ng tin c?? nh??n</Title28Styled>
                </RowStyled> */}
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"S??? CMND/CCCD"}
                    control={control}
                    variant={"outlined"}
                    name={"idNumber"}
                    required
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"N??i c???p"}
                    control={control}
                    variant={"outlined"}
                    name={"issuePlace"}
                    required
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerReactDatePicker
                    label={"Ng??y c???p"}
                    control={control}
                    variant={"outlined"}
                    name={"issueDate"}
                    required
                    maxDate={new Date()}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <ControllerTextField
                    label={"?????a ch??? th?????ng tr??"}
                    control={control}
                    variant={"outlined"}
                    name={"permanentAddress"}
                    fullWidth
                    required
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <ControllerTextField
                    label={"?????a ch??? li??n l???c"}
                    control={control}
                    variant={"outlined"}
                    name={"contactAddress"}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Th??nh ph???/T???nh"}
                    control={control}
                    variant={"outlined"}
                    name={"province"}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Qu???n/Huy???n"}
                    control={control}
                    variant={"outlined"}
                    name={"district"}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </WrapperBoxBorderStyled>

        <RowStyled
          jContent={"start"}
          aItems={"center"}
          style={{ marginTop: 40 }}
        >
          <ButtonStyled
            bg={"white"}
            border={"1px solid #c7c9d9"}
            style={{ width: 225, marginRight: 35 }}
            onClick={() => onClose()}
          >
            <Text18Styled>Hu???</Text18Styled>
          </ButtonStyled>
          <ButtonNormalStyled
            disabled={!isEmpty(idNumber) && isEqual(initialValue, watch())}
            bg={"#1b3459"}
            style={{ width: 225, marginRight: 35 }}
            onClick={handleSubmit((value) => handleOnSubmit(value))}
          >
            <Text18Styled color={"#fff"}>
              L??u th??ng tin
            </Text18Styled>
          </ButtonNormalStyled>
        </RowStyled>
      </form>
    </Box>
  );
};

export default AddInfoCustom;
