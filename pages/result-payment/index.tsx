import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";

const DynamicResultPages = dynamic(
  () =>
    import("../../src/components/LayoutResultPayment").then(
      (m) => m.default,
      (e) => null as never
    ),
  { ssr: false }
);

const ResultPayment = () => {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
      }}
    >
      <DynamicResultPages />
    </Page>
  );
};

export default ResultPayment;
