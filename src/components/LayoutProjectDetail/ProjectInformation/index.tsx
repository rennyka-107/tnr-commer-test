import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dynamic from "next/dynamic";

const DynamicTabsComponent = dynamic(
  () => import("@components/CustomComponent/TabsComponent"),
  { loading: () => <p>...</p>, ssr: false }
);

export default function ProjectInformation() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box
      sx={{
        backgroundColor: open ? "rgba(0,0,0,0.4)" : "#FFFFFF",
        width: "100vw",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: open ? 991 : "unset",
        display: "flex",
        alignItems: "flex-end"
      }}
    >
      {!open && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: -15,
            zIndex: "900",
          }}
        >
          <Button
            id="pj-infor"
            startIcon={
              <ArrowForwardIosIcon style={{ transform: `rotate(-90deg)` }} />
            }
            variant="outlined"
            sx={{
              border: "none",
              borderRadius: "8px",
              color: "#FEC83C",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              setOpen(!open);
              window.scrollTo(0, 0);
            }}
          >
            Thông tin dự án
          </Button>
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: !open ? "auto" : "95%",
          background: open ? "#FFFFFF" : "unset",
          boxShadow: "0px -4px 20px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          zIndex: open ? 990 : "unset",
          overflowY: "auto",
        }}
      >
        {open && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                top: 0
              }}
            >
              <Button
                id="pj-infor"
                startIcon={
                  <ArrowForwardIosIcon
                    style={{ transform: `rotate(90deg)` }}
                  />
                }
                variant="outlined"
                sx={{
                  border: "none",
                  borderRadius: "8px",
                  color: "#FEC83C",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Bản đồ
              </Button>
            </Box>
        )}
        {open && (
          <>
            <Typography
              sx={{
                color: "#FEC83C",
                fontWeight: "700",
                fontSize: "44px",
                lineHeight: "130%",
                textAlign: "center",
                mt: 5,
              }}
            >
              Thông tin dự án
            </Typography>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <DynamicTabsComponent />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
