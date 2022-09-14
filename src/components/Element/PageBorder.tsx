import { CSSProperties } from "@mui/styled-engine";
import { Box } from "@mui/system";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sx?: CSSProperties;
}

const PageBorder = ({ children, sx = {} }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid #D8D8D8",
        padding: "30px",
        // margin: "0 8rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default PageBorder;
