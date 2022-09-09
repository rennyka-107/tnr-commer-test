import { Text14Styled } from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import IconUploadFile from "@components/Icons/IconUploadFile";
import {
  resetAllFileFinishTransaction,
  setFileFinishTransaction,
} from "../../../store/paymentSlice";
import { apiUploadFile } from "../../../pages/api/cartApi";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";

type Props = {
  renderSelect: 0 | 1 | 2;
  setRenderSelect: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  transactionCode: string;
};
const WrapperBoxStyled = styled(Box)({
  width: "60%",
  border: "2px solid #F2F4F5",
  borderStyle: "dotted",
  borderRadius: "20px",
  boxSizing: "border-box",
  padding: "20px 30px 40px",
});
const InputUpload = styled.input({
  position: "absolute",
  top: 0,
  left: 0,
  cursor: "pointer",
  width: "100%",
  height: "100%",
  opacity: 0,
});

const FileUpload = ({
  renderSelect,
  setRenderSelect,
  transactionCode,
}: Props) => {
  const dispatch = useDispatch();
  const { fileIdNumberFront, fileIdNumberBehind, fileIdNumberHouseHold } =
    useSelector((state: RootState) => state.payments);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(fileIdNumberFront, fileIdNumberBehind, fileIdNumberHouseHold);
  const notification = useNotification();
  const onFileDrop = (e) => {
    const reader = new FileReader();
    const tarFile = e.target.files[0];
    reader.readAsDataURL(tarFile);
    reader.onload = () => {
      if (reader.readyState === 2) {
        switch (renderSelect) {
          case 0:
            dispatch(
              setFileFinishTransaction({
                type: 0,
                file: {
                  file: tarFile,
                  name: tarFile.name,
                  path: reader.result,
                },
              })
            );
            break;
          case 1:
            dispatch(
              setFileFinishTransaction({
                type: 1,
                file: {
                  file: tarFile,
                  name: tarFile.name,
                  path: reader.result,
                },
              })
            );
            break;
          case 2:
            dispatch(
              setFileFinishTransaction({
                type: 2,
                file: {
                  file: tarFile,
                  name: tarFile.name,
                  path: reader.result,
                },
              })
            );
            break;
        }
      }
    };
  };

  const onRemoveFile = () => {
    switch (renderSelect) {
      case 0:
        dispatch(
          setFileFinishTransaction({
            type: 0,
            file: {
              file: null,
              name: "",
              path: "",
            },
          })
        );
        break;
      case 1:
        dispatch(
          setFileFinishTransaction({
            type: 1,
            file: {
              file: null,
              name: "",
              path: "",
            },
          })
        );
        break;
      case 2:
        dispatch(
          setFileFinishTransaction({
            type: 2,
            file: {
              file: null,
              name: "",
              path: "",
            },
          })
        );
        break;
    }
  };

  return (
    <Box
      maxWidth={730}
      width={"100%"}
      mt={"10px"}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <WrapperBoxStyled sx={{ cursor: "pointer" }}>
        <Box
          width={"100%"}
          height={"100%"}
          position={"relative"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InputUpload
            accept="image/*"
            type="file"
            value=""
            onChange={onFileDrop}
            disabled={loading}
          />
          <IconUploadFile />
          <Typography
            sx={{
              color: "#000000",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            Ấn hoặc kéo thả ảnh tại đây để tải lên
          </Typography>
        </Box>
      </WrapperBoxStyled>
      {((!isEmpty(fileIdNumberFront.path) && renderSelect === 0) ||
        (!isEmpty(fileIdNumberBehind.path) && renderSelect === 1) ||
        (!isEmpty(fileIdNumberHouseHold.path) && renderSelect === 2)) && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            p: "20px",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 81, height: 62 }}
            src={
              renderSelect === 0
                ? fileIdNumberFront.path
                : renderSelect === 1
                ? fileIdNumberBehind.path
                : fileIdNumberHouseHold.path
            }
            alt="clear"
          />
          <Text14Styled color={"#000"}>
            {renderSelect === 0
              ? fileIdNumberFront.name
              : renderSelect === 1
              ? fileIdNumberBehind.name
              : fileIdNumberHouseHold.name}
          </Text14Styled>
          <Button
            sx={{
              borderRadius: "8px",
              border: "1px solid #C7C9D9",
              fontSize: "14px",
              lineHeight: "16px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "none",
            }}
            onClick={onRemoveFile}
            disabled={loading}
          >
            Xóa
          </Button>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: "20px",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            if (renderSelect > 0) {
              setRenderSelect((renderSelect - 1) as 0 | 1 | 2);
            }
          }}
          disabled={renderSelect === 0 || loading}
          sx={{
            border: "1px solid #48576D",
            background: "#FFFFFF",
            width: "49%",
            textTransform: "none",
            color: "#000000",
          }}
        >
          Trở lại
        </Button>
        <Button
          onClick={() => {
            if (renderSelect === 2) {
              setLoading(true);
              const data = new FormData();
              data.append("multipartFileList", fileIdNumberFront.file);
              data.append("mediaTypeList", "0");
              data.append("multipartFileList", fileIdNumberBehind.file);
              data.append("mediaTypeList", "1");
              data.append("multipartFileList", fileIdNumberHouseHold.file);
              data.append("mediaTypeList", "2");
              data.append("paymentCode", transactionCode as string);
              // data.append("isMobileBanking", "0");
              apiUploadFile(data)
                .then((response) => {
                  if (!isEmpty(response.responseData)) {
                    notification({
                      severity: "success",
                      title: "Hoàn thành hồ sơ",
                      message: response.responseMessage,
                    });
                    dispatch(resetAllFileFinishTransaction());
                    router.push("/result-payment?errorCode=0");
                  } else {
                    notification({
                      severity: "error",
                      title: "Hoàn thành hồ sơ",
                      message: response.responseMessage,
                    });
                  }
                  setLoading(false);
                })
                .catch((err) => {
                  notification({
                    severity: "error",
                    title: "Hoàn thành hồ sơ",
                    message: "Có lỗi xảy ra",
                  });
                  setLoading(false);
                });
            } else {
              setRenderSelect((renderSelect + 1) as 0 | 1 | 2);
            }
          }}
          sx={{
            width: "49%",
            textTransform: "none",
            color: renderSelect === 2 ? "#FFFFFF" : "#000000",
            background: renderSelect === 2 ? "#EA242A" : "#FFCC00",
            "&:hover":
              renderSelect === 2
                ? {
                    background: "#FEC83C !important",
                    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
                    color: "#ffffff",
                  }
                : "unset",
          }}
          disabled={
            (renderSelect === 0 && isEmpty(fileIdNumberFront.path)) ||
            (renderSelect === 1 && isEmpty(fileIdNumberBehind.path)) ||
            (renderSelect === 2 && isEmpty(fileIdNumberHouseHold.path)) ||
            loading
          }
        >
          {renderSelect === 2 ? (
            loading ? (
              <CircularProgress
                style={{ height: 25, width: 25, color: "#ffffff" }}
              />
            ) : (
              "Hoàn tất"
            )
          ) : (
            "Tiếp tục"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;
