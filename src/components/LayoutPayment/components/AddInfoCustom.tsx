import ControllerSelect from "@components/Form/ControllerSelect";
import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import FormGroup from "@components/Form/FormGroup";
import { Button, FormControl, Grid, Box } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import {
  LinedStyled,
  RowStyled,
  ButtonStyled,
  ButtonNormalStyled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerTextField from "@components/Form/ControllerTextField";
import styled from "@emotion/styled";

const ButtonUploadStyled = styled(Button)`
  background: #1b3459;
  border-radius: 10px;
  width: 64px;
  height: 24px;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: white;
  text-transform: none;
`;

type Props = {
  setFormInfo: Dispatch<SetStateAction<boolean>>;
};

interface InformationCustom {
  doiTuongKhachHang: string | number;
  dx: string;
  hoTen: string;
  ngaySinh: string;
  soDienThoai: string;
  email: string;
  soDdcn: string;
  noiCap: string;
  ngayCap: string;
  dcThuongTru: string;
  dcLienLac: string;
  thanhPho: string;
  quanHuyen: string;
}

const AddInfoCustom = (props: Props) => {
  const { setFormInfo } = props;
  const validationSchema = yup.object().shape({
    doiTuongKhachHang: yup.string().default("ca_nhan"),
    dx: yup.string().default("ong"),
    hoTen: yup.string().default(""),
    ngaySinh: yup.string().default(""),
    soDienThoai: yup.string().default(""),
    email: yup.string().default(""),
    soDncn: yup.string().default(""),
    noiCap: yup.string().default(""),
    ngayCap: yup.string().default(""),
    dcThuongTru: yup.string().default(""),
    dcLienLac: yup.string().default(""),
    thanhPho: yup.string().default(""),
    quanHuyen: yup.string().default(""),
  });

  const { control, handleSubmit, setValue } = useForm<InformationCustom>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleOnSubmit = (values) => {
    try {
      console.log("click");
      console.log(values);
    } catch (error) {
      console.log("=-- error --=\n");
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
        <WrapperBoxBorderStyled>
          <Title28Styled>Thông tin cá nhân</Title28Styled>
          <FormControl fullWidth style={{ marginTop: 30 }}>
            <Grid container rowSpacing={"20px"} columnSpacing={"37px"}>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerSelect
                    label={"Đối tượng khách hàng"}
                    control={control}
                    setValue={setValue}
                    variant={"outlined"}
                    dataSelect={[
                      { label: "Cá nhân", value: "ca_nhan" },
                      { label: "Doanh nghiệp", value: "doanh_nghiep" },
                      { label: "Nhà nước", value: "nha_nuoc" },
                    ]}
                    name={"doiTuongKhachHang"}
                    labelColor={"#1b3459"}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerSelect
                    label={"Danh xưng"}
                    control={control}
                    setValue={setValue}
                    variant={"outlined"}
                    dataSelect={[
                      { label: "Ông", value: "ong" },
                      { label: "Bà", value: "ba" },
                      { label: "Anh/Chị", value: "anh_chi" },
                    ]}
                    name={"dx"}
                    labelColor={"#1b3459"}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Họ và tên"}
                    control={control}
                    variant={"outlined"}
                    name={"hoTen"}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerDatePicker
                    label={"Ngày sinh"}
                    control={control}
                    variant={"outlined"}
                    name={"ngaySinh"}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Số điện thoại"}
                    control={control}
                    variant={"outlined"}
                    name={"soDienThoai"}
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
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <LinedStyled mw={670} style={{ margin: "15px 0px 5px" }} />
                <RowStyled width={670}>
                  <Title28Styled>Thông tin cá nhân</Title28Styled>
                </RowStyled>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Số CMNSD"}
                    control={control}
                    variant={"outlined"}
                    name={"soDdcn"}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <RowStyled aItems={"center"} style={{ paddingTop: 25 }}>
                  <Text18Styled>Đính kèm giấy CN ĐKDN</Text18Styled>
                  <ButtonUploadStyled>Tải lên</ButtonUploadStyled>
                </RowStyled>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Nơi cấp"}
                    control={control}
                    variant={"outlined"}
                    name={"noiCap"}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerDatePicker
                    label={"Ngày cấp"}
                    control={control}
                    variant={"outlined"}
                    name={"ngayCap"}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <ControllerTextField
                    label={"Địa chỉ thường trú"}
                    control={control}
                    variant={"outlined"}
                    name={"dcThuongTru"}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <ControllerTextField
                    label={"Địa chỉ liên lạc"}
                    control={control}
                    variant={"outlined"}
                    name={"dcLienLac"}
                    fullWidth
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Thành phố/Tỉnh"}
                    control={control}
                    variant={"outlined"}
                    name={"thanhPho"}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <ControllerTextField
                    label={"Quận/Huyện"}
                    control={control}
                    variant={"outlined"}
                    name={"quanHuyen"}
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
          >
            <Text18Styled>Huỷ</Text18Styled>
          </ButtonStyled>
          <ButtonNormalStyled
            bg={"#1b3459"}
            style={{ width: 225, marginRight: 35 }}
            // type={"submit"}
            onClick={() => setFormInfo(false)}
          >
            <Text18Styled color={"#fff"}>Lưu thông tin</Text18Styled>
          </ButtonNormalStyled>
        </RowStyled>
      </form>
    </Box>
  );
};

export default AddInfoCustom;
