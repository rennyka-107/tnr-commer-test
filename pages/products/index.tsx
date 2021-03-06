import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListProduct,
  getPaggingProductSearch,
} from "../../store/productSlice";
import { RootState } from "../../store/store";
import { searchListProductByProjectIdApiII } from "../api/productsApi";
import { getListProjectApi } from "../api/projectApi";
import { getListProject } from "../../store/projectSlice";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import LoadingComponent from "@components/LoadingComponent";
import useProjectRecenly from "hooks/useProjectRecenly";

const DynamicPageIndex = dynamic(
  () => import("../../src/components/LayoutProduct/ProductPages"),
  { loading: () => <p>...</p> }
);

const ListProduct = () => {
  const router = useRouter();
  const { idProject, projectTypeId, provinceId } = router.query;
  const dispatch = useDispatch();
  const { dataProductRecenly } = useProjectRecenly();
  const { listProductResponse, totalElement } = useSelector(
    (state: RootState) => state.products
  );
  const { listProjectResponse } = useSelector(
    (state: RootState) => state.projects
  );
  

  const [paramsSearch, setParamsSearch] = useState({
    page: 0,
    size: 12,
  });
  const paramsSearchProject = {
    page: 0,
    size: 12,
  };
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

  const fetchData = async () => {
    try {
      if (provinceId || projectTypeId || idProject) {
        setLoading(false);
		const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
        if (idProject !== "1") {
          const paramNew = {
            provinceId: provinceId,
            projectTypeId: projectTypeId,
            projectId: idProject,
          };

          const response = await searchListProductByProjectIdApiII(
            paramsSearch,
            paramNew
          );
          if (response.responseCode === "00") {
            setLoading(true);
          }
          dispatch(getListProduct(response.responseData));
          dispatch(getPaggingProductSearch(response.totalElement));
        }else {
			const paramNew = {
				provinceId: provinceId,
				projectTypeId: projectTypeId,
				projectIdList: JSON.parse(listParamsIdProject),
			  };
	
			  const response = await searchListProductByProjectIdApiII(
				paramsSearch,
				paramNew
			  );
			  if (response.responseCode === "00") {
				setLoading(true);
			  }
			  dispatch(getListProduct(response.responseData));
			  dispatch(getPaggingProductSearch(response.totalElement));
		}
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataProject = async () => {
    try {
      const responseProject = await getListProjectApi(
        paramsSearchProject,
        searchListProject
      );
      dispatch(getListProject(responseProject.responseData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady === true) {
      fetchData();
    }
  }, [provinceId, projectTypeId, idProject, paramsSearch]);

  useEffect(() => {
    fetchDataProject();
  }, [idProject]);

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
              <LoadingComponent />
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
            changePage(page - 1);
          }}
          page={paramsSearch.page + 1}
        />
      </Row>
    </Page>
  );
};

export default ListProduct;
