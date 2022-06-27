import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
