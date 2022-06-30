import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";

const DynamicProfilePages = dynamic(
  () => import("../../src/components/LayoutProfile/ProfilePages"),
  { loading: () => <p>...</p> }
);

const Profile = () => {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Account",
        description: "TNR Ecommerce Account",
        isHomePage: true,
      }}
    >
      <DynamicProfilePages />
    </Page>
  );
};
export default WithAuth(Profile);
