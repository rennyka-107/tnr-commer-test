import styled from "@emotion/styled";
import { Box, CardMedia, Divider, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import Product3 from "../../../../public/images/product3.png";

type Props = {
  orderDetail?: any;
};

const SubRightText = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;

const ProductInformation = ({ orderDetail }: Props) => {
  if (!orderDetail) return <></>;

  const { production, productionImage } = orderDetail;
  const { apartmentModel } = production;

  console.log("production", production);

  const renderLandArea = () => {
    if (production?.landArea) {
      if (production.landArea === "0") {
        return "N/A";
      } else {
        return (
          <div>
            {production.landArea}m<sup>2</sup>
          </div>
        );
      }
    }
  };

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
          !isEmpty(productionImage) ? productionImage : Product3
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
            {production?.projectName}
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
            {production?.lotSymbolLegal}
          </Typography>
          <Box
            sx={{
              display: "flex",
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
              {apartmentModel?.name}
            </Typography>
            {production.projectTypeCode === "2" ? (
              <div
                style={{
                  display: "flex",
                  gap: 37,
                  marginBottom: 15,
                  marginTop: 20,
                }}
              >
                <SubRightText>{production?.levelDetailParentName}</SubRightText>
                <SubRightText>{production?.levelDetailName}</SubRightText>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 37,
                  marginBottom: 15,
                  marginTop: 20,
                }}
              >
                <SubRightText>{production?.levelDetailName}</SubRightText>
              </div>
            )}
            {/* <Typography
              sx={{
                color: "#1B3459",
                lineHeight: "16px",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Tầng {production?.viewNum}
            </Typography> */}
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
              {renderLandArea()}
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
              {production?.numBed || "N/A"}
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
              {production?.numBath || "N/A"}
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
              {production?.doorDirection || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInformation;
