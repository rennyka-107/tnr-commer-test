import FlexContainer from "@components/CustomComponent/FlexContainer";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import useNotification from "hooks/useNotification";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { getListFavouriteByUser } from "../../store/productFavouriteSlice";
import { RootState } from "../../store/store";
import { getListFavourite } from "../api/FavouriteApi";

const DynamicItemProductComponent = dynamic(
  () => import("@components/FavouriteComponent/ItemCardFavouriteProduct"),
  { loading: () => <p>...</p> }
);

const DynamicBreadcrumsComponent = dynamic(
  () => import("../../src/components/CustomComponent/BreadcrumsComponent"),
  { loading: () => <p>...</p> }
);

const listBread = [
  {
    id: 1,
    value: "Trang chủ",
  },
];

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState(false);
  const { listFavouriteByUser } = useSelector(
    (state: RootState) => state.favourites
  );

  useEffect(() => {
    if (LocalStorage.get("accessToken") || SessionStorage.get("accessToken")) {
      return;
    } else {
      notification({
        severity: "warning",
        title: `Chưa có tài khoản`,
        message: `Bạn cần tạo tài khoản để tiếp tục`,
      });

      Router.push(`/authen?prePath=%2Fprofile&tabIndex=register`);
    }
  }, []);

  const fetchFavouriteByUser = async () => {
    if (LocalStorage.get("accessToken") || SessionStorage.get("accessToken")) {
      setLoading(true);
      try {
        const response: any = await getListFavourite();
        if (response.responseCode === "00") {
          dispatch(getListFavouriteByUser(response.responseData.content));
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFavouriteByUser();
  }, []);

  const fetchComponent = () => {
    return (
      <>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: 300 }}>
            <LoadingComponent />
          </div>
        ) : (
          <div style={{ display: "flex", gap: 31, width: "100%", alignItems: 'center' }}>
            <DynamicItemProductComponent data={listFavouriteByUser} />
          </div>
        )}
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [listFavouriteByUser]);
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Compare",
        description: "TNR Ecommerce Compare",
        isHomePage: true,
      }}
    >
      <FlexContainer>
     {fetchComponent()}
      </FlexContainer>
    </Page>
  );
};

export default FavoriteProducts;
