import Page from "@layouts/Page";
import { HomePage } from "../src/components/LayoutIndex/index";


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
      </div>
    </Page>
  )
}

export default Home;
