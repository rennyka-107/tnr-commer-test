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
  getComparePopUpItem,
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
    fetchCompareParam();
  }, [router.isReady]);

  useEffect(() => {
    fetchCompareItem();
  }, [router.isReady, router.query.productId]);

  useEffect(() => {
    fetchCompareItem();
  }, [router.isReady, router.query.productId]);

  const fetchCompareParam = async () => {
    try {
      if (router.isReady) {
        const res = await GetCompareParam();
        if (res.responseCode === "00") {
          dispatch(getCompareParam(res.responseData));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

//   const fetchCompareItem = async () => {
//     if (router.isReady && router.query.productId) {
//       const res = await GetComapreProduct(
//         typeof router.query.productId === "string"
//           ? [router.query.productId]
//           : router.query.productId
//       );
//       if (res.responseCode === "00") {
//         dispatch(
//           getCompareItem(
//             Array.from(router.query.productId, (item) =>
//               res.responseData.find((prob) => prob.productId === item)
//             )
//           )
//         );
//         if (comparePopUpItem.length > 0) {
//           dispatch(removeAllComparePopUpItem({}));
//         }
//       }
//     }
//   };

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
            Array.from(router.query.productId, (item) =>
              res.responseData.find((prob) => prob.productId === item)
            )
          )
        );
        if (comparePopUpItem.length > 0) {
          dispatch(removeAllComparePopUpItem({}));
        }
      }
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
