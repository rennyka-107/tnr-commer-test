import React, { useState } from "react";
import styled from "@emotion/styled";
import Input from "@mui/material/Input";
import CustomButton from "@components/CustomComponent/CustomButton";
import { postEmailRegister } from "../../../../pages/api/emailApi";
import { Backdrop, Button, FormGroup, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useNotification from "hooks/useNotification";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerInputDatLich from "@components/Form/ControllerInputDatLich";
import ControllerInputRegisterEmail from "@components/Form/ControllerInputRegisterEmail";

const WrapContainerFooterTop = styled.div`
  background: #fec83c;
  width: 100%;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

const ChildWrapFooterTop = styled.div`
  font-size: 16px;
  min-height: 110px;
  color: #1b3459;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;

  @media (max-width: 1000px) {
    gap: 2rem;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    display: inline-flex;
  }
`;

const RegisterInfoLine = styled.span`
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`;

const DivInput = styled.div`
  min-width: 276px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const DivButton = styled.div`
  @media (max-width: 900px) {
    margin-bottom: 21px;
    width: 100%;
  }
`;

const WrapFlexOne = styled.div`
  display: flex;
  gap: 66px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 13px;
    margin-top: 21px;
  }
`;

const TypoGrapTitle = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  /* Brand/Text */

  color: #0e1d34;
`;
const TypoGraphyBody = styled(Typography)`
  width: 434px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  text-align: center;

  /* Brand/Text */

  color: #0e1d34;
`;

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  button: {
    textTransform: "none",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    height: 48,
    width: 164,
    backgroundColor: "#EA242A",
    color: "#ffffff",
    borderRadius: 60,
    "&:hover": {
      backgroundColor: "#ffffff",
      border: "1px solid #EA242A",
      color: "#0E1D34",
    },
  },
});

type Props = {};

const FooterTop = (props: Props) => {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [open, setOpen] = useState(false);
  const notification = useNotification();
  const handleChange = (event) => {
    setEmailValue(event.target.value);
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim(validateLine.trim)
      .required(validateLine.required)
      .strict(true)
      .matches(Regexs.email, "Email không đúng")
      .default(""),
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSumitEmail = async (values: any) => {
    try {
      const response = await postEmailRegister(values);
      console.log(response);
      if (response.responseCode === "00") {
        setOpen(true);
        setEmailValue("");
		reset({email: ""})
      } else if (response.responseCode === "9999") {
        notification({
          severity: "error",
          title: `Gửi mail thất bại`,
          message: `Gửi yêu cầu lỗi hoặc email bị trùng lặp`,
        });
      }
    } catch (error) {
      notification({
        severity: "error",
        title: `Gửi mail thất bại`,
        message: `Gửi yêu cầu lỗi hoặc email bị trùng lặp`,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchBackDrop = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Paper style={{ borderRadius: 10 }}>
          <div
            style={{
              padding: 65,
              display: "flex",
              flexDirection: "column",
              gap: 25,
              alignItems: "center",
            }}
          >
            <TypoGrapTitle>Đăng ký nhận tin thành công!</TypoGrapTitle>
            <TypoGraphyBody>
              Quý khách sẽ nhận được tin tức khuyến mãi mới nhất từ TNR
              Holdings.
            </TypoGraphyBody>
            <Button className={classes.button}>Đóng</Button>
          </div>
        </Paper>
      </Backdrop>
    );
  };
  return (
    <WrapContainerFooterTop>
      <ChildWrapFooterTop>
        <form
          noValidate
          onSubmit={handleSubmit(handleSumitEmail)}
          autoComplete="off"
        >
          <WrapFlexOne>
            {fetchBackDrop()}
            <RegisterInfoLine>
              Đăng ký để nhận thông tin dự án sớm nhất
            </RegisterInfoLine>

            <DivInput>
              <FormGroup style={{height: 50}}>
                <ControllerInputRegisterEmail
                  variant="outlined"
                  hiddenLabel
                  name="email"
                  control={control}
                  placeholder="Email"
                  required
                  fullWidth
                  labelColor="#666666"
                />
              </FormGroup>
            </DivInput>
            <FormGroup>
              <div style={{ width: "100%"}}>
                <CustomButton
                  style={{ width: "100%" }}
                  label="Đăng ký"
                  type="submit"
                  // onClick={() => handleSumitEmail()}
                />
              </div>
            </FormGroup>

            {/* <DivInput>
              <Input
                required
                sx={{ width: "100%", mb: 2 }}
                placeholder="Email"
                // value={emailValue}
				name="email"
                // onChange={(e) => handleChange(e)}
              />
            </DivInput> */}
          </WrapFlexOne>
          {/* <DivButton>
            <CustomButton
              style={{ width: "100%" }}
              label="Đăng ký"
              type="submit"
              // onClick={() => handleSumitEmail()}
            />
          </DivButton> */}
        </form>
      </ChildWrapFooterTop>
    </WrapContainerFooterTop>
  );
};
export default FooterTop;
