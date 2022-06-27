import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";

const DynamicProjectPages = dynamic(() =>
  import("../../src/components/LayoutProduct/ProductList").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ProjectTNR = () => {


  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <DynamicProjectPages
      />
    </Page>
  );
};

export default ProjectTNR;
