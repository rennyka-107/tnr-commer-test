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
  },[router.isReady])

  useEffect(() => {
    fetchCompareItem();
  }, [router.isReady, comparePopUpItem])

  const fetchCompareParam = async () => {
    try{
      if(router.isReady){
        const res = await GetCompareParam();
        if(res.responseCode === '00'){
          dispatch(getCompareParam(res.responseData))
        }
      }
    }catch(e){
      console.error(e);
    }finally{
  
    }
  }

  const fetchCompareItem = async () => {
    if(router.isReady && comparePopUpItem.length > 0){
      const res = await GetComapreProduct(comparePopUpItem.map(item => item.productId));
      if(res.responseCode === '00'){
        dispatch(getCompareItem(res.responseData))
      }
    }
  }

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
