import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import Page from "@layouts/Page";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    page: 0,
    size: 12,
  });
  const { areaFrom, areaTo, priceFrom, priceTo, projectTypeId, projectId,categoryId } =
    router.query;
  const pageNumber = Math.ceil(totalElement / search.size);
  const [searchBody, setSearchBody] = useState<any>({
    projectTypeId: projectTypeId ? projectTypeId : "",
    projectId: projectId ? projectId : "",
	categoryId: categoryId ? categoryId : "",
    priceFrom: priceFrom ? priceFrom + "000000000" : "",
    priceTo: priceTo ? priceTo + "000000000" : "",
    areaFrom: Number(areaFrom),
    areaTo: Number(areaTo),
  });
  const changePage = (e: any) => {
    setSearch({
      page: e,
      size: 12,
    });
  };
  useEffect(() => {
    setSearchBody({
      projectTypeId: projectTypeId ? projectTypeId : "",
      priceFrom: priceFrom ? priceFrom + "000000000" : "",
      priceTo: priceTo ? priceTo + "000000000" : "",
      projectId: projectId ? projectId : "",
	  categoryId: categoryId ? categoryId : "",
      areaFrom: Number(areaFrom),
      areaTo: Number(areaTo),
    });
  }, [router.query]);

  const fetchAdvandedSearchListCompare = async () => {
    try {
      if (router.isReady === true) {
        setLoading(false);
        const response = await searchAdvanded(searchBody, search);
        dispatch(getSearchHomeLocation(response.responseData));
        dispatch(getPaggingSearch(response.totalElement));
        if (response.responseCode === "00") {
          setLoading(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAdvandedSearchListCompare();
  }, [searchBody, search.page]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <FlexContainer>
              <DynamicSearchPagesCompare
                searchData={SearchHomeLocation}
                totalElement={pageNumber}
              />
            </FlexContainer>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 300 }}>
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
        title: "TNR Ecommerce Search Compare Product",
        description: "TNR Ecommerce Search Compare Product",
      }}
    >
      <div>{fetchComponent()}</div>
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
