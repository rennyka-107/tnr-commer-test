import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import LoadingComponent from "@components/LoadingComponent";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaggingSearch,
  getSearchHomeLocation,
} from "../../store/searchSlice";
import { RootState } from "../../store/store";
import { searchAdvandedHotProduct } from "../api/searchApi";

const DynamicHotProductsComponent = dynamic(
  () => import("../../src/components/HotProducts"),
  { loading: () => <p>...</p> }
);


const HotProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { SearchHomeLocation, totalElement } = useSelector(
    (state: RootState) => state.searchs
  );

  const [params, setParams] = useState({
    page: 0,
    size: 12,
  });
  const searchBody = {
    outstanding: 1,
  };
  const pageNumber = Math.ceil(totalElement / params.size);

  const fetchDataHotProducts = async () => {
    try {
      setLoading(false);
      const response = await searchAdvandedHotProduct(searchBody, params);
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
    fetchDataHotProducts();
  }, [params]);

  const changePage = (e: any) => {
    setParams({
      page: e,
      size: 12,
    });
  };
  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <DynamicHotProductsComponent searchData={SearchHomeLocation} />
        ) : (
          <div style={{ textAlign: "center", marginTop: 300 }}>
            <LoadingComponent />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
	fetchComponent();
  },[loading])

  return (
    <Page
      meta={{
        title: "TNR Ecommerce S???n Ph???m N???i b???t",
        description: "TNR Ecommerce s???n ph???m n???i b???t",
      }}
    >
      {" "}
      <FlexContainer>{fetchComponent()}</FlexContainer>
      <Row customStyle={{ padding: 70, justifyContent: "center" }}>
        <PaginationComponent
          count={pageNumber}
          onChange={(event, page) => {
            changePage(page - 1);
          }}
          page={params.page + 1}
        />
      </Row>
    </Page>
  );
};
export default HotProduct;
