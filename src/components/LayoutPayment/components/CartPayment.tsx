import { TextField, Box, Autocomplete } from "@mui/material";
import React from "react";
import {
  ButtonStyled,
  RowStyled,
  Text18Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {};

const CartPayment = (props: Props) => {
  return (
    <Box width={637} mt={"10px"}>
      <WrapperBoxBorderStyled padding={"20px"} margin={"0px 0px 16px"}>
        <RowStyled>
          <Text18Styled mw={109}>Mã giới thiệu</Text18Styled>
          <TextField
            placeholder="Nhập mã"
            fullWidth
            style={{ maxWidth: 317, marginLeft: 21 }}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"}>
        <RowStyled>
          <Text18Styled mw={132}>Chiết khấu</Text18Styled>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Chiết khấu 1", id: "1" },
              { label: "Chiết khấu 2", id: "2" },
            ]}
            sx={{ maxWidth: 317 }}
            renderInput={(params) => (
              <TextField
                sx={{ width: 317 }}
                {...params}
                placeholder="Chọn chiết khấu"
              />
            )}
          />
          {/* <TextField fullWidth style={{ maxWidth: 317 }} /> */}
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"} marginTop="1rem">
        <RowStyled>
          <Text18Styled mw={200}>Tiến độ thanh toán</Text18Styled>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Bước 1", id: "1" },
              { label: "Bước 2", id: "2" },
            ]}
            sx={{ maxWidth: 317 }}
            renderInput={(params) => (
              <TextField
                sx={{ width: 317 }}
                {...params}
                placeholder="Chọn tiến độ thanh toán"
              />
            )}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
    </Box>
  );
};

export default CartPayment;
