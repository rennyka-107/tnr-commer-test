import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sx?: object;
}

const Subtitle = ({ children, sx = {} }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "20px",
        fontWeight: 500,
        lineHeight: "23.44px",
        color: "#1B3459",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
