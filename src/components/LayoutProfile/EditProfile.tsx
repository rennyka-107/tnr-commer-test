import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import CustomButton from "@components/CustomComponent/CustomButton";
import HorizontalLine from "@components/CustomComponent/HorizontalLine";
import Row from "@components/CustomComponent/Row";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import ControllerSelectAutoComplete from "@components/Form/ControllerSelectAutoComplete";
import ControllerTextField from "@components/Form/ControllerTextField";
import DistricSelect from "@components/Form/DistrictSelect";
import FormGroup from "@components/Form/FormGroup";
import { IconDownloadPTG, IconEditWhite } from "@components/Icons";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { ProfileI } from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import useCustomType from "hooks/useCustomtype";
import useForceUpdate from "hooks/useForceUpdate";
import useNotification from "hooks/useNotification";
import useProvinces from "hooks/useProvinces";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl, InputProps, validateLine } from "utils/constants";
import { isValidFileImage } from "utils/helper";
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
  right: 305px;
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
  value: number;
}

const EditProfile = () => {
  const [document, setDocument] = useState({ fileName: "", dataUrl: "" });
  const [rerender, forceUpdate] = useForceUpdate();
  const { dataCustomType } = useCustomType();
  const { dataProvinces } = useProvinces();
  const [loadingImg, setLoadingImg] = useState(false);

  const [convertProvinType, setConvertProvinType] = useState<Option[]>([]);

  useEffect(() => {
    console.log("dataProvinces", dataProvinces);
    
    const convert = dataProvinces.map((item) => ({
      label: item.provinceName,
      value: item.provinceId,
    }));
    setConvertProvinType(convert);
  }, [dataProvinces]);

  console.log("dataProvincesdataProvinces", convertProvinType);

  const convertCustomerType = (dataCustomType || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const notification = useNotification();

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    fullname: yup.string().required(validateLine.required),
    phone: yup
      .string()
      .nullable()
      .trim(validateLine.trim)
      .strict(true)
      .max(10, "S??? ??i???n tho???i qu?? d??i")
      .matches(Regexs.phone, "S??? ??i???n tho???i kh??ng ????ng")
      .required(validateLine.required)
      .default(""),
    idNumber: yup.string().required(validateLine.required).nullable(),
    email: yup
      .string()
      .nullable()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.email, "Email kh??ng ????ng")
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

  const resetAsyncForm = useCallback(
    async (data) => {
      reset({
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
        avatarThumbnailUrl: imageUrl + data.avatarThumbnailUrl,
        attachPaper: imageUrl + data.attachPaper,
        attachPaperThumbnailUrl: imageUrl + data.attachPaperThumbnailUrl,
        district: data?.district ? Number(data?.district) : "",
        province: data?.province ? Number(data?.province) : "",
        businessRegistration: data?.businessRegistration,
        businessRegistrationName: data?.businessRegistrationName,
      });
    },

    [reset]
  );

  useEffect(() => {
    if (detailUser?.email) {
      resetAsyncForm(detailUser);
    }
  }, [detailUser]);

  const uploadToClient = async (event) => {
    if (
      isValidFileImage(event.target.value, () => {
        notification({
          error: "Kh??ng ????ng ?????nh d???ng ???nh!",
        });
      })
    ) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("category", "avatar");
      setLoadingImg(true);
      postImage(formData)
        .then((res) =>
          setValue("avatar", imageUrl + res?.responseData?.dataUrl)
        )
        .catch((err) => err)
        .finally(() => {
          setLoadingImg(false);
        });
    }
  };

  const uploadFile = async (file) => {
    if (!file) {
      notification({
        severity: "error",
        message: "File kh??ng t???n t???i",
        title: "Upload file",
      });
    }
    let formDataFile = new FormData();
    formDataFile.append("imageFile", file);
    postFile(formDataFile)
      .then((res) => {
        notification({
          severity: "success",
          title: "C???p nh???t th??ng tin h??? s??",
          message: res.responseMessage,
        });
        forceUpdate();
      })
      .catch((err) => err);
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
      avatarThumbnailUrl: values.avatarThumbnailUrl,
      attachPaper: document.dataUrl,
      district: values.district,
      province: values.province,
    };

    (async () => {
      try {
        const response = await postChangeInfoApi(body);
        dispatch(changeProfile(response.responseData));
        if (response.responseCode === "00") {
          notification({
            severity: "success",
            title: "C???p nh???t file ???nh",
            message: response.responseMessage,
          });
          forceUpdate();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const getNameFile = (urlString: string) => {
    const arrString = urlString.split("/");
    return arrString?.[arrString.length - 1];
  };

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
      <BoxContainer
        titleHeader="Ch???nh s???a h??? s??"
        styleCustom={{ padding: "21px 24px" }}
      >
        <AvataContainer>
          {loadingImg ? (
            <span>....Loading</span>
          ) : (
            <Box sx={{ width: 125, height: 125 }}>
              {detailUser.avatar && (
                <ImageWithHideOnError
                  className="logo"
                  src={watch("avatar") ?? "/images/avatar.png"}
                  fallbackSrc={"/images/avatar.png"}
                  height={125}
                  width={125}
                  priority
                  unoptimized={true}
                  objectFit="cover"
                />
              )}
            </Box>
          )}
          <label htmlFor="image">
            <IconWrapper>
              <IconEditWhite />
            </IconWrapper>
          </label>
          <input
            accept="image/*"
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={uploadToClient}
          />
        </AvataContainer>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerSelectAutoComplete
                variant="outlined"
                name="customerTypeId"
                label="?????i t?????ng kh??ch h??ng"
                control={control}
                setValue={formController.setValue}
                options={convertCustomerType}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerSelectAutoComplete
                variant="outlined"
                name="appellation"
                label="Danh x??ng"
                control={control}
                setValue={formController.setValue}
                options={[
                  { label: "??ng", value: 1 },
                  { label: "B??", value: 2 },
                ]}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="fullname"
                control={control}
                fullWidth
                label="H??? v?? t??n"
                required
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerReactDatePicker
                control={control}
                name="birth"
                label="Ng??y sinh"
                maxDate={new Date()}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="phone"
                control={control}
                required
                fullWidth
                label="??i???n tho???i"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup fullWidth>
              <ControllerTextField
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
            <HorizontalLine mb={36} mt={36} />
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="idNumber"
                required
                control={control}
                fullWidth
                label="S??? CCCD/CMND"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <TextFileUpload>????nh k??m gi???y CN ??KDN</TextFileUpload>
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
                  <label htmlFor="file">T???i l??n</label>
                  <input
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
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
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="idReceivePlace"
                control={control}
                fullWidth
                label="N??i c???p"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerReactDatePicker
                control={control}
                name="idReceiveDate"
                label="Ng??y c???p"
                maxDate={new Date()}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="domicile"
                control={control}
                fullWidth
                label="?????a ch??? th?????ng tr??"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="address"
                control={control}
                fullWidth
                label="?????a ch??? li??n l???c"
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
                label="Th??nh ph???/T???nh"
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
                label="Qu???n/Huy???n"
                control={control}
                setValue={setValue}
                idProvince={Number(watch("province"))}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <CustomButton
              label="C???p nh???t"
              style={{ background: "#1B3459", width: 255, marginTop: 47 }}
              type="submit"
            />
          </Column>
        </Row>
      </BoxContainer>
    </form>
  );
};

export default EditProfile;
