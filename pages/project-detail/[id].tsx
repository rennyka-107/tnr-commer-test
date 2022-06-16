import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetInformationProject,
  apiGetListLevelProject,
  apiGetProjectTabs,
} from "../api/mapProject";
import isEmpty from "lodash.isempty";
import {
  setImgMap,
  setListLevel,
  setProjectInfomation,
} from "../../store/projectMapSlice";
import { getListTabsProject } from "../../store/projectSlice";

const DynamicMap = dynamic(
  () => import("@components/LayoutProjectDetail/Map"),
  { loading: () => <p>...</p>, ssr: false }
);

const RightListProduct = dynamic(
  () => import("@components/LayoutProjectDetail/RightListProduct"),
  { loading: () => <p>...</p> }
);

const ProjectInformation = dynamic(
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

  const Target = useSelector((state: RootState) => state.projectMap.Target);

  async function fetchListLevelProject() {
    const response = await apiGetListLevelProject(id as string);
    dispatch(setListLevel(response.responseData));
  }

  async function fetchProjectInformation() {
    const response = await apiGetInformationProject(id as string);
    dispatch(setProjectInfomation(response.responseData));
  }

  async function fetchProjectTabs() {
    const response = await apiGetProjectTabs(id as string);
    dispatch(getListTabsProject(response.responseData));
  }

  // async function fetchListChildMap() {
  //   if (isEmpty(Target)) {
  //     if (!isEmpty(ListLevel) && ListLevel.length > 2) {
  //       ListLevel.forEach(async (lv) => {
  //         if (lv.level === 1) {
  //           const response = await apiGetListChildMapByIdLevel(ListLevel[1].id);
  //           dispatch(setListChild(response.responseData));
  //         }
  //       });
  //     }
  //   } else {
  //     const response = await apiGetListChildMapByIdParent(Target.id);
  //     dispatch(setListChild(response.responseData));
  //   }
  // }

  useEffect(() => {
    // (async () => {
    //   try {
    //     await fetchListChildMap();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    if (isEmpty(Target) && !isEmpty(ListLevel)) {
      dispatch(setImgMap(ListLevel[0]["map"]));
    }
  }, [ListLevel, Target]);

  useEffect(() => {
    if (!isEmpty(id)) {
      (async () => {
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
      })();
    }
  }, [router, id]);

  const fetchComponent = () => {
    return (
      <Box sx={{ position: "relative" }}>
        {!loading ? (
          <>
            <Box
              sx={{
                mt: "125px",
                mb: "100px",
                width: "100vw",
                display: "flex",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "65vw",
                  height: "65vw",
                }}
              >
                <DynamicMap />
              </Box>
              <RightListProduct />
            </Box>
            <ProjectInformation />
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <CircularProgress />
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
      {fetchComponent()}
    </Page>
  );
};

export default ProjectDetail;
