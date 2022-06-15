import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { getProductTopByStanding } from "./api/productsApi";
import { getListProductTopByOS } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";

const DynamicHome = dynamic(
  () => import("../src/components/LayoutIndex/HomeComponent/HomePage"),
  { loading: () => <p>...</p> }
);

const Home = (props) => {
  const dispatch = useDispatch();

  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
      //   dataNav={listMenuBarType}
    >
      <div style={{ marginTop: "127px" }}>
        <DynamicHome />
      </div>
    </Page>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const response = await getProductTopByStanding();
      store.dispatch(getListProductTopByOS(response.responseData));
    } catch (err) {
      console.log(err);
    }
  }
);

export default Home;
