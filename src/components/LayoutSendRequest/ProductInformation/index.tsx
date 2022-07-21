import { Box, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";

type Props = {};

const ProductInformation = (props: Props) => {
  return (
    <Box
      sx={{
        marginTop: "13px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{
          borderRadius: "10px",
          marginBottom: 5,
          width: "18vw",
          height: "15vw",
        }}
        component={"img"}
        image={
          // (!isEmpty(item) ? item.thumbnail : cart.thumbnail) ??
          "/images/product_1.png"
        }
        alt={"Product photo"}
      />
      <Box
        sx={{
          width: "18vw",
          height: "15vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#8190A7",
              lineHeight: "16px",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            TNR Lam sơn
          </Typography>
          <Typography
            sx={{
              color: "#1B3459",
              lineHeight: "24px",
              fontSize: "24px",
              fontWeight: 500,
              mt: 3,
            }}
          >
            LÔ A01
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Tòa A
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Tầng 26
            </Typography>
          </Box>
        </Box>
        <Box>
          <Divider />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Diện tích
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              80 m<sup>2</sup>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Phòng ngủ
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              3
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Phòng tắm
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              2
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 3,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Hướng
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Nam
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInformation;
