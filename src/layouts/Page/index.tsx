import { SEOProps } from "@components/SEO";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const DynamicSEOComponent = dynamic(() => import("../../components/SEO"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const DynamicHeaderComponent = dynamic(
  () => import("../../components/Header/ComponentHeader"),
  { loading: () => <p>...</p>, ssr: false }
);
const DynamicFooterComponent = dynamic(
  () => import("../../components/Footer/ComponentFooter"),
  { loading: () => <p>...</p> }
);
const DynamicScrollPage = dynamic(() => import("../../components/ScrollPage"), {
  loading: () => <p>...</p>,
});
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
        <div style={{ minHeight: 500 }}>
          <DynamicScrollPage />
          {children}
        </div>
        <DynamicFooterComponent />
      </main>
    </>
  );
};

export default Page;
