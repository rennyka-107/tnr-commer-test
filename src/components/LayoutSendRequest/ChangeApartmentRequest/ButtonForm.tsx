import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import CartItem from "@components/Element/CartItem";
import { Dialog, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useState } from "react";

interface Props {
  handleOpenModal: () => void;
}

const ButtonForm = ({ handleOpenModal }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: `${371 / 286}`,
        backgroundColor: "#F2F2F2",
        maxHeight: "286px",
        position: "relative",
        cursor: "pointer",
        borderRadius: "20px",
      }}
      onClick={handleOpenModal}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <Image alt="" src="/icons/add_icon.svg" width={48} height={48} />
        <Box sx={{ textAlign: "center" }}>Thêm sản phẩm muốn đổi</Box>
      </Box>
    </Box>
  );
};

export default ButtonForm;
