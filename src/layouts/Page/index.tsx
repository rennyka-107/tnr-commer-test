import React, { ReactNode, useEffect, useState } from "react";
import { Header, Footer, SEO, SEOProps } from "@components";
import dynamic from "next/dynamic";

type PageProps = {
  meta: SEOProps;
  children?: ReactNode;
};

const Page: React.FC<PageProps> = ({ meta, children }) => {
  return (
    <>
      <SEO {...meta} />
      <main style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        {children}
        {/* <div id="footer">
          <DynamicFooter />
        </div> */}
        <Footer />
      </main>
    </>
  );
};

export default Page;
