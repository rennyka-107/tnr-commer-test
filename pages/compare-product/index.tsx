import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { GetCompareParam, GetComapreProduct } from "../api/compareApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompareParam,
  getCompareItem,
  removeAllComparePopUpItem,
} from "../../store/productCompareSlice";
import { RootState } from "../../store/store";

const DynamicLayoutCompare = dynamic(
  () => import("../../src/components/LayoutCompare"),
  { loading: () => <p>...</p>, ssr: false }
);

const CompareProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { comparePopUpItem } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  useEffect(() => {
    fetchCompareItem();
  }, [router.isReady, router.query.productId]);

  const fetchCompareItem = async () => {
    if (router.isReady && router.query.productId) {
      const res = await GetComapreProduct(
        typeof router.query.productId === "string"
          ? [router.query.productId]
          : router.query.productId
      );
      if (res.responseCode === "00") {
        dispatch(
          getCompareItem(
            Array.from(
              typeof router.query.productId === "string"
                ? [router.query.productId]
                : router.query.productId,
              (item) =>
                res.responseData.data.find((prob) => prob.productId === item)
            )
          )
        );
        dispatch(getCompareParam(res.responseData.compareProduct));
        dispatch(removeAllComparePopUpItem({}));
      }
    }else if(router.isReady && !router.query.productId){
      dispatch(getCompareItem([]));
    }
  };

  return (
    <Page
      meta={{
        title: "TNR E-commerce Compare",
        description: "TNR E-commerce Compare Product",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <DynamicLayoutCompare />
      </FlexContainer>
    </Page>
  );
};

export default CompareProduct;
