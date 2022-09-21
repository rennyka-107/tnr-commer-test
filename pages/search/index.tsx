import { useEffect, useMemo, useState } from "react";
import Page from "@layouts/Page";
import { RootState } from "../../store/store";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchAdvanded } from "../api/searchApi";
import {
  getPaggingSearch,
  getSearchHomeLocation,
} from "../../store/searchSlice";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import LoadingComponent from "@components/LoadingComponent";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";

const DynamicSearchPages = dynamic(
  () => import("../../src/components/SearchPage"),
  { loading: () => <p>...</p> }
);

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
  const { checkUp } = useSelector((state: RootState) => state.favourites);

  const [searchBody, setSearchBody] = useState<any>({
    textSearch: textSearch,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: (priceFrom as string) ?? "0",
    priceTo: (priceTo as string) ?? "50",
    areaFrom: (areaFrom as string) ?? "0",
    areaTo: (areaTo as string) ?? "1000",
    provinceIdList: [],
    projectTypeIdList: [],
    projectIdList: [],
    projectCategoryIdList: [],
	isPayment:0,
	sortType: 0
  });
  const [loading, setLoading] = useState(false);
  const [searchAction, setSearchAction] = useState(false);

  const [search, setSearch] = useState({
    page: 0,
    size: 12,
  });

  const pageNumber = Math.ceil(totalElement / search.size);

  useMemo(() => {
    if (typeof window !== "undefined") {
      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
	  const typeProduct = localStorage?.getItem("typeProduct");
      const typeSaleProduct = localStorage?.getItem("typeSaleProduct");
      if (router.isReady === true) {
        setSearchBody({
          provinceId: provinceId ? provinceId : "",
          projectTypeId: projectTypeId ? projectTypeId : "",
          projectId: projectId ? projectId : "",
          priceFrom: (priceFrom as string) ?? "1",
          priceTo: (priceTo as string) ?? "50",
          areaFrom: (areaFrom as string) ?? "30",
          areaTo: (areaTo as string) ?? "1000",
          provinceIdList:
            listProvince !== "null" ? JSON.parse(listProvince) : [],
          projectTypeIdList:
            listProjectType !== "null" ? JSON.parse(listProjectType) : [],
          projectIdList:
            listParamsIdProject !== "null"
              ? JSON.parse(listParamsIdProject)
              : [],
          textSearch: textSearch ? textSearch : "",
		  isPayment: JSON.parse(typeSaleProduct),
		  sortType: JSON.parse(typeProduct)
        });
      }
    }
  }, [router]);

  console.log(searchBody)
  const changePage = (e: any) => {
    setSearch({
      page: e,
      size: 12,
    });
  };

  const fetchAdvandedSearchList = async () => {

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
  const fetchAdvandedSearchListFavorite = async () => {
    try {
      if (router.isReady === true) {
        if (
          LocalStorage.get("accessToken") ||
          SessionStorage.get("accessToken")
        ) {
          // setLoading(false);
          const response = await searchAdvanded(searchBody, search);
          dispatch(getSearchHomeLocation(response.responseData));
          dispatch(getPaggingSearch(response.totalElement));
          // if (response.responseCode === "00") {
          // //   setLoading(true);
          // }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    if (router.pathname === "/search") {
      fetchAdvandedSearchListFavorite();
    }
  }, [checkUp]);

  useEffect(() => {
    if (router.isReady === true) {
      fetchAdvandedSearchList();
    }
  }, [searchBody, search.page]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <DynamicSearchPages
              searchData={SearchHomeLocation}
              setSearch={setSearch}
              setSearchBody={setSearchBody}
              totalElement={pageNumber}
              totalTextSearch={totalElement}
              pageNumber={search.page}
              setSearchAction={setSearchAction}
              searchAction={searchAction}
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
        title: "TNR Ecommerce Search",
        description: "TNR Ecommerce Search",
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

export default Search;
