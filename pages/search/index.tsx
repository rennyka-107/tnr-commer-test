import { useEffect, useState } from "react";
import Page from "@layouts/Page";
import { RootState, wrapper } from "../../store/store";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchAdvanded, searchLocationHome } from "../api/searchApi";
import {
  getPaggingSearch,
  getSearchHomeLocation,
} from "../../store/searchSlice";
import { CircularProgress } from "@mui/material";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";

const DynamicSearchPages = dynamic(
  () => import("../../src/components/SearchPage"),
  { loading: () => <p>...</p> }
);

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchAction, setSearchAction] = useState(false);

  const {
    Type,
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    projectId,
    projectTypeId,
    provinceId,
    textSearch,
  } = router.query;
  const { SearchHomeLocation, totalElement } = useSelector(
    (state: RootState) => state.searchs
  );
  const [searchBody, setSearchBody] = useState<any>({
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: null,
    areaTo: null,
    textSearch: "",
  });
  const [search, setSearch] = useState({
    page: 1,
    size: 12,
  });

  const pageNumber = Math.ceil(totalElement / search.size);

  useEffect(() => {
    setSearchBody({
      provinceId: provinceId ? provinceId : "",
      projectTypeId: projectTypeId ? projectTypeId : "",
      projectId: projectId ? projectId : "",
      priceFrom: priceFrom ? priceFrom + "000000000" : "",
      priceTo: priceTo ? priceTo + "000000000" : "",
      areaFrom: Number(areaFrom),
      areaTo: Number(areaTo),
      textSearch: textSearch ? textSearch : "",
    });
  }, [router.query]);

  const changePage = (e: any) => {
    setSearch({
      page: e,
      size: 12,
    });
  };

  const fetchAdvandedSearchList = async () => {
    if (searchBody.provinceId === "1") {
      setSearchBody({ ...searchBody, provinceId: "" });
    }
    try {
      setLoading(false);
      const response = await searchAdvanded(searchBody, search);
      dispatch(getSearchHomeLocation(response.responseData));
      dispatch(getPaggingSearch(response.totalElement));
      if (response.responseCode === "00") {
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAdvandedSearchList();
  }, [searchBody, search.page]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <FlexContainer>
              <DynamicSearchPages
                searchData={SearchHomeLocation}
                setSearch={setSearch}
                totalElement={pageNumber}
                totalTextSearch={totalElement}
                pageNumber={search.page}
                setSearchAction={setSearchAction}
                searchAction={searchAction}
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
        title: "TNR Ecommerce Search",
        description: "TNR Ecommerce Search",
      }}
    >
      <div>{fetchComponent()}</div>
      <Row customStyle={{ padding: 70, justifyContent: "center" }}>
        <PaginationComponent
          count={pageNumber}
          onChange={(event, page) => {
            changePage(page);
          }}
          page={search.page}
        />
      </Row>
    </Page>
  );
};

export default Search;
