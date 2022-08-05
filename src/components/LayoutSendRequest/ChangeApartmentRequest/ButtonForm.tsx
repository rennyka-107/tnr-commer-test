import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import CartItem from "@components/Element/CartItem";
import { Dialog, Divider } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useState } from "react";

const item = {
  productId: "0304B068-F00C-4A9F-84CC-98BFBB87E5E2",
  projectId: "F2B085F6-0D89-4517-97F9-1F67C74599E9",
  name: "LK.04-12",
  landArea: "100",
  numBed: 2,
  numBath: 2,
  doorDirection: "Đông Nam",
  unitPrice: "40580200",
  lotSymbolLegal: "LK.04-12",
  lotSymbolCommercial: null,
  totalPrice: "4000000000",
  projectName: "TNR GRAND PALACE CAO BẰNG",
  location: "Phường Hợp Giang, TP Cao Bằng, tỉnh Cao Bằng",
  province: "Cao Bằng",
  district: "TX Cao Bằng",
  commune: "P.Hợp Giang",
  thumbnail:
    "http://210.245.85.229:1983/static-data/123/123/207cd689-5af2-4064-b13d-62c8aa4769ad/123/3bc2e5d9-fbf8-41d6-b111-3d29f696019b.png",
  diaChi: "P.Hợp Giang, TX Cao Bằng, Cao Bằng",
  tongBanGhi: "407",
  category: "TNR Star",
  paymentStatus: 99,
  outstanding: 1,
  minFloor: 1,
  maxFloor: 7,
  levelType: null,
  projectTypeCode: "1",
  favouriteStatus: 0,
  projectTypeId: "C5CAF5CB-BFF4-48B9-A569-178D4A76BDF0",
  projectAvatar:
    "http://210.245.85.229:1983/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/F2B085F6-0D89-4517-97F9-1F67C74599E9/d92caf4d-2f65-48af-8ecc-873f7d7c06c0/67f0a8ad-47bf-4982-af0b-066666ac8961/d5596c04-f3ac-4ae3-a1a3-be1c58c3dd70.jpg",
};

const ButtonForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

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
      <Dialog open={open} onClose={handleCloseModal}>
        <Box sx={{ p: 3 }}>
          <CartItem item={item}>
            <CartItem.ContentWrap item={item}>
              <CartItem.Title item={item} />
              <Divider />
              <CartItem.GeneralInfo item={item} />
              <Divider />
              <CartItem.Price item={item} />
            </CartItem.ContentWrap>
          </CartItem>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ButtonForm;
