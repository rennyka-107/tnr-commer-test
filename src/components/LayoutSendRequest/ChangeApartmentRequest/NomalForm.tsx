import TNRButton from "@components/Element/TNRButton";
import { ButtonAction, Text18Styled } from "@components/StyledLayout/styled";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

import { Box } from "@mui/system";
import { useState } from "react";

interface Props {
  handleEnterProductCode: (value: string) => () => void;
  searchTextLoading: boolean;
}

const NomalForm = ({ handleEnterProductCode, searchTextLoading }: Props) => {
  const [value, setValue] = useState<string>("");

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 2 }}>Nhập mã sản phẩm muốn đổi</Box>
      <Box
        sx={{ display: "flex", columnGap: 1, width: "100%", flexWrap: "wrap" }}
      >
        <StyledInput value={value} onChange={(e) => setValue(e.target.value)} />
        <Box>
          <ButtonAction
            sx={{ backgroundColor: "#1B3459 !important", minWidth: "100px" }}
            disabled={searchTextLoading}
            onClick={handleEnterProductCode(value)}
          >
            {!searchTextLoading ? (
              <Text18Styled color={"#fff"}>Chọn</Text18Styled>
            ) : (
              <CircularProgress
                style={{ height: 25, width: 25, color: "#ffffff" }}
              />
            )}
          </ButtonAction>
        </Box>
      </Box>
    </Box>
  );
};

const StyledInput = styled.input({
  padding: "12px",
  borderRadius: "8px",
  flex: 1,
});

export default NomalForm;
