import Page from "@layouts/Page";
import styled from "@emotion/styled";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getListSalePolicyById } from "../api/salePolicyApi";
import { useDispatch, useSelector } from "react-redux";
import { getListSalePolicy } from "../../store/salePolicySlice";
import { RootState } from "../../store/store";
import LoadingComponent from "@components/LoadingComponent";

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;

const DynamicPolicySaleId = dynamic(
  () => import("../../src/components/PolicySales"),
  { loading: () => <p>...</p> }
);

const PolicySale = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listSalePolicy } = useSelector(
    (state: RootState) => state.salePolicy
  );

  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  const fetchAdvandedSearchList = async () => {
    try {
      setLoading(true);
      const response = await getListSalePolicyById(id);
      dispatch(getListSalePolicy(response.responseData));
      if (response.responseCode === "00") {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdvandedSearchList();
  }, [id]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <div style={{ textAlign: "center", marginTop: 150 }}>
            <LoadingComponent />
          </div>
        ) : (
          <DynamicPolicySaleId listSalePolicy={listSalePolicy} idPolicy={id} />
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
        title: "TNR Ecommerce Chính sách bán hàng",
        description: "TNR Ecommerce  Chính sách bán hàng",
        isHomePage: true,
      }}
    >
      <FlexContainer>
       {fetchComponent()}
      </FlexContainer>
    </Page>
  );
};

export default PolicySale;
