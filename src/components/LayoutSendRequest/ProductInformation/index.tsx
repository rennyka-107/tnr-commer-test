import { Box, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

type Props = {
  orderDetail?: any;
};

const ProductInformation = ({ orderDetail }: Props) => {
  if (!orderDetail) return <></>;

  const { production } = orderDetail;
  const { apartmentModel } = production;

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
          production.thumbnail
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
            {production.projectName}
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
            {production.lotSymbolLegal}
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
              {apartmentModel.name}
            </Typography>
            <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              {/* KHong biet field nay */}
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
              {apartmentModel.landArea}m<sup>2</sup>
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
              {apartmentModel.numBed}
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
              {apartmentModel.numBath}
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
              {production.doorDirection}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInformation;
