import Page from "@layouts/Page";
import styled from "@emotion/styled";
import {
  FavoriteProducts,
  HomePage,
} from "../src/components/LayoutIndex/index";

const Home = () => {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <div style={{ marginTop: "127px" }}>
        <HomePage />
        {/* <FavoriteProducts /> */}
      </div>
    </Page>
  );
};

export default Home;
