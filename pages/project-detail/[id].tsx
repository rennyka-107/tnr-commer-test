import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Box, Backdrop, CircularProgress, Button, Typography } from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  apiGetInformationProject,
  apiGetListLevelProject,
  apiGetProjectTabs,
} from "../api/mapProject";
import isEmpty from "lodash.isempty";
import {
  resetProjectMap,
  setImgMap,
  setListLevel,
  setOpenModalSale,
  setProjectInformation,
} from "../../store/projectMapSlice";
import { getListTabsProject } from "../../store/projectSlice";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";

const DynamicMap = dynamic(
  () => import("@components/LayoutProjectDetail/Map"),
  { loading: () => <p>...</p>, ssr: false }
);

const RightListProduct = dynamic(
  () => import("@components/LayoutProjectDetail/RightListProduct"),
  { loading: () => <p>...</p>, ssr: false }
);

const SliderSpecialSale = dynamic(
  () => import("@components/CustomComponent/SliderSpecialSale.tsx"),
  { loading: () => <p>...</p>, ssr: false }
);

const DynamicProjectInformation = dynamic(
  () => import("@components/LayoutProjectDetail/ProjectInformation"),
  { loading: () => <p>...</p> }
);

const TextButtonStyled = styled(Typography)`
  font-family: "Roboto";
  text-transform: none;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  text-align: center;

  /* White */

  color: #ffffff;
`;

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = router.query;

  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );

  const Target = useSelector((state: RootState) => state.projectMap.Target);

  const open = useSelector(
    (state: RootState) => state.projectMap.openModalSale
  );

  const ProjectInformation = useSelector(
    (state: RootState) => state.projectMap.ProjectInformation
  );

  async function fetchListLevelProject() {
    const response = await apiGetListLevelProject(id as string);
    dispatch(setListLevel(response.responseData));
  }

  async function fetchProjectInformation() {
    const response = await apiGetInformationProject(id as string);
    dispatch(setProjectInformation(response.responseData));
  }

  async function fetchProjectTabs() {
    const response = await apiGetProjectTabs(id as string);
    dispatch(getListTabsProject(response.responseData));
  }

  console.log(open, ProjectInformation.lstOffers,"!@3")

  useEffect(() => {
    if (isEmpty(Target) && !isEmpty(ListLevel)) {
      dispatch(setImgMap(ListLevel[0]["map"]));
    }
  }, [ListLevel, Target]);

  async function initialProjectMap() {
    if (!isEmpty(id)) {
      dispatch(resetProjectMap());
      try {
        setLoading(true);
        await fetchListLevelProject();
        await fetchProjectInformation();
        await fetchProjectTabs();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  }

  useEffect(() => {
    initialProjectMap();
  }, [router, id]);

  const fetchComponent = () => {
    return (
      <Box sx={{ position: "relative" }}>
        {!loading ? (
          <>
            <Box
              sx={{
                mb: "100px",
                width: "100%",
                display: "flex",
                position: "relative",
                overflowX: "hidden",
              }}
            >
              <Box
                sx={{
                  width:
                    typeof window !== "undefined" && window.innerWidth <= 1024
                      ? "90vw"
                      : "65vw",
                  height: "calc(100vh - 150px)",
                }}
              >
                <DynamicMap />
              </Box>
              <RightListProduct />
            </Box>
            <DynamicProjectInformation />
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <LoadingComponent />
            </div>
          </>
        )}
      </Box>
    );
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(setOpenModalSale(false));
  };

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      <Grid sx={{ mt: "127px" }}>{fetchComponent()}</Grid>
      {!isEmpty(ProjectInformation.lstOffers) ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: 2000 }}
          style={{ backgroundColor: "rgba(27, 52, 89, 0.95)" }}
          open={open}
          // onClick={handleClose}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              alignItems: "center",
            }}
          >
            <SliderSpecialSale data={ProjectInformation.lstOffers} />
            <Button
              style={{
                border: "1px solid #ffffff",
                height: 48,
                width: 343,
                borderRadius: 8,
              }}
              onClick={handleClose}
            >
              <TextButtonStyled>Đóng</TextButtonStyled>
            </Button>
          </div>
        </Backdrop>
      ) : (
        <></>
      )}
    </Page>
  );
};

export default ProjectDetail;
