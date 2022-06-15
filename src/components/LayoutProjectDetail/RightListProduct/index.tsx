import {
  Button,
  CardActions,
  CardHeader,
  CardContent,
  Card,
  Box,
  Typography,
} from "@mui/material";
import DropDownTargetLevel from "./DropDownTargetLevel";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ListProductCard from "./ListProductCard";
import { ProjectInformation } from "@components/CustomComponent";

export default function RightListProduct() {
  const { listProductResponse } = useSelector(
    (state: RootState) => state.products
  );

  const ProjectInfomation = useSelector(
    (state: RootState) => state.projectMap.ProjectInfomation
  );

  function renderCard() {
    return (
      <Box
        sx={{
          width: "35vw",
          height: "65vw",
          borderRadius: "8px 0px 0px 8px",
          position: "relative",
          zIndex: 999,
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            pl: 4,
            pr: 4,
          }}
        >
          <CardHeader
            title={
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: "400",
                  lineHeight: "32.81px",
                }}
              >
                {ProjectInfomation.name}
              </Typography>
            }
            subheader={<DropDownTargetLevel />}
          />
          <CardContent>
            <ProjectInformation {...ProjectInfomation} />
          </CardContent>
          {/* <CardContent>
            <ListProductCard data={listProductResponse} />
          </CardContent>
          <CardActions disableSpacing>
            <Button onClick={() => console.log("xemthem")} size="small">
              Xem thêm
            </Button>
          </CardActions> */}
        </Card>
      </Box>
    );
  }
  return <Box>{renderCard()}</Box>;
}
