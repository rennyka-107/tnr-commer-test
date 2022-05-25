
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
const DynamicHome = dynamic(() => import('../src/components/LayoutIndex/HomeComponent/HomePage'),{ loading: () => <p>...</p> })

const Home = (props) => {

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
        {/* <FavoriteProducts /> */}
      </div>
    </Page>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const response = await getListMenuBarProject();
//     store.dispatch(getListMenuBarType(response.responseData));
//   }
// );

export default Home;
