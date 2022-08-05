import {
  ButtonAction,
  ButtonStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Button, Checkbox } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export type SubmitType = "request" | "reject";

interface Props {
  handleClickBtn: (type: SubmitType) => void;
}

const SendRequest = ({ handleClickBtn }: Props) => {
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const handleSendRequest = () => {
    if (isAccept) {
      handleClickBtn("request");
    }
  };

  return (
    <Box>
      <RowStyled>
        <Checkbox
          sx={{ padding: "0 16px 16px 0" }}
          onClick={() => setIsAccept(!isAccept)}
        />
        <Text14Styled>
          Ấn “Gửi yêu cầu Hoàn cọc” đồng nghĩa với việc bạn đồng ý tuân
          theo&nbsp;
          <span style={{ color: "#0063F7", textDecoration: "underline" }}>
            <Link href={"/"}>Điều Khoản TNR</Link>
          </span>
        </Text14Styled>
      </RowStyled>
      <ButtonAction
        sx={{ my: 2 }}
        disabled={!isAccept}
        onClick={handleSendRequest}
      >
        <Text18Styled color={"#fff"}>Gửi yêu chuyển nhượng</Text18Styled>
      </ButtonAction>
      <ButtonAction bg="#FFFFFF" border={"1px solid #c7c9d9"}>
        <Text18Styled>Hủy yêu cầu</Text18Styled>
      </ButtonAction>
    </Box>
  );
};

export default SendRequest;
