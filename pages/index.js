import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { getProductTopByStanding } from "./api/productsApi";
import { getListProductTopByOS } from "../store/productSlice";
import {getTop10Special} from './api/specialOffersApi'
import { wrapper } from "../store/store";
import { getSearchSpecialOffers } from "../store/SpecialOffersSlice";

const DynamicHome = dynamic(
  () => import("../src/components/LayoutIndex/HomeComponent/HomePage"),
  { loading: () => <p>...</p> }
);

const Home = () => {

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
	  const responseSpecial = await getTop10Special();
	  store.dispatch(getSearchSpecialOffers(responseSpecial.responseData))
    } catch (err) {
      console.log(err);
    }
  }
);

export default Home;
