import { IconPlusProduct } from "@components/Icons";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  Box,
  Modal,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { IconTimes } from "@components/Icons";
import dynamic from "next/dynamic";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ItemScreenDynamic = dynamic(() => import("./ItemScreen"));

const WrapperContent = styled(Card)`
  width: 284px;
  height: 286px;
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: none;
  border: none;
  margin-bottom: 20px;
`;
const TextStyled = styled.span`
  margin-top: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0e1d34;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BoxInputStyled = styled(Box)({
  height: 59,
  padding: "0px 0px 4px 12px",
  borderBottom: "1px solid #dcdcdc",
  display: "flex",
  alignItems: "end",
});
const TitleModal = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  color: #000;
  margin-bottom: 32px;
  text-align: center;
`;
const BoxModalStyled = styled(Box)`
  width: 1275px;
  min-height: 650px;
  background: #fff;
  border: none;
  box-sizing: border-box;
  padding: 32px 85px 90px;
  position: relative;
`;
const BoxTimes = styled(Button)`
  position: absolute;
  top: 22px;
  right: 22px;
`;
const BoxSearchModalStyled = styled(Box)`
  width: 100%;
  background: #1b3459;
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 145px;
`;
const ButtonSearchModalStyled = styled(Button)`
  width: 154px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: #d60000;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  &:hover {
    background: #d60000;
  }
`;

const ItemImport = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };
  const handleClickScreen = () => {
    setOpen(false);
  };

  return (
    <Box maxWidth={289}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxModalStyled>
          <BoxTimes onClick={() => setOpen(false)}>
            <IconTimes />
          </BoxTimes>
          <TitleModal>Sản phẩm đã xem gần nhất</TitleModal>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <ItemScreenDynamic
                onClick={handleClickScreen}
                src={"https://picsum.photos/308/200"}
              />
            </Grid>
            <Grid item xs={4}>
              <ItemScreenDynamic src={"https://picsum.photos/308/200"} />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <TitleModal style={{ marginTop: 33 }}>Hoặc tìm sản phẩm</TitleModal>
          <FormControl style={{ width: "100%" }}>
            <BoxSearchModalStyled>
              <Select defaultValue={"1"} style={{ background: "white" }}>
                <MenuItem value="1">Dòng sản phầm</MenuItem>
                <MenuItem value="2">Dòng sản phầm</MenuItem>
              </Select>
              <Select defaultValue={"1"} style={{ background: "white" }}>
                <MenuItem value="1">Loại sản phẩm</MenuItem>
                <MenuItem value="2">Loại sản phẩm</MenuItem>
              </Select>
              <Select defaultValue={"1"} style={{ background: "white" }}>
                <MenuItem value="1">Khoảng giá</MenuItem>
                <MenuItem value="2">Khoảng giá</MenuItem>
                <MenuItem value="3">Khoảng giá</MenuItem>
              </Select>
              <ButtonSearchModalStyled>So sánh</ButtonSearchModalStyled>
            </BoxSearchModalStyled>
          </FormControl>
        </BoxModalStyled>
      </Modal>
      <WrapperContent>
        <ButtonStyled onClick={handleOnClick}>
          <IconPlusProduct
            style={{ width: 46.6, height: 46.6, marginTop: 10 }}
          />
          <TextStyled>Thêm sản phầm so sánh</TextStyled>
        </ButtonStyled>
      </WrapperContent>
      <BoxInputStyled />
      <BoxInputStyled />
      <BoxInputStyled />
      <BoxInputStyled />
      <BoxInputStyled />
      <BoxInputStyled />
    </Box>
  );
};

export default ItemImport;
