import React, { ReactNode } from "react";
import { SEOProps } from "@components";
import dynamic from "next/dynamic";
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
type PageProps = {
  meta: SEOProps;
  children?: ReactNode;
};

const Page: React.FC<PageProps> = ({ meta, children }) => {
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
