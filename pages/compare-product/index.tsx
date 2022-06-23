import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";

const DynamicLayoutCompare = dynamic(
  () => import("../../src/components/LayoutCompare"),
  { loading: () => <p>...</p>, ssr: false }
);

const CompareProduct = () => {
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
