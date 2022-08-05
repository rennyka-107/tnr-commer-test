import TNRButton from "@components/Element/TNRButton";
import styled from "@emotion/styled";

import { Box } from "@mui/system";

const NomalForm = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 2 }}>Nhập mã sản phẩm muốn đổi</Box>
      <Box
        sx={{ display: "flex", columnGap: 1, width: "100%", flexWrap: "wrap" }}
      >
        <StyledInput />
        <TNRButton
          label="Chọn"
          sx={{
            backgroundColor: "#1B3459",
            color: "#fff",
            padding: "12px 24px",
          }}
        />
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
