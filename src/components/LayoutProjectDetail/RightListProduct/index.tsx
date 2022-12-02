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
import CircleArrow from "@components/Icons/CircleArrow";

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
  const ListChildTarget = useSelector(
    (state: RootState) => state.projectMap.ListChildTarget
  );
  const { listMenuBarType } = useSelector((state: RootState) => state.menubar);
  const OldTarget = useSelector(
    (state: RootState) => state.projectMap.OldTarget
  );
  const menuBarType = listMenuBarType?.filter((item) => item.id !== "1");
  const [moveRightItem, setMoveRightItem] = useState<boolean>(false);
  function renderCard() {
    return (
      <Box
        sx={{
          width: expandMore
            ? "95vw"
            : window.innerWidth <= 1024
            ? window.innerWidth <= 768
              ? "90vw"
              : "60vw"
            : "35vw",
          // height: "65vw",
          height: "calc(100vh - 150px)",
          borderRadius: "8px 0px 0px 8px",
          position: "absolute",
          zIndex: 800,
          right: expandMore
            ? 0
            : window.innerWidth <= 1024
            ? moveRightItem
              ? 0
              : window.innerWidth <= 768
              ? "-80vw"
              : "-50vw"
            : "unset",
        }}
      >
        {window.innerWidth <= 1024 && (
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              display: "flex",
              alignItems: "center",
              left: "-20px",
            }}
          >
            <CircleArrow
              onClick={() => setMoveRightItem(!moveRightItem)}
              style={{ transform: moveRightItem ? "unset" : "rotate(180deg)" }}
            />
          </Box>
        )}
        <Card
          sx={{
            width: "100%",
            // height: "65vw",
            height: "calc(100vh - 150px)",
            pl: 4,
            pr: 4,
            boxShadow: "unset",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
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
                    fontSize: "1.25rem",
                    fontWeight: "500",
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
            id="box-dropdown-map"
            sx={{
              mt: 2,
              display: "flex",
              overflowX: "auto",
              width: "100%",
              minHeight: 50,
            }}
          >
            {!isEmpty(ListLevel) &&
              ListLevel.map((level, idx) => {
                if (idx !== 0 && idx !== ListLevel.length - 1) {
                  return <DropDownTargetLevel level={level} key={idx} />;
                }
              })}
          </Box>

          {!isEmpty(Target) && Target.level === "PRODUCT" ? (
            <Box>
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
            </Box>
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
                <ListProductCard data={ListChild} expandMore={expandMore} />
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
          ) : !isEmpty(Target) &&
            Target.type === "1" &&
            isEmpty(Target.imgMap) &&
            !isEmpty(ListChildTarget) ? (
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
                  alignItems: "flex-start",
                  gap: 1,
                  justifyContent: "center",
                  maxHeight: window.innerHeight - 400,
                  overflowY: "auto",
                }}
              >
                {ListChildTarget.map((item) => (
                  <Button
                    key={item.id}
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
                      height: "32px",
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
          ) : (
            isEmpty(Target) && (
              <DynamicProjectInformation {...ProjectInformation} />
            )
          )}
        </Card>
      </Box>
    );
  }
  return <Box>{renderCard()}</Box>;
}
