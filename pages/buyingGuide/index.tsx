import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { RootState, wrapper } from "../../store/store";
import { getListUserManualApi } from "../api/userManualApi";
import { getListUserManual } from "../../store/userManualSlice";
import { useSelector } from "react-redux";

const DynamicBuyingGuide = dynamic(
  () => import("../../src/components/BuyingGuide"),
  { loading: () => <p>...</p> }
);

const BuyingGuide = () => {
  const Router = useRouter();
  const { listUserManual } = useSelector(
    (state: RootState) => state.userManual  );
  const params = Router.query.id;
  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <DynamicBuyingGuide data={listUserManual}/>
      </FlexContainer>
    </Page>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const response = await getListUserManualApi();
      store.dispatch(getListUserManual(response.responseData));
    } catch (err) {
      console.log(err);
    }
    return {
      props: {},
    };
  }
);

export default BuyingGuide;
