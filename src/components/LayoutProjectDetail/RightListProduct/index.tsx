import {
  CardHeader,
  CardContent,
  Card,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import dynamic from "next/dynamic";
import isEmpty from "lodash.isempty";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setTargetShape } from "../../../../store/projectMapSlice";

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

  function renderCard() {
    return (
      <Box
        sx={{
          width: expandMore ? "80vw" : "30vw",
          height: "50vw",
          borderRadius: "8px 0px 0px 8px",
          position: "absolute",
          zIndex: 999,
          left: expandMore ? 0 : "unset",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            pl: 4,
            pr: 4,
            boxShadow: "unset",
          }}
        >
          <CardHeader
            sx={{ pt: 0 }}
            title=""
            subheader={
              <Box>
                {ListLevel.map((level, idx) => {
                  if (idx !== 0 && idx !== ListLevel.length - 1) {
                    return <DropDownTargetLevel level={level} key={idx} />;
                  }
                })}
              </Box>
            }
          />
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
            <>
              <CardContent sx={{ pt: 0 }}>
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
            </>
          ) : (
            <DynamicProjectInformation {...ProjectInformation} />
          )}
        </Card>
      </Box>
    );
  }
  return <Box>{renderCard()}</Box>;
}
