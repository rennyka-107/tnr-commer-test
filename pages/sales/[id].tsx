import Page from "@layouts/Page";
import styled from "@emotion/styled";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import { useRouter } from "next/router";
import { getSpecialById, getTopAllSpecial } from "../api/specialOffersApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSearchSpecialOffers,
  getSpecialOfferById,
} from "../../store/SpecialOffersSlice";
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

const DynamicSpecialDetailComponent = dynamic(
  () => import("../../src/components/SpecialOffersComponent/SpecialDetail"),
  { loading: () => <p>...</p> }
);

const SpecialOfferDetail = () => {
  const Router = useRouter();
  const { id } = Router.query;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { SearchSpecialOfferById } = useSelector(
    (state: RootState) => state.specialoffers
  );

  const [params, setParams] = useState({
    page: 0,
    size: 9,
  });

  const fetchAllSpecialSales = async () => {
    setLoading(true);
    if (id) {
      try {
        const response = await getSpecialById(id, params);
        if (response.responseCode === "00") {
          dispatch(getSpecialOfferById(response.responseData));
          setTotalPage(response.responseData.totalPage);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllSpecialSales();
  }, [id]);

  const fetchComponent = () => {
    return (
      <>
        {loading === false ? (
          <DynamicSpecialDetailComponent data={SearchSpecialOfferById} />
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
    </Page>
  );
};

export default SpecialOfferDetail;
