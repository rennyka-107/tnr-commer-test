import Page from "@layouts/Page";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { getListProduct, getProductById } from "../../store/productSlice";
import { getListTabsProject } from "../../store/projectSlice";
import { RootState, wrapper } from "../../store/store";
import {
  getListProductApi,
  getProducById,
  getRecentlyViewed,
  updateViewProduct,
} from "../api/productsApi";
import { getListTabsProjectApi } from "../api/projectApi";
import LoadingComponent from "@components/LoadingComponent";
import { isEmpty } from "lodash";

const DynamicProductId = dynamic(
  () => import("../../src/components/LayoutProduct/ProductIdpage"),
  { loading: () => <p>...</p> }
);

const Product = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { productByID } = useSelector((state: RootState) => state.products);
  const { productId } = router.query;
  const paramsSearch = {
    page: 1,
    size: 10,
  };
  const [productsById, setProductsById] = useState<any>([]);

  const searchList = {
    projectId: productId,
    location: "",
    projectTypeId: "",
  };

  useEffect(() => {
    (async () => {
      try {
        if (!isEmpty(productId)) {
          const response = await getListProductApi(paramsSearch, searchList);

          dispatch(getListProduct(response.responseData));
          const responAPIBYID = await getProducById(productId);
          console.log("responAPIBYID", responAPIBYID);

          const accessToken =
            LocalStorage.get("accessToken") ||
            SessionStorage.get("accessToken");
          if (!!responAPIBYID?.responseData?.id && accessToken) {
            const response = updateViewProduct(responAPIBYID?.responseData?.id);
          }
          dispatch(getProductById(responAPIBYID.responseData));

          if (
            response.responseCode === "00" &&
            responAPIBYID.responseCode === "00" &&
            productId
          ) {
            setLoading(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router, dispatch]);

  useEffect(() => {
    if (!isEmpty(productByID?.project.id)) {
      (async () => {
        const responsListTab = await getListTabsProjectApi(
          productByID?.project.id
        );

        dispatch(getListTabsProject(responsListTab.responseData));
      })();
    }
  }, [productByID]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <DynamicProductId navKey={navKey} dataProduct={productByID} />
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <LoadingComponent />
            </div>
          </>
        )}
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [loading]);
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product ProductName",
        description: "TNR Ecommerce Product ProductName",
      }}
    >
      {fetchComponent()}
    </Page>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     try {
//       const idProduct = context.params.productId;
//       const response = await getProducById(idProduct);
//       const dispatch = store.dispatch as Function
//       dispatch(getProductById(response.responseData));
//     } catch (err) {}
//     return {
//       props: {},
//     };
//   }
// );
export default Product;
