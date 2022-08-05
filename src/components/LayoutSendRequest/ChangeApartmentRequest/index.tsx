import PageBorder from "@components/Element/PageBorder";
import Subtitle from "@components/Element/Subtitle";
import {
  ButtonAction,
  ButtonStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Checkbox } from "@mui/material";
import Link from "next/link";
import SendRequest from "../SendRequest";
import ButtonForm from "./ButtonForm";
import NomalForm from "./NomalForm";

type Props = {};

const ChangeApartmentRequest = (props: Props) => {
  const handleClickBtn = () => {};
  return (
    <Box>
      <PageBorder
        sx={{
          marginBottom: "30px",
        }}
      >
        <Subtitle>Thông tin sản phẩm muốn đổi sang</Subtitle>
        <NomalForm />
        <Box sx={{ my: 2, textAlign: "center", fontSize: "16px" }}>Hoặc</Box>
        <ButtonForm />
      </PageBorder>
      <PageBorder>
        <SendRequest handleClickBtn={handleClickBtn} />
      </PageBorder>
    </Box>
  );
};

export default ChangeApartmentRequest;
