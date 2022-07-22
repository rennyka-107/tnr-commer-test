import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import LoadingComponent from "@components/LoadingComponent";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import {
  getPaggingSearch,
  getSearchHomeLocation,
} from "../../store/searchSlice";
import { RootState } from "../../store/store";
import { searchAdvanded } from "../api/searchApi";
const DynamicSearchPagesCompare = dynamic(
  () => import("../../src/components/SearchCompare"),
  { loading: () => <p>...</p> }
);

const CompareSearch = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { SearchHomeLocation, totalElement } = useSelector(
    (state: RootState) => state.searchs
  );
  const { checkUp } = useSelector((state: RootState) => state.favourites);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    page: 0,
    size: 12,
  });
  const {
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    projectTypeId,
    projectId,
    categoryId,
  } = router.query;
  const pageNumber = Math.ceil(totalElement / search.size);
  const [totalElementRS, setTotalElementRS] = useState(0);
  const [searchBody, setSearchBody] = useState<any>({
    projectTypeId: projectTypeId ? projectTypeId : "",
    projectId: projectId ? projectId : "",
    categoryId: categoryId ? categoryId : "",
    priceFrom: priceFrom ? priceFrom: "",
    priceTo: priceTo ? priceTo: "",
    areaFrom: Number(areaFrom),
    areaTo: Number(areaTo),
  });
  const changePage = (e: any) => {
    setSearch({
      page: e,
      size: 12,
    });
  };
  useMemo(() => {
    if (typeof window !== "undefined") {
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
      setSearchBody({
        projectTypeId: projectTypeId ? projectTypeId : "",
        priceFrom: priceFrom ? priceFrom : "",
        priceTo: priceTo ? priceTo : "",
        projectId: projectId ? projectId : "",
        categoryId: categoryId ? categoryId : "",
        areaFrom: Number(areaFrom),
        areaTo: Number(areaTo),
        projectTypeIdList: listProjectType ? JSON.parse(listProjectType) : [],
        projectIdList: listParamsIdProject
          ? JSON.parse(listParamsIdProject)
          : [],
      });
    }
  }, [router]);

  const fetchAdvandedSearchListCompare = async () => {
    try {
      if (router.isReady === true) {
        setLoading(false);
        const response = await searchAdvanded(searchBody, search);
        dispatch(getSearchHomeLocation(response.responseData));
        dispatch(getPaggingSearch(response.totalElement));
        if (response.responseCode === "00") {
          setLoading(true);
          setTotalElementRS(response.totalElement);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdvandedSearchListCompareFavourite = async () => {
    try {
      if (
        LocalStorage.get("accessToken") ||
        SessionStorage.get("accessToken")
      ) {
        const response = await searchAdvanded(searchBody, search);
        dispatch(getSearchHomeLocation(response.responseData));
        dispatch(getPaggingSearch(response.totalElement));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdvandedSearchListCompare();
  }, [searchBody, search.page]);

  useEffect(() => {
    if (router.pathname === "/compare-search") {
      fetchAdvandedSearchListCompareFavourite();
    }
  }, [checkUp]);
  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <DynamicSearchPagesCompare
              searchData={SearchHomeLocation}
              totalElement={pageNumber}
              totalTextSearch={totalElementRS}
            />
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 300 }}>
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
        title: "TNR Ecommerce Search Compare Product",
        description: "TNR Ecommerce Search Compare Product",
      }}
    >
      <FlexContainer>{fetchComponent()} </FlexContainer>
      <Row customStyle={{ padding: 70, justifyContent: "center" }}>
        <PaginationComponent
          count={pageNumber}
          onChange={(event, page) => {
            changePage(page - 1);
          }}
          page={search.page + 1}
        />
      </Row>
    </Page>
  );
};

export default CompareSearch;
