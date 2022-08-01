import CustomButton from "@components/CustomComponent/CustomButton";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import { IconEmail, IconLocation, PhoneIconPage } from "@components/Icons";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import Page from "@layouts/Page";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Grid, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import useNotification from "hooks/useNotification";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import * as yup from "yup";
import { RootState } from "../../store/store";
import {
  createContactAPI
} from "../api/contactApi";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .max(255, "Tài khoản không được chứa quá 255 ký tự")
    .required(validateLine.required)
    .default(""),
  email: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .max(255, "Tài khoản không được chứa quá 255 ký tự")
    .matches(Regexs.email, "Email không đúng")
    .required(validateLine.required)
    .default(""),
  phoneNumber: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .max(255, "Tài khoản không được chứa quá 255 ký tự")
    .required(validateLine.required)
    .default(""),
  content: yup
    .string()
    .trim(validateLine.trim)
    .strict(true)
    .max(255, "Tài khoản không được chứa quá 255 ký tự")
    .required(validateLine.required)
    .default(""),
});

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  content: string;
}

const Contact = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });
  const notification = useNotification();
  const generalInfo = useSelector((state: RootState) => state.generalInfo);

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    createContactAPI({
      ...data,
    })
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: `Chúng tôi đã nhận được thông tin của bạn`,
          });
          reset(validationSchema.getDefault());
        }
      })
      .catch(() => {
        notification({
          severity: "success",
          message: `Có lỗi sảy ra, xin vui lòng thử lại sau`,
        });
      });
  };

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Thông tin khuyến mãi",
        description: "TNR Ecommerce  Thông tin khuyến mãi",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <StyledContact>
          <div className="wrap">
            <div className="title">Liên hệ</div>
            <div className="subtitle">
              Hãy để chúng tôi được kết nối với bạn
            </div>
          </div>

          <StyledMainPaper>
            <StyledContactInfo>
              <div className="info__title">Thông tin liên lạc</div>
              <div className="contact__item">
                <div className="icon">
                  <PhoneIconPage />
                </div>
                <div className="label">{generalInfo.phoneNumber}</div>
              </div>
              <div className="contact__item">
                <div className="icon">
                  <IconEmail />
                </div>
                <div className="label">{generalInfo.email}</div>
              </div>
              <div className="contact__item">
                <div className="icon">
                  <IconLocation />
                </div>
                <div className="label">{generalInfo.address}</div>
              </div>
              <img src="./images/contact_bg.png" className="image" />
            </StyledContactInfo>
            <StyledForm>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormGroup sx={{ mb: 3, mt: 3 }} fullWidth>
                      <ControllerTextField
                        variant="outlined"
                        hiddenLabel
                        name="name"
                        control={control}
                        placeholder="Tên của bạn"
                        required
                        fullWidth
                        label="Tên của bạn"
                        labelColor="#666666"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PermIdentityIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormGroup>
                    <FormGroup sx={{ mb: 2.5, mt: 2.5 }} fullWidth>
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormGroup>
                    <FormGroup sx={{ mb: 2.6, mt: 2.5 }} fullWidth>
                      <ControllerTextField
                        variant="outlined"
                        hiddenLabel
                        name="phoneNumber"
                        control={control}
                        placeholder="Số điện thoại"
                        required
                        fullWidth
                        label="Số điện thoại"
                        labelColor="#666666"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup sx={{ mb: 3, mt: 3 }} fullWidth>
                      <ControllerTextField
                        variant="outlined"
                        hiddenLabel
                        name="content"
                        control={control}
                        placeholder="..."
                        required
                        fullWidth
                        label="Tin nhắn của bạn"
                        labelColor="#666666"
                        multiline
                        rows={10}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ width: "20px" }} />

                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "15px",
                                  left: "10px",
                                }}
                              >
                                <CommentOutlinedIcon />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <div className="submit-btn">
                  <CustomButton
                    label="Gửi tin nhắn"
                    style={{ background: "#D60000", width: "fit-content" }}
                    type="submit"
                  />
                </div>
              </form>
            </StyledForm>
          </StyledMainPaper>
        </StyledContact>
      </FlexContainer>
    </Page>
  );
};

const StyledContact = styled.div`
  margin-top: 167px;
  width: 100%;

  & .wrap {
    text-align: center;
  }

  & .title {
    font-size: 44px;
    font-weight: 700;
    color: #1b3459;
  }

  & .subtitle {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-top: 15px;
  }
`;

const StyledMainPaper = styled.div`
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0px 4px 64px 16px rgba(0, 0, 0, 0.04);
  margin-top: 28px;
  border-radius: 20px;
  width: 100%;
  max-width: 1108px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 120px;
  display: flex;
  column-gap: 30px;
`;

const StyledContactInfo = styled.div`
  width: 330px;
  background-color: #ccc;
  position: relative;
  background: linear-gradient(
    150.56deg,
    #1b3459 -3.46%,
    rgba(27, 52, 89, 0.69) 104.46%
  );
  border-radius: 20px;
  padding: 24px;
  color: #f3f4f6;

  & .info__title {
    font-weight: 500;
    font-size: 18px;
  }

  & .image {
    position: absolute;
    bottom: 0;
    right: 0;
    user-select: none;
    -webkit-user-drag: none;
  }

  & .icon {
    width: 24px;
    height: 24px;
  }

  & .contact__item {
    display: flex;
    margin-top: 32px;
  }

  & .label {
    font-weight: 500;
    font-size: 16px;
    margin-left: 24px;
  }
`;

const StyledForm = styled.div`
  padding: 31px;
  padding-right: 0;
  flex: 1;

  & .submit-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 28px;
  }
`;

export default Contact;
