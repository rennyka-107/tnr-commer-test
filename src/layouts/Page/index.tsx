import React, { ReactNode, useEffect } from "react";
import { SEOProps } from "@components";
import dynamic from "next/dynamic";
import {getListMenuBarProject} from '../../../pages/api/menuBarApi'
const DynamicSEOComponent = dynamic(() =>
  import("../../components/SEO").then(
    (m) => m.default,
    (e) => null as never
  )
);

const DynamicHeaderComponent = dynamic(() =>
  import("../../components/Header").then(
    (m) => m.Header,
    (e) => null as never
  )
);
const DynamicFooterComponent = dynamic(() =>
  import("../../components/Footer").then(
    (m) => m.Footer,
    (e) => null as never
  )
);
type ItemValueProps = {
  id: string;
  name: string;
};
type PageProps = {
  meta: SEOProps;
  children?: ReactNode;
  dataNav?: ItemValueProps[];
};

const Page: React.FC<PageProps> = ({ meta, children, dataNav }) => {

  return (
    <>
      <DynamicSEOComponent {...meta} />
      <main style={{ display: "flex", flexDirection: "column" }}>
        <DynamicHeaderComponent />
        {children}
        <DynamicFooterComponent />
      </main>
    </>
  );
};

export default Page;
