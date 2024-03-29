import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import CustomButton from "@components/CustomComponent/CustomButton";
import HorizontalLine from "@components/CustomComponent/HorizontalLine";
import Row from "@components/CustomComponent/Row";
import CommuneEdit from "@components/Form/CommuneEdit";
import CommuneSelect from "@components/Form/CommuneSelect";
import ControllerReactDateEditProfile from "@components/Form/ControllerReactDateEditProfile";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import ControllerSelectAutoComplete from "@components/Form/ControllerSelectAutoComplete";
import ControllerSelectAutoCompleteEditProfile from "@components/Form/ControllerSelectAutoCompleteEditProfile";
import ControllerSelectAutoCompleteEP from "@components/Form/ControllerSelectAutoCompleteEP";
import ControllerTextField from "@components/Form/ControllerTextField";
import ControllerTextFieldEditProfile from "@components/Form/ControllerTextFieldEditProfile";
import DistrictEdit from "@components/Form/DistrictEdit";
import DistricSelect from "@components/Form/DistrictSelect";
import FormGroup from "@components/Form/FormGroup";
import { IconDownloadPTG, IconEditWhite } from "@components/Icons";
import {
  ButtonAction,
  LinedStyled,
  RowStyled,
  Text18Styled,
  Title20Styled,
} from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { ProfileI } from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import useCustomType from "hooks/useCustomtype";
import useForceUpdate from "hooks/useForceUpdate";
import useNotification from "hooks/useNotification";
import useProvinces from "hooks/useProvinces";
import isEqual from "lodash.isequal";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { InputProps, validateLine } from "utils/constants";
import { isValidFileImage, validateVietnameseName } from "utils/helper";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import {
  getUserInfoApi,
  postChangeInfoApi,
  postFile,
  postImage,
} from "../../../pages/api/profileApi";
import { changeProfile, getUserInfo } from "../../../store/profileSlice";
import { RootState } from "../../../store/store";

const AvataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 47px 0px;
  position: relative;
`;

const IconWrapper = styled.div`
  background: blue;
  padding: 8px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 37px;
  right: 270px;
`;
const AttachWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-top: 33px;
`;

const TextFileUpload = styled.span`
  margin-bottom: 4px;
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.09px;
`;

const UploadButton = styled(Button)`
  height: 24px;
  width: auto;
  background: #1b3459;
  border-radius: 10px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: white;
  text-transform: none;

  :hover {
    background: #1b3459;
    color: #ffffff;
  }
`;

const FileContainer = styled.div`
  display: flex;
  justify-content: start;
`;

interface Option {
  label: string;
  value: string;
}

