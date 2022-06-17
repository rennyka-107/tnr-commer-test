import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import CustomButton from "@components/CustomComponent/CustomButton";
import HorizontalLine from "@components/CustomComponent/HorizontalLine";
import Row from "@components/CustomComponent/Row";
import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerSelectAutoComplete from "@components/Form/ControllerSelectAutoComplete";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import { IconEditWhite } from "@components/Icons";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl, InputProps, validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import {
  getListCustomerType,
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
  margin-top: 33px;
`;

const UploadButton = styled(Button)`
  height: 24px;
  width: 64px;
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
  justify-content: end;
`;

const EditProfile = () => {
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [createFileObjectURL, setCreateFileObjectURL] = useState(null);
  const [customerType, setCustomerType] = useState([]);
  const [avatar, setAvatar] = useState({ dataUrl: "", thumbnailUrl: "" });
  const [document, setDocument] = useState({ fileName: "", dataUrl: "" });

  console.log("avatar", avatar);

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    fullname: yup.string().required(validateLine.required),
    phone: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.phone, "Số điện thoại không đúng")
      .required(validateLine.required)
      .default(""),
    idNumber: yup.string().required(validateLine.required),
    email: yup
      .string()
      .trim(validateLine.trim)
      .strict(true)
      .matches(Regexs.email, "Email không đúng")
      .default(""),
  });

  useEffect(() => {
    (async () => {
      try {
        getListCustomerType().then((response) => {
          if (response.responseCode === "00") {
            setCustomerType(response.responseData);
          }
        });
        const responseUser = await getUserInfoApi();
        dispatch(getUserInfo(responseUser.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const convertCustomerType = (customerType || []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const detailUser = useSelector((state: RootState) => state.profile.userInfo);

  const formController = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const { control, handleSubmit, reset } = formController;

  const resetAsyncForm = useCallback(
    async (data) => {
      reset({
        customerTypeId: data.customerTypeId,
        appellation: data.appellation,
        fullname: data.fullname,
        birth: data.birth && data.birth.split("-").reverse().join("-"),
        phone: data.phone,
        email: data.email,
        idNumber: data.idNumber,
        idReceivePlace: data.idReceivePlace,
        idReceiveDate:
          data.idReceiveDate &&
          data.idReceiveDate.split("-").reverse().join("-"),
        domicile: data.domicile,
        address: data.address,
        avatar: data.avatar,
        avatarThumbnailUrl: imageUrl + data.avatarThumbnailUrl,
        attachPaper: imageUrl + data.attachPaper,
        attachPaperThumbnailUrl: imageUrl + data.attachPaperThumbnailUrl,
        district: data.district,
        province: data.province,
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
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setCreateObjectURL(URL.createObjectURL(i));
    }
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("category", "avatar");

    postImage(formData)
      .then((res) => setAvatar(res.responseData))
      .catch((err) => err);
  };

  const uploadFile = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setCreateFileObjectURL(URL.createObjectURL(i));
    }
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("category", "avatar");

    postFile(formData)
      .then((res) => {
        if (res.responseCode === "00") {
          setDocument(res.responseData);
        }
        else{
          alert("Định dạng File là docx, xlsx hoặc PDF")
        }
      })
      .catch((err) => err);
  };

  const onSubmit = async (values: any) => {
    const body = {
      customerTypeId: values.customerTypeId,
      appellation: values.appellation,
      fullname: values.fullname,
      birth: values.birth && values.birth.split("-").reverse().join("-"),
      phone: values.phone,
      email: values.email,
      idNumber: values.idNumber,
      idReceivePlace: values.idReceivePlace,
      idReceiveDate:
        values.idReceiveDate &&
        values.idReceiveDate.split("-").reverse().join("-"),
      domicile: values.domicile,
      address: values.address,
      avatar: imageUrl + avatar.dataUrl,
      avatarThumbnailUrl: imageUrl + avatar.thumbnailUrl,
      attachPaper: document.dataUrl,
      district: values.district,
      province: values.province,
    };

    (async () => {
      try {
        const response = await postChangeInfoApi(body);

        dispatch(changeProfile(response.responseData));
        if (response.responseCode === "00") {
          alert("Thay đổi thông tin thành công!");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
      <BoxContainer
        titleHeader="Chỉnh sửa hồ sơ"
        styleCustom={{ padding: "21px 24px" }}
      >
        <AvataContainer>
          <Image
            src={createObjectURL || "/images/avatar.png"}
            alt=""
            width={125}
            height={125}
            style={{ borderRadius: 20 }}
          />
          <label htmlFor="image">
            <IconWrapper>
              <IconEditWhite />
            </IconWrapper>
          </label>
          <input
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
                label="Đối tượng khách hàng"
                control={control}
                setValue={formController.setValue}
                options={convertCustomerType}
                defaultValue="Cá nhân"
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerSelectAutoComplete
                variant="outlined"
                name="appellation"
                label="Danh xưng"
                control={control}
                setValue={formController.setValue}
                options={[
                  { label: "Ông", value: 1 },
                  { label: "Bà", value: 2 },
                ]}
                defaultValue="Ông"
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
                label="Họ và tên"
                required
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerDatePicker
                control={control}
                name="birth"
                label="Ngày sinh"
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
                label="Điện thoại"
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
                label="Số CCCD/CMND"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <AttachWrapper>
              <span>Đính kèm giấy CN ĐKDN</span>
              <UploadButton>
                <label htmlFor="file">Tải lên</label>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={uploadFile}
                />
              </UploadButton>
            </AttachWrapper>
          </Column>
        </Row>
        <Row>
          <Column>
            <FileContainer>
              <div>{document.fileName}</div>
            </FileContainer>
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
                label="Nơi cấp"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup sx={{ mb: 2 }} fullWidth>
              <ControllerDatePicker
                control={control}
                name="idReceiveDate"
                label="Ngày cấp"
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
                label="Địa chỉ thường trú"
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
                label="Địa chỉ liên lạc"
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
                name="province"
                control={control}
                fullWidth
                label="Thành phố/Tỉnh"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup fullWidth>
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="district"
                control={control}
                fullWidth
                label="Quận/Huyện"
                InputProps={InputProps}
              />
            </FormGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <CustomButton
              label="Cập nhật"
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
