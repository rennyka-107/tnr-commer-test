import Page from "@layouts/Page";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicyById } from "../../store/salePolicySlice";
import { getPolicyByIdApi } from "../api/salePolicyApi";
import { RootState } from "../../store/store";

import dynamic from "next/dynamic";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Container from "@components/Container";
import LoadingComponent from "@components/LoadingComponent";

const DynamicDetailPolicySaleId = dynamic(
  () => import("../../src/components/PolicySales/detailPolicy"),
  { loading: () => <p>...</p> }
);

const PolicyDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { policyById } = useSelector((state: RootState) => state.salePolicy);
  const [loading, setLoading] = useState(false);


  const fetchAdvandedSearchList = async () => {
    try {
      setLoading(true);
      const response = await getPolicyByIdApi(id);
      dispatch(getPolicyById(response.responseData));
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
          <DynamicDetailPolicySaleId detailData={policyById} />
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
        title: `TNR Ecommerce ${policyById.name}`,
        description: `TNR Ecommerce ${policyById.name}`,
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container title={policyById.name}> {fetchComponent()}</Container>
      </FlexContainer>
    </Page>
  );
};
export default PolicyDetail;
