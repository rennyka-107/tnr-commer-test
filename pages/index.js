import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Page from "@layouts/Page";

export default function Home() {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <h1> TNR Ecommerce</h1>
    </Page>
  );
}