const EditProfile = () => {
  const [document, setDocument] = useState({ fileName: "", dataUrl: "" });
  const [rerender, forceUpdate] = useForceUpdate();
  const { dataCustomType } = useCustomType();
  const { dataProvinces } = useProvinces();
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<any>();

  const [convertProvinType, setConvertProvinType] = useState<Option[]>([]);

  useEffect(() => {
    const convert = dataProvinces.map((item) => ({
      label: item.provinceName,
      value: item.provinceName,
    }));
    setConvertProvinType(convert);
  }, [dataProvinces]);

  const convertCustomerType = (dataCustomType || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const notification = useNotification();

  const dispatch = useDispatch();

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
    phone: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "Số điện thoại không đúng")
      .min(10, "Số điện thoại không được dưới 10 số")
      .max(10, "Số điện thoại không được nhiều hơn 10 số")
      .required(validateLine.required)
      .default(""),
    idNumber: yup
      .string()
      //   .min(9, "Số CCCD/CMND không được dưới 9 số")
      .max(12, "Số CCCD/CMND quá dài")
      .matches(
        Regexs.idNumber,
        "CMND gồm 9 chữ số , CCCD gồm 12 chữ số , Hộ chiếu gồm 1 chữ cái hoa và 7 chữ số"
      )
      .required(validateLine.required)
      .nullable()
      .default(""),
    email: yup
      .string()
      .nullable()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.email, "Email không đúng")
      .default(""),
  });

  useEffect(() => {
    (async () => {
      try {
        const responseUser = await getUserInfoApi();

        dispatch(getUserInfo(responseUser.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [rerender, dispatch]);

  const detailUser = useSelector(
    (state: RootState) => state?.profile?.userInfo
  );

  const formController = useForm<ProfileI>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const { control, handleSubmit, reset, setValue, watch, getValues } =
    formController;

  const resetAsyncForm = (data) => {
    console.log(data, "data");
    const newData = {
      customerTypeId: data.customerTypeId,
      appellation: data.appellation,
      fullname: data.fullname,
      birth: data.birth,
      phone: data.phone,
      email: data.email,
      idNumber: data.idNumber,
      idReceivePlace: data.idReceivePlace,
      idReceiveDate: data.idReceiveDate && data.idReceiveDate,
      domicile: data.domicile,
      address: data.address,
      avatar: data.avatar,
      district: data?.district ? data?.district : "",
      province: data?.province ? data?.province : "",
      businessRegistration: data?.businessRegistration,
      businessRegistrationName: data?.businessRegistrationName,
      commune: data?.commune ? data?.commune : "",
      provinceContactName: data?.provinceContactName
        ? data?.provinceContactName
        : "",
      districtContactName: data?.districtContactName
        ? data?.districtContactName
        : "",
      communeContactName: data?.communeContactName
        ? data?.communeContactName
        : "",
    };
    reset(newData);
    setInitialValue(newData);
  };

  useEffect(() => {
    if (detailUser?.email) {
      resetAsyncForm(detailUser);
    }
  }, [detailUser]);

  const uploadToClient = async (event) => {
    setLoadingImg(true);
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("category", "avatar");
    postImage(formData)
      .then((res) => {
        setValue("avatar", res?.responseData?.dataUrl);
      })
      .catch((err) =>
        notification({
          title: "Cập nhật ảnh đại diện",
          severity: "error",
          message: "Có lỗi xảy ra!",
        })
      )
      .finally(() => {
        setLoadingImg(false);
      });
    // }
  };

  const uploadFile = async (file) => {
    if (!file) {
      notification({
        severity: "error",
        message: "File không tồn tại",
        title: "Cập nhật giấy CN ĐKDN",
      });
    }
    setLoading(true);
    let formDataFile = new FormData();
    formDataFile.append("imageFile", file);
    postFile(formDataFile)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            title: "Cập nhật giấy CN ĐKDN",
            message: res.responseMessage,
          });
          setValue(
            "businessRegistrationName",
            res.responseData?.businessRegistrationName
          );
          // setInitialValue({
          //   ...watch(),
          //   businessRegistrationName:
          //     res.responseData?.businessRegistrationName,
          // });
        } else {
          setValue("fileImages", "");
          notification({
            severity: "error",
            title: "Cập nhật giấy CN ĐKDN",
            message: res.responseMessage,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setValue("fileImages", "");
        setLoading(false);
        notification({
          severity: "success",
          title: "Cập nhật giấy CN ĐKDN",
          message: "Có lỗi xảy ra",
        });
      });
  };

  const onSubmit = async (values: any) => {
    const body = {
      customerTypeId: values.customerTypeId,
      appellation: values.appellation,
      fullname: values.fullname,
      birth: values.birth,
      phone: values.phone,
      email: values.email,
      idNumber: values.idNumber,
      idReceivePlace: values.idReceivePlace,
      idReceiveDate: values.idReceiveDate && values.idReceiveDate,
      domicile: values.domicile,
      address: values.address,
      avatar: values.avatar,
      attachPaper: document.dataUrl,
      district: values.district,
      province: values.province,
      commune: values.commune,
      provinceContactName: values.provinceContactName,
      districtContactName: values.districtContactName,
      communeContactName: values.communeContactName,
    };

    (async () => {
      setLoading(true);
      try {
        const response = await postChangeInfoApi(body);
        dispatch(changeProfile(response.responseData));
        if (response.responseCode === "00") {
          notification({
            severity: "success",
            title: "Cập nhật hồ sơ",
            message: response.responseMessage,
          });
          forceUpdate();
        } else {
          notification({
            severity: "error",
            title: "Cập nhật hồ sơ",
            message: response.responseMessage,
          });
        }
      } catch (error) {
        notification({
          severity: "error",
          title: "Cập nhật hồ sơ",
          message: "Có lỗi xảy ra!",
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  const getNameFile = (urlString: string) => {
    const arrString = urlString.split("/");
    return arrString?.[arrString.length - 1];
  };

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BoxContainer
        titleHeader="Chỉnh sửa hồ sơ"
        styleCustom={{ padding: "46px 64px" }}
      >
        <AvataContainer>
          {loadingImg ? (
            <CircularProgress />
          ) : (
            <Box sx={{ width: 125, height: 125 }}>
              {/* {detailUser?.avatar && ( */}
              <ImageWithHideOnError
                className="logo"
                src={watch("avatar") ?? "/images/avatar.png"}
                fallbackSrc={"/images/avatar.png"}
                height={125}
                width={125}
                priority
                unoptimized={true}
                style={{ borderRadius: 20 }}
                objectFit="cover"
              />
              {/* )} */}
            </Box>
          )}
          {!loadingImg && (
            <label htmlFor="image">
              <IconWrapper>
                <IconEditWhite />
              </IconWrapper>
            </label>
          )}
          {!loadingImg && (
            <input
              accept="image/*"
              id="image"
              type="file"
              style={{ display: "none" }}
              onChange={uploadToClient}
            />
          )}
        </AvataContainer>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerSelectAutoCompleteEditProfile
                variant="outlined"
                name="customerTypeId"
                label="Đối tượng khách hàng"
                control={control}
                setValue={formController.setValue}
                options={convertCustomerType}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerSelectAutoCompleteEditProfile
                variant="outlined"
                name="appellation"
                label="Danh xưng"
                control={control}
                setValue={formController.setValue}
                options={[
                  { label: "Ông", value: "1" },
                  { label: "Bà", value: "2" },
                ]}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="fullname"
                control={control}
                fullWidth
                label="Họ và tên"
                required
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerReactDateEditProfile
                control={control}
                name="birth"
                label="Ngày sinh"
                maxDate={new Date()}
                labelColor=" #8190a7"
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="phone"
                control={control}
                required
                fullWidth
                label="Điện thoại"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="email"
                control={control}
                fullWidth
                label="Email"
                InputProps={InputProps}
                required
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            {/* <HorizontalLine mb={36} mt={36} /> */}
            <Divider
              style={{ color: "#D8D8D8", marginBottom: 36, marginTop: 36 }}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="idNumber"
                required
                control={control}
                fullWidth
                label="Số CCCD/CMND"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <TextFileUpload>Đính kèm giấy CN ĐKDN</TextFileUpload>
              <AttachWrapper>
                {!!getValues("businessRegistrationName") && (
                  <a
                    href={getValues("businessRegistration")}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <UploadButton>
                      {getNameFile(getValues("businessRegistrationName"))}
                      &nbsp;&nbsp;
                      <IconDownloadPTG />
                    </UploadButton>
                  </a>
                )}
                {/* {!!getValues('fileImages') &&
                  <a href={getValues('businessRegistration')} target="_blank" rel="noopener noreferrer" download>
                    <UploadButton>
                      {getValues('fileImages')?.name}&nbsp;&nbsp;
                    </UploadButton>
                  </a>} */}
                <UploadButton>
                  <label htmlFor="file">Tải lên</label>
                  <input
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      console.log(event.target.files[0], "123");
                      setValue("fileImages", event?.target?.files?.[0]);
                      uploadFile(event?.target?.files?.[0]);
                    }}
                  />
                </UploadButton>
              </AttachWrapper>
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="idReceivePlace"
                control={control}
                fullWidth
                label="Nơi cấp"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 5 }} fullWidth>
              <ControllerReactDateEditProfile
                control={control}
                name="idReceiveDate"
                label="Ngày cấp"
                maxDate={new Date()}
              />
            </FormGroup>
          </Column>
        </Row>
        {/* <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="address"
                control={control}
                fullWidth
                label="Địa chỉ thường trú"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
        </Row> */}
        <Row>
          <Column>
            <RowStyled aItems={"baseline"} width="100%">
              <Title20Styled
                // mw={175}
                style={{ whiteSpace: "nowrap" }}
              >
                Địa chỉ thường trú
              </Title20Styled>
              <LinedStyled mw={500} />
            </RowStyled>
          </Column>
        </Row>
        <Row customStyle={{ marginTop: "40px" }}>
          <Column>
            <FormGroup>
              <ControllerSelectAutoCompleteEP
                variant="outlined"
                name="province"
                label="Thành phố/Tỉnh"
                control={control}
                setValue={setValue}
                options={convertProvinType}
                onChangeExtra={() => {
                  setValue("district", "");
                  setValue("commune", "");
                }}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <DistrictEdit
                name="district"
                label="Quận/Huyện"
                control={control}
                setValue={setValue}
                provinceName={watch("province")}
              />
            </FormGroup>
          </Column>
        </Row>
        {/* <Grid item xs={6}>
          <FormGroup>
            <ControllerSelectAutoComplete
              variant="outlined"
              name="province"
              label="Thành phố/Tỉnh"
              control={control}
              setValue={setValue}
              options={convertProvinType}
              onChangeExtra={() => {
                setValue("district", "");
                setValue("commune", "");
              }}
            />
          </FormGroup>
        </Grid> */}
        {/* <Grid item xs={6}>
          <FormGroup>
            <DistricSelect
              name="district"
              label="Quận/Huyện"
              control={control}
              setValue={setValue}
              provinceName={watch("province")}
            />
          </FormGroup>
        </Grid> */}
        <Row customStyle={{ marginTop: "40px" }}>
          <Column>
            <FormGroup>
              <CommuneEdit
                name="commune"
                label="Xã"
                control={control}
                setValue={setValue}
                districtName={watch("district")}
                provinceName={watch("province")}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <ControllerTextFieldEditProfile
                label=" "
                control={control}
                placeholder="Nhập địa chỉ cụ thể"
                InputProps={{
                  style: {
                    height: "44px",

                    borderRadius: "8px",
                  },
                }}
                variant={"outlined"}
                name={"domicile"}
                fullWidth
              />
            </FormGroup>
          </Column>
        </Row>
        {/* <Grid item xs={6}>
          <FormGroup>
            <CommuneSelect
              name="commune"
              label="Xã"
              control={control}
              setValue={setValue}
              districtName={watch("district")}
              provinceName={watch("province")}
            />
          </FormGroup>
        </Grid> */}
        {/* <Grid item xs={6}>
          <FormGroup>
            <ControllerTextFieldEditProfile
              label=" "
              control={control}
              placeholder="Nhập địa chỉ cụ thể"
              InputProps={{
                style: {
                  height: "44px",
                  border: "1px solid #B8B8B8",
                  borderRadius: "8px",
                },
              }}
              variant={"outlined"}
              name={"address"}
              fullWidth
            />
          </FormGroup>
        </Grid> */}
        <Row customStyle={{ marginTop: "40px" }}>
          <Column>
            <RowStyled aItems={"baseline"} width="100%">
              <Title20Styled
                // mw={175}
                style={{ whiteSpace: "nowrap" }}
              >
                Địa chỉ liên lạc
              </Title20Styled>
              <LinedStyled mw={500} />
            </RowStyled>
          </Column>
        </Row>
        {/* <Grid item xs={12}>
          <RowStyled aItems={"baseline"} width={670}>
            <Title20Styled
              // mw={175}
              style={{ whiteSpace: "nowrap" }}
            >
              Địa chỉ liên lạc
            </Title20Styled>
            <LinedStyled mw={500} />
          </RowStyled>
        </Grid> */}
        <Row customStyle={{ marginTop: "40px" }}>
          <Column>
            <FormGroup>
              <ControllerSelectAutoCompleteEP
                variant="outlined"
                name="provinceContactName"
                label="Thành phố/Tỉnh"
                control={control}
                setValue={setValue}
                options={convertProvinType}
                onChangeExtra={() => {
                  setValue("districtContactName", "");
                  setValue("communeContactName", "");
                }}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <DistrictEdit
                name="districtContactName"
                label="Quận/Huyện"
                control={control}
                setValue={setValue}
                provinceName={watch("provinceContactName")}
              />
            </FormGroup>
          </Column>
        </Row>
        {/* <Grid item xs={6}>
          <FormGroup>
            <ControllerSelectAutoComplete
              variant="outlined"
              name="provinceContactName"
              label="Thành phố/Tỉnh"
              control={control}
              setValue={setValue}
              options={convertProvinType}
              onChangeExtra={() => {
                setValue("districtContactName", "");
                setValue("communeContactName", "");
              }}
            />
          </FormGroup>
        </Grid> */}
        {/* <Grid item xs={6}>
          <FormGroup>
            <DistricSelect
              name="districtContactName"
              label="Quận/Huyện"
              control={control}
              setValue={setValue}
              provinceName={watch("provinceContactName")}
            />
          </FormGroup>
        </Grid> */}
        <Row customStyle={{ marginTop: "40px" }}>
          <Column>
            <FormGroup>
              <CommuneEdit
                name="communeContactName"
                label="Xã"
                control={control}
                setValue={setValue}
                districtName={watch("districtContactName")}
                provinceName={watch("provinceContactName")}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <ControllerTextFieldEditProfile
                label=" "
                control={control}
                variant={"outlined"}
                InputProps={{
                  style: {
                    height: "44px",

                    borderRadius: "8px",
                  },
                }}
                name={"address"}
                fullWidth
                placeholder="Nhập địa chỉ cụ thể"
              />
            </FormGroup>
          </Column>
        </Row>
        {/* <Grid item xs={6}>
          <FormGroup>
            <CommuneSelect
              name="communeContactName"
              label="Xã"
              control={control}
              setValue={setValue}
              districtName={watch("districtContactName")}
              provinceName={watch("provinceContactName")}
            />
          </FormGroup>
        </Grid> */}
        {/* <Grid item xs={6}>
          <FormGroup>
            <ControllerTextFieldEditProfile
              label=" "
              control={control}
              variant={"outlined"}
              InputProps={{
                style: {
                  height: "44px",
                  border: "1px solid #B8B8B8",
                  borderRadius: "8px",
                },
              }}
              name={"address"}
              fullWidth
              placeholder="Nhập địa chỉ cụ thể"
            />
          </FormGroup>
        </Grid> */}
        {/* <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextFieldEditProfile
                variant="outlined"
                hiddenLabel
                name="address"
                control={control}
                fullWidth
                label="Địa chỉ liên lạc"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerSelectAutoComplete
                variant="outlined"
                name="province"
                label="Thành phố/Tỉnh"
                control={control}
                setValue={setValue}
                options={convertProvinType}
                onChangeExtra={() => {
                  setValue("district", "");
                }}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup fullWidth>
              <DistricSelect
                name="district"
                label="Quận/Huyện"
                control={control}
                setValue={setValue}
                provinceName={watch("province")}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup fullWidth>
              <CommuneSelect
                name="commune"
                label="Xã"
                control={control}
                setValue={setValue}
                districtName={watch("district")}
              />
            </FormGroup>
          </Column>
        </Row> */}
        <Row>
          <Column>
            {/* <ButtonAction>Cập nhật</ButtonAction> */}
            <StyledEditProfileBtn
              type="submit"
              sx={{ my: 2 }}
              disabled={loading || isEqual(initialValue, watch())}
            >
              {!loading ? (
                <Text18Styled color={"#fff"} fontSize={18} fontWeight={400}>
                  Lưu thông tin
                </Text18Styled>
              ) : (
                <CircularProgress
                  style={{ height: 25, width: 25, color: "#ffffff" }}
                />
              )}
            </StyledEditProfileBtn>
          </Column>
        </Row>
      </BoxContainer>
    </form>
  );
};

export default EditProfile;

const StyledEditProfileBtn = styled(ButtonAction)({
  width: 255,
  marginTop: 47,
  backgroundColor: "#1b3459",
  "&:hover": {
    backgroundColor: "#fcc83c",
  },
});
