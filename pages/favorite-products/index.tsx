import FlexContainer from "@components/CustomComponent/FlexContainer";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";
import Page from "@layouts/Page";
import useNotification from "hooks/useNotification";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { getListFavouriteByUser } from "../../store/productFavouriteSlice";
import { RootState } from "../../store/store";
import { getListFavourite, searchAdvandedFavorite } from "../api/FavouriteApi";
import { searchAdvanded } from "../api/searchApi";

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
  const {
    Type,
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    projectId,
    projectTypeId,
    provinceId,
    textSearch,
    favouriteSearch,
  } = Router.query;

  const notification = useNotification();
  const [loading, setLoading] = useState(false);
  const [searchAction, setSearchAction] = useState(false);
  const [totalElement, setTotalElement] = useState(0)

  const [searchBody, setSearchBody] = useState<any>({
    textSearch: textSearch,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: (priceFrom as string) ?? "0",
    priceTo: (priceTo as string) ?? "50",
    areaFrom: (areaFrom as string) ?? "0",
    areaTo: (areaTo as string) ?? "1000",
    provinceIdList: [],
    projectTypeIdList: [],
    projectIdList: [],
    projectCategoryIdList: [],
    isPayment: 0,
    sortType: 0,
    favouriteSearch: favouriteSearch ?? 1,
  });

  const [search, setSearch] = useState({
    page: 0,
    size: 12,
  });

  const { listFavouriteByUser } = useSelector(
    (state: RootState) => state.favourites
  );

  useMemo(() => {
    if (typeof window !== "undefined") {
      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
      const typeProduct = localStorage?.getItem("typeProduct");
      const typeSaleProduct = localStorage?.getItem("typeSaleProduct");
      if (Router.isReady === true) {
        setSearchBody({
          provinceId: provinceId ? provinceId : "",
          projectTypeId: projectTypeId ? projectTypeId : "",
          projectId: projectId ? projectId : "",
          priceFrom: (priceFrom as string) ?? "0",
          priceTo: (priceTo as string) ?? "50",
          areaFrom: (areaFrom as string) ?? "0",
          areaTo: (areaTo as string) ?? "1000",
          provinceIdList:
            listProvince !== "null" ? JSON.parse(listProvince) : [],
          projectTypeIdList:
            listProjectType !== "null" ? JSON.parse(listProjectType) : [],
          projectIdList:
            listParamsIdProject !== "null"
              ? JSON.parse(listParamsIdProject)
              : [],
          textSearch: textSearch ? textSearch : "",
          isPayment: JSON.parse(typeSaleProduct),
          sortType: JSON.parse(typeProduct),
          favouriteSearch: favouriteSearch ?? 1,
        });
      }
    }
  }, [Router]);

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
        const response = await searchAdvandedFavorite(searchBody, search);
        if (response.responseCode === "00") {
          dispatch(getListFavouriteByUser(response.responseData));
		  setTotalElement(response.totalElement)
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
  }, [searchBody, search.page]);

  const fetchComponent = () => {
    return (
      <>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: 300 }}>
            <LoadingComponent />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 31,
              width: "100%",
              alignItems: "center",
            }}
          >
            <DynamicItemProductComponent
              data={listFavouriteByUser}
              setSearchAction={setSearchAction}
              searchAction={searchAction}
              setSearch={setSearch}
              setSearchBody={setSearchBody}
			  totalTextSearch={totalElement}
            />
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
      <FlexContainer>{fetchComponent()}</FlexContainer>
    </Page>
  );
};

export default FavoriteProducts;
