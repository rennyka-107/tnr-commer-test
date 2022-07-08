import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { GetCompareParam } from "../api/compareApi";
import { useDispatch } from "react-redux";
import {
  getCompareParam,
} from "../../store/productCompareSlice";

const DynamicLayoutCompare = dynamic(
  () => import("../../src/components/LayoutCompare"),
  { loading: () => <p>...</p>, ssr: false }
);

const CompareProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompareParam();
  },[router.isReady])

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
