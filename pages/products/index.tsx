import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "../../store/productSlice";
import { RootState } from "../../store/store";
import { getListProductApi } from "../api/productsApi";
import { getListProjectApi } from "../api/projectApi";
import { CircularProgress } from "@mui/material";
import { getListProject } from "../../store/projectSlice";

const DynamicPageIndex = dynamic(
  () => import("../../src/components/LayoutProduct/ProductPages"),
  { loading: () => <p>...</p> }
);

const ListProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { idProject } = router.query;

  const { listProductResponse } = useSelector(
    (state: RootState) => state.products
  );
  const { listProjectResponse } = useSelector(
    (state: RootState) => state.projects
  );

  const paramsSearch = {
    page: 1,
    size: 10,
  };
  const paramsSearchProject = {
    page: 1,
    size: 10,
  };
  const searchList = {
    projectId: idProject,
    location: "",
    projectTypeId: "",
  };

  const searchListProject = {
    projectId: idProject,
    location: "",
    projectTypeId: "",
    fromPrice: 0,
    toPrice: 0,
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getListProductApi(paramsSearch, searchList);
        dispatch(getListProduct(response.responseData));
        const responseProject = await getListProjectApi(
          paramsSearchProject,
          searchListProject
        );
        dispatch(getListProject(responseProject.responseData));
        if (
          response.responseCode === "00" &&
          responseProject.responseCode === "00" && idProject
        ) {
          console.log(idProject)
          setLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router, dispatch]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <DynamicPageIndex listProducts={listProductResponse} listProject={listProjectResponse} />
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <CircularProgress />
            </div>
          </>
        )}
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [loading]);
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      {" "}
      {fetchComponent()}
    </Page>
  );
};

export default ListProduct;
