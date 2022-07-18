import {
  CardHeader,
  CardContent,
  Card,
  Box,
  CardActions,
  Button,
  Autocomplete,
  TextField,
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

  const { listMenuBarType } = useSelector((state: RootState) => state.menubar);

  const menuBarType = listMenuBarType?.filter((item) => item.id !== "1");

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
            sx={{ width: "500px", mt: 3 }}
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
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
                    color: "#0E1D34"
                  },
                  disableUnderline: true,
                }}
              />
            )}
            getOptionLabel={(option: any) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Box sx={{ mt: 2 }}>
            {ListLevel.map((level, idx) => {
              if (idx !== 0 && idx !== ListLevel.length - 1) {
                return <DropDownTargetLevel level={level} key={idx} />;
              }
            })}
          </Box>
          {!isEmpty(Target) && Target.level === ListLevel.length - 1 ? (
            <DetailProduct
              onBack={() =>
                dispatch(
                  setTargetShape({
                    id: Target.parentId,
                    level: Target.level - 1,
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
