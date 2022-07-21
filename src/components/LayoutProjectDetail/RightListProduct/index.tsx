import {
  CardHeader,
  CardContent,
  Card,
  Box,
  CardActions,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import dynamic from "next/dynamic";
import isEmpty from "lodash.isempty";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setTargetShape } from "../../../../store/projectMapSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Router, useRouter } from "next/router";

const DynamicProjectInformation = dynamic(
  () => import("@components/CustomComponent/ProjectInformation"),
  { loading: () => <p>...</p>, ssr: false }
);

const DropDownTargetLevel = dynamic(() => import("./DropDownTargetLevel"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const ListProductCard = dynamic(() => import("./ListProductCard"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const DetailProduct = dynamic(() => import("./DetailProduct"), {
  loading: () => <p>...</p>,
  ssr: false,
});

export default function RightListProduct() {
  const [expandMore, setExpandMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const ListChild = useSelector(
    (state: RootState) => state.projectMap.ListChild
  );
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const ProjectInformation = useSelector(
    (state: RootState) => state.projectMap.ProjectInformation
  );

  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );

  const ListTarget = useSelector(
    (state: RootState) => state.projectMap.ListTarget
  );

  const ListChildTarget = useSelector(
    (state: RootState) => state.projectMap.ListChildTarget
  );

  const { listMenuBarType } = useSelector((state: RootState) => state.menubar);
  const OldTarget = useSelector(
    (state: RootState) => state.projectMap.OldTarget
  );
  const menuBarType = listMenuBarType?.filter((item) => item.id !== "1");
  console.log(ListTarget, "list target");
  function renderCard() {
    return (
      <Box
        sx={{
          width: expandMore ? "95vw" : "30vw",
          height: "65vw",
          borderRadius: "8px 0px 0px 8px",
          position: "absolute",
          zIndex: 990,
          right: expandMore ? 0 : "unset",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "65vw",
            pl: 4,
            pr: 4,
            boxShadow: "unset",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            value={menuBarType.find((item) => item.id === id) ?? null}
            options={menuBarType}
            sx={{ width: "100%", mt: 3 }}
            popupIcon={<KeyboardArrowDownIcon fontSize="large" />}
            onChange={(e, value) => {
              router.push(`/project-detail/${value.id}`);
            }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                placeholder={`Tất cả dự án`}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: "28px",
                    fontWeight: "400",
                    lineHeight: "33px",
                    color: "#0E1D34",
                  },
                  disableUnderline: true,
                }}
              />
            )}
            getOptionLabel={(option: any) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              overflowX: "auto",
              width: "500px",
              minHeight: 70,
            }}
          >
            {ListLevel.map((level, idx) => {
              if (idx !== 0 && idx !== ListLevel.length - 1) {
                return <DropDownTargetLevel level={level} key={idx} />;
              }
            })}
          </Box>
          {!isEmpty(Target) && Target.type === "1" && isEmpty(Target.imgMap) && !isEmpty(ListChildTarget) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  mt: 2,
                  mb: 2,
                  color: "#000000",
                  lineHeight: "21px",
                  fontSize: "18px",
                  fontWeight: 500,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Chọn
              </Typography>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {ListChildTarget.map((item) => (
                  <Button
                    onClick={() => {
                      dispatch(
                        setTargetShape({
                          id: item.id,
                          level: item.level,
                        })
                      );
                    }}
                    sx={{
                      width: "40%",
                      background: "#F3F4F6",
                      mt: 1,
                      ml: 1,
                      color: "#0E1D34",
                      "&:hover": {
                        background: "#1B3459",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
          {!isEmpty(Target) && Target.level === "PRODUCT" ? (
            <DetailProduct
              onBack={() =>
                dispatch(
                  setTargetShape({
                    id: Target.parentId,
                    level: OldTarget.level,
                  })
                )
              }
            />
          ) : !isEmpty(ListChild) ? (
            <Box
              sx={{
                marginTop: "2rem",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 5,
              }}
            >
              <CardContent sx={{ pt: 0, pl: 0 }}>
                <ListProductCard data={ListChild} />
              </CardContent>
              <CardActions sx={{ pt: 0 }} disableSpacing>
                <Button
                  startIcon={
                    <ArrowBackIcon
                      sx={{ transform: expandMore ? "rotate(180deg)" : "" }}
                    />
                  }
                  sx={{ pt: 0 }}
                  onClick={() => setExpandMore(!expandMore)}
                  size="small"
                >
                  {expandMore ? "Thu gọn" : "Xem thêm"}
                </Button>
              </CardActions>
            </Box>
          ) : (
            <DynamicProjectInformation {...ProjectInformation} />
          )}
        </Card>
      </Box>
    );
  }
  return <Box>{renderCard()}</Box>;
}
