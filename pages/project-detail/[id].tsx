import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Container from "@components/Container";
import  Grid  from "@mui/material/Grid";
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
  setProjectInformation,
} from "../../store/projectMapSlice";
import { getListTabsProject } from "../../store/projectSlice";
import LoadingComponent from "@components/LoadingComponent";

const DynamicMap = dynamic(
  () => import("@components/LayoutProjectDetail/Map"),
  { loading: () => <p>...</p>, ssr: false }
);

const RightListProduct = dynamic(
  () => import("@components/LayoutProjectDetail/RightListProduct"),
  { loading: () => <p>...</p> }
);

const DynamicProjectInformation = dynamic(
  () => import("@components/LayoutProjectDetail/ProjectInformation"),
  { loading: () => <p>...</p> }
);

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = router.query;

  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );

  const ProjectInformation = useSelector(
    (state: RootState) => state.projectMap.ProjectInformation
  );

  const Target = useSelector((state: RootState) => state.projectMap.Target);

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
              }}
            >
              <Box
                sx={{
                  width: "50vw",
                  height: "50vw",
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

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      <Container title={`${ProjectInformation.name ?? ""}`}>
        {!isEmpty(Target) ? (
          <Button
            sx={{ pt: 0 }}
            onClick={initialProjectMap}
            size="small"
          >
            Bản đồ dự án
          </Button>
        ) : (
          ""
        )}
        <Grid>{fetchComponent()}</Grid>
      </Container>
    </Page>
  );
};

export default ProjectDetail;
