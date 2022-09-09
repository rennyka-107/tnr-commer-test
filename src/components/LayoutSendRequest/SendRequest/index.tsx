import {
  ButtonAction,
  ButtonStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Button, Checkbox, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export type SubmitType = "request" | "reject";

interface Props {
  handleClickBtn: (type: SubmitType) => void;
  text: string;
  loading?: boolean;
}

const SendRequest = ({ handleClickBtn, text, loading = false }: Props) => {
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const router = useRouter();

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
          Ấn “{text}” đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
          <span style={{ color: "#0063F7", textDecoration: "underline" }}>
            <Link
              href={
                "/buyingGuide?idUserManual=edef9816-8924-4857-ad52-7afc9124aqBV"
              }
            >
              Điều Khoản TNR
            </Link>
          </span>
        </Text14Styled>
      </RowStyled>
      <ButtonAction
        sx={{ my: 2 }}
        disabled={!isAccept}
        onClick={handleSendRequest}
      >
        {loading === false ? (
          <Text18Styled color={"#fff"}>{text}</Text18Styled>
        ) : (
          <CircularProgress
            style={{ height: 25, width: 25, color: "#ffffff" }}
          />
        )}
      </ButtonAction>
      <ButtonAction
        bg="#FFFFFF"
        border={"1px solid #c7c9d9"}
        onClick={() => router.push("/profile")}
      >
        <Text18Styled>Hủy yêu cầu</Text18Styled>
      </ButtonAction>
    </Box>
  );
};

export default SendRequest;
