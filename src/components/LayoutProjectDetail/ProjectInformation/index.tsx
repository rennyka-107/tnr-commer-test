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
        width: "80vw",
        height: "50vw",
        position: "absolute",
        top: 0,
        zIndex: open ? 999 : "unset",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: !open ? -15 : "unset",
          top: open ? 60 : "unset",
          zIndex: "9999",
          marginTop: open ? "-20px" : "unset",
        }}
      >
        <Button
          id="pj-infor"
          startIcon={
            <ArrowForwardIosIcon
              style={{ transform: `rotate(${open ? "90" : "-90"}deg)` }}
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
          {open ? "Bản đồ" : "Thông tin dự án"}
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: !open ? "auto" : "900px",
          background: open ? "#FFFFFF" : "unset",
          boxShadow: "0px -4px 20px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          zIndex: open ? 999 : "unset",
          overflowY: "auto",
        }}
      >
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: "999",
            marginTop: open ? "-20px" : "unset",
          }}
        >
          <Button
            id="pj-infor"
            startIcon={
              <ArrowForwardIosIcon
                style={{ transform: `rotate(${open ? "90" : "-90"}deg)` }}
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
            {open ? "Bản đồ" : "Thông tin dự án"}
          </Button>
        </Box> */}
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
