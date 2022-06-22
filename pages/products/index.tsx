import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListProduct,
  getPaggingProductSearch,
} from "../../store/productSlice";
import { RootState } from "../../store/store";
import {
  getListProductApi,
  searchListProductByProjectIdApi,
} from "../api/productsApi";
import { getListProjectApi } from "../api/projectApi";
import { CircularProgress } from "@mui/material";
import { getListProject } from "../../store/projectSlice";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";

const DynamicPageIndex = dynamic(
  () => import("../../src/components/LayoutProduct/ProductPages"),
  { loading: () => <p>...</p> }
);

const ListProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { idProject, projectTypeId, provinceId } = router.query;

  const { listProductResponse, totalElement } = useSelector(
    (state: RootState) => state.products
  );
  const { listProjectResponse } = useSelector(
    (state: RootState) => state.projects
  );

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    size: 12,
  });
  const paramsSearchProject = {
    page: 1,
    size: 12,
  };
  const [searchList, setSearchList] = useState<any>({
    projectId: idProject,
    projectTypeId: projectTypeId,
    provinceId: provinceId,
  });
  const [loading, setLoading] = useState(false);

  const searchListProject = {
    projectId: idProject,
  };

  const changePage = (e: any) => {
    setParamsSearch({
      page: e,
      size: 12,
    });
  };
  const pageNumber = Math.ceil(totalElement / paramsSearch.size);

    useMemo(() => {
      if (router.isReady === true) {
        setSearchList({
          provinceId: provinceId ? provinceId : "",
          projectTypeId: projectTypeId ? projectTypeId : "",
          projectId: idProject ? idProject : "",
        });
      }
    }, [router.query]);

  const fetchData = async () => {
    try {
		// setLoading(false);
      const responseProject = await getListProjectApi(
        paramsSearchProject,
        searchListProject
      );
      const response = await searchListProductByProjectIdApi(
        paramsSearch,
        searchList
      );
      if (response.responseCode === "00") {
        setLoading(true);
      }
      dispatch(getListProject(responseProject.responseData));
      dispatch(getListProduct(response.responseData));
      dispatch(getPaggingProductSearch(response.totalElement));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady === true) {
      fetchData();
    }
  }, [searchList, paramsSearch.page]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <DynamicPageIndex
            listProducts={listProductResponse}
            listProject={listProjectResponse}
			
          />
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
      <Row customStyle={{ padding: 70, justifyContent: "center" }}>
        <PaginationComponent
          count={pageNumber}
          onChange={(event, page) => {
            changePage(page);
          }}
          page={paramsSearch.page}
        />
      </Row>
    </Page>
  );
};

export default ListProduct;
