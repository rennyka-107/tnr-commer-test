import Head from "next/head";
import React from "react";


export type SEOProps = {
  children?: any;
  title: string;
  description: string;
  about?: string;
  nameCompany?: string;
  reviewCount?: number;
  Rating?: number;
  iSReview?: boolean;
  canonical?: string;
  urlimage?: string;
  isHomePage?: boolean;
  isAbout?: boolean;
  isPricing?: boolean;
  isSearchPage?: boolean
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  children,
  canonical,
  urlimage,
}) => {
  const pageTitle = title ? `${title.trim()}` : "";
  const pageDescription = description || "";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon-precomposed" href="/favicon.ico" />
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:url"
          content={typeof canonical !== "undefined" ? canonical : ""}
        />
        <meta property="og:image" content={urlimage !== null ? urlimage : ""} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="canonical"
          href={typeof canonical !== "undefined" ? canonical : ""}
        />
      </Head>
      {children}
    </>
  );
};

export default SEO;
