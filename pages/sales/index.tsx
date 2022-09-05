import Page from "@layouts/Page";
import styled from "@emotion/styled";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import { useRouter } from "next/router";
import { getTopAllSpecial } from "../api/specialOffersApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSearchSpecialOffers } from "../../store/SpecialOffersSlice";
import { RootState } from "../../store/store";
import dynamic from "next/dynamic";
import LoadingComponent from "@components/LoadingComponent";
import Row from "@components/CustomComponent/Row";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;

const DynamicSpecialOffersComponent = dynamic(
  () => import("../../src/components/SpecialOffersComponent"),
  { loading: () => <p>...</p> }
);

const SpecialOffers = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { SearchAllSpecialOffer, totalElement } = useSelector(
    (state: RootState) => state.specialoffers
  );

  const [params, setParams] = useState({
    page: 0,
    size: 12,
  });

  const fetchAllSpecialSales = async () => {
    setLoading(true);
    try {
      const response = await getTopAllSpecial(params);
      if (response.responseCode === "00") {
        dispatch(getAllSearchSpecialOffers(response.responseData.content));
        setTotalPage(response.responseData.totalPages);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllSpecialSales();
  }, [params]);

  const fetchComponent = () => {
    return (
      <>
        {loading === false ? (
          <DynamicSpecialOffersComponent data={SearchAllSpecialOffer} />
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
  }, [loading]);

  const changePage = (e: any) => {
    setParams({
      page: e,
      size: 12,
    });
  };
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Thông tin khuyến mãi",
        description: "TNR Ecommerce  Thông tin khuyến mãi",
        isHomePage: true,
      }}
    >
      <FlexContainer>{fetchComponent()} </FlexContainer>
      {SearchAllSpecialOffer.length > 0 && (
        <Row customStyle={{ padding: 70, justifyContent: "center" }}>
          <PaginationComponent
            count={totalPage}
            onChange={(event, page) => {
              changePage(page - 1);
            }}
            page={params.page + 1}
          />
        </Row>
      )}
    </Page>
  );
};

export default SpecialOffers;
