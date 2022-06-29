import { IconAttach, IconRemove } from "@components/Icons";
import {
  RowStyled,
  Text14Styled,
  Text18Styled,
  Title28Styled,
} from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { apiUploadFile } from "../../../../pages/api/cartApi";

type Props = {};
const WrapperBoxStyled = styled(Box)({
  width: "100%",
  border: "2px solid #FEC83C",
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

const FileUpload = (props: Props) => {
  const [urlPhoto, setUrlPhoto] = useState([]);
  const { query: {transactionCode} } = useRouter();
  const onFileDrop = (e) => {
    const reader = new FileReader();
    const tarFile = e.target.files[0];
    reader.readAsDataURL(tarFile);
    if (urlPhoto.length > 0) {
      const resetUrls = [...urlPhoto];
      const checkUrl = resetUrls.find((item) => item.name === tarFile?.name);
      if (checkUrl) {
        const result = resetUrls.map((item) => {
          if (item.name === tarFile.name) {
            return { ...item, active: true };
          }
          return item;
        });
        setUrlPhoto(result);
      }
    }
    reader.onload = () => {
      if (reader.readyState === 2) {
        const img = {
          name: tarFile.name,
          path: reader.result,
          active: true,
        };
        const urls = [...urlPhoto, img];
        setUrlPhoto(urls);
      }
    };

    // upload file
    const data = new FormData();
    data.append("multipartFileList", tarFile);
    data.append("paymentCode", transactionCode as string);

    apiUploadFile(data).then((response) => console.log(response));
  };

  const onRemoveFile = (url) => {
    const files = [...urlPhoto];
    const result = files.map((item) => {
      if (item.path === url.path) {
        return { ...item, active: false };
      }
      return item;
    });
    setUrlPhoto(result);
  };

  return (
    <Box maxWidth={730} width={"100%"} mt={"25px"}>
      <WrapperBoxStyled>
        <Box width={"100%"} height={"100%"} position={"relative"}>
          <InputUpload
            accept="image/*"
            type="file"
            value=""
            onChange={onFileDrop}
          />
          <Title28Styled marginBottom={"30px"}>Giấy tờ đính kèm</Title28Styled>
          <RowStyled jContent="start">
            <IconAttach />
            <Text18Styled marginLeft={"12.5px"}>
              Đính kèm thông tin hoá đơn và giấy tờ liên quan
            </Text18Styled>
          </RowStyled>
        </Box>
        <Grid container spacing={2}>
          {urlPhoto.length > 0
            ? urlPhoto.map((item, idx) => {
                if (item.active) {
                  return (
                    <Grid item xs={3} key={idx}>
                      <RowStyled>
                        <Image
                          width={143}
                          height={99}
                          src={item.path}
                          alt="clear"
                        />
                        <IconRemove
                          onClick={() => onRemoveFile(item)}
                          style={{
                            margin: "67px 0px 0px 5px",
                            cursor: "pointer",
                          }}
                        />
                      </RowStyled>
                      <Text14Styled color={"#000"} mb={"10px"}>
                        {item.name}
                      </Text14Styled>
                    </Grid>
                  );
                }
              })
            : null}
        </Grid>
      </WrapperBoxStyled>
    </Box>
  );
};

export default FileUpload;
