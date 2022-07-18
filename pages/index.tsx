import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import { getProductTopByStanding } from "./api/productsApi";
import { getListProductTopByOS } from "../store/productSlice";
import { apiGetBanner } from "./api/bannerApi";
import { getTop10Special } from "./api/specialOffersApi";
import { RootState, wrapper } from "../store/store";
import { getSearchSpecialOffers } from "../store/SpecialOffersSlice";
import { getBanner } from "../store/bannerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const DynamicHome = dynamic(
  () => import("../src/components/LayoutIndex/HomeComponent/HomePage"),
  { loading: () => <p>...</p> }
);

const Home = () => {
  const { checkUp } = useSelector((state: RootState) => state.favourites);
  const dispatch = useDispatch();
  const router = useRouter();

  //   console.log(checkUp);
  const fetchAllIndex = async () => {
    try {
      const responseSpecial = await getTop10Special();
      dispatch(getSearchSpecialOffers(responseSpecial.responseData));
      const responseBanner = await apiGetBanner();
      dispatch(getBanner(responseBanner.responseData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllIndex();
  }, []);
  const fetchOutofStanding = async () => {
    try {
      const response: any = await getProductTopByStanding();
      dispatch(getListProductTopByOS(response.responseData));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (router.pathname === "/") {
      fetchOutofStanding();
    }
  }, [checkUp]);

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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     try {

//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

export default Home;
