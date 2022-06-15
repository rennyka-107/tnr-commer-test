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

  const { textSearch } = router.query;

  const {
    Type,
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    projectId,
    projectTypeId,
    provinceId,
  } = router.query;
  const { SearchHomeLocation, totalElement } = useSelector(
    (state: RootState) => state.searchs
  );

  const [search, setSearch] = useState({
    page: 1,
    size: 12,
  });

  const searchList = {
    projectId: "",
    textSearch: textSearch,
    projectTypeId: "",
    block: "",
    price: "",
    room: "",
    area: "",
  };
  const pageNumber = Math.ceil(totalElement / search.size);

  const SearchAdvanded = {
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: priceFrom,
    priceTo: priceTo,
    areaFrom: Number(areaFrom),
    areaTo: Number(areaTo),
  };

  const changePage = (e: any) => {
	setSearch({
		page: e,
		size: 12
	})
  }
  const fetchSearchList = async () => {
    try {
      setLoading(false)
      if (textSearch) {
        const response = await searchLocationHome(searchList, search);
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

  const fetchAdvandedSearchList = async () => {
    try {
      setLoading(false)
      if (Type) {
        const response = await searchAdvanded(SearchAdvanded, search);
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
    if (Type) {
      fetchAdvandedSearchList();
    } else {
      fetchSearchList();
    }
  }, [textSearch, search, router]);

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
            count={totalElement}
            onChange={(event, page) => {
              changePage(page);
            }}
            page={pageNumber}
          />
        </Row>
    </Page>
  );
};

export default Search;
